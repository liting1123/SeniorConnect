import http from 'node:http';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import nodemailer from 'nodemailer';
import { loadEnv } from './env.mjs';
import {
  addCheckInPoints,
  addGamePoint,
  createCaregiverConnection,
  createAppointmentForCaregiver,
  deleteCaregiverConnection,
  deleteAppointmentForCaregiver,
  createFamilyVerification,
  getAppointmentsForCaregiver,
  getAppointmentsForSenior,
  getUpcomingAppointmentsForReminder,
  createSosAlert,
  deleteMedicineForUser,
  getCaregiverContactsForSenior,
  getCaregiverSeniorConnections,
  getPendingFamilyVerificationCodesForSenior,
  getMedicinesForUser,
  getRewardRedemptionsForUser,
  getSensorActivitySnapshot,
  getServiceNowLoginConfig,
  getSosAlertHistory,
  getLatestActiveSosAlertForSenior,
  getVitalsHistory,
  getUserById,
  loginWithServiceNow,
  redeemUserPoints,
  registerWithServiceNow,
  resetPasswordWithServiceNow,
  saveMedicineForUser,
  searchSeniorProfiles,
  updateSosAlertStatus,
  updateAppointmentForCaregiver,
  updateCaregiverConnection,
  upsertUserProfile,
  verifyFamilyVerification,
} from './servicenow.mjs';

// Load environment variables from .env file
loadEnv();

const PORT = Number(process.env.API_PORT) || 3001;
const checkInReminders = [];
const loginMfaCodes = new Map();
const appointmentReminders = new Set(); // Track appointment IDs that have sent 24-hour reminders
const escalatedSosAlerts = new Map(); // Track SOS alerts that have already escalated to AIC
const pendingTelegramSetupLinks = new Map(); // token -> { caregiverId, caregiverEmail, expiresAt }
const caregiverTelegramChatIdCache = new Map(); // caregiver id/email -> telegram chat id

const MFA_EMAIL_HOST = String(process.env.MFA_EMAIL_HOST || '').trim();
const MFA_EMAIL_PORT = Number(process.env.MFA_EMAIL_PORT) || 587;
const MFA_EMAIL_SECURE = String(process.env.MFA_EMAIL_SECURE || '').trim().toLowerCase() === 'true';
const MFA_EMAIL_USER = String(process.env.MFA_EMAIL_USER || '').trim();
const MFA_EMAIL_PASS = String(process.env.MFA_EMAIL_PASS || '').trim();
const MFA_EMAIL_FROM = String(process.env.MFA_EMAIL_FROM || '').trim();
const TELEGRAM_BOT_TOKEN = String(process.env.TELEGRAM_BOT_TOKEN || '').trim();
const TELEGRAM_CHAT_ID = String(process.env.TELEGRAM_CHAT_ID || '').trim();
const AIC_TELEGRAM_BOT_TOKEN = String(process.env.AIC_TELEGRAM_BOT_TOKEN || '').trim();
const AIC_TELEGRAM_CHAT_ID = String(process.env.AIC_TELEGRAM_CHAT_ID || '').trim();
const TELEGRAM_STARTUP_TEST_ENABLED = String(process.env.TELEGRAM_STARTUP_TEST_ENABLED || 'false').trim().toLowerCase() === 'true';
const AIC_STARTUP_TEST_ENABLED = String(process.env.AIC_STARTUP_TEST_ENABLED || 'false').trim().toLowerCase() === 'true';
const CHECK_IN_ALERT_THRESHOLD_MS = (Number(process.env.CHECK_IN_ALERT_THRESHOLD_MINUTES || '5')) * 60 * 1000;
const SOS_ALERT_ESCALATION_THRESHOLD_MS = (Number(process.env.SOS_ALERT_ESCALATION_THRESHOLD_MINUTES || '5')) * 60 * 1000;
const TELEGRAM_SETUP_TOKEN_TTL_MS = (Number(process.env.TELEGRAM_SETUP_TOKEN_TTL_MINUTES || '15')) * 60 * 1000;

// Check-in window configuration
const CHECK_IN_TIME_ZONE = String(process.env.CHECK_IN_TIME_ZONE || 'Asia/Singapore').trim();
const CHECK_IN_MORNING_START = String(process.env.CHECK_IN_MORNING_START || '05:00').trim();
const CHECK_IN_MORNING_END = String(process.env.CHECK_IN_MORNING_END || '09:00').trim();
const CHECK_IN_EVENING_START = String(process.env.CHECK_IN_EVENING_START || '17:00').trim();
const CHECK_IN_EVENING_END = String(process.env.CHECK_IN_EVENING_END || '23:59').trim();
const CAREGIVER_RESPONSIVENESS_THRESHOLD_MS = (Number(process.env.CAREGIVER_RESPONSIVENESS_THRESHOLD_MINUTES || '5')) * 60 * 1000;

let mfaMailer = null;
const missedCheckInAlerts = new Map(); // Track missed check-ins: seniorId -> { notifiedAt, seniorName, caregiverId, lastCheckInWindow }
const caregiverNotificationViews = new Map(); // Track caregiver views: seniorId -> { viewedAt, caregiverId }
let telegramBotUsername = '';
let telegramUpdatesOffset = 0;
let telegramSetupPollingInProgress = false;

function cleanupExpiredTelegramSetupLinks() {
  const now = Date.now();

  for (const [token, entry] of pendingTelegramSetupLinks.entries()) {
    if (!entry?.expiresAt || entry.expiresAt <= now) {
      pendingTelegramSetupLinks.delete(token);
    }
  }
}

function normalizeTelegramSetupToken(value = '') {
  return String(value || '').trim().replace(/^setup[-_]/i, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function normalizeTelegramCacheKey(value = '') {
  return String(value || '').trim().toLowerCase();
}

function rememberCaregiverTelegramChatId({ caregiverId, caregiverEmail, telegramChatId }) {
  const normalizedChatId = String(telegramChatId || '').trim();

  if (!normalizedChatId) {
    return;
  }

  const keys = [caregiverId, caregiverEmail]
    .map((value) => normalizeTelegramCacheKey(value))
    .filter(Boolean);

  for (const key of keys) {
    caregiverTelegramChatIdCache.set(key, normalizedChatId);
  }
}

function getCachedCaregiverTelegramChatId({ caregiverId, caregiverEmail } = {}) {
  const keys = [caregiverId, caregiverEmail]
    .map((value) => normalizeTelegramCacheKey(value))
    .filter(Boolean);

  for (const key of keys) {
    const cachedTelegramChatId = caregiverTelegramChatIdCache.get(key);

    if (cachedTelegramChatId) {
      return cachedTelegramChatId;
    }
  }

  return '';
}

async function getCaregiverTelegramContacts({ caregiverId, caregiverEmail } = {}) {
  const normalizedCaregiverId = String(caregiverId || '').trim();
  const normalizedCaregiverEmail = String(caregiverEmail || '').trim();

  if (normalizedCaregiverId) {
    const caregiverContactsById = await getCaregiverSeniorConnections({ caregiverId: normalizedCaregiverId }).catch(() => []);

    if (caregiverContactsById.length > 0) {
      return caregiverContactsById;
    }
  }

  if (normalizedCaregiverEmail) {
    return await getCaregiverSeniorConnections({ caregiverEmail: normalizedCaregiverEmail }).catch(() => []);
  }

  return [];
}

async function resolveCaregiverTelegramChatIds({ caregiverId, caregiverEmail } = {}) {
  const contacts = await getCaregiverTelegramContacts({ caregiverId, caregiverEmail });
  const telegramTargets = Array.from(
    new Map(
      (contacts || [])
        .map((contact) => {
          const cachedTelegramChatId = getCachedCaregiverTelegramChatId(contact);
          const telegramChatId = String(contact?.telegramChatId || cachedTelegramChatId || '').trim();
          return [normalizeEmail(contact.caregiverEmail), { ...contact, telegramChatId }];
        })
        .filter(([email, contact]) => Boolean(email) && Boolean(String(contact?.telegramChatId || '').trim())),
    ).values(),
  );

  return telegramTargets;
}

function normalizeReminderValue(value = '') {
  return String(value || '').trim().toLowerCase();
}

function createCheckInReminder(body = {}) {
  const reminder = {
    id: `reminder-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    seniorUserId: String(body.seniorUserId || '').trim(),
    seniorProfileId: String(body.seniorProfileId || '').trim(),
    seniorName: String(body.seniorName || '').trim(),
    seniorPhone: String(body.seniorPhone || '').trim(),
    message: body.message || 'Please complete your check-in for today.',
    status: 'Reminder Sent',
    createdAt: new Date().toISOString(),
  };

  checkInReminders.unshift(reminder);
  checkInReminders.splice(50);
  return reminder;
}

function getCheckInRemindersForUser(uid) {
  const normalizedUid = normalizeReminderValue(uid);

  return checkInReminders
    .filter((reminder) => {
      return (
        normalizeReminderValue(reminder.seniorUserId) === normalizedUid ||
        normalizeReminderValue(reminder.seniorProfileId) === normalizedUid
      );
    })
    .map(({ id, message, status, createdAt }) => ({ id, message, status, createdAt }));
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function requireAuth(request) {
  const authHeader = request.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    throw Object.assign(new Error('Missing app session token'), { status: 401 });
  }
}

function normalizeEmail(value = '') {
  return String(value || '').trim().toLowerCase();
}

function createMfaCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getMfaTransporter() {
  const missing = [];

  if (!MFA_EMAIL_HOST) missing.push('MFA_EMAIL_HOST');
  if (!MFA_EMAIL_PORT) missing.push('MFA_EMAIL_PORT');
  if (!MFA_EMAIL_USER) missing.push('MFA_EMAIL_USER');
  if (!MFA_EMAIL_PASS) missing.push('MFA_EMAIL_PASS');
  if (!MFA_EMAIL_FROM) missing.push('MFA_EMAIL_FROM');

  if (missing.length > 0) {
    throw Object.assign(new Error(`MFA email is not configured. Missing: ${missing.join(', ')}`), {
      status: 503,
    });
  }

  if (!mfaMailer) {
    mfaMailer = nodemailer.createTransport({
      host: MFA_EMAIL_HOST,
      port: MFA_EMAIL_PORT,
      secure: MFA_EMAIL_SECURE,
      auth: {
        user: MFA_EMAIL_USER,
        pass: MFA_EMAIL_PASS,
      },
    });
  }

  return mfaMailer;
}

async function sendLoginMfaCodeEmail(email, code) {
  const transporter = getMfaTransporter();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw Object.assign(new Error('A valid email is required to deliver MFA code.'), { status: 400 });
  }

  await transporter.sendMail({
    from: MFA_EMAIL_FROM,
    to: normalizedEmail,
    subject: 'CareConnect login verification code',
    text: [
      'Your CareConnect login verification code is below:',
      '',
      `Code: ${code}`,
      'Expires in 10 minutes.',
      '',
      'If you did not attempt to log in, you can ignore this email.',
    ].join('\n'),
  });
}

async function sendCaregiverMissedCheckInEmail({ caregiverEmail, caregiverName, seniorName, windowLabel }) {
  const transporter = getMfaTransporter();
  const normalizedEmail = normalizeEmail(caregiverEmail);

  if (!normalizedEmail) {
    throw Object.assign(new Error('A valid caregiver email is required.'), { status: 400 });
  }

  await transporter.sendMail({
    from: MFA_EMAIL_FROM,
    to: normalizedEmail,
    subject: `CareConnect missed ${windowLabel} check-in alert`,
    text: [
      `Hello ${caregiverName || 'Caregiver'},`,
      '',
      `${seniorName || 'Your senior'} missed the ${windowLabel} check-in window.`,
      'Please check on them and acknowledge the alert in CareConnect.',
      '',
      `If there is no acknowledgment within ${Math.round(CAREGIVER_RESPONSIVENESS_THRESHOLD_MS / (60 * 1000))} minutes, AIC will be notified.`,
    ].join('\n'),
  });
}

async function sendCheckInReminderEmail({ seniorEmail, seniorName, message }) {
  const transporter = getMfaTransporter();
  const normalizedEmail = normalizeEmail(seniorEmail);

  if (!normalizedEmail) {
    return;
  }

  await transporter.sendMail({
    from: MFA_EMAIL_FROM,
    to: normalizedEmail,
    subject: 'CareConnect check-in reminder',
    text: [
      `Hello ${seniorName || 'Senior'},`,
      '',
      message || 'Please complete your check-in for today.',
      '',
      'Please open CareConnect and check in when you are able.',
    ].join('\n'),
  });
}

async function sendSosAlertEmail({ caregiverEmail, caregiverName, seniorName, location, message }) {
  const transporter = getMfaTransporter();
  const normalizedEmail = normalizeEmail(caregiverEmail);

  if (!normalizedEmail) {
    return;
  }

  await transporter.sendMail({
    from: MFA_EMAIL_FROM,
    to: normalizedEmail,
    subject: `CareConnect SOS alert for ${seniorName || 'Senior'}`,
    text: [
      `Hello ${caregiverName || 'Caregiver'},`,
      '',
      `An SOS alert was triggered for ${seniorName || 'a senior'}.`,
      message ? `Message: ${message}` : '',
      location ? `Location: ${location}` : '',
      '',
      'Please respond immediately and open CareConnect for details.',
    ].filter(Boolean).join('\n'),
  });
}

function formatTimeWith12Hour(timeStr = '') {
  const text = String(timeStr || '').trim();
  if (!text) return '';
  
  // Handle "HH:MM" format
  const timeMatch = /^(\d{2}):(\d{2})/.exec(text);
  if (!timeMatch) return text;
  
  let hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2];
  const period = hours >= 12 ? 'PM' : 'AM';
  
  if (hours === 0) {
    hours = 12; // 00:xx becomes 12:xx AM
  } else if (hours > 12) {
    hours -= 12; // 13:xx becomes 1:xx PM
  }
  
  return `${hours}:${minutes} ${period}`;
}

async function sendTelegramMessage(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('[Telegram] Bot token or chat ID not configured, skipping.');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Telegram API error: ${err}`);
  }
}

async function sendTelegramMessageToChatId(chatId, text) {
  const normalizedChatId = String(chatId || '').trim();

  if (!TELEGRAM_BOT_TOKEN || !normalizedChatId) {
    return false;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({ chat_id: normalizedChatId, text, parse_mode: 'HTML' });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Telegram API error: ${err}`);
  }

  return true;
}

async function sendTelegramMessageToCaregivers(caregiverContacts, text, label = 'notification') {
  const telegramTargets = Array.from(
    new Map(
      (caregiverContacts || [])
        .map((contact) => {
          const cachedTelegramChatId = getCachedCaregiverTelegramChatId(contact);
          const telegramChatId = String(contact?.telegramChatId || cachedTelegramChatId || '').trim();

          return [normalizeEmail(contact.caregiverEmail), { ...contact, telegramChatId }];
        })
        .filter(([email, contact]) => Boolean(email) && Boolean(String(contact?.telegramChatId || '').trim())),
    ).values(),
  );

  if (telegramTargets.length === 0) {
    console.warn(`[Telegram] No saved chat IDs found for ${label}.`);
    return;
  }

  await Promise.all(
    telegramTargets.map((contact) =>
      sendTelegramMessageToChatId(contact.telegramChatId, text).catch((error) => {
        console.error(
          `[Telegram] Failed to send ${label} to ${contact.caregiverEmail || contact.caregiverId || 'unknown'}:`,
          error.message,
        );
      }),
    ),
  );
}

async function sendTelegramTestNotification({ caregiverId, caregiverEmail, message }) {
  const telegramTargets = await resolveCaregiverTelegramChatIds({ caregiverId, caregiverEmail });

  if (telegramTargets.length === 0) {
    return { sent: 0, reason: 'No saved Telegram chat IDs found for this caregiver.' };
  }

  const results = await Promise.all(
    telegramTargets.map(async (contact) => {
      try {
        await sendTelegramMessageToChatId(contact.telegramChatId, message);
        return { ok: true, recipient: contact.caregiverEmail || contact.caregiverId || 'unknown' };
      } catch (error) {
        return {
          ok: false,
          recipient: contact.caregiverEmail || contact.caregiverId || 'unknown',
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }),
  );

  return {
    sent: results.filter((item) => item.ok).length,
    failed: results.filter((item) => !item.ok),
    total: results.length,
  };
}

async function getTelegramBotUsername() {
  if (telegramBotUsername) {
    return telegramBotUsername;
  }

  if (!TELEGRAM_BOT_TOKEN) {
    return '';
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.description || response.statusText || 'Unable to resolve Telegram bot username.');
  }

  telegramBotUsername = String(data?.result?.username || '').trim();
  return telegramBotUsername;
}

async function saveTelegramChatIdForCaregiver(caregiverId, telegramChatId) {
  const connections = await getCaregiverSeniorConnections({ caregiverId });

  if (!connections || connections.length === 0) {
    throw Object.assign(new Error('No caregiver connections found.'), { status: 404 });
  }

  const previousTelegramIds = Array.from(
    new Set(
      (connections || [])
        .map((connection) => String(connection?.telegramChatId || '').trim())
        .filter(Boolean),
    ),
  );

  await Promise.all(
    connections.map((connection) =>
      updateCaregiverConnection({
        connectionId: connection.connectionId,
        updateData: {
          u_telegram_chat_id: telegramChatId,
        },
      }),
    ),
  );

  rememberCaregiverTelegramChatId({
    caregiverId,
    telegramChatId,
  });

  return {
    updatedConnections: connections.length,
    hadExistingTelegram: previousTelegramIds.length > 0,
    previousTelegramIds,
  };
}

async function createTelegramSetupLink({ caregiverId, caregiverEmail }) {
  const normalizedCaregiverId = String(caregiverId || '').trim();
  const normalizedCaregiverEmail = String(caregiverEmail || '').trim();

  if (!normalizedCaregiverId && !normalizedCaregiverEmail) {
    throw Object.assign(new Error('Caregiver ID or email is required.'), { status: 400 });
  }

  const botUsername = await getTelegramBotUsername();

  if (!botUsername) {
    throw Object.assign(new Error('Telegram bot username is not configured. Check TELEGRAM_BOT_TOKEN.'), { status: 503 });
  }

  cleanupExpiredTelegramSetupLinks();

  const token = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  pendingTelegramSetupLinks.set(token, {
    caregiverId: normalizedCaregiverId,
    caregiverEmail: normalizedCaregiverEmail,
    expiresAt: Date.now() + TELEGRAM_SETUP_TOKEN_TTL_MS,
  });

  return {
    token,
    botUsername,
    setupUrl: `https://t.me/${botUsername}?start=setup_${token}`,
    expiresInMinutes: Math.round(TELEGRAM_SETUP_TOKEN_TTL_MS / (60 * 1000)),
  };
}

async function processTelegramSetupUpdates() {
  if (telegramSetupPollingInProgress) {
    return;
  }

  telegramSetupPollingInProgress = true;

  try {
    if (!TELEGRAM_BOT_TOKEN) {
      return;
    }

    cleanupExpiredTelegramSetupLinks();

    const params = new URLSearchParams({
      offset: String(telegramUpdatesOffset || 0),
      timeout: '0',
      allowed_updates: JSON.stringify(['message']),
    });

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?${params.toString()}`);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.description || response.statusText || 'Unable to fetch Telegram updates.');
    }

    for (const update of data?.result || []) {
      telegramUpdatesOffset = Math.max(telegramUpdatesOffset, Number(update.update_id || 0) + 1);

      const message = update.message;
      const text = String(message?.text || '').trim();

      if (!text || !/^\/start\b/i.test(text)) {
        continue;
      }

      const tokenMatch = /^\/start(?:\s+setup[_-]?([a-z0-9]+))?/i.exec(text);
      const token = normalizeTelegramSetupToken(tokenMatch?.[1] || '');

      if (!token || !pendingTelegramSetupLinks.has(token)) {
        continue;
      }

      const entry = pendingTelegramSetupLinks.get(token);

      if (!entry || entry.expiresAt <= Date.now()) {
        pendingTelegramSetupLinks.delete(token);
        continue;
      }

      const chatId = String(message?.chat?.id || '').trim();

      if (!chatId) {
        continue;
      }

      const saveResult = await saveTelegramChatIdForCaregiver(entry.caregiverId || entry.caregiverEmail, chatId);
      pendingTelegramSetupLinks.delete(token);

      if (!saveResult.hadExistingTelegram) {
        await sendTelegramMessageToChatId(
          chatId,
          '✅ <b>CareConnect connected</b>\n\nYour Telegram chat is now saved. You can return to CareConnect.'
        ).catch((error) => console.error('[Telegram] Failed to send setup confirmation:', error.message));
      }
    }
  } finally {
    telegramSetupPollingInProgress = false;
  }
}

async function sendAICAlert(text) {
  if (!AIC_TELEGRAM_BOT_TOKEN || !AIC_TELEGRAM_CHAT_ID) {
    console.warn('[AIC Alert] Bot token or chat ID not configured, skipping.');
    return;
  }

  const url = `https://api.telegram.org/bot${AIC_TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({ chat_id: AIC_TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('[AIC Alert] Failed to send alert:', err);
    throw new Error(`AIC Alert API error: ${err}`);
  }
}

async function sendAppointmentNotificationEmail(caregiverEmail, appointmentData) {
  const transporter = getMfaTransporter();
  const normalizedCaregiverEmail = normalizeEmail(caregiverEmail);
  const normalizedSeniorEmail = normalizeEmail(appointmentData.seniorEmail);

  if (!normalizedCaregiverEmail && !normalizedSeniorEmail) {
    throw Object.assign(new Error('A valid email is required to send appointment notification.'), { status: 400 });
  }

  const { seniorName, title, date, time, location, action } = appointmentData;
  const actionText = action === 'created' ? 'created' : action === 'updated' ? 'updated' : 'modified';
  const formattedTime = formatTimeWith12Hour(time);

  const caregiverBody = [
    `An appointment has been ${actionText} for ${seniorName}.`,
    '',
    `Appointment Title: ${title}`,
    `Date: ${date}`,
    `Time: ${formattedTime}`,
    location ? `Location: ${location}` : '',
    '',
    'Please log in to CareConnect to view more details.',
  ].filter(line => line !== '').join('\n');

  const seniorBody = [
    `Your appointment has been ${actionText}.`,
    '',
    `Appointment Title: ${title}`,
    `Date: ${date}`,
    `Time: ${formattedTime}`,
    location ? `Location: ${location}` : '',
    '',
    'Please log in to CareConnect to view more details.',
  ].filter(line => line !== '').join('\n');

  const sends = [];
  if (normalizedCaregiverEmail) {
    sends.push(transporter.sendMail({
      from: MFA_EMAIL_FROM,
      to: normalizedCaregiverEmail,
      subject: `Appointment ${actionText} - ${seniorName}`,
      text: caregiverBody,
    }));
  }
  if (normalizedSeniorEmail) {
    sends.push(transporter.sendMail({
      from: MFA_EMAIL_FROM,
      to: normalizedSeniorEmail,
      subject: `Your appointment has been ${actionText}`,
      text: seniorBody,
    }));
  }
  await Promise.all(sends);
}

async function sendAppointmentReminderEmail(caregiverEmail, seniorEmail, appointmentData) {
  const transporter = getMfaTransporter();
  const normalizedCaregiverEmail = normalizeEmail(caregiverEmail);
  const normalizedSeniorEmail = normalizeEmail(seniorEmail);

  const { seniorName, title, date, time, location } = appointmentData;
  const formattedTime = formatTimeWith12Hour(time);

  const caregiverBody = [
    `Reminder: An appointment is scheduled for tomorrow.`,
    '',
    `Senior: ${seniorName}`,
    `Appointment Title: ${title}`,
    `Date: ${date}`,
    `Time: ${formattedTime}`,
    location ? `Location: ${location}` : '',
    '',
    'Please log in to CareConnect for more details.',
  ].filter(line => line !== '').join('\n');

  const seniorBody = [
    `Reminder: You have an appointment tomorrow.`,
    '',
    `Appointment Title: ${title}`,
    `Date: ${date}`,
    `Time: ${formattedTime}`,
    location ? `Location: ${location}` : '',
    '',
    'Please log in to CareConnect for more details.',
  ].filter(line => line !== '').join('\n');

  const sends = [];
  if (normalizedCaregiverEmail) {
    sends.push(transporter.sendMail({
      from: MFA_EMAIL_FROM,
      to: normalizedCaregiverEmail,
      subject: `Reminder: Appointment tomorrow - ${seniorName}`,
      text: caregiverBody,
    }));
  }
  if (normalizedSeniorEmail) {
    sends.push(transporter.sendMail({
      from: MFA_EMAIL_FROM,
      to: normalizedSeniorEmail,
      subject: `Reminder: You have an appointment tomorrow`,
      text: seniorBody,
    }));
  }
  if (sends.length === 0) {
    throw Object.assign(new Error('No valid email addresses to send reminder to.'), { status: 400 });
  }
  await Promise.all(sends);
}

function parseTimeHHMM(timeStr) {
  const [hours, minutes] = String(timeStr || '').split(':').map(Number);
  return { hours: hours || 0, minutes: minutes || 0 };
}

function getCurrentCheckInWindow() {
  const now = new Date();
  // Convert to Singapore time
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: CHECK_IN_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const timeStr = formatter.format(now);
  const [hours, minutes] = timeStr.split(':').map(Number);
  const currentTimeInMinutes = hours * 60 + minutes;
  
  const morning = parseTimeHHMM(CHECK_IN_MORNING_START);
  const morningEnd = parseTimeHHMM(CHECK_IN_MORNING_END);
  const evening = parseTimeHHMM(CHECK_IN_EVENING_START);
  const eveningEnd = parseTimeHHMM(CHECK_IN_EVENING_END);
  
  const morningStartMins = morning.hours * 60 + morning.minutes;
  const morningEndMins = morningEnd.hours * 60 + morningEnd.minutes;
  const eveningStartMins = evening.hours * 60 + evening.minutes;
  const eveningEndMins = eveningEnd.hours * 60 + eveningEnd.minutes;
  
  if (currentTimeInMinutes >= morningStartMins && currentTimeInMinutes < morningEndMins) {
    return 'morning';
  } else if (currentTimeInMinutes >= eveningStartMins && currentTimeInMinutes <= eveningEndMins) {
    return 'evening';
  }
  return null;
}

function getCheckInWindowStatus(lastCheckInStr) {
  if (!lastCheckInStr) return null;
  
  const lastCheckIn = new Date(lastCheckInStr);
  const now = new Date();
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: CHECK_IN_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  const lastCheckInDate = formatter.format(lastCheckIn);
  const todayDate = formatter.format(now);
  
  if (lastCheckInDate === todayDate) {
    return 'checked-in-today';
  }
  return 'missed-today';
}

async function checkForMissedCheckIns() {
  try {
    const now = Date.now();
    const seniors = await searchSeniorProfiles({});
    
    if (!seniors || seniors.length === 0) {
      return;
    }
    
    console.log(`[Check-In Monitor] Checking ${seniors.length} seniors for missed check-ins`);
    
    const currentWindow = getCurrentCheckInWindow();
    if (!currentWindow) {
      console.log(`[Check-In Monitor] Outside check-in windows - skipping`);
      return;
    }
    
    for (const senior of seniors) {
      try {
        const seniorId = senior.id;
        const lastCheckInStr = senior.lastCheckInAt || '';
        
        // Skip if no check-in time available
        if (!lastCheckInStr) {
          continue;
        }
        
        const checkInStatus = getCheckInWindowStatus(lastCheckInStr);
        
        // If senior missed today's check-in (haven't checked in today during any window)
        if (checkInStatus === 'missed-today') {
          const alertRecord = missedCheckInAlerts.get(seniorId);
          
          // Check if this is a new missed check-in for this window
          if (!alertRecord || alertRecord.lastCheckInWindow !== currentWindow) {
            const caregiverContacts = await getCaregiverContactsForSenior({ seniorProfileId: seniorId });
            const caregiver = caregiverContacts && caregiverContacts.length > 0 ? caregiverContacts[0] : null;
            const caregiverId = caregiver?.caregiverId || 'unknown';
            const caregiverName = caregiver?.caregiverName || 'Caregiver';
            
            const seniorName = senior.name || 'Senior';

            const notificationMessage = 
              `📲 <b>Check-In Reminder</b>\n\n` +
              `Senior <b>${seniorName}</b> has not checked in during the ${currentWindow} window.\n\n` +
              `Please check on them or confirm they are safe.`;
            
            console.log(`[Check-In Monitor] Senior ${seniorId} (${seniorName}) missed ${currentWindow} check-in window - notifying caregiver ${caregiverId}`);

            const caregiverEmails = Array.from(
              new Map(
                caregiverContacts
                  .map((contact) => [normalizeEmail(contact.caregiverEmail), contact])
                  .filter(([email]) => Boolean(email)),
              ).values(),
            );

            if (caregiverEmails.length > 0) {
              await Promise.all(
                caregiverEmails.map((contact) =>
                  sendCaregiverMissedCheckInEmail({
                    caregiverEmail: contact.caregiverEmail,
                    caregiverName: contact.caregiverName || 'Caregiver',
                    seniorName,
                    windowLabel: currentWindow,
                  }),
                ),
              );
              console.log(
                `[Check-In Monitor] ✓ Caregiver email sent to ${caregiverEmails.map((contact) => contact.caregiverEmail).join(', ')} for senior ${seniorId}`,
              );
            } else {
              console.warn(`[Check-In Monitor] No caregiver email found for senior ${seniorId}; skipping caregiver email notification.`);
            }

            await sendTelegramMessageToCaregivers(caregiverContacts, notificationMessage, 'missed check-in alert');
            
            // Record the missed check-in alert and track caregiver notification
            missedCheckInAlerts.set(seniorId, {
              notifiedAt: now,
              seniorName,
              seniorId,
              caregiverId,
              caregiverEmail: caregiverEmails[0]?.caregiverEmail || '',
              lastCheckInWindow: currentWindow,
              message: notificationMessage,
              aicAlertSent: false,
            });
            
            // Clear any previous view tracking for this window
            caregiverNotificationViews.delete(seniorId);
          } else if (alertRecord) {
            // Check if caregiver has viewed the notification
            const viewed = caregiverNotificationViews.get(seniorId);
            const timeSinceNotification = now - alertRecord.notifiedAt;
            
            // If caregiver hasn't viewed AND threshold passed, alert AIC
            if (!viewed && !alertRecord.aicAlertSent && timeSinceNotification > CAREGIVER_RESPONSIVENESS_THRESHOLD_MS) {
              const seniorName = alertRecord.seniorName;
              const caregiverId = alertRecord.caregiverId;
              const minutesUnresponsive = Math.round(timeSinceNotification / (60 * 1000));
              
              const aicAlertMessage = 
                `⚠️ <b>UNRESPONSIVE CAREGIVER ALERT</b>\n\n` +
                `👤 Senior: ${seniorName}\n` +
                `🆔 Senior ID: ${seniorId}\n` +
                `👨‍⚕️ Caregiver ID: ${caregiverId}\n` +
                `📱 Issue: Senior missed ${alertRecord.lastCheckInWindow} check-in\n` +
                `⏱ Caregiver unresponsive for: ${minutesUnresponsive} minutes\n\n` +
                `<i>The caregiver has not acknowledged the missed check-in notification. Please take immediate action.</i>`;
              
              await sendAICAlert(aicAlertMessage)
                .then(() => {
                  console.log(`[Check-In Monitor] ✓ AIC alert sent for unresponsive caregiver ${caregiverId} (senior ${seniorId})`);
                  // Mark that we've sent the AIC alert so we don't spam
                  missedCheckInAlerts.get(seniorId).aicAlertSent = true;
                })
                .catch(err => {
                  console.error(`[Check-In Monitor] Failed to send AIC alert:`, err.message);
                });
            }
          }
        } else {
          // Senior checked in - clear any alerts
          if (missedCheckInAlerts.has(seniorId)) {
            missedCheckInAlerts.delete(seniorId);
            caregiverNotificationViews.delete(seniorId);
            console.log(`[Check-In Monitor] ✓ Senior ${seniorId} checked in - alert cleared`);
          }
        }
      } catch (err) {
        console.error('[Check-In Monitor] Error checking senior:', err.message);
      }
    }
  } catch (err) {
    console.error('[Check-In Monitor] Error in checkForMissedCheckIns:', err.message);
  }
}

async function checkAndSend24HourAppointmentReminders() {
  try {
    const now = new Date();
    // Calculate 24-hour window: appointments from now+23h to now+25h
    // FOR TESTING: You can adjust this window. For production use 23-25 hours.
    const window24hFrom = new Date(now.getTime() + 23 * 60 * 60 * 1000);
    const window24hTo = new Date(now.getTime() + 25 * 60 * 60 * 1000);
    
    const formatDateOnly = (d) => d.toISOString().split('T')[0];
    const formatTimeOnly = (d) => d.toISOString().split('T')[1].substring(0, 5); // HH:MM
    
    const startDate = formatDateOnly(window24hFrom);
    const endDate = formatDateOnly(window24hTo);
    const startTime = formatTimeOnly(window24hFrom);
    const endTime = formatTimeOnly(window24hTo);
    
    console.log('[Appointment Reminder] Checking for appointments between', startDate, startTime, 'and', endDate, endTime);
    
    // Fetch all upcoming appointments
    const appointments = await getUpcomingAppointmentsForReminder({ status: 'scheduled', limit: 500 });
    
    if (!appointments || appointments.length === 0) {
      console.log('[Appointment Reminder] No upcoming appointments found');
      return;
    }
    
    console.log(`[Appointment Reminder] Found ${appointments.length} upcoming appointments`);
    
    // Check each appointment to see if it falls in the 24-hour window
    for (const appointment of appointments) {
      try {
        const appointmentId = appointment.id;
        
        // Skip if already reminded
        if (appointmentReminders.has(appointmentId)) {
          console.log(`[Appointment Reminder] Skipping ${appointmentId} - already sent reminder`);
          continue;
        }
        
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}:00`);
        const timeDiffMs = appointmentDateTime.getTime() - now.getTime();
        const timeDiffHours = timeDiffMs / (60 * 60 * 1000);
        
        console.log(`[Appointment Reminder] Appointment ${appointmentId} (${appointment.title}) is in ${timeDiffHours.toFixed(1)} hours`);
        
        // Check if appointment is in the 23-25 hour window
        if (timeDiffHours >= 23 && timeDiffHours <= 25) {
          console.log(`[Appointment Reminder] SENDING reminder for appointment ${appointmentId} (${appointment.title}) - ${timeDiffHours.toFixed(1)} hours away`);
          
          const seniorName = appointment.seniorName || 'Senior';
          const formattedTime = formatTimeWith12Hour(appointment.time);

          await sendAppointmentReminderEmail(appointment.caregiverEmail, appointment.seniorEmail || '', {
            seniorName,
            title: appointment.title,
            date: appointment.date,
            time: appointment.time,
            location: appointment.location,
          });

          const caregiverContacts = await getCaregiverContactsForSenior({ seniorProfileId: appointment.seniorId }).catch(() => []);
          const ownerCaregiverId = String(appointment.caregiverId || '').trim();
          const ownerCaregiverEmail = normalizeEmail(appointment.caregiverEmail || '');
          const ownerOnlyContacts = caregiverContacts.filter((contact) => {
            const contactCaregiverId = String(contact?.caregiverId || '').trim();
            const contactCaregiverEmail = normalizeEmail(contact?.caregiverEmail || '');

            if (ownerCaregiverId && contactCaregiverId) {
              return contactCaregiverId === ownerCaregiverId;
            }

            if (ownerCaregiverEmail && contactCaregiverEmail) {
              return contactCaregiverEmail === ownerCaregiverEmail;
            }

            return false;
          });

          await sendTelegramMessageToCaregivers(
            ownerOnlyContacts,
            `⏰ <b>Appointment Reminder — Tomorrow</b>\n\n` +
              `👤 Senior: ${seniorName}\n` +
              `📋 Title: ${appointment.title}\n` +
              `🗓 Date: ${appointment.date}\n` +
              `🕐 Time: ${formattedTime}` +
              (appointment.location ? `\n📍 Location: ${appointment.location}` : ''),
            'appointment reminder',
          );

          // Mark as reminded
          appointmentReminders.add(appointmentId);
          console.log(`[Appointment Reminder] ✓ Successfully sent reminder for appointment ${appointmentId}`);
        }
      } catch (appointmentError) {
        console.error('[Appointment Reminder] Error processing appointment:', appointmentError);
      }
    }
    
    console.log('[Appointment Reminder] Check complete');
  } catch (error) {
    console.error('[Appointment Reminder] Error checking appointments:', error);
  }
}

async function checkForUnresponsiveSosAlerts() {
  try {
    const seniors = await searchSeniorProfiles({});

    if (!seniors || seniors.length === 0) {
      return;
    }

    for (const senior of seniors) {
      try {
        const activeAlert = await getLatestActiveSosAlertForSenior(senior);

        if (!activeAlert?.id) {
          escalatedSosAlerts.delete(senior.id);
          continue;
        }

        const createdAtMs = new Date(activeAlert.createdAt).getTime();

        if (Number.isNaN(createdAtMs)) {
          continue;
        }

        const ageMs = Date.now() - createdAtMs;

        if (ageMs < SOS_ALERT_ESCALATION_THRESHOLD_MS) {
          continue;
        }

        if (escalatedSosAlerts.has(activeAlert.id)) {
          continue;
        }

        const caregiverContacts = await getCaregiverContactsForSenior({ seniorProfileId: senior.id }).catch(() => []);
        const caregiverName = caregiverContacts[0]?.caregiverName || 'Caregiver';
        const caregiverEmail = caregiverContacts[0]?.caregiverEmail || '';
        const minutesUnresolved = Math.round(ageMs / (60 * 1000));
        const seniorName = senior.name || 'Senior';

        const aicAlertMessage = [
          '⚠️ <b>UNRESPONSIVE SOS ALERT</b>',
          '',
          `👤 Senior: ${seniorName}`,
          senior.id ? `🆔 Senior ID: ${senior.id}` : '',
          `📣 SOS message: ${activeAlert.message || 'SOS alert triggered'}`,
          activeAlert.location ? `📍 Location: ${activeAlert.location}` : '',
          caregiverName ? `👨‍⚕️ Primary caregiver: ${caregiverName}` : '',
          caregiverEmail ? `📧 Caregiver email: ${caregiverEmail}` : '',
          `⏱ Unresolved for: ${minutesUnresolved} minutes`,
          '',
          '<i>The SOS alert is still active and the caregiver has not responded. Please take immediate action.</i>',
        ].filter(Boolean).join('\n');

        await sendAICAlert(aicAlertMessage)
          .then(() => {
            escalatedSosAlerts.set(activeAlert.id, {
              seniorId: senior.id,
              escalatedAt: Date.now(),
            });
            console.log(`[SOS Monitor] ✓ AIC alert sent for unresolved SOS ${activeAlert.id} (senior ${senior.id})`);
          })
          .catch((err) => {
            console.error('[SOS Monitor] Failed to send AIC alert:', err.message);
          });
      } catch (err) {
        console.error('[SOS Monitor] Error checking senior SOS status:', err.message);
      }
    }
  } catch (err) {
    console.error('[SOS Monitor] Error in checkForUnresponsiveSosAlerts:', err.message);
  }
}

function getUidFromPath(pathname) {
  const match = pathname.match(/^\/api\/users\/([^/]+)(?:\/(points|check-in|check-in-reminders|game|profile|medicines|family-verification-codes|reward-history))?$/);
  return match ? { uid: decodeURIComponent(match[1]), action: match[2] || null } : null;
}

function shortenRoadName(value = '') {
  return String(value || '')
    .replace(/\bAvenue\b/gi, 'Ave')
    .replace(/\bStreet\b/gi, 'St')
    .replace(/\bRoad\b/gi, 'Rd')
    .replace(/\bDrive\b/gi, 'Dr')
    .replace(/\bCrescent\b/gi, 'Cres')
    .replace(/\bBoulevard\b/gi, 'Blvd')
    .replace(/\bSingapore\b/gi, 'SG')
    .replace(/\s+/g, ' ')
    .trim();
}

function joinUniqueAddressParts(parts) {
  const seen = new Set();

  return parts
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part) => {
      const normalized = part.toLowerCase();

      if (seen.has(normalized)) {
        return false;
      }

      seen.add(normalized);
      return true;
    })
    .join(', ');
}

function formatReadableAddress(data = {}) {
  const address = data.address || {};
  const building = address.building || address.amenity || address.office || address.shop || address.tourism || address.leisure || '';
  const streetAddress = [address.house_number, address.road].filter(Boolean).join(' ');
  const neighbourhood = address.neighbourhood || address.suburb || address.quarter || address.city_district || '';
  const city = address.city || address.town || address.village || address.state || '';
  const postcode = address.postcode || '';
  const country = address.country || '';
  const readableAddress = joinUniqueAddressParts([
    building,
    streetAddress,
    neighbourhood,
    city,
    postcode,
    country,
  ]);

  return readableAddress || String(data.display_name || '').trim();
}

async function reverseGeocode(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw Object.assign(new Error('Valid latitude and longitude are required.'), { status: 400 });
  }

  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lon),
    zoom: '18',
    addressdetails: '1',
  });
  const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?${params.toString()}`;
  const geocodeResponse = await fetch(reverseGeocodeUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'SeniorConnect SOS location lookup',
    },
  });
  const data = await geocodeResponse.json().catch(() => null);

  if (!geocodeResponse.ok) {
    throw Object.assign(new Error(data?.error || 'Unable to find address for this location.'), {
      status: geocodeResponse.status,
    });
  }

  return {
    address: formatReadableAddress(data),
  };
}

export async function handleRequest(request, response) {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === '/api/health') {
    sendJson(response, 200, { ok: true, login: getServiceNowLoginConfig() });
    return;
  }

  if (url.pathname === '/api/reverse-geocode' && request.method === 'GET') {
    const location = await reverseGeocode(
      url.searchParams.get('lat'),
      url.searchParams.get('lon'),
    );

    sendJson(response, 200, location);
    return;
  }

  if (url.pathname === '/api/login' && request.method === 'POST') {
    const body = await readJson(request);
    const user = await loginWithServiceNow({
      identifier: body.identifier,
      email: body.email,
      password: body.password,
      loginType: body.loginType,
    });
    sendJson(response, 200, { user, token: `servicenow:${user.id}` });
    return;
  }

  if (url.pathname === '/api/register' && request.method === 'POST') {
    const body = await readJson(request);
    const user = await registerWithServiceNow({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role || 'caregiver',
    });
    sendJson(response, 200, { user, token: `servicenow:${user.id}` });
    return;
  }

  if (url.pathname === '/api/register-family' && request.method === 'POST') {
    const body = await readJson(request);
    const user = await registerWithServiceNow({
      email: body.email,
      password: body.password,
      name: body.name,
      role: 'Family',
    });
    sendJson(response, 200, { user, token: `servicenow:${user.id}` });
    return;
  }

  if (url.pathname === '/api/forgot-password' && request.method === 'POST') {
    const body = await readJson(request);
    await resetPasswordWithServiceNow({
      identifier: body.identifier,
      password: body.password,
      loginType: body.loginType,
    });
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === '/api/mfa/request' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const caregiverId = String(body.caregiverId || '').trim();
    const email = normalizeEmail(body.email);

    if (!email) {
      sendJson(response, 400, { error: 'Email is required.' });
      return;
    }

    const code = createMfaCode();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    loginMfaCodes.set(email, { code, expiresAt });

    let telegramChatId = '';

    try {
      telegramChatId = getCachedCaregiverTelegramChatId({ caregiverId, caregiverEmail: email });

      if (telegramChatId) {
        console.log(`[Telegram] Using cached personal chat ID for ${email}`);
      }

      const connections = await getCaregiverTelegramContacts({ caregiverId, caregiverEmail: email });

      if (!telegramChatId) {
        telegramChatId = connections.find((connection) => String(connection.telegramChatId || '').trim())?.telegramChatId || '';
      }

      if (telegramChatId) {
        rememberCaregiverTelegramChatId({
          caregiverId,
          caregiverEmail: email,
          telegramChatId,
        });
      }
    } catch (error) {
      console.error('[Telegram] Unable to resolve per-user chat ID for MFA:', error instanceof Error ? error.message : error);
    }

    try {
      await sendLoginMfaCodeEmail(email, code);
    } catch (error) {
      console.error('Unable to send login MFA email:', error instanceof Error ? error.message : error);
      const rawMessage = String(error?.message || '');
      const friendlyMessage = /badcredentials|invalid login: 535|username and password not accepted/i.test(rawMessage)
        ? 'Unable to notify caregiver/volunteer by email. Please check SMTP app password settings.'
        : rawMessage || 'Unable to send verification code email.';

      if (process.env.NODE_ENV !== 'production') {
        sendJson(response, 200, {
          ok: true,
          delivery: 'in-app-notification',
          code,
          warning: friendlyMessage,
        });
        return;
      }

      sendJson(response, error.status || 502, {
        error: friendlyMessage,
      });
      return;
    }

    if (telegramChatId) {
      sendTelegramMessageToChatId(
        telegramChatId,
        `🔐 <b>CareConnect Login Code</b>\n\n` +
        `Your verification code is:\n\n` +
        `<b>${code}</b>\n\n` +
        `Expires in 10 minutes.\n` +
        `If you did not attempt to log in, ignore this message.`
      ).catch((err) => console.error('[Telegram] Failed to send MFA code:', err));
    } else {
      console.warn(`[Telegram] No personal Telegram chat ID found for ${email}; MFA will be delivered by email only.`);
    }

    sendJson(response, 200, { ok: true, delivery: 'email' });
    return;
  }

  if (url.pathname === '/api/mfa/verify' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const email = normalizeEmail(body.email);
    const code = String(body.code || '').trim();
    const saved = loginMfaCodes.get(email);

    if (!email || !code) {
      sendJson(response, 400, { error: 'Email and code are required.' });
      return;
    }

    if (!saved) {
      sendJson(response, 404, { error: 'No pending verification found. Please request a new code.' });
      return;
    }

    if (saved.expiresAt < Date.now()) {
      loginMfaCodes.delete(email);
      sendJson(response, 410, { error: 'Verification code has expired. Please request a new code.' });
      return;
    }

    if (saved.code !== code) {
      sendJson(response, 401, { error: 'Incorrect verification code. Please try again.' });
      return;
    }

    loginMfaCodes.delete(email);
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === '/api/servicenow/sos-alert' && request.method === 'POST') {
    const body = await readJson(request);
    const alert = await createSosAlert({
      location: body.location,
      message: body.message,
      seniorName: body.seniorName,
      seniorPhone: body.seniorPhone,
      status: body.status,
    });

    if (body.seniorProfileId) {
      try {
        const caregiverContacts = await getCaregiverContactsForSenior({ seniorProfileId: body.seniorProfileId });
        const uniqueContacts = Array.from(
          new Map(
            caregiverContacts
              .map((contact) => [normalizeEmail(contact.caregiverEmail), contact])
              .filter(([email]) => Boolean(email)),
          ).values(),
        );

        await Promise.all(
          uniqueContacts.map((contact) =>
            sendSosAlertEmail({
              caregiverEmail: contact.caregiverEmail,
              caregiverName: contact.caregiverName || 'Caregiver',
              seniorName: body.seniorName,
              location: body.location,
              message: body.message,
            }),
          ),
        );

        await sendTelegramMessageToCaregivers(
          uniqueContacts,
          `🚨 <b>SOS Alert</b>\n\n` +
            `Senior <b>${body.seniorName || 'Senior'}</b> triggered an SOS alert.\n\n` +
            `${body.location ? `📍 Location: ${body.location}\n` : ''}` +
            `${body.message ? `📝 Message: ${body.message}\n` : ''}` +
            `Please respond immediately.`,
          'SOS alert',
        );
      } catch (error) {
        console.error('[SOS Alert] Failed to send email notification:', error.message);
      }
    }

    sendJson(response, 200, { alert });
    return;
  }

  if (url.pathname === '/api/servicenow/sos-alert' && request.method === 'PATCH') {
    const body = await readJson(request);
    const alert = await updateSosAlertStatus({
      alertId: body.alertId,
      status: body.status,
    });

    if (alert?.id) {
      escalatedSosAlerts.delete(alert.id);
    }

    sendJson(response, 200, { alert });
    return;
  }

  if (url.pathname === '/api/servicenow/sos-alert-history' && request.method === 'GET') {
    const history = await getSosAlertHistory({
      limit: url.searchParams.get('limit'),
    });

    sendJson(response, 200, { history });
    return;
  }

  if (url.pathname === '/api/caregiver/acknowledge-check-in' && request.method === 'POST') {
    const body = await readJson(request);
    const seniorId = String(body.seniorId || '').trim();
    const caregiverId = String(body.caregiverId || '').trim();

    if (!seniorId || !caregiverId) {
      sendJson(response, 400, { error: 'Missing seniorId or caregiverId' });
      return;
    }

    // Mark the notification as viewed
    caregiverNotificationViews.set(seniorId, {
      viewedAt: Date.now(),
      caregiverId,
    });

    console.log(`[Check-In Monitor] ✓ Caregiver ${caregiverId} acknowledged missed check-in for senior ${seniorId}`);

    sendJson(response, 200, { success: true, message: 'Acknowledgment recorded' });
    return;
  }

  if (url.pathname === '/api/caregiver/telegram-id' && request.method === 'GET') {
    const caregiverId = url.searchParams.get('caregiverId');
    const caregiverEmail = url.searchParams.get('caregiverEmail');

    if (!caregiverId && !caregiverEmail) {
      sendJson(response, 400, { error: 'Missing caregiverId' });
      return;
    }

    try {
      const cachedTelegramId = getCachedCaregiverTelegramChatId({ caregiverId, caregiverEmail });

      if (cachedTelegramId) {
        sendJson(response, 200, { telegramId: cachedTelegramId });
        return;
      }

      const connections = await getCaregiverSeniorConnections({ caregiverId });
      const telegramId = connections && connections.length > 0 ? connections[0].telegramChatId : null;

      if (telegramId) {
        rememberCaregiverTelegramChatId({
          caregiverId,
          caregiverEmail,
          telegramChatId: telegramId,
        });
      }

      sendJson(response, 200, { telegramId });
      return;
    } catch (err) {
      console.error('[Caregiver] Error fetching Telegram ID:', err.message);
      sendJson(response, 500, { error: 'Failed to fetch Telegram ID' });
      return;
    }
  }

  if (url.pathname === '/api/caregiver/telegram-id' && request.method === 'POST') {
    const body = await readJson(request);
    const caregiverId = String(body.caregiverId || '').trim();
    const caregiverEmail = String(body.caregiverEmail || '').trim();
    const telegramId = String(body.telegramId || '').trim();

    if (!caregiverId || !telegramId) {
      sendJson(response, 400, { error: 'Missing caregiverId or telegramId' });
      return;
    }

    try {
      const saveResult = await saveTelegramChatIdForCaregiver(caregiverId, telegramId);
      rememberCaregiverTelegramChatId({ caregiverId, caregiverEmail, telegramChatId: telegramId });
      console.log(`[Caregiver] ✓ Telegram ID updated for caregiver ${caregiverId}: ${telegramId}`);

      if (!saveResult.hadExistingTelegram) {
        await sendTelegramMessageToChatId(
          telegramId,
          '✅ <b>CareConnect connected</b>\n\nYour Telegram chat is now saved. You will start receiving caregiver notifications here.'
        ).catch((error) => console.error('[Caregiver] Failed to send first-time Telegram setup message:', error.message));
      }

      sendJson(response, 200, {
        success: true,
        message: 'Telegram ID saved',
        telegramId,
        firstTimeSetup: !saveResult.hadExistingTelegram,
      });
      return;
    } catch (err) {
      console.error('[Caregiver] Error updating Telegram ID:', err.message);
      sendJson(response, 500, { error: 'Failed to save Telegram ID' });
      return;
    }
  }

  if (url.pathname === '/api/caregiver/telegram-setup' && request.method === 'POST') {
    const body = await readJson(request);
    const caregiverId = String(body.caregiverId || '').trim();
    const caregiverEmail = String(body.caregiverEmail || '').trim();

    try {
      const setup = await createTelegramSetupLink({ caregiverId, caregiverEmail });
      sendJson(response, 200, {
        success: true,
        ...setup,
      });
      return;
    } catch (err) {
      console.error('[Caregiver] Error creating Telegram setup link:', err.message);
      sendJson(response, err.status || 500, { error: err.message || 'Failed to create Telegram setup link' });
      return;
    }
  }

  if (url.pathname === '/api/caregiver/telegram-test' && request.method === 'POST') {
    const body = await readJson(request);
    const caregiverId = String(body.caregiverId || '').trim();
    const caregiverEmail = String(body.caregiverEmail || '').trim();

    if (!caregiverId && !caregiverEmail) {
      sendJson(response, 400, { error: 'Missing caregiverId or caregiverEmail' });
      return;
    }

    const testMessage =
      String(body.message || '').trim() ||
      `🧪 <b>CareConnect Telegram Test</b>\n\nIf you can read this, your personal bot notifications are connected.`;

    try {
      const result = await sendTelegramTestNotification({ caregiverId, caregiverEmail, message: testMessage });

      if (!result.sent) {
        sendJson(response, 404, { success: false, ...result });
        return;
      }

      sendJson(response, 200, { success: true, ...result });
      return;
    } catch (error) {
      sendJson(response, 500, {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send Telegram test notification',
      });
      return;
    }
  }

  if (url.pathname === '/api/check-in-reminders' && request.method === 'POST') {
    const body = await readJson(request);
    const reminder = createCheckInReminder(body);

    try {
      await sendCheckInReminderEmail({
        seniorEmail: body.seniorEmail,
        seniorName: body.seniorName,
        message: body.message,
      });
    } catch (error) {
      console.error('[Check-In Reminder] Failed to send reminder email:', error.message);
    }

    sendJson(response, 200, { reminder });
    return;
  }

  if (url.pathname === '/api/servicenow/connect-senior' && request.method === 'POST') {
    const body = await readJson(request);
    const connection = await createCaregiverConnection({
      caregiverId: body.caregiverId,
      caregiverName: body.caregiverName,
      caregiverEmail: body.caregiverEmail,
      caregiverUsername: body.caregiverUsername,
      seniorId: body.seniorId,
      seniorUserId: body.seniorUserId,
      seniorUsername: body.seniorUsername,
      seniorName: body.seniorName,
      seniorPhone: body.seniorPhone,
      seniorEmail: body.seniorEmail,
      relationship: body.relationship,
    });

    sendJson(response, 200, { connection });
    return;
  }

  if (url.pathname === '/api/servicenow/caregiver-senior' && request.method === 'DELETE') {
    const body = await readJson(request);
    const deletedConnection = await deleteCaregiverConnection({
      connectionId: body.connectionId,
      caregiverId: body.caregiverId,
      caregiverEmail: body.caregiverEmail,
    });

    sendJson(response, 200, { connection: deletedConnection });
    return;
  }

  if (url.pathname === '/api/servicenow/family-verification/start' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const result = await createFamilyVerification({
      seniorId: body.seniorId,
      familyEmail: body.familyEmail,
      familyUserId: body.familyUserId,
    });

    sendJson(response, 200, result);
    return;
  }

  if (url.pathname === '/api/servicenow/family-verification/verify' && request.method === 'POST') {
    requireAuth(request);
    const body = await readJson(request);
    const result = await verifyFamilyVerification({
      verificationId: body.verificationId,
      seniorId: body.seniorId,
      familyEmail: body.familyEmail,
      familyUserId: body.familyUserId,
      code: body.code,
      relationship: body.relationship,
    });

    sendJson(response, 200, result);
    return;
  }

  if (url.pathname === '/api/servicenow/caregiver-seniors' && request.method === 'GET') {
    const seniors = await getCaregiverSeniorConnections({
      caregiverId: url.searchParams.get('caregiverId'),
      caregiverEmail: url.searchParams.get('caregiverEmail'),
      searchName: url.searchParams.get('searchName'),
      phone: url.searchParams.get('phone'),
    });

    sendJson(response, 200, { seniors });
    return;
  }

  if (url.pathname === '/api/servicenow/appointments' && request.method === 'GET') {
    const seniorUserId = url.searchParams.get('seniorUserId');
    const appointments = seniorUserId
      ? await getAppointmentsForSenior({
          seniorUserId,
          seniorEmail: url.searchParams.get('seniorEmail'),
          limit: url.searchParams.get('limit'),
        })
      : await getAppointmentsForCaregiver({
          caregiverId: url.searchParams.get('caregiverId'),
          caregiverEmail: url.searchParams.get('caregiverEmail'),
          limit: url.searchParams.get('limit'),
        });

    sendJson(response, 200, { appointments });
    return;
  }

  if (url.pathname === '/api/servicenow/appointments' && request.method === 'POST') {
    const body = await readJson(request);
    const appointment = await createAppointmentForCaregiver({
      caregiverId: body.caregiverId,
      caregiverEmail: body.caregiverEmail,
      seniorId: body.seniorId,
      title: body.title,
      date: body.date,
      time: body.time,
      location: body.location,
      notes: body.notes,
      status: body.status,
    });

    // Send appointment creation notification (email + Telegram) to caregiver and senior
    try {
      const seniorName = body.seniorName || 'Senior';
      const formattedTime = formatTimeWith12Hour(body.time);
      await sendAppointmentNotificationEmail(body.caregiverEmail, {
        seniorName,
        seniorEmail: body.seniorEmail || '',
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        action: 'created',
      });
      console.log('[Appointment] Notification emails sent for new appointment:', appointment.id);
    } catch (emailError) {
      console.error('[Appointment] Failed to send notification email:', emailError);
    }

    try {
      const seniorName = body.seniorName || 'Senior';
      const formattedTime = formatTimeWith12Hour(body.time);
      const caregiverContacts = await getCaregiverTelegramContacts({
        caregiverId: body.caregiverId,
        caregiverEmail: body.caregiverEmail,
      });

      await sendTelegramMessageToCaregivers(
        caregiverContacts,
        `📅 <b>New Appointment Created</b>\n\n` +
          `👤 Senior: ${seniorName}\n` +
          `📋 Title: ${body.title}\n` +
          `🗓 Date: ${body.date}\n` +
          `🕐 Time: ${formattedTime}` +
          (body.location ? `\n📍 Location: ${body.location}` : ''),
        'appointment created',
      );
      console.log('[Appointment] Telegram notification sent for new appointment:', appointment.id);
    } catch (telegramError) {
      console.error('[Appointment] Failed to send Telegram notification:', telegramError);
    }

    sendJson(response, 200, { appointment });
    return;
  }

  if (url.pathname === '/api/servicenow/appointments' && request.method === 'PATCH') {
    const body = await readJson(request);
    const appointment = await updateAppointmentForCaregiver({
      appointmentId: body.appointmentId,
      caregiverId: body.caregiverId,
      caregiverEmail: body.caregiverEmail,
      seniorId: body.seniorId,
      title: body.title,
      date: body.date,
      time: body.time,
      location: body.location,
      notes: body.notes,
      status: body.status,
    });

    sendJson(response, 200, { appointment });
    return;
  }

  if (url.pathname === '/api/servicenow/appointments' && request.method === 'DELETE') {
    const body = await readJson(request);
    const appointment = await deleteAppointmentForCaregiver({
      appointmentId: body.appointmentId,
      caregiverId: body.caregiverId,
      caregiverEmail: body.caregiverEmail,
    });

    sendJson(response, 200, { appointment });
    return;
  }

  if (url.pathname === '/api/servicenow/appointments/notify' && request.method === 'POST') {
    try {
      const body = await readJson(request);
      const seniorName = body.seniorName || 'Senior';
      const formattedTime = formatTimeWith12Hour(body.time);

      // Email to caregiver + senior
      await sendAppointmentNotificationEmail(body.caregiverEmail, {
        seniorName,
        seniorEmail: body.seniorEmail || '',
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        action: body.action,
      });

      // Telegram notification
      const actionText = body.action === 'created' ? 'New Appointment Created 📅' : 'Appointment Updated 📝';
      const caregiverContacts = await getCaregiverTelegramContacts({
        caregiverId: body.caregiverId,
        caregiverEmail: body.caregiverEmail,
      });

      await sendTelegramMessageToCaregivers(
        caregiverContacts,
        `<b>${actionText}</b>\n\n` +
          `👤 Senior: ${seniorName}\n` +
          `📋 Title: ${body.title}\n` +
          `🗓 Date: ${body.date}\n` +
          `🕐 Time: ${formattedTime}` +
          (body.location ? `\n📍 Location: ${body.location}` : ''),
        'appointment notification',
      );

      sendJson(response, 200, { success: true, message: 'Appointment notification sent.' });
    } catch (error) {
      console.error('Failed to send appointment notification:', error);
      sendJson(response, error.status || 500, {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send appointment notification.',
      });
    }
    return;
  }

  // Live Sensors panel (Senior_stuff pipeline) — sensor snapshot + 15-min
  // vitals history. NOTE: the pre-2026-07-09 admin-seniors/admin-senior
  // routes were dropped here — upstream removed getAllSeniorProfiles/
  // deleteSeniorProfile from servicenow.mjs in the same pull that deleted
  // AdminDashboardScreen.tsx, so those routes would ReferenceError.
  if (url.pathname === '/api/servicenow/sensor-status' && request.method === 'GET') {
    const status = await getSensorActivitySnapshot();
    sendJson(response, 200, { status });
    return;
  }

  if (url.pathname === '/api/servicenow/vitals-history' && request.method === 'GET') {
    const history = await getVitalsHistory();
    sendJson(response, 200, { history });
    return;
  }

  if (url.pathname === '/api/servicenow/seniors-search' && request.method === 'GET') {
    const seniors = await searchSeniorProfiles({
      searchName: url.searchParams.get('searchName'),
      phone: url.searchParams.get('phone'),
    });

    sendJson(response, 200, { seniors });
    return;
  }

  const route = getUidFromPath(url.pathname);

  if (!route) {
    sendJson(response, 404, { error: 'Not found' });
    return;
  }

  requireAuth(request);

  if (request.method === 'GET' && route.action === 'points') {
    const user = await getUserById(route.uid);
    sendJson(response, 200, { points: user?.points || 0, user });
    return;
  }

  if (request.method === 'POST' && route.action === 'points') {
    const body = await readJson(request);
    const result = await redeemUserPoints({
      userId: route.uid,
      email: body.email,
      name: body.name,
      pointsToRedeem: body.pointsToRedeem,
      rewardTitle: body.rewardTitle,
    });
    sendJson(response, 200, { points: result.user.points, user: result.user, redemption: result.redemption });
    return;
  }

  if (request.method === 'GET' && route.action === 'reward-history') {
    const rewardHistory = await getRewardRedemptionsForUser(route.uid);
    sendJson(response, 200, { rewardHistory });
    return;
  }

  if (request.method === 'GET' && route.action === 'profile') {
    const user = await getUserById(route.uid);
    sendJson(response, 200, { user });
    return;
  }

  if (request.method === 'GET' && route.action === 'medicines') {
    const medicines = await getMedicinesForUser(route.uid);
    sendJson(response, 200, { medicines });
    return;
  }

  if (request.method === 'GET' && route.action === 'family-verification-codes') {
    const verifications = await getPendingFamilyVerificationCodesForSenior(route.uid);
    sendJson(response, 200, { verifications });
    return;
  }

  if (request.method === 'GET' && route.action === 'check-in-reminders') {
    const reminders = getCheckInRemindersForUser(route.uid);
    sendJson(response, 200, { reminders });
    return;
  }

  if ((request.method === 'POST' || request.method === 'PATCH') && route.action === 'medicines') {
    const body = await readJson(request);
    const medicine = await saveMedicineForUser(route.uid, body);
    sendJson(response, 200, { medicine });
    return;
  }

  if (request.method === 'DELETE' && route.action === 'medicines') {
    const body = await readJson(request);
    const deletedMedicine = await deleteMedicineForUser(route.uid, body.id);
    sendJson(response, 200, { medicine: deletedMedicine });
    return;
  }

  if (request.method === 'POST' && route.action === 'check-in') {
    const body = await readJson(request);
    const user = await addCheckInPoints({
      userId: route.uid,
      email: body.email,
      name: body.name,
      pointsToAdd: 5,
    });
    sendJson(response, 200, { points: user.points, user });
    return;
  }

  if (request.method === 'POST' && route.action === 'game') {
    const body = await readJson(request);
    const user = await addGamePoint({
      userId: route.uid,
      email: body.email,
      name: body.name,
      pointsToAdd: 5,
    });
    sendJson(response, 200, { points: user.points, user });
    return;
  }

  if (request.method === 'PATCH' && route.action === 'profile') {
    const body = await readJson(request);
    const user = await upsertUserProfile({
      userId: route.uid,
      email: body.email,
      name: body.name,
      phone: body.phone,
      locationZones: body.locationZones,
      address: body.address,
    });
    sendJson(response, 200, { user });
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed' });
}

export function handleRequestWithErrors(request, response) {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    sendJson(response, error.status || 500, {
      error: error.message || 'Unexpected server error',
      details: error.details,
    });
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = http.createServer(handleRequestWithErrors);

  server.listen(PORT, () => {
    console.log(`ServiceNow API server running at http://localhost:${PORT}`);
  });

  // Verify Telegram config on startup
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    console.log(`[Telegram] Configured — bot token ends in ...${TELEGRAM_BOT_TOKEN.slice(-6)}, chat ID: ${TELEGRAM_CHAT_ID}`);
    console.log('[Telegram] Startup broadcast disabled. Use the manual test endpoint when needed.');
  } else {
    console.warn('[Telegram] NOT configured — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in .env');
  }

  // Verify AIC Alert Bot config on startup
  if (AIC_TELEGRAM_BOT_TOKEN && AIC_TELEGRAM_CHAT_ID) {
    console.log(`[AIC Alert] Configured — bot token ends in ...${AIC_TELEGRAM_BOT_TOKEN.slice(-6)}, chat ID: ${AIC_TELEGRAM_CHAT_ID}`);
    console.log('[AIC Alert] Startup broadcast disabled. Runtime alert monitoring remains active.');
  } else {
    console.warn('[AIC Alert] NOT configured — AIC_TELEGRAM_BOT_TOKEN or AIC_TELEGRAM_CHAT_ID missing in .env');
  }

  // Start check-in monitoring scheduler - runs every 2 minutes
  setInterval(checkForMissedCheckIns, 2 * 60 * 1000);
  // Run immediately on startup
  checkForMissedCheckIns();

  // Start appointment reminder scheduler - runs every 30 minutes
  setInterval(checkAndSend24HourAppointmentReminders, 30 * 60 * 1000);
  // Run immediately on startup
  checkAndSend24HourAppointmentReminders();

  // Start Telegram setup polling - captures /start setup_<token> messages from users
  setInterval(() => {
    processTelegramSetupUpdates().catch((error) => {
      console.error('[Telegram Setup] Polling failed:', error.message);
    });
  }, 1000);
  processTelegramSetupUpdates().catch((error) => {
    console.error('[Telegram Setup] Initial poll failed:', error.message);
  });

  // Start SOS escalation scheduler - runs every 2 minutes
  setInterval(checkForUnresponsiveSosAlerts, 2 * 60 * 1000);
  // Run immediately on startup
  checkForUnresponsiveSosAlerts();
}
