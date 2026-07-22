import {
  Activity,
  ArrowLeft,
  Bath,
  Bed,
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
  Handshake,
  HelpCircle,
  Info,
  Filter,
  Languages,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Pill,
  Pencil,
  Plus,
  Search,
  ShieldAlert,
  Shield,
  Sofa,
  Trash2,
  TriangleAlert,
  User,
  Video,
  Wind,
  X,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getStoredUser } from '../services/backend';
import { useLiveVitals, type LiveRoomState, type VitalPoint } from '../hooks/useLiveVitals';
import {
  createCaregiverAppointment,
  deleteCaregiverAppointment,
  getCaregiverAppointments,
  getSensorStatus,
  updateCaregiverAppointment,
  getVitalsHistory,
  type CaregiverAppointmentInput,
  type CaregiverAppointment,
  type RoomOccupancy,
  type SensorStatus,
  type SensorTrendPoint,
  type VitalsHistory,
} from '../services/serviceNow';

const SENSOR_STATUS_REFRESH_MS = 30000;

const CAREGIVER_PERSONAL_INFO_KEY = 'careconnect.caregiverPersonalInfo';
const CAREGIVER_PROFILE_IMAGE_KEY = 'careconnect.caregiverProfileImage';
const CAREGIVER_APPOINTMENT_REMINDER_ACK_KEY = 'careconnect.caregiverAppointmentReminderAck';
const CAREGIVER_TELEGRAM_ID_KEY = 'careconnect.caregiverTelegramId';
const CAREGIVER_TELEGRAM_AUTO_OPEN_KEY = 'careconnect.telegramAutoOpen';
const CAREGIVER_DASHBOARD_REFRESH_MS = 5000;

type SosAlertHistory = {
  id: string;
  seniorName: string;
  status: string;
  location?: string;
  message?: string;
  alertTime?: string;
  resolvedAt: string;
};

type Senior = {
  id: string;
  connectionId?: string;
  userId?: string;
  name: string;
  phone: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  location?: string;
  address?: string;
  lastCheckIn?: string;
  medicationStatus?: string;
  medicationTakenAt?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  currentMedication?: string;
  points?: number;
  relationship?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  caregiverNames?: string[];
  caregiverName?: string;
  caregiverEmail?: string;
  status?: string;
  alertId?: string;
  alertMessage?: string;
  alertStatus?: string;
  alertTime?: string;
};

type SeniorDetailsInput = {
  name: string;
  phone: string;
  email: string;
  location: string;
  address: string;
};

type HealthBuddyAppointment = CaregiverAppointment;

type HealthBuddyAppointmentInput = {
  seniorId: string;
  seniorName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  notes: string;
};

function getSosHistoryKey(caregiverEmail: string) {
  return `careconnect.sosHistory.${caregiverEmail.trim().toLowerCase() || 'unknown'}`;
}

function getStoredSosHistory(caregiverEmail: string) {
  const rawHistory = localStorage.getItem(getSosHistoryKey(caregiverEmail));

  if (!rawHistory) {
    return [];
  }

  try {
    return (JSON.parse(rawHistory) as SosAlertHistory[]).filter((item) => !isCheckInReminderAlert(item));
  } catch {
    localStorage.removeItem(getSosHistoryKey(caregiverEmail));
    return [];
  }
}

function saveSosHistory(caregiverEmail: string, history: SosAlertHistory[]) {
  localStorage.setItem(getSosHistoryKey(caregiverEmail), JSON.stringify(history.filter((item) => !isCheckInReminderAlert(item))));
}

function getSingaporeDateKey(value: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${map.year}-${map.month}-${map.day}`;
}

function getAppointmentReminderAckKey(caregiverIdentity: string, reminderDate: string) {
  return `${CAREGIVER_APPOINTMENT_REMINDER_ACK_KEY}.${caregiverIdentity.trim().toLowerCase() || 'unknown'}.${reminderDate}`;
}

function getCaregiverTelegramStorageKey(caregiverIdentity: string) {
  return `${CAREGIVER_TELEGRAM_ID_KEY}.${String(caregiverIdentity || '').trim().toLowerCase() || 'unknown'}`;
}

function getAppointmentDateTime(appointment: Pick<HealthBuddyAppointment, 'date' | 'time'>) {
  if (!appointment.date) {
    return null;
  }

  const normalizedTime = appointment.time.length === 5 ? `${appointment.time}:00` : appointment.time;
  // Parse time without timezone (treat as Singapore time)
  // Then when formatted with timeZone: 'Asia/Singapore', it will display correctly
  const parsedDate = new Date(`${appointment.date}T${normalizedTime}`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function formatAppointmentDateTime(date: Date | null) {
  if (!date) {
    return 'Not scheduled';
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function formatAppointmentDateOnly(value = '') {
  const text = String(value || '').trim();

  if (!text) {
    return 'Not set';
  }

  const date = new Date(`${text}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return text;
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function formatAppointmentTimeOnly(value = '') {
  const text = String(value || '').trim();

  if (!text) {
    return 'Not set';
  }

  const timeMatch = /^(\d{2}:\d{2}(?::\d{2})?)$/.exec(text);

  if (!timeMatch) {
    return text;
  }

  // Parse time string directly without creating a Date object
  // Just extract hours and minutes and format them
  const parts = timeMatch[1].split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  
  // Format as HH:MM with proper AM/PM
  if (hours === 0) {
    return `12:${String(minutes).padStart(2, '0')} AM`;
  } else if (hours < 12) {
    return `${hours}:${String(minutes).padStart(2, '0')} AM`;
  } else if (hours === 12) {
    return `12:${String(minutes).padStart(2, '0')} PM`;
  } else {
    return `${hours - 12}:${String(minutes).padStart(2, '0')} PM`;
  }
}

function resolveAppointmentSeniorName(appointment: HealthBuddyAppointment, seniors: Senior[]) {
  const appointmentSeniorId = String(appointment.seniorId || '').trim();

  const linkedSenior = seniors.find((senior) => {
    const candidates = [senior.id, senior.userId, senior.connectionId]
      .map((candidate) => String(candidate || '').trim())
      .filter(Boolean);

    return candidates.includes(appointmentSeniorId);
  });

  if (linkedSenior?.name?.trim()) {
    return linkedSenior.name.trim();
  }

  const appointmentSeniorName = String(appointment.seniorName || '').trim();

  if (/^[a-f0-9]{32}$/i.test(appointmentSeniorName)) {
    return 'Senior';
  }

  return appointmentSeniorName || 'Senior';
}

function getAppointmentCategory(appointment: HealthBuddyAppointment) {
  const source = [appointment.title, appointment.notes].join(' ').toLowerCase();

  if (/therapy|physio|rehab/.test(source)) {
    return 'therapy';
  }

  if (/vaccine|vaccination|booster|immuni/.test(source)) {
    return 'vaccination';
  }

  if (/community|activity|social|club|event/.test(source)) {
    return 'community';
  }

  return 'medical';
}

function getAppointmentCategoryLabel(category: 'medical' | 'therapy' | 'vaccination' | 'community', t: (key: string) => string) {
  const labelByCategory = {
    medical: t('appointmentCategoryMedical'),
    therapy: t('appointmentCategoryTherapy'),
    vaccination: t('appointmentCategoryVaccination'),
    community: t('appointmentCategoryCommunity'),
  };

  return labelByCategory[category];
}

function getTransportReminderLabel(appointmentDate: Date | null, t: (key: string) => string) {
  if (!appointmentDate) {
    return t('transportReminderPlanAhead');
  }

  const hoursUntil = (appointmentDate.getTime() - Date.now()) / (1000 * 60 * 60);

  if (hoursUntil <= 0) {
    return t('transportReminderDepartSoon');
  }

  if (hoursUntil <= 24) {
    return t('transportReminderWithinDay');
  }

  return t('transportReminderPlanAhead');
}

function areAppointmentsEqual(left: HealthBuddyAppointment[], right: HealthBuddyAppointment[]) {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    const leftItem = left[index];
    const rightItem = right[index];

    if (
      leftItem.id !== rightItem.id ||
      leftItem.seniorId !== rightItem.seniorId ||
      leftItem.seniorName !== rightItem.seniorName ||
      leftItem.title !== rightItem.title ||
      leftItem.date !== rightItem.date ||
      leftItem.time !== rightItem.time ||
      leftItem.location !== rightItem.location ||
      leftItem.notes !== rightItem.notes ||
      leftItem.status !== rightItem.status ||
      leftItem.createdAt !== rightItem.createdAt
    ) {
      return false;
    }
  }

  return true;
}

export default function CaregiverDashboardScreen({
  dashboardLabel = 'Dashboard',
  emptyMessage,
  onBack,
  onChangeLanguage,
  onLogout,
  alertsLabel = 'Alerts',
}: {
  dashboardLabel?: string;
  emptyMessage?: string;
  onBack: () => void;
  onChangeLanguage: () => void;
  onLogout: () => void;
  alertsLabel?: string;
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'live' | 'healthBuddy' | 'alerts' | 'profile'>('dashboard');
  const currentUser = getStoredUser();
  const caregiverName = currentUser?.displayName || currentUser?.email?.split('@')[0] || t('caregiver');
  const caregiverId = currentUser?.uid || '';
  const caregiverEmail = currentUser?.email || '';
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [isLoadingSeniors, setIsLoadingSeniors] = useState(false);
  const [seniorError, setSeniorError] = useState('');
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [resolvingAlertIds, setResolvingAlertIds] = useState<string[]>([]);
  const [sendingReminderIds, setSendingReminderIds] = useState<string[]>([]);
  const [sosHistory, setSosHistory] = useState<SosAlertHistory[]>(() => getStoredSosHistory(caregiverEmail));
  const [showAddSenior, setShowAddSenior] = useState(false);
  const [seniorPendingDelete, setSeniorPendingDelete] = useState<Senior | null>(null);
  const [deletingSeniorIds, setDeletingSeniorIds] = useState<string[]>([]);
  const [addSeniorId, setAddSeniorId] = useState('');
  const [addSeniorRelationship, setAddSeniorRelationship] = useState('caregiver');
  const [isAddingSenior, setIsAddingSenior] = useState(false);
  const [addSeniorError, setAddSeniorError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [appointments, setAppointments] = useState<HealthBuddyAppointment[]>([]);
  const [appointmentsLoadError, setAppointmentsLoadError] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [isSavingAppointment, setIsSavingAppointment] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState('');
  const [appointmentError, setAppointmentError] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [appointmentForm, setAppointmentForm] = useState<HealthBuddyAppointmentInput>({
    seniorId: '',
    seniorName: '',
    title: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  });
//Senior data loading and polling logic
  useEffect(() => {
    if (!caregiverEmail) {
      setSeniors([]);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;
    let isRefreshing = false;
    let hasLoadedOnce = false;

    async function loadSeniors() {
      if (isRefreshing) {
        return;
      }

      isRefreshing = true;

      if (!hasLoadedOnce) {
        setIsLoadingSeniors(true);
      }

      setSeniorError('');

      try {
        const params = new URLSearchParams({ caregiverId, caregiverEmail });
        const response = await fetch(`/api/servicenow/caregiver-seniors?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load caregiver dashboard');
        }

        if (isMounted) {
          setSeniors(data?.seniors || []);
          hasLoadedOnce = true;
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }

        console.error('Caregiver dashboard load failed:', error);
        if (isMounted) {
          setSeniorError(error instanceof Error ? error.message : 'Unable to load caregiver dashboard');

          if (!hasLoadedOnce) {
            setSeniors([]);
          }
        }
      } finally {
        isRefreshing = false;

        if (isMounted && !controller.signal.aborted) {
          setIsLoadingSeniors(false);
        }
      }
    }

    loadSeniors();
    const refreshTimer = window.setInterval(loadSeniors, CAREGIVER_DASHBOARD_REFRESH_MS);

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        loadSeniors();
      }
    };

    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      controller.abort();
    };
  }, [caregiverEmail, caregiverId, refreshKey]);

  useEffect(() => {
    setSosHistory(getStoredSosHistory(caregiverEmail));
  }, [caregiverEmail]);

  useEffect(() => {
    if (!caregiverEmail && !caregiverId) {
      setAppointments([]);
      return;
    }

    let isMounted = true;
    let isRefreshing = false;

    async function loadAppointments() {
      if (isRefreshing) {
        return;
      }

      isRefreshing = true;
      setAppointmentsLoadError('');

      try {
        const rows = await getCaregiverAppointments(caregiverId, caregiverEmail);

        if (isMounted) {
          setAppointments((currentRows) => (areAppointmentsEqual(currentRows, rows) ? currentRows : rows));
        }
      } catch (error) {
        console.error('Unable to load appointments from ServiceNow:', error);

        if (isMounted) {
          setAppointmentsLoadError(error instanceof Error ? error.message : 'Unable to load appointments.');
        }
      } finally {
        isRefreshing = false;
      }
    }

    loadAppointments();

    return () => {
      isMounted = false;
    };
  }, [caregiverEmail, caregiverId]);

  useEffect(() => {
    if (!caregiverEmail && !caregiverId) {
      return;
    }

    const identityKey = String(caregiverId || caregiverEmail || '').trim().toLowerCase();
    const todayKey = getSingaporeDateKey(new Date());
    const autoOpenKey = `${CAREGIVER_TELEGRAM_AUTO_OPEN_KEY}.${identityKey}`;

    if (!identityKey || !todayKey) {
      return;
    }

    if (sessionStorage.getItem(autoOpenKey) === todayKey) {
      return;
    }

    let isMounted = true;

    const tryAutoOpenTelegram = async () => {
      try {
        const params = new URLSearchParams();

        if (caregiverId) {
          params.set('caregiverId', caregiverId);
        }

        if (caregiverEmail) {
          params.set('caregiverEmail', caregiverEmail);
        }

        const telegramIdResponse = await fetch(`/api/caregiver/telegram-id?${params.toString()}`);
        const telegramIdData = await telegramIdResponse.json().catch(() => null);

        if (!isMounted || !telegramIdResponse.ok || !telegramIdData?.telegramId) {
          return;
        }

        const openLinkResponse = await fetch(`/api/caregiver/telegram-open-link?${params.toString()}`);
        const openLinkData = await openLinkResponse.json().catch(() => null);

        if (!isMounted || !openLinkResponse.ok || !openLinkData?.openUrl) {
          return;
        }

        sessionStorage.setItem(autoOpenKey, todayKey);
        const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent || '');
        const targetUrl = isMobile && openLinkData.deepLink ? openLinkData.deepLink : openLinkData.openUrl;
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        console.warn('Unable to auto-open Telegram bot link:', error);
      }
    };

    void tryAutoOpenTelegram();

    return () => {
      isMounted = false;
    };
  }, [caregiverEmail, caregiverId]);

  const sortedAppointments = [...appointments].sort((left, right) => {
    const leftTime = getAppointmentDateTime(left)?.getTime() || Number.MAX_SAFE_INTEGER;
    const rightTime = getAppointmentDateTime(right)?.getTime() || Number.MAX_SAFE_INTEGER;

    return leftTime - rightTime;
  });

  const appointmentStats = {
    today: appointments.filter((appointment) => {
      const appointmentDate = getAppointmentDateTime(appointment);

      if (!appointmentDate) {
        return false;
      }

      const formatDate = (value: Date) =>
        new Intl.DateTimeFormat('en-CA', {
          day: '2-digit',
          month: '2-digit',
          timeZone: 'Asia/Singapore',
          year: 'numeric',
        }).format(value);

      // Exclude completed and cancelled appointments from today count
      return formatDate(appointmentDate) === formatDate(new Date()) && appointment.status !== 'completed' && appointment.status !== 'cancelled';
    }).length,
    upcoming: appointments.filter((appointment) => appointment.status === 'scheduled' && (getAppointmentDateTime(appointment)?.getTime() || Infinity) >= Date.now()).length,
    completed: appointments.filter((appointment) => appointment.status === 'completed').length,
  };

  const tomorrowDateKey = getSingaporeDateKey(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const tomorrowAppointments = appointments.filter(
    (appointment) => appointment.status === 'scheduled' && appointment.date === tomorrowDateKey,
  );

  useEffect(() => {
    if (tomorrowAppointments.length === 0) {
      return;
    }

    const caregiverIdentity = caregiverEmail || caregiverId;

    if (!caregiverIdentity) {
      return;
    }

    const reminderKey = getAppointmentReminderAckKey(caregiverIdentity, tomorrowDateKey);
    const reminderSignature = tomorrowAppointments
      .map((appointment) => appointment.id)
      .sort()
      .join('|');
    const acknowledgedSignature = localStorage.getItem(reminderKey) || '';

    if (acknowledgedSignature === reminderSignature) {
      return;
    }

    const reminderNames = Array.from(
      new Set(
        tomorrowAppointments
          .map((appointment) => appointment.seniorName)
          .filter(Boolean),
      ),
    ).slice(0, 3);
    const reminderMessage = t('appointmentTomorrowAlertBody', {
      count: tomorrowAppointments.length,
    });
    const namesLine = reminderNames.length > 0 ? `\n${reminderNames.join(', ')}` : '';

    alert(`${reminderMessage}${namesLine}`);
    localStorage.setItem(reminderKey, reminderSignature);
  }, [tomorrowAppointments, caregiverEmail, caregiverId, tomorrowDateKey, t]);

  const handleCreateAppointment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!appointmentForm.seniorId.trim() || !appointmentForm.title.trim() || !appointmentForm.date.trim() || !appointmentForm.time.trim()) {
      setAppointmentError(t('pleaseFillAppointmentFields'));
      return;
    }

    const matchingSenior = seniors.find((senior) => senior.id === appointmentForm.seniorId || senior.userId === appointmentForm.seniorId || senior.connectionId === appointmentForm.seniorId);

    const seniorName = (matchingSenior?.name || appointmentForm.seniorName || '').trim();

    if (!seniorName) {
      setAppointmentError(t('selectSeniorForAppointment'));
      return;
    }

    // Validate time format (HH:MM)
    if (!/^\d{2}:\d{2}/.test(appointmentForm.time)) {
      setAppointmentError('Invalid time format. Please select a time using the time picker.');
      return;
    }

    const payload: CaregiverAppointmentInput = {
      caregiverId,
      caregiverEmail,
      seniorId: appointmentForm.seniorId.trim(),
      title: appointmentForm.title.trim(),
      date: appointmentForm.date,
      time: appointmentForm.time,
      location: appointmentForm.location.trim(),
      notes: appointmentForm.notes.trim(),
      status: 'scheduled',
    };

    console.log('Creating/updating appointment with payload:', payload);

    setIsSavingAppointment(true);

    try {
      if (editingAppointmentId) {
        const updatedAppointment = await updateCaregiverAppointment(editingAppointmentId, payload);
        console.log('Updated appointment:', updatedAppointment);

        setAppointments((currentAppointments) =>
          currentAppointments.map((appointment) =>
            appointment.id === editingAppointmentId ? updatedAppointment : appointment,
          ),
        );

        // Send email notification for updated appointment
        try {
          await fetch('/api/servicenow/appointments/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              caregiverId,
              caregiverEmail,
              seniorEmail: matchingSenior?.email || '',
              seniorName,
              title: appointmentForm.title.trim(),
              date: appointmentForm.date,
              time: appointmentForm.time,
              location: appointmentForm.location.trim(),
              action: 'updated',
            }),
          });
        } catch (emailError) {
          console.warn('Failed to send email notification:', emailError);
        }
      } else {
        const createdAppointment = await createCaregiverAppointment(payload);
        console.log('Created appointment:', createdAppointment);
        setAppointments((currentAppointments) => [createdAppointment, ...currentAppointments]);

        // Send email notification for new appointment
        try {
          await fetch('/api/servicenow/appointments/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              caregiverId,
              caregiverEmail,
              seniorEmail: matchingSenior?.email || '',
              seniorName,
              title: appointmentForm.title.trim(),
              date: appointmentForm.date,
              time: appointmentForm.time,
              location: appointmentForm.location.trim(),
              action: 'created',
            }),
          });
        } catch (emailError) {
          console.warn('Failed to send email notification:', emailError);
        }
      }

      setAppointmentForm({ seniorId: '', seniorName: '', title: '', date: '', time: '', location: '', notes: '' });
      setEditingAppointmentId('');
      setShowAppointmentForm(false);
      setAppointmentError('');
    } catch (error) {
      console.error('Unable to save appointment:', error);
      setAppointmentError(error instanceof Error ? error.message : 'Unable to save appointment.');
    } finally {
      setIsSavingAppointment(false);
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId: string, status: HealthBuddyAppointment['status']) => {
    try {
      const updatedAppointment = await updateCaregiverAppointment(appointmentId, {
        caregiverId,
        caregiverEmail,
        status,
      });

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === appointmentId ? updatedAppointment : appointment,
        ),
      );
    } catch (error) {
      console.error('Unable to update appointment status:', error);
      setAppointmentError(error instanceof Error ? error.message : 'Unable to update appointment status.');
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await deleteCaregiverAppointment(appointmentId, caregiverId, caregiverEmail);
      setAppointments((currentAppointments) => currentAppointments.filter((appointment) => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Unable to delete appointment:', error);
      setAppointmentError(error instanceof Error ? error.message : 'Unable to delete appointment.');
    }
  };

  const handleEditAppointment = (appointment: HealthBuddyAppointment) => {
    setEditingAppointmentId(appointment.id);
    setAppointmentForm({
      seniorId: appointment.seniorId,
      seniorName: appointment.seniorName,
      title: appointment.title,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      notes: appointment.notes,
    });
    setAppointmentError('');
    setShowAppointmentForm(true);
  };

  const handleUpdateSeniorDetails = async (senior: Senior, details: SeniorDetailsInput) => {
    const seniorId = senior.userId || senior.id;

    if (!seniorId) {
      throw new Error('Senior profile ID is missing.');
    }

    if (!currentUser?.token) {
      throw new Error('Please log in again before updating senior details.');
    }

    const response = await fetch(`/api/users/${encodeURIComponent(seniorId)}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        phone: details.phone,
        locationZones: details.location,
        address: details.address,
      }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || 'Unable to update senior details.');
    }

    const updatedUser = data?.user || {};
    const updatedSenior: Senior = {
      ...senior,
      name: updatedUser.name || details.name,
      phone: updatedUser.phone || details.phone,
      email: updatedUser.email || details.email,
      location: updatedUser.locationZones || details.location,
      address: updatedUser.address || details.address,
      lastCheckIn: updatedUser.lastCheckInAt || senior.lastCheckIn,
    };

    setSelectedSenior(updatedSenior);
    setSeniors((currentSeniors) =>
      currentSeniors.map((currentSenior) =>
        currentSenior.id === senior.id || currentSenior.userId === senior.userId
          ? { ...currentSenior, ...updatedSenior }
          : currentSenior,
      ),
    );
  };

  const handleResolveAlert = async (senior: Senior) => {
    if (!senior.alertId) {
      alert('This alert cannot be resolved because its ServiceNow alert ID is missing.');
      return;
    }

    setResolvingAlertIds((ids) => [...ids, senior.alertId as string]);

    try {
      const response = await fetch('/api/servicenow/sos-alert', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alertId: senior.alertId,
          status: 'Resolved',
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to resolve ServiceNow alert');
      }

      const resolvedHistoryItem: SosAlertHistory = {
        id: senior.alertId,
        seniorName: senior.name || 'Senior',
        status: 'Resolved',
        location: senior.location,
        message: senior.alertMessage,
        alertTime: senior.alertTime,
        resolvedAt: new Date().toISOString(),
      };

      setSosHistory((currentHistory) => {
        const nextHistory = [
          resolvedHistoryItem,
          ...currentHistory.filter((item) => item.id !== resolvedHistoryItem.id),
        ].slice(0, 20);

        saveSosHistory(caregiverEmail, nextHistory);
        return nextHistory;
      });

      setSeniors((currentSeniors) =>
        currentSeniors.map((currentSenior) =>
          currentSenior.alertId === senior.alertId
            ? {
                ...currentSenior,
                status: 'Connected',
                alertStatus: 'Resolved',
                alertMessage: '',
                alertTime: '',
              }
            : currentSenior,
        ),
      );
    } catch (error) {
      console.error('Resolve alert failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to resolve ServiceNow alert');
    } finally {
      setResolvingAlertIds((ids) => ids.filter((id) => id !== senior.alertId));
    }
  };

  const handleSendCheckInReminder = async (senior: Senior) => {
    const reminderKey = senior.userId || senior.id || senior.connectionId || senior.name;

    setSendingReminderIds((ids) => [...ids, reminderKey]);

    try {
      const response = await fetch('/api/check-in-reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seniorUserId: senior.userId,
          seniorProfileId: senior.id,
          seniorName: senior.name,
          seniorEmail: senior.email,
          seniorPhone: senior.phone,
          message: 'Please complete your check-in for today.',
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send check-in reminder');
      }

      alert(`Reminder sent to ${senior.name || 'Senior'}.`);
    } catch (error) {
      console.error('Send reminder failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to send check-in reminder');
    } finally {
      setSendingReminderIds((ids) => ids.filter((id) => id !== reminderKey));
    }
  };

  const handleAddSenior = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!addSeniorId.trim()) {
      setAddSeniorError('Please enter the Senior ID.');
      return;
    }

    if (!caregiverId && !caregiverEmail) {
      setAddSeniorError('Please log in again before adding a senior.');
      return;
    }

    setIsAddingSenior(true);
    setAddSeniorError('');

    try {
      const response = await fetch('/api/servicenow/connect-senior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caregiverId,
          caregiverEmail,
          caregiverName,
          seniorId: addSeniorId.trim(),
          relationship: addSeniorRelationship,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to add senior.');
      }

      setShowAddSenior(false);
      setAddSeniorId('');
      setAddSeniorRelationship('caregiver');
      setRefreshKey((currentValue) => currentValue + 1);
    } catch (error) {
      console.error('Add senior failed:', error);
      setAddSeniorError(error instanceof Error ? error.message : 'Unable to add senior.');
    } finally {
      setIsAddingSenior(false);
    }
  };

  const handleDeleteSenior = async () => {
    if (!seniorPendingDelete) {
      return;
    }

    const deleteKey = seniorPendingDelete.connectionId;

    if (!deleteKey) {
      alert('This senior cannot be deleted because its ServiceNow ID is missing.');
      setSeniorPendingDelete(null);
      return;
    }

    const seniorName = seniorPendingDelete.name || 'Senior';
    setDeletingSeniorIds((ids) => [...ids, deleteKey]);

    try {
      const response = await fetch('/api/servicenow/caregiver-senior', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectionId: seniorPendingDelete.connectionId,
          caregiverId,
          caregiverEmail,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to delete senior.');
      }

      setSeniors((currentSeniors) =>
        currentSeniors.filter((senior) => {
          const currentDeleteKey = senior.connectionId;
          return currentDeleteKey !== deleteKey;
        }),
      );
      setSeniorPendingDelete(null);
      alert(`${seniorName} has been deleted!`);
      setRefreshKey((currentValue) => currentValue + 1);
    } catch (error) {
      console.error('Delete senior failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to delete senior.');
    } finally {
      setDeletingSeniorIds((ids) => ids.filter((id) => id !== deleteKey));
    }
  };

  const alertCount = seniors.filter((senior) => isAlertStatus(senior.status, senior)).length + tomorrowAppointments.length;
  const canAddSenior = true;
  const canDeleteSenior = true;
  const isAdminMode = false;
  const canManageAppointments = /caregiver|admin/i.test(String(currentUser?.role || ''));
  const dashboardSurfaceClass = 'bg-[#f4f6f8]';
  const dashboardTabLabel = dashboardLabel === 'Dashboard' ? t('dashboard') : dashboardLabel;
  const alertsTabLabel = alertsLabel === 'Alerts' ? t('alerts') : alertsLabel;

  return (
    <div className={`h-full overflow-y-auto ${dashboardSurfaceClass} pb-24 text-[#101418]`}>
      <main className="px-5 py-5">
        {selectedSenior ? (
          <ResidentProfileDetails
            senior={selectedSenior}
            onBack={() => setSelectedSenior(null)}
            onSave={handleUpdateSeniorDetails}
          />
        ) : activeTab === 'dashboard' && (
          <CaregiverDashboardHome
            canAddSenior={canAddSenior}
            caregiverName={caregiverName}
            emptyMessage={emptyMessage}
            seniors={seniors}
            isLoading={isLoadingSeniors}
            error={seniorError}
            onOpenProfile={setSelectedSenior}
            onOpenAddSenior={() => {
              setAddSeniorError('');
              setShowAddSenior(true);
            }}
            onSendReminder={handleSendCheckInReminder}
            onRequestDeleteSenior={setSeniorPendingDelete}
            sendingReminderIds={sendingReminderIds}
            deletingSeniorIds={deletingSeniorIds}
            canDeleteSenior={canDeleteSenior}
            isAdminMode={isAdminMode}
            onOpenLive={() => setActiveTab('live')}
          />
        )}
        {!selectedSenior && activeTab === 'live' && <LiveMonitorTab />}
        {!selectedSenior && activeTab === 'healthBuddy' && (
          <HealthBuddyScreen
            canManageAppointments={canManageAppointments}
            appointmentError={appointmentError}
            appointmentLoadError={appointmentsLoadError}
            appointmentForm={appointmentForm}
            appointmentStats={appointmentStats}
            appointments={sortedAppointments}
            editingAppointmentId={editingAppointmentId}
            isSavingAppointment={isSavingAppointment}
            tomorrowAppointmentCount={tomorrowAppointments.length}
            caregiverName={caregiverName}
            onChangeAppointmentForm={setAppointmentForm}
            onEditAppointment={handleEditAppointment}
            onCloseForm={() => {
              setShowAppointmentForm(false);
              setEditingAppointmentId('');
              setAppointmentError('');
            }}
            onCreateAppointment={handleCreateAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            onOpenForm={() => {
              setEditingAppointmentId('');
              setAppointmentForm({ seniorId: '', seniorName: '', title: '', date: '', time: '', location: '', notes: '' });
              setShowAppointmentForm(true);
            }}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            seniors={seniors}
            showAppointmentForm={showAppointmentForm}
            appointmentStatusFilter={appointmentStatusFilter}
            onChangeStatusFilter={setAppointmentStatusFilter}
          />
        )}
        {!selectedSenior && activeTab === 'alerts' && (
          <CaregiverAlerts
            alertsLabel={alertsTabLabel}
            seniors={seniors}
            sosHistory={sosHistory}
            resolvingAlertIds={resolvingAlertIds}
            isAdminMode={isAdminMode}
            onResolveAlert={handleResolveAlert}
          />
        )}
        {!selectedSenior && activeTab === 'profile' && (
          <CaregiverProfile
            caregiverName={caregiverName}
            caregiverEmail={caregiverEmail}
            isAdminMode={isAdminMode}
            onChangeLanguage={onChangeLanguage}
            onLogout={onLogout}
          />
        )}
      </main>

      {showAddSenior && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <form
            onSubmit={handleAddSenior}
            className="w-full max-w-[360px] rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f3e8] text-[#416642]">
                  <Plus className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black leading-7 text-[#151515]">{t('addSenior')}</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSenior(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ee] text-[#416642] active:scale-95"
                aria-label={t('closeAddSenior')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-base font-bold text-[#111827]">{t('seniorId')}</span>
              <input
                value={addSeniorId}
                onChange={(event) => {
                  setAddSeniorId(event.target.value);
                  setAddSeniorError('');
                }}
                placeholder={t('enterSeniorId')}
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-base font-bold text-[#111827]">{t('relationship')}</span>
              <select
                value={addSeniorRelationship}
                onChange={(event) => setAddSeniorRelationship(event.target.value)}
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              >
                <option value="caregiver">{t('caregiver')}</option>
                <option value="children">{t('children')}</option>
                <option value="volunteer">{t('volunteer')}</option>
                <option value="NOK">{t('nextOfKin')}</option>
              </select>
            </label>

            {addSeniorError && (
              <p className="mt-4 rounded-2xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
                {addSeniorError}
              </p>
            )}

            <button
              type="submit"
              disabled={isAddingSenior || !addSeniorId.trim()}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#416642] text-lg font-black text-white active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              <Plus className="h-5 w-5" />
              {isAddingSenior ? t('adding') : t('addSenior')}
            </button>
          </form>
        </div>
      )}

      {seniorPendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[360px] rounded-[24px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
            <p className="text-xl font-black leading-7 text-[#151515]">
              {t('deleteSeniorConfirm', { name: seniorPendingDelete.name || t('senior') })}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDeleteSenior}
                disabled={deletingSeniorIds.includes(seniorPendingDelete.connectionId || '')}
                className="flex h-12 items-center justify-center rounded-[10px] bg-[#c8171d] text-base font-black text-white active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
              >
                {t('yes')}
              </button>
              <button
                type="button"
                onClick={() => setSeniorPendingDelete(null)}
                disabled={deletingSeniorIds.includes(seniorPendingDelete.connectionId || '')}
                className="flex h-12 items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-base font-black text-[#30343a] active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
              >
                {t('no')}
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className={`absolute bottom-0 left-0 right-0 z-20 flex min-h-24 items-center justify-around ${dashboardSurfaceClass} pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,0.04)]`}>
        <DashboardNavItem
          active={activeTab === 'dashboard'}
          icon={<LayoutDashboard className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label={dashboardTabLabel}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('dashboard');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'live'}
          icon={<Activity className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label="Live"
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('live');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'alerts'}
          icon={<TriangleAlert className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label={alertsTabLabel}
          hasAlert={alertCount > 0}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('alerts');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'healthBuddy'}
          icon={<Calendar className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label={t('healthBuddy')}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('healthBuddy');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'profile'}
          icon={<User className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label={t('profile')}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('profile');
          }}
        />
      </nav>
    </div>
  );
}

function isCheckInReminderAlert(alert: Pick<SosAlertHistory, 'status' | 'message'> | Pick<Senior, 'status' | 'alertMessage'>) {
  const status = 'status' in alert ? String(alert.status || '') : '';
  const message = 'message' in alert
    ? String(alert.message || '')
    : String('alertMessage' in alert ? alert.alertMessage || '' : '');

  return /reminder/i.test(status) || /check[-\s]?in/i.test(message);
}

function seniorNamesMatch(left = '', right = '') {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function isResolvedSosAlert(status = '') {
  return /resolved|closed|cancelled|canceled/i.test(status);
}

function isAlertStatus(status = '', senior?: Senior) {
  if (senior && isCheckInReminderAlert(senior)) {
    return false;
  }

  return /alert|sos|urgent|miss|no reply|attention/i.test(status);
}

function isSosTriggered(senior: Senior) {
  const statusText = [
    senior.status,
    senior.alertStatus,
    senior.alertMessage,
  ].join(' ');

  return /sos|urgent|emergency/i.test(statusText);
}

function getSeniorStatus(senior: Senior) {
  return senior.status?.trim() || 'Connected';
}

function getSeniorDetailValue(value?: string | number | null) {
  const normalizedValue = String(value ?? '').trim();

  return normalizedValue || 'NO';
}

//Phone number cleaning for tel: links, removing non-digit characters except for leading
function getPhoneHref(phone = '') {
  const cleanedPhone = phone.replace(/[^\d+]/g, '');

  return cleanedPhone ? `tel:${cleanedPhone}` : undefined;
}

function extractCoordinates(location = '') {
  const latLngMatch = /lat\s*(-?\d+(?:\.\d+)?)\s*,\s*lng\s*(-?\d+(?:\.\d+)?)/i.exec(location);

  if (latLngMatch) {
    return {
      lat: Number(latLngMatch[1]),
      lng: Number(latLngMatch[2]),
    };
  }

  const plainCoordsMatch = /(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/.exec(location);

  if (plainCoordsMatch) {
    return {
      lat: Number(plainCoordsMatch[1]),
      lng: Number(plainCoordsMatch[2]),
    };
  }

  return null;
}

function extractFirstUrl(text = '') {
  const urlMatch = /(https?:\/\/[^\s]+)/i.exec(text);
  return urlMatch ? urlMatch[1] : '';
}

function getDirectionsHref(location = '') {
  const coordinates = extractCoordinates(location);

  if (coordinates) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  }

  const fallbackUrl = extractFirstUrl(location);
  return fallbackUrl || (location.trim() ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.trim())}` : undefined);
}

async function openDirectionsFromCurrentLocation(location = '') {
  const fallbackHref = getDirectionsHref(location);
  const trimmedLocation = location.trim();

  if (!trimmedLocation && !fallbackHref) {
    return;
  }

  if (!navigator.geolocation) {
    if (fallbackHref) {
      window.open(fallbackHref, '_blank', 'noopener,noreferrer');
    }
    return;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    });

    const origin = `${position.coords.latitude},${position.coords.longitude}`;
    const coordinates = extractCoordinates(trimmedLocation);
    const destination = coordinates
      ? `${coordinates.lat},${coordinates.lng}`
      : encodeURIComponent(trimmedLocation);

    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  } catch {
    if (fallbackHref) {
      window.open(fallbackHref, '_blank', 'noopener,noreferrer');
    }
  }
}

function getMapEmbedSrc(location = '') {
  const coordinates = extractCoordinates(location);

  if (!coordinates) {
    return undefined;
  }

  return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=16&output=embed`;
}

function getTimeGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat('en-SG', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Asia/Singapore',
    }).format(new Date()),
  );

  if (hour < 12) {
    return 'Good Morning';
  }

  if (hour < 18) {
    return 'Good Afternoon';
  }

  if (hour < 21) {
    return 'Good Evening';
  }

  return 'Good Night';
}

function parseServiceNowDate(value = '', options: { localServiceNowTime?: boolean } = {}) {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim().replace(' ', 'T');
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalizedValue);
  const date = new Date(
    hasTimezone
      ? normalizedValue
      : options.localServiceNowTime
        ? `${normalizedValue}+08:00`
        : `${normalizedValue}Z`,
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function hasCheckedInToday(value = '') {
  const date = parseServiceNowDate(value, { localServiceNowTime: true });

  if (!date) {
    return false;
  }

  const formatDate = (dateValue: Date) =>
    new Intl.DateTimeFormat('en-CA', {
      day: '2-digit',
      month: '2-digit',
      timeZone: 'Asia/Singapore',
      year: 'numeric',
    }).format(dateValue);

  return formatDate(date) === formatDate(new Date());
}

function formatAlertTime(value = '') {
  const date = parseServiceNowDate(value);

  if (!date) {
    return undefined;
  }

  return new Intl.DateTimeFormat('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function formatAlertDate(value = '') {
  const date = parseServiceNowDate(value);

  if (!date) {
    return undefined;
  }

  return new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Singapore',
    year: 'numeric',
  }).format(date);
}

function formatDetailDateTime(value = '') {
  if (!value) {
    return 'Not provided';
  }

  const date = parseServiceNowDate(value, { localServiceNowTime: true });

  if (!date) {
    return value;
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function formatCheckInDateTimeParts(value = '') {
  const date = parseServiceNowDate(value, { localServiceNowTime: true });

  if (!date) {
    return {
      date: 'NO',
      time: 'NO',
    };
  }

  return {
    date: new Intl.DateTimeFormat('en-SG', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Singapore',
      year: 'numeric',
    }).format(date),
    time: new Intl.DateTimeFormat('en-SG', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Singapore',
    }).format(date),
  };
}

function getSeniorDisplayId(senior: Senior) {
  const rawId = String(senior.id || '').trim();

  if (!rawId) {
    return 'NO';
  }

  return rawId.slice(0, 8).toUpperCase();
}

function CaregiverDashboardHome({
  canAddSenior,
  caregiverName,
  emptyMessage,
  seniors,
  isLoading,
  error,
  onOpenProfile,
  onOpenAddSenior,
  onSendReminder,
  onRequestDeleteSenior,
  sendingReminderIds,
  deletingSeniorIds,
  canDeleteSenior,
  isAdminMode,
  onOpenLive,
}: {
  canAddSenior: boolean;
  caregiverName: string;
  emptyMessage?: string;
  seniors: Senior[];
  isLoading: boolean;
  error: string;
  onOpenProfile: (senior: Senior) => void;
  onOpenAddSenior: () => void;
  onSendReminder: (senior: Senior) => void;
  onRequestDeleteSenior: (senior: Senior) => void;
  sendingReminderIds: string[];
  deletingSeniorIds: string[];
  canDeleteSenior: boolean;
  isAdminMode: boolean;
  onOpenLive: () => void;
}) {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [checkInFilter, setCheckInFilter] = useState<'all' | 'checked' | 'missing'>('all');
  const featuredSeniors = [...seniors].sort((firstSenior, secondSenior) => {
    const getPriority = (senior: Senior) => {
      if (isSosTriggered(senior)) {
        return 0;
      }

      if (isAlertStatus(senior.status, senior) || !hasCheckedInToday(senior.lastCheckIn)) {
        return 1;
      }

      return 2;
    };

    return getPriority(firstSenior) - getPriority(secondSenior);
  });
  const normalizedSearch = activeSearch.trim().toLowerCase();
  const filteredSeniors = featuredSeniors.filter((senior) => {
    const checkedIn = hasCheckedInToday(senior.lastCheckIn);

    if (checkInFilter === 'checked') {
      return checkedIn;
    }

    if (checkInFilter === 'missing') {
      return !checkedIn;
    }

    return true;
  });
  const visibleSeniors = normalizedSearch
    ? filteredSeniors.filter((senior) => {
      return [
        senior.id,
        senior.userId,
        senior.connectionId,
        senior.name,
        getSeniorDisplayId(senior),
      ].some((value) => String(value || '').toLowerCase().includes(normalizedSearch));
    })
    : filteredSeniors;
  const filterOptions: Array<{ id: 'all' | 'checked' | 'missing'; label: string }> = [
    { id: 'all', label: t('all') },
    { id: 'checked', label: t('checkedIn') },
    { id: 'missing', label: t('missed') },
  ];
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setActiveSearch(searchInput.trim());
  };
  const clearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold leading-9 text-black">{t('seniors')}</h2>
          <p className="mt-1 text-base font-bold text-[#71717a]">
            {t('residentsActive', { count: seniors.length })}
          </p>
        </div>
        {canAddSenior && (
          <button
            type="button"
            onClick={onOpenAddSenior}
            className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#416642] px-5 text-lg font-black text-white shadow-sm active:scale-95"
          >
            <Plus className="h-6 w-6" />
            {t('addSenior')}
          </button>
        )}
      </section>
      <form onSubmit={handleSearchSubmit} className="rounded-[20px] bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-[14px] bg-[#f4f6f8] px-3">
            <Search className="h-5 w-5 shrink-0 text-[#5f6368]" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t('searchByIdOrName')}
              className="min-w-0 flex-1 bg-transparent text-base font-bold text-[#111827] outline-none placeholder:text-[#71717a]"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label={t('close')}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#71717a] active:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className={`flex h-12 shrink-0 items-center justify-center rounded-[14px] px-4 text-base font-black text-white shadow-sm active:scale-95 ${
              isAdminMode ? 'bg-[#0b2f57]' : 'bg-[#416642]'
            }`}
          >
            {t('search')}
          </button>
        </div>
        {activeSearch && (
          <p className="mt-2 px-1 text-sm font-bold text-[#71717a]">
            {t('showingSearchResults', { visible: visibleSeniors.length, total: filteredSeniors.length, query: activeSearch })}
          </p>
        )}
      </form>
      <div className="flex items-center gap-2 rounded-[20px] bg-white p-2 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#eef2ee] text-[#416642]">
          <Filter className="h-5 w-5" />
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setCheckInFilter(option.id)}
              className={`flex h-10 min-w-0 items-center justify-center rounded-[12px] px-2 text-xs font-black transition-colors active:scale-95 ${
                checkInFilter === option.id
                  ? option.id === 'missing'
                    ? 'bg-[#d94b3d] text-white'
                    : 'bg-[#416642] text-white'
                  : 'bg-[#f4f6f8] text-[#5f6368]'
              }`}
            >
              <span className="truncate">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      <DashboardVitalsStrip onOpenLive={onOpenLive} />
      <section className="flex flex-col gap-5">
        {isLoading ? (
          <p className="rounded-[18px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            {t('loadingSeniors')}
          </p>
        ) : error ? (
          <p className="rounded-[18px] bg-red-50 p-5 text-base font-semibold text-red-700">{error}</p>
        ) : visibleSeniors.length > 0 ? (
          visibleSeniors.map((senior) => (
            <SeniorCard
              key={senior.id}
              senior={senior}
              name={senior.name}
              location={senior.location || t('unknown')}
              tone={isAlertStatus(senior.status, senior) || !hasCheckedInToday(senior.lastCheckIn) ? 'alert' : 'good'}
              onOpenProfile={onOpenProfile}
              onSendReminder={onSendReminder}
              onRequestDeleteSenior={onRequestDeleteSenior}
              isSendingReminder={sendingReminderIds.includes(senior.userId || senior.id || senior.connectionId || senior.name)}
              isDeleting={deletingSeniorIds.includes(canDeleteSenior && !senior.connectionId ? senior.id : senior.connectionId || '')}
              canDelete={canDeleteSenior}
              isAdminMode={isAdminMode}
            />
          ))
        ) : (
          <div className="rounded-[18px] border border-[#d8dbe0] bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-[#30343a]">{activeSearch ? t('noMatchingSeniorsFound') : emptyMessage || t('noSeniorsForCaregiver')}</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-[#71717a]">
              {activeSearch ? t('tryAnotherSeniorSearch') : emptyMessage ? t('seniorRecordsAppear') : t('caregiverNotLinked', { name: caregiverName })}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

// Compact live-vitals strip for the Dashboard tab: same live-first rules as
// LiveMonitorTab (MQTT/WS values win while fresh, the ServiceNow snapshot
// fills gaps and survives reloads), squeezed into one tappable card that
// jumps to the full Live monitor. Renders nothing at all when there is no
// sensor deployment (snapshot null/failed AND no live frames) so
// non-instrumented installs keep a clean dashboard.
function DashboardVitalsStrip({ onOpenLive }: { onOpenLive: () => void }) {
  const live = useLiveVitals(true);
  const [status, setStatus] = useState<SensorStatus | null>(null);
  // 5 s re-render tick: keeps the staleness chip honest — an OPEN WebSocket
  // is not the same as flowing data (same reasoning as LiveMonitorTab).
  const [nowTick, setNowTick] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowTick(Date.now()), 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const result = await getSensorStatus();
        if (isMounted) {
          setStatus(result);
        }
      } catch {
        // Snapshot unavailable — the strip runs live-only (or hides below).
      }
    }

    load();
    const timer = window.setInterval(load, LIVE_TAB_REFRESH_MS);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, []);

  const hr = live.hr ?? status?.vitals.hr ?? null;
  const br = live.br ?? status?.vitals.br ?? null;

  // No deployment signal from either source: stay invisible.
  if (!status && live.lastMessageAt === null) {
    return null;
  }

  const dataAgeMs = live.lastMessageAt ? nowTick - live.lastMessageAt : null;
  const feed: 'connecting' | 'waiting' | 'live' | 'idle' = !live.connected
    ? 'connecting'
    : dataAgeMs === null
      ? 'waiting'
      : dataAgeMs > 30000
        ? 'idle'
        : 'live';

  const vitalClass = (value: number | null, low: number, high: number) =>
    value === null
      ? 'text-[#94a3b8]'
      : value < low || value > high
        ? 'text-[#dc2626]'
        : 'text-[#151515]';

  return (
    <button
      type="button"
      onClick={onOpenLive}
      className="flex w-full items-center gap-4 rounded-[18px] bg-white p-4 text-left shadow-sm active:scale-[0.99]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9f6ed] text-[#18833b]">
        <Activity className="h-6 w-6" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-2">
          <span className="text-sm font-black uppercase tracking-wide text-[#151515]">Live Vitals</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
              feed === 'live'
                ? 'bg-[#e9f6ed] text-[#18833b]'
                : feed === 'idle'
                  ? 'bg-[#fff4e5] text-[#b45309]'
                  : 'bg-[#f0f2f5] text-[#94a3b8]'
            }`}
          >
            {feed === 'live' && '● LIVE'}
            {feed === 'idle' && `◐ ${Math.round((dataAgeMs ?? 0) / 1000)}s`}
            {feed === 'waiting' && '○ WAITING'}
            {feed === 'connecting' && '○ CONNECTING'}
          </span>
        </span>
        <span className="mt-1 flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Heart className="h-4 w-4 text-[#dc2626]" />
            <span className={`text-xl font-extrabold ${vitalClass(hr, 60, 100)}`}>
              {hr ?? '–'}
            </span>
            <span className="text-[10px] font-bold uppercase text-[#71717a]">bpm</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Wind className="h-4 w-4 text-[#2563eb]" />
            <span className={`text-xl font-extrabold ${vitalClass(br, 12, 20)}`}>
              {br ?? '–'}
            </span>
            <span className="text-[10px] font-bold uppercase text-[#71717a]">brpm</span>
          </span>
        </span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-[#94a3b8]" />
    </button>
  );
}

// Placeholder component for senior card - can be expanded with more details and actions
function CaregiverAlerts({
  alertsLabel,
  seniors,
  sosHistory,
  resolvingAlertIds,
  isAdminMode,
  onResolveAlert,
}: {
  alertsLabel: string;
  seniors: Senior[];
  sosHistory: SosAlertHistory[];
  resolvingAlertIds: string[];
  isAdminMode: boolean;
  onResolveAlert: (senior: Senior) => void;
}) {
  const { t } = useTranslation();
  const [historyView, setHistoryView] = useState<'pending' | 'resolved'>('pending');
  const [priorityView, setPriorityView] = useState<'active' | 'pending' | 'resolved'>('active');
  const [selectedHistorySeniorId, setSelectedHistorySeniorId] = useState<string | null>(null);
  const [selectedHistorySeniorName, setSelectedHistorySeniorName] = useState<string | null>(null);
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status, senior));
  const filteredSosHistory = sosHistory.filter((alert) => !isCheckInReminderAlert(alert));
  const activeAlertIds = new Set(alertSeniors.map((senior) => senior.alertId).filter(Boolean));
  const pendingSosHistory = filteredSosHistory.filter((alert) => !isResolvedSosAlert(alert.status) && !activeAlertIds.has(alert.id));
  const resolvedSosHistory = filteredSosHistory.filter((alert) => isResolvedSosAlert(alert.status));
  const isPendingView = historyView === 'pending';
  const caregiverAlertTotal = alertSeniors.length + filteredSosHistory.length;
  const selectedHistorySenior = seniors.find((senior) => senior.id === selectedHistorySeniorId)
    || seniors.find((senior) => seniorNamesMatch(senior.name, selectedHistorySeniorName || ''))
    || null;
  const selectedHistoryName = selectedHistorySenior?.name || selectedHistorySeniorName || '';
  const selectedSeniorHistory = selectedHistoryName
    ? filteredSosHistory.filter((alert) => seniorNamesMatch(alert.seniorName, selectedHistoryName))
    : [];
  const selectedSeniorActiveAlerts = selectedHistorySenior && isAlertStatus(selectedHistorySenior.status, selectedHistorySenior)
    ? [selectedHistorySenior]
    : [];
  const selectedSeniorPendingHistory = selectedSeniorHistory.filter((alert) => !isResolvedSosAlert(alert.status) && !activeAlertIds.has(alert.id));
  const selectedSeniorResolvedHistory = selectedSeniorHistory.filter((alert) => isResolvedSosAlert(alert.status));
  const selectedSeniorPendingCount = selectedSeniorActiveAlerts.length + selectedSeniorPendingHistory.length;
  const selectedSeniorResolvedCount = selectedSeniorResolvedHistory.length;
  const selectedSeniorAlertCount = selectedSeniorPendingCount + selectedSeniorResolvedCount;
  const pendingAlertGroups = groupSosAlertsBySenior(pendingSosHistory, 'pending');
  const resolvedAlertGroups = groupSosAlertsBySenior(resolvedSosHistory, 'resolved');
  const priorityTitle = priorityView === 'active'
    ? t('todaysAlerts')
    : priorityView === 'pending'
      ? `${t('pending')} ${t('alerts')}`
      : `${t('resolved')} ${t('alerts')}`;

  useEffect(() => {
    if (selectedHistorySeniorId && !seniors.some((senior) => senior.id === selectedHistorySeniorId)) {
      setSelectedHistorySeniorId(null);
    }
  }, [selectedHistorySeniorId, seniors]);

  const openSeniorHistory = (seniorName: string, view: 'pending' | 'resolved' = 'pending') => {
    const matchingSenior = seniors.find((senior) => seniorNamesMatch(senior.name, seniorName));

    setHistoryView(view);
    setSelectedHistorySeniorId(matchingSenior?.id || null);
    setSelectedHistorySeniorName(seniorName);
  };

  const closeSeniorHistory = () => {
    setSelectedHistorySeniorId(null);
    setSelectedHistorySeniorName(null);
  };

  return (
    <div className="flex flex-col gap-7">
      <section className="flex items-center justify-between gap-4">
        <h2 className="text-[30px] font-bold leading-9 text-black">{alertsLabel}</h2>
      </section>

      <section className="flex flex-col gap-4">
        {isAdminMode ? (
          <>
            {selectedHistorySenior ? (
              <>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedHistorySeniorId(null)}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#0b2f57] shadow-sm transition-colors active:bg-[#dfeaf8]"
                    aria-label={t('backToSeniors')}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <div className="min-w-0">
                    <h2 className="truncate text-2xl font-bold text-[#1b1c1c]">{selectedHistorySenior.name}</h2>
                    <p className="text-sm font-bold text-[#5f6872]">{selectedSeniorAlertCount} {t('alerts')}</p>
                  </div>
                </div>

                <div className="grid h-11 grid-cols-2 rounded-full bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setHistoryView('pending')}
                    className={`rounded-full px-4 text-sm font-black transition-colors ${
                      isPendingView
                        ? 'bg-[#954a00] text-white'
                        : 'text-[#713700]'
                    }`}
                  >
                    {t('pending')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryView('resolved')}
                    className={`rounded-full px-4 text-sm font-black transition-colors ${
                      !isPendingView
                        ? 'bg-[#18833b] text-white'
                        : 'text-[#124f25]'
                    }`}
                  >
                    {t('resolved')}
                  </button>
                </div>

                {isPendingView && selectedSeniorPendingCount > 0 ? (
                  <>
                    {selectedSeniorActiveAlerts.map((senior) => (
                      <AlertCard
                        key={senior.id}
                        kind={/sos|urgent/i.test(senior.status || '') ? 'sos' : 'missed'}
                        title={senior.name}
                        label={senior.status || t('reviewLatestStatus')}
                        location={senior.location}
                        message={senior.alertMessage}
                        phone={senior.phone}
                        time={formatAlertTime(senior.alertTime)}
                        date={formatAlertDate(senior.alertTime)}
                        icon={/sos|urgent/i.test(senior.status || '') ? <ShieldAlert className="h-8 w-8" /> : <Bell className="h-8 w-8" />}
                        isResolving={senior.alertId ? resolvingAlertIds.includes(senior.alertId) : false}
                        onResolve={() => onResolveAlert(senior)}
                      />
                    ))}
                    {selectedSeniorPendingHistory.map((alert) => (
                      <AlertHistoryItem
                        key={alert.id}
                        name={alert.seniorName}
                        time={formatAlertTime(alert.alertTime) || t('pending')}
                        date={formatAlertDate(alert.alertTime)}
                        message={alert.message || alert.status || t('sosActive')}
                        location={alert.location}
                        statusLabel={alert.status || t('pending')}
                        variant="pending"
                      />
                    ))}
                  </>
                ) : isPendingView ? (
                  <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
                    {t('noPendingSosAlertsFor', { name: selectedHistorySenior.name })}
                  </p>
                ) : selectedSeniorResolvedHistory.length > 0 ? (
                  selectedSeniorResolvedHistory.map((alert) => (
                    <AlertHistoryItem
                      key={alert.id}
                      name={alert.seniorName}
                      time={formatAlertTime(alert.alertTime) || formatAlertTime(alert.resolvedAt) || t('resolved')}
                      date={formatAlertDate(alert.alertTime) || formatAlertDate(alert.resolvedAt)}
                      message={alert.message || `${alert.status || t('resolved')} SOS`}
                      location={alert.location}
                      statusLabel={alert.status || t('resolved')}
                      variant="resolved"
                    />
                  ))
                ) : (
                  <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
                    {t('noResolvedSosAlertsFor', { name: selectedHistorySenior.name })}
                  </p>
                )}
              </>
            ) : seniors.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-[#1b1c1c]">{t('seniors')}</h2>
                {seniors.map((senior) => {
                  const activeCount = isAlertStatus(senior.status, senior) ? 1 : 0;
                  const historyCount = filteredSosHistory.filter((alert) => seniorNamesMatch(alert.seniorName, senior.name)).length;
                  const alertCount = activeCount + historyCount;

                  return (
                    <button
                      key={senior.id}
                      type="button"
                      onClick={() => {
                        setHistoryView('pending');
                        setSelectedHistorySeniorId(senior.id);
                      }}
                      className="flex items-center justify-between gap-4 rounded-[18px] bg-white p-5 text-left shadow-sm transition-colors active:bg-[#e4eefb]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-[#1b1c1c]">{senior.name}</p>
                        <p className="mt-1 text-sm font-bold text-[#5f6872]">{alertCount} {t('alerts')}</p>
                      </div>
                      <ChevronRight className="h-6 w-6 flex-shrink-0 text-[#0b2f57]" />
                    </button>
                  );
                })}
              </>
            ) : (
              <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
                {t('noSeniorsFound')}
              </p>
            )}
          </>
        ) : (
          <>
            {selectedHistoryName ? (
              <>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={closeSeniorHistory}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#416642] shadow-sm transition-colors active:bg-[#e7f3e8]"
                    aria-label={t('backToPriorityDashboard')}
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <div className="min-w-0">
                    <h2 className="truncate text-2xl font-bold text-[#1b1c1c]">{selectedHistoryName}</h2>
                    <p className="text-sm font-bold text-[#5f6872]">{selectedSeniorAlertCount} {t('alerts')}</p>
                  </div>
                </div>

                <div className="grid h-11 grid-cols-2 rounded-full bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setHistoryView('pending')}
                    className={`rounded-full px-4 text-sm font-black transition-colors ${
                      isPendingView
                        ? 'bg-[#954a00] text-white'
                        : 'text-[#713700]'
                    }`}
                  >
                    {t('pending')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHistoryView('resolved')}
                    className={`rounded-full px-4 text-sm font-black transition-colors ${
                      !isPendingView
                        ? 'bg-[#18833b] text-white'
                        : 'text-[#124f25]'
                    }`}
                  >
                    {t('resolved')}
                  </button>
                </div>

                {isPendingView && selectedSeniorPendingCount > 0 ? (
                  <>
                    {selectedSeniorActiveAlerts.map((senior) => (
                      <AlertHistoryItem
                        key={senior.id}
                        name={senior.name}
                        time={formatAlertTime(senior.alertTime) || t('active')}
                        date={formatAlertDate(senior.alertTime)}
                        message={senior.alertMessage || t('emergencySosTriggered')}
                        location={senior.location}
                        statusLabel={senior.status || t('sosActive')}
                        variant="pending"
                      />
                    ))}
                    {selectedSeniorPendingHistory.map((alert) => (
                      <AlertHistoryItem
                        key={alert.id}
                        name={alert.seniorName}
                        time={formatAlertTime(alert.alertTime) || t('pending')}
                        date={formatAlertDate(alert.alertTime)}
                        message={alert.message || alert.status || t('sosActive')}
                        location={alert.location}
                        statusLabel={alert.status || t('pending')}
                        variant="pending"
                      />
                    ))}
                  </>
                ) : isPendingView ? (
                  <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
                    {t('noPendingSosAlertsFor', { name: selectedHistoryName })}
                  </p>
                ) : selectedSeniorResolvedHistory.length > 0 ? (
                  selectedSeniorResolvedHistory.map((alert) => (
                    <AlertHistoryItem
                      key={alert.id}
                      name={alert.seniorName}
                      time={formatAlertTime(alert.alertTime) || formatAlertTime(alert.resolvedAt) || t('resolved')}
                      date={formatAlertDate(alert.alertTime) || formatAlertDate(alert.resolvedAt)}
                      message={alert.message || `${alert.status || t('resolved')} SOS`}
                      location={alert.location}
                      statusLabel={alert.status || t('resolved')}
                      variant="resolved"
                    />
                  ))
                ) : (
                  <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
                    {t('noResolvedSosAlertsFor', { name: selectedHistoryName })}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="rounded-[22px] bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black uppercase tracking-wide text-[#71717a]">{t('priorityDashboard')}</p>
                      <h2 className="mt-1 text-[28px] font-black leading-8 text-black">Alerts ({caregiverAlertTotal})</h2>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <PriorityAlertStat
                      active={priorityView === 'active'}
                      colorClass="bg-[#c8171d]"
                      label={t('active')}
                      onClick={() => setPriorityView('active')}
                      value={alertSeniors.length}
                    />
                    <PriorityAlertStat
                      active={priorityView === 'pending'}
                      colorClass="bg-[#954a00]"
                      label={t('pending')}
                      onClick={() => setPriorityView('pending')}
                      value={pendingSosHistory.length}
                    />
                    <PriorityAlertStat
                      active={priorityView === 'resolved'}
                      colorClass="bg-[#18833b]"
                      label={t('resolved')}
                      onClick={() => setPriorityView('resolved')}
                      value={resolvedSosHistory.length}
                    />
                  </div>
                </div>

                <div className="rounded-[22px] bg-white p-5 shadow-sm">
                  <h2 className="text-xl font-black text-[#1b1c1c]">{priorityTitle}</h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {priorityView === 'active' && alertSeniors.length > 0 ? (
                      alertSeniors.map((senior) => (
                        <TodayAlertRow
                          key={senior.id}
                          isResolving={senior.alertId ? resolvingAlertIds.includes(senior.alertId) : false}
                          name={senior.name}
                          phone={senior.phone}
                          status={senior.status || t('sosActive')}
                          time={formatAlertTime(senior.alertTime) || t('active')}
                          onResolve={() => onResolveAlert(senior)}
                          onViewHistory={() => {
                            openSeniorHistory(senior.name, 'pending');
                          }}
                        />
                      ))
                    ) : priorityView === 'pending' && pendingAlertGroups.length > 0 ? (
                      pendingAlertGroups.map((group) => (
                        <AlertSeniorGroupCard
                          key={group.name}
                          group={group}
                          onView={() => openSeniorHistory(group.name, 'pending')}
                        />
                      ))
                    ) : priorityView === 'resolved' && resolvedAlertGroups.length > 0 ? (
                      resolvedAlertGroups.map((group) => (
                        <AlertSeniorGroupCard
                          key={group.name}
                          group={group}
                          onView={() => openSeniorHistory(group.name, 'resolved')}
                        />
                      ))
                    ) : (
                      <p className="py-5 text-base font-semibold text-[#71717a]">
                        {priorityView === 'active'
                          ? t('noActiveAlertsToday')
                          : priorityView === 'pending'
                            ? t('noPendingSosAlerts')
                            : t('noResolvedSosAlertsYet')}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function AlertCard({
  date,
  kind,
  title,
  label,
  location,
  message,
  phone,
  time,
  icon,
  isResolving,
  onResolve,
}: {
  date?: string;
  kind: 'sos' | 'missed';
  title: string;
  label: string;
  location?: string;
  message?: string;
  phone?: string;
  time?: string;
  icon: React.ReactNode;
  isResolving: boolean;
  onResolve: () => void;
}) {
  const { t } = useTranslation();
  const isSos = kind === 'sos';
  const phoneHref = getPhoneHref(phone || '');
  const directionsHref = getDirectionsHref(location || message || '');
  const mapEmbedSrc = getMapEmbedSrc(location || '');

  return (
    <div
      className={`rounded-[28px] border-l-8 p-5 shadow-sm min-[390px]:rounded-[32px] ${
        isSos
          ? 'border-[#831318] bg-[#a42d2d] text-[#ffc1bc]'
          : 'border-[#954a00] bg-[#ffdcc6] text-[#301400]'
      }`}
    >

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isSos ? 'bg-[#831318] text-white' : 'bg-[#954a00] text-white'}`}>
            {icon}
          </div>
          <div>
            <p className={`text-sm font-bold uppercase tracking-wide ${isSos ? 'text-[#ffc1bc]' : 'text-[#713700]'}`}>
              {label}
            </p>
            <h2 className="text-2xl font-bold text-current">{title}</h2>
          </div>
        </div>
        {(time || date) && (
          <div className="flex flex-shrink-0 flex-col items-end gap-1 text-right">
            {time && <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-current">{time}</span>}
            {date && <span className="text-xs font-bold text-current opacity-80">{date}</span>}
          </div>
        )}
      </div>

      {isSos ? (
        <>
          <div className="mb-3 flex items-center gap-2 rounded-2xl bg-white/10 p-3">
            <MapPin className="h-5 w-5 flex-shrink-0 text-[#ffdad7]" />
            <span className="whitespace-normal break-words text-base font-semibold leading-6 text-[#ffdad7]">{location || message || t('locationDetailsUnavailable')}</span>
          </div>

          {mapEmbedSrc && (
            <div className="mb-5 overflow-hidden rounded-2xl border border-white/20 bg-white/5">
              <iframe
                src={mapEmbedSrc}
                title={`Map for ${title}`}
                className="h-52 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </>
      ) : (
        <div className="mb-5 flex items-center gap-2">
          <Info className="h-5 w-5 flex-shrink-0 text-[#954a00]" />
          <p className="text-base font-semibold text-[#301400]">{t('reviewLatestStatus')}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <AlertActionButton
          href={phoneHref}
          icon={<Phone className="h-5 w-5" />}
          label={t('call')}
          variant={isSos ? 'light' : 'warning'}
        />
        <AlertActionButton
          icon={<CheckCircle className="h-5 w-5" />}
          label={isResolving ? t('resolving') : t('resolve')}
          variant={isResolving ? 'success' : isSos ? 'danger' : 'light'}
          disabled={isResolving}
          onClick={onResolve}
        />
      </div>

      {isSos && directionsHref && (
        <a
          href={directionsHref}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-white text-[#831318] text-base font-bold shadow-sm transition-transform active:scale-95"
        >
          <MapPin className="h-5 w-5" />
          <span>{t('getDirections')}</span>
        </a>
      )}
    </div>
  );
}

function PriorityAlertStat({
  active,
  colorClass,
  label,
  onClick,
  value,
}: {
  active: boolean;
  colorClass: string;
  label: string;
  onClick: () => void;
  value: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center gap-3 rounded-[14px] px-3 text-left transition-colors active:scale-[0.99] ${
        active ? 'bg-[#f4f6f8]' : 'bg-transparent'
      }`}
    >
      <span className={`h-3 w-3 rounded-full ${colorClass}`} />
      <span className="text-lg font-black text-[#30343a]">{label}</span>
      <span className="ml-auto text-lg font-black text-black">({value})</span>
    </button>
  );
}

function TodayAlertRow({
  isResolving,
  name,
  onResolve,
  onViewHistory,
  phone,
  status,
  time,
}: {
  isResolving: boolean;
  name: string;
  onResolve: () => void;
  onViewHistory: () => void;
  phone?: string;
  status: string;
  time: string;
}) {
  const { t } = useTranslation();
  const phoneHref = getPhoneHref(phone || '');

  return (
    <div className="py-3">
      <div className="rounded-[18px] border-2 border-[#c8171d] bg-[#fff1f1] p-4 shadow-[0_10px_22px_rgba(200,23,29,0.14)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#c8171d] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              <ShieldAlert className="h-4 w-4" />
              {t('active')}
            </div>
            <p className="truncate text-xl font-black text-[#1b1c1c]">{name}</p>
            <p className="mt-1 text-base font-black text-[#c8171d]">{status || t('sosActive')}</p>
            <p className="mt-1 text-sm font-bold text-[#8f1015]">{t('emergencySosTriggered')}</p>
          </div>
          <p className="flex-shrink-0 rounded-full bg-white px-3 py-1 text-sm font-black text-[#c8171d] shadow-sm">{time}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={phoneHref}
            aria-disabled={!phoneHref}
            className={`flex h-11 items-center justify-center gap-2 rounded-[10px] border text-sm font-black uppercase active:scale-95 ${
              phoneHref
                ? 'border-[#c8171d] bg-white text-[#c8171d]'
                : 'pointer-events-none border-[#e7b3b5] bg-[#f8e2e3] text-[#9d6b6d]'
            }`}
          >
            <Phone className="h-4 w-4" />
            {t('call')}
          </a>
          <button
            type="button"
            disabled={isResolving}
            onClick={onResolve}
            className="flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#c8171d] text-sm font-black uppercase text-white active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
          >
            <CheckCircle className="h-4 w-4" />
            {isResolving ? t('resolving') : t('resolve')}
          </button>
        </div>
        <button
          type="button"
          onClick={onViewHistory}
          className="mt-3 inline-flex items-center text-sm font-black text-[#8f1015] active:scale-95"
        >
          <span>{t('viewHistory')}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type AlertHistoryGroup = {
  count: number;
  latestAlert: SosAlertHistory;
  latestDate: string;
  latestTime: string;
  name: string;
  variant: 'pending' | 'resolved';
};

function groupSosAlertsBySenior(alerts: SosAlertHistory[], variant: 'pending' | 'resolved'): AlertHistoryGroup[] {
  const groups = new Map<string, SosAlertHistory[]>();

  alerts.forEach((alert) => {
    const name = alert.seniorName?.trim() || 'Unknown Senior';
    groups.set(name, [...(groups.get(name) || []), alert]);
  });

  return Array.from(groups.entries())
    .map(([name, seniorAlerts]) => {
      const sortedAlerts = [...seniorAlerts].sort((left, right) => {
        const leftTime = new Date(left.alertTime || left.resolvedAt || 0).getTime();
        const rightTime = new Date(right.alertTime || right.resolvedAt || 0).getTime();

        return rightTime - leftTime;
      });
      const latestAlert = sortedAlerts[0];

      return {
        count: seniorAlerts.length,
        latestAlert,
        latestDate: formatAlertDate(latestAlert.alertTime) || formatAlertDate(latestAlert.resolvedAt) || '',
        latestTime: formatAlertTime(latestAlert.alertTime) || formatAlertTime(latestAlert.resolvedAt) || (variant === 'pending' ? 'Pending' : 'Resolved'),
        name,
        variant,
      };
    })
    .sort((left, right) => {
      const leftTime = new Date(left.latestAlert.alertTime || left.latestAlert.resolvedAt || 0).getTime();
      const rightTime = new Date(right.latestAlert.alertTime || right.latestAlert.resolvedAt || 0).getTime();

      return rightTime - leftTime;
    });
}

function AlertSeniorGroupCard({
  group,
  onView,
}: {
  group: AlertHistoryGroup;
  onView: () => void;
}) {
  const isPending = group.variant === 'pending';
  const surfaceClass = isPending ? 'bg-[#fff2e8]' : 'bg-[#e9f6ed]';
  const textClass = isPending ? 'text-[#713700]' : 'text-[#124f25]';
  const accentClass = isPending ? 'text-[#954a00]' : 'text-[#18833b]';
  const label = isPending ? 'Pending' : 'Resolved';

  return (
    <button
      type="button"
      onClick={onView}
      className={`flex w-full items-center justify-between gap-3 rounded-[22px] p-4 text-left shadow-sm transition-transform active:scale-[0.99] ${surfaceClass}`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {isPending ? (
            <TriangleAlert className={`h-6 w-6 flex-shrink-0 ${accentClass}`} />
          ) : (
            <CheckCircle className={`h-6 w-6 flex-shrink-0 ${accentClass}`} />
          )}
          <p className={`truncate text-xl font-black ${textClass}`}>{group.name}</p>
        </div>
        <p className={`mt-2 text-sm font-black ${accentClass}`}>
          {label} ({group.count})
        </p>
        <p className="mt-2 text-sm font-semibold leading-5 text-[#30343a]">
          Latest: {group.latestAlert.message || group.latestAlert.status || 'SOS alert triggered'}
        </p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end text-right">
        <p className={`text-sm font-black ${accentClass}`}>{group.latestTime}</p>
        {group.latestDate && <p className={`mt-1 text-xs font-bold ${accentClass}`}>{group.latestDate}</p>}
        <span className={`mt-4 inline-flex items-center text-sm font-black ${accentClass}`}>
          View
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

// Action button component used in alert cards with different styles based on variant
function AlertActionButton({
  disabled = false,
  href,
  icon,
  label,
  onClick,
  variant,
}: {
  disabled?: boolean;
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant: 'light' | 'danger' | 'warning' | 'success';
}) {
  const className =
    variant === 'success'
      ? 'bg-[#18833b] text-white'
      : variant === 'danger'
      ? 'bg-[#831318] text-white'
      : variant === 'warning'
        ? 'bg-[#954a00] text-white'
        : 'bg-white text-[#831318]';
  const buttonClass = `flex h-14 items-center justify-center gap-2 rounded-full text-base font-bold shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`;

  if (href && !disabled) {
    return (
      <a href={href} className={buttonClass}>
        {icon}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AlertHistoryItem({
  date,
  location,
  name,
  statusLabel,
  time,
  message,
  variant = 'resolved',
}: {
  date?: string;
  location?: string;
  name: string;
  statusLabel?: string;
  time: string;
  message: string;
  variant?: 'pending' | 'resolved';
}) {
  const { t } = useTranslation();
  const isPending = variant === 'pending';
  const directionsHref = getDirectionsHref(location || '');
  const statusText = statusLabel || (isPending ? t('sosActive') : t('resolved'));

  return (
    <div className={`rounded-[28px] p-4 shadow-sm min-[390px]:rounded-[32px] ${isPending ? 'bg-[#fff2e8]' : 'bg-[#e9f6ed]'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            {isPending ? (
              <TriangleAlert className="h-5 w-5 flex-shrink-0 text-[#954a00]" />
            ) : (
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#18833b]" />
            )}
            <p className={`truncate text-lg font-black ${isPending ? 'text-[#713700]' : 'text-[#124f25]'}`}>{name}</p>
          </div>
          <p className={`mt-1 text-sm font-bold ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}>
            {statusText}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end text-right">
          <span className={`text-sm font-bold ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}>{time}</span>
          {date && <span className={`mt-1 text-xs font-bold ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}>{date}</span>}
        </div>
      </div>
      <p className={`mt-3 text-sm font-semibold leading-5 ${isPending ? 'text-[#301400]' : 'text-[#1d5031]'}`}>{message || t('sosAlertTriggered')}</p>
      {location && (
        <div className={`mt-3 flex items-start gap-2 ${isPending ? 'text-[#713700]' : 'text-[#2e6f42]'}`}>
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p className="whitespace-pre-line break-words text-sm font-bold leading-5">{location}</p>
        </div>
      )}
      {directionsHref && (
        <a
          href={directionsHref}
          target="_blank"
          rel="noreferrer"
          className={`mt-3 inline-flex items-center text-sm font-black ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}
        >
          <span>{t('openDirections')}</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

// Fed by Senior_stuff's route_engine.queue_activity_log() via the ServiceNow
// u_sensor_activity_log table (see server/servicenow.mjs's getSensorActivitySnapshot).
// v1 is a single-senior link (SERVICE_NOW_SENSOR_SENIOR_ID), so this renders the
// same live data regardless of which senior's profile is open.
function LiveSensorStatus({ seniorKey }: { seniorKey: string }) {
  const [status, setStatus] = useState<SensorStatus | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState('');
  // Phase 9 — vitals sub-tabs: "Live" rides the MQTT/WebSocket bridge (1 Hz,
  // 60 s rolling sparkline); "History" fetches 15-min batched averages from
  // ServiceNow. Dense multi-day time-series are deliberately not rendered
  // on mobile.
  const [vitalsTab, setVitalsTab] = useState<'live' | 'history'>('live');
  const live = useLiveVitals(vitalsTab === 'live');
  const [history, setHistory] = useState<VitalsHistory | null>(null);
  const [historyError, setHistoryError] = useState('');

  useEffect(() => {
    if (vitalsTab !== 'history') {
      return;
    }

    let isMounted = true;

    getVitalsHistory()
      .then((result) => {
        if (isMounted) {
          setHistory(result);
          setHistoryError('');
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setHistoryError(
            loadError instanceof Error ? loadError.message : 'Unable to load vitals history.',
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, [vitalsTab, seniorKey]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const result = await getSensorStatus();

        if (isMounted) {
          setStatus(result);
          setError('');
        }
      } catch (loadError) {
        console.error('Unable to load live sensor status:', loadError);

        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load live sensor status.');
        }
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    }

    load();
    const refreshTimer = window.setInterval(load, SENSOR_STATUS_REFRESH_MS);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, [seniorKey]);

  // Avoid a flash of "not configured" before the first response, and render
  // nothing at all when SERVICE_NOW_SENSOR_SENIOR_ID isn't configured (status
  // stays null in that case - see getSensorActivitySnapshot).
  if (!hasLoaded || !status) {
    return null;
  }

  const hasAnyData =
    Boolean(status.rooms.bedroom.value) ||
    Boolean(status.rooms.bathroom.value) ||
    Boolean(status.rooms.livingRoom.value) ||
    status.vitals.hr !== null ||
    status.vitals.br !== null;

  return (
    <SeniorDetailSection title="Live Sensors" tone="blue" icon={<Activity className="h-6 w-6" />}>
      {!hasAnyData ? (
        <div className="px-5 py-6 text-center text-sm font-semibold text-[#71717a]">
          {error || 'No live sensor data yet.'}
        </div>
      ) : (
        <div className="space-y-4 px-5 py-4">
          <div className="grid grid-cols-3 gap-3">
            <RoomStatusTile icon={<Bed className="h-6 w-6" />} label="Bedroom" room={status.rooms.bedroom} />
            <RoomStatusTile icon={<Bath className="h-6 w-6" />} label="Bathroom" room={status.rooms.bathroom} />
            <RoomStatusTile icon={<Sofa className="h-6 w-6" />} label="Living Room" room={status.rooms.livingRoom} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 rounded-full bg-[#f0f2f5] p-1">
              {(['live', 'history'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setVitalsTab(tab)}
                  className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide transition-colors ${
                    vitalsTab === tab ? 'bg-white text-[#18833b] shadow-sm' : 'text-[#71717a]'
                  }`}
                >
                  {tab === 'live' ? 'Live' : 'History'}
                </button>
              ))}
            </div>
            {vitalsTab === 'live' && (
              <span
                className={`text-xs font-semibold ${live.connected ? 'text-[#18833b]' : 'text-[#94a3b8]'}`}
              >
                {live.connected ? '● live link' : '○ connecting…'}
              </span>
            )}
          </div>

          {vitalsTab === 'live' ? (
            <div className="grid grid-cols-2 gap-3">
              <LiveVitalCard
                icon={<Heart className="h-6 w-6" />}
                label="Heart Rate"
                unit="BPM"
                value={live.hr ?? status.vitals.hr}
                isLive={live.hr !== null}
                series={live.hrSeries}
                fallbackTrend={status.vitals.hrTrend}
                normalLow={60}
                normalHigh={100}
              />
              <LiveVitalCard
                icon={<Wind className="h-6 w-6" />}
                label="Breath Rate"
                unit="BRPM"
                value={live.br ?? status.vitals.br}
                isLive={live.br !== null}
                series={live.brSeries}
                fallbackTrend={status.vitals.brTrend}
                normalLow={12}
                normalHigh={20}
              />
            </div>
          ) : (
            <VitalsHistoryPanel history={history} error={historyError} />
          )}

          {vitalsTab === 'live' && !live.connected && status.lastUpdated && (
            <p className="text-center text-xs font-semibold text-[#94a3b8]">
              Live link offline — showing last synced ({formatDetailDateTime(status.lastUpdated)})
            </p>
          )}
        </div>
      )}
    </SeniorDetailSection>
  );
}

function RoomStatusTile({
  icon,
  label,
  room,
}: {
  icon: React.ReactNode;
  label: string;
  room: RoomOccupancy;
}) {
  const isKnown = room.occupied !== null;
  const isOccupied = room.occupied === true;
  const toneClass = !isKnown
    ? 'bg-[#f0f2f5] text-[#94a3b8]'
    : isOccupied
      ? 'bg-[#e9f6ed] text-[#18833b]'
      : 'bg-[#f0f2f5] text-[#71717a]';

  return (
    <div className={`flex flex-col items-center gap-2 rounded-[14px] px-2 py-4 ${toneClass}`}>
      {icon}
      <p className="text-sm font-bold">{label}</p>
      <p className="text-xs font-semibold">{!isKnown ? 'No data' : isOccupied ? 'Occupied' : 'Empty'}</p>
    </div>
  );
}

// Clinical threshold coloring (Phase 9.2): green inside the normal band,
// red outside it (tachycardia/bradycardia, tachypnea/bradypnea).
function vitalTone(value: number | null, low: number, high: number) {
  if (value === null) {
    return '#94a3b8';
  }

  return value >= low && value <= high ? '#18833b' : '#c8171d';
}

function LiveVitalCard({
  icon,
  label,
  unit,
  value,
  isLive,
  series,
  fallbackTrend,
  normalLow,
  normalHigh,
}: {
  icon: React.ReactNode;
  label: string;
  unit: string;
  value: number | null;
  isLive: boolean;
  series: VitalPoint[];
  fallbackTrend: SensorTrendPoint[];
  normalLow: number;
  normalHigh: number;
}) {
  const tone = vitalTone(value, normalLow, normalHigh);
  // 60-second rolling live sparkline; before the first live tick arrives,
  // fall back to the last synced ServiceNow trend so the card is never blank.
  const chartData: Array<{ value: number }> = series.length > 1 ? series : fallbackTrend;

  return (
    <div className="rounded-[14px] bg-[#f0f2f5] p-4">
      <div className="flex items-center gap-2">
        <div style={{ color: tone }}>{icon}</div>
        <p className="text-sm font-semibold text-[#71717a]">{label}</p>
      </div>
      <p className="mt-1 text-4xl font-extrabold leading-none" style={{ color: tone }}>
        {value !== null ? value : '–'}
        <span className="ml-1 text-sm font-bold text-[#71717a]">{unit}</span>
      </p>
      <p className="mt-1 text-[11px] font-semibold text-[#94a3b8]">
        Normal {normalLow}–{normalHigh} · {isLive ? 'live · 60s window' : 'last synced'}
      </p>
      {chartData.length > 1 && (
        <div className="mt-2 h-12 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="value" stroke={tone} strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function VitalsHistoryPanel({ history, error }: { history: VitalsHistory | null; error: string }) {
  if (error) {
    return <p className="py-4 text-center text-sm font-semibold text-[#c8171d]">{error}</p>;
  }

  if (!history) {
    return <p className="py-4 text-center text-sm font-semibold text-[#94a3b8]">Loading history…</p>;
  }

  if (history.hr.length === 0 && history.br.length === 0) {
    return (
      <p className="py-4 text-center text-sm font-semibold text-[#94a3b8]">
        No vitals history{history.date ? ` for ${history.date}` : ''} yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <HistoryTrend
        title="Heart Rate — 15-min averages (bpm)"
        data={history.hr}
        color="#c8171d"
        unit="bpm"
        normalLow={60}
        normalHigh={100}
      />
      <HistoryTrend
        title="Breath Rate — 15-min averages (brpm)"
        data={history.br}
        color="#075fc7"
        unit="brpm"
        normalLow={12}
        normalHigh={20}
      />
      <p className="text-center text-[11px] font-semibold text-[#94a3b8]">
        Daily baseline · {history.date} · {history.samples} readings · source: ServiceNow
      </p>
    </div>
  );
}

// 15-min vitals averages as a line over the clinical normal band. The band
// (recessive neutral fill + dashed bounds, labeled in the header) is what
// makes a breach readable at a glance — the line visibly exits it. Y domain
// always contains BOTH the band and the data, so two similar in-range values
// no longer render as identical full-height blocks (the old bar version's
// [0, auto] domain did exactly that). Y ticks sit exactly on the two
// thresholds — they're the only reference values that matter here.
function HistoryTrend({
  title,
  data,
  color,
  unit,
  normalLow,
  normalHigh,
}: {
  title: string;
  data: Array<{ time: string; avg: number }>;
  color: string;
  unit: string;
  normalLow: number;
  normalHigh: number;
}) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[14px] bg-[#f0f2f5] p-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-bold text-[#71717a]">{title}</p>
        <p className="shrink-0 text-[10px] font-semibold text-[#94a3b8]">
          normal {normalLow}–{normalHigh}
        </p>
      </div>
      <div className="mt-1 h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 9, fill: '#94a3b8' }}
              interval="preserveStartEnd"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              width={30}
              domain={[
                (dataMin: number) => Math.floor(Math.min(dataMin - 4, normalLow - 8)),
                (dataMax: number) => Math.ceil(Math.max(dataMax + 4, normalHigh + 8)),
              ]}
              ticks={[normalLow, normalHigh]}
              tick={{ fontSize: 9, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceArea y1={normalLow} y2={normalHigh} fill="#64748b" fillOpacity={0.1} stroke="none" />
            <ReferenceLine y={normalLow} stroke="#94a3b8" strokeDasharray="4 3" strokeWidth={1} />
            <ReferenceLine y={normalHigh} stroke="#94a3b8" strokeDasharray="4 3" strokeWidth={1} />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`, '']}
              separator=""
              labelStyle={{ fontSize: 11, fontWeight: 700, color: '#30343a' }}
              itemStyle={{ fontSize: 11, fontWeight: 700, color: '#30343a' }}
              contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', padding: '4px 8px' }}
              cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 2.5, strokeWidth: 0, fill: color }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#ffffff' }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── LIVE MONITOR TAB — controller-grade live view, phone-sized ──
// Mirrors the Pi dashboard's live surfaces (vitals, room occupancy, movement/
// distance, per-node heartbeats, alert feed) as stacked mobile cards. Vitals
// ride the MQTT/WebSocket bridge; everything else polls the ServiceNow
// snapshot every LIVE_TAB_REFRESH_MS.
const LIVE_TAB_REFRESH_MS = 10000;

function parseLoggedAt(value: string) {
  if (!value || value.length < 19) {
    return null;
  }

  const parsed = new Date(value.replace(' ', 'T'));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function timeAgo(value: string) {
  const parsed = parseLoggedAt(value);

  if (!parsed) {
    return 'unknown';
  }

  const seconds = Math.max(0, Math.round((Date.now() - parsed.getTime()) / 1000));

  if (seconds < 90) {
    return `${seconds}s ago`;
  }

  if (seconds < 5400) {
    return `${Math.round(seconds / 60)}m ago`;
  }

  return `${Math.round(seconds / 3600)}h ago`;
}

// Same thresholds as the Pi fleet watchdog: fresh ≤2 min, stale ≤5 min
// (FLEET_OFFLINE_SEC), offline beyond that.
function nodeFreshness(value: string) {
  const parsed = parseLoggedAt(value);
  const seconds = parsed ? (Date.now() - parsed.getTime()) / 1000 : Infinity;

  if (seconds <= 120) {
    return { dot: 'bg-[#18833b]', label: 'online', text: 'text-[#18833b]' };
  }

  if (seconds <= 300) {
    return { dot: 'bg-[#b45309]', label: 'stale', text: 'text-[#b45309]' };
  }

  return { dot: 'bg-[#c8171d]', label: 'offline', text: 'text-[#c8171d]' };
}

function alertTone(value: string) {
  const v = String(value || '').toUpperCase();

  if (v.includes('CRITICAL') || v.includes('FALL')) {
    return 'bg-[#fdecec] text-[#c8171d]';
  }

  if (v.includes('MODERATE') || v.includes('WARNING')) {
    return 'bg-[#fff4e5] text-[#b45309]';
  }

  if (v.includes('MINIMAL') || v.includes('RECOVER')) {
    return 'bg-[#e9f6ed] text-[#18833b]';
  }

  return 'bg-[#f0f2f5] text-[#71717a]';
}

function LiveMonitorCard({
  title,
  live,
  children,
}: {
  title: string;
  live?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] bg-white p-4 shadow-[0_6px_18px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widest text-[#71717a]">{title}</p>
        {live !== undefined && (
          <span className={`text-[10px] font-black uppercase ${live ? 'text-[#18833b]' : 'text-[#94a3b8]'}`}>
            {live ? '● live' : 'synced'}
          </span>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

// Live samples older than this fall back to the ServiceNow snapshot.
const LIVE_FRESH_MS = 5 * 60 * 1000;

function toLoggedAt(epoch: number) {
  const d = new Date(epoch);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function isLiveFresh(room: LiveRoomState | null) {
  return Boolean(room && Date.now() - room.at < LIVE_FRESH_MS);
}

// Prefer the MQTT-fed room state while fresh; otherwise the SN snapshot.
function liveRoomToOccupancy(liveRoom: LiveRoomState | null, fallback?: RoomOccupancy): RoomOccupancy {
  if (liveRoom && isLiveFresh(liveRoom)) {
    return { occupied: liveRoom.occupied, value: liveRoom.value, loggedAt: toLoggedAt(liveRoom.at) };
  }

  return fallback ?? { occupied: null, value: '', loggedAt: '' };
}

function LiveMonitorTab() {
  const [status, setStatus] = useState<SensorStatus | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState('');
  const [vitalsTab, setVitalsTab] = useState<'live' | 'history'>('live');
  // The whole tab rides the MQTT/WS bridge now (rooms, activity, nodes,
  // events) — keep the socket open regardless of the vitals sub-tab.
  const live = useLiveVitals(true);
  const [history, setHistory] = useState<VitalsHistory | null>(null);
  const [historyError, setHistoryError] = useState('');
  // 5 s re-render tick: keeps the "x ago" labels and the link-staleness chip
  // honest — an OPEN WebSocket is not the same as flowing data (the Pi's
  // network path flaps; the bridge socket stays up while MQTT is dead).
  const [nowTick, setNowTick] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowTick(Date.now()), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const dataAgeMs = live.lastMessageAt ? nowTick - live.lastMessageAt : null;
  const feed: 'connecting' | 'waiting' | 'live' | 'idle' = !live.connected
    ? 'connecting'
    : dataAgeMs === null
      ? 'waiting'
      : dataAgeMs > 30000
        ? 'idle'
        : 'live';

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const result = await getSensorStatus();

        if (isMounted) {
          setStatus(result);
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load sensor status.');
        }
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    }

    load();
    const timer = window.setInterval(load, LIVE_TAB_REFRESH_MS);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (vitalsTab !== 'history') {
      return;
    }

    let isMounted = true;

    getVitalsHistory()
      .then((result) => {
        if (isMounted) {
          setHistory(result);
          setHistoryError('');
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setHistoryError(loadError instanceof Error ? loadError.message : 'Unable to load history.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [vitalsTab]);

  // ── LIVE-FIRST derivation: MQTT-fed values win while fresh; the
  // ServiceNow snapshot fills the gaps and survives reloads. ──
  const roomsLive = isLiveFresh(live.rooms.bedroom) || isLiveFresh(live.rooms.bathroom)
    || isLiveFresh(live.rooms.livingRoom);
  const bedroomRoom = liveRoomToOccupancy(live.rooms.bedroom, status?.rooms.bedroom);
  const bathroomRoom = liveRoomToOccupancy(live.rooms.bathroom, status?.rooms.bathroom);
  const livingRoomRoom = liveRoomToOccupancy(live.rooms.livingRoom, status?.rooms.livingRoom);
  const hasRoomData = [bedroomRoom, bathroomRoom, livingRoomRoom].some((room) => room.occupied !== null);

  const movement = live.movement ?? status?.activity?.movement ?? null;
  const distanceCm = live.distanceCm ?? status?.activity?.distanceCm ?? null;
  const activityLive = live.movement !== null || live.distanceCm !== null;

  // Node freshness: newest of (live socket sighting, ServiceNow row).
  const nodeMap = new Map<string, string>();
  for (const node of status?.nodes ?? []) {
    nodeMap.set(node.location, node.lastSeen);
  }
  for (const [location, epoch] of Object.entries(live.nodes)) {
    const liveSeen = toLoggedAt(epoch);
    const known = nodeMap.get(location);
    if (!known || known < liveSeen) {
      nodeMap.set(location, liveSeen);
    }
  }
  const nodes = [...nodeMap.entries()]
    .map(([location, lastSeen]) => ({ location, lastSeen }))
    .sort((a, b) => (a.location < b.location ? -1 : 1));

  // Alert feed: live fall/recovery events first, then the logged history.
  const liveEventRows = live.events.map((event) => ({
    location: event.location,
    value: event.value,
    status: 'live radar event',
    loggedAt: toLoggedAt(event.at),
  }));
  const recentAlerts = [...liveEventRows, ...(status?.recentAlerts ?? [])].slice(0, 8);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#151515]">Live Monitor</h1>
          <p className="text-sm font-semibold text-[#71717a]">Sensor node · live telemetry</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            feed === 'live'
              ? 'bg-[#e9f6ed] text-[#18833b]'
              : feed === 'idle'
                ? 'bg-[#fff4e5] text-[#b45309]'
                : 'bg-[#f0f2f5] text-[#94a3b8]'
          }`}
        >
          {feed === 'live' && '● LIVE'}
          {feed === 'idle' && `◐ NO DATA ${Math.round((dataAgeMs ?? 0) / 1000)}s`}
          {feed === 'waiting' && '○ WAITING FOR DATA…'}
          {feed === 'connecting' && '○ CONNECTING…'}
        </span>
      </header>

      {/* ── Clinical vitals: live (WS) / history (ServiceNow 15-min avgs) ── */}
      <LiveMonitorCard title="Clinical Vitals">
        <div className="mb-3 flex gap-1 rounded-full bg-[#f0f2f5] p-1">
          {(['live', 'history'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setVitalsTab(tab)}
              className={`flex-1 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide transition-colors ${
                vitalsTab === tab ? 'bg-white text-[#18833b] shadow-sm' : 'text-[#71717a]'
              }`}
            >
              {tab === 'live' ? 'Live' : 'History'}
            </button>
          ))}
        </div>
        {vitalsTab === 'live' ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <LiveVitalCard
                icon={<Heart className="h-6 w-6" />}
                label="Heart Rate"
                unit="BPM"
                value={live.hr ?? status?.vitals.hr ?? null}
                isLive={live.hr !== null}
                series={live.hrSeries}
                fallbackTrend={status?.vitals.hrTrend ?? []}
                normalLow={60}
                normalHigh={100}
              />
              <LiveVitalCard
                icon={<Wind className="h-6 w-6" />}
                label="Breath Rate"
                unit="BRPM"
                value={live.br ?? status?.vitals.br ?? null}
                isLive={live.br !== null}
                series={live.brSeries}
                fallbackTrend={status?.vitals.brTrend ?? []}
                normalLow={12}
                normalHigh={20}
              />
            </div>
            {!live.connected && status?.lastUpdated && (
              <p className="mt-2 text-center text-xs font-semibold text-[#94a3b8]">
                Live link offline — showing last synced ({timeAgo(status.lastUpdated)})
              </p>
            )}
          </>
        ) : (
          <VitalsHistoryPanel history={history} error={historyError} />
        )}
      </LiveMonitorCard>

      {/* ── Room occupancy (MQTT-fed, ServiceNow fallback) ── */}
      <LiveMonitorCard title="Rooms" live={roomsLive}>
        {hasRoomData ? (
          <div className="grid grid-cols-3 gap-3">
            <RoomStatusTile icon={<Bed className="h-6 w-6" />} label="Bedroom" room={bedroomRoom} />
            <RoomStatusTile icon={<Bath className="h-6 w-6" />} label="Bathroom" room={bathroomRoom} />
            <RoomStatusTile icon={<Sofa className="h-6 w-6" />} label="Living Room" room={livingRoomRoom} />
          </div>
        ) : (
          <p className="py-2 text-center text-sm font-semibold text-[#94a3b8]">
            {hasLoaded ? error || 'No sensor data yet.' : 'Loading…'}
          </p>
        )}
      </LiveMonitorCard>

      {/* ── Movement / distance (living-room radar) ── */}
      <LiveMonitorCard title="Activity — Living Room Radar" live={activityLive}>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[14px] bg-[#f0f2f5] p-4 text-center">
            <p className="text-3xl font-extrabold text-[#151515]">{movement !== null ? movement : '–'}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#71717a]">Body movement</p>
          </div>
          <div className="rounded-[14px] bg-[#f0f2f5] p-4 text-center">
            <p className="text-3xl font-extrabold text-[#151515]">
              {distanceCm !== null ? `${distanceCm}` : '–'}
              <span className="ml-1 text-sm font-bold text-[#71717a]">cm</span>
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#71717a]">Target distance</p>
          </div>
        </div>
      </LiveMonitorCard>

      {/* ── Node heartbeats (per sensor location) ── */}
      <LiveMonitorCard title="Node Health" live={Object.keys(live.nodes).length > 0}>
        {nodes.length === 0 ? (
          <p className="py-2 text-center text-sm font-semibold text-[#94a3b8]">No node activity yet.</p>
        ) : (
          <ul className="divide-y divide-[#eef1f4]">
            {nodes.map((node) => {
              const tone = nodeFreshness(node.lastSeen);

              return (
                <li key={node.location} className="flex items-center justify-between py-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#30343a]">
                    <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
                    {node.location}
                  </span>
                  <span className={`text-xs font-bold ${tone.text}`}>
                    {tone.label} · {timeAgo(node.lastSeen)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </LiveMonitorCard>

      {/* ── Recent alert feed (live radar events + logged ALERTS rows) ── */}
      <LiveMonitorCard title="Recent Alerts" live={live.events.length > 0}>
        {recentAlerts.length === 0 ? (
          <p className="py-2 text-center text-sm font-semibold text-[#94a3b8]">No alerts logged.</p>
        ) : (
          <ul className="space-y-2">
            {recentAlerts.map((alert, index) => (
              <li key={`${alert.loggedAt}-${index}`} className="flex items-start gap-3">
                <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-black ${alertTone(alert.value)}`}>
                  {alert.value || '—'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#30343a]">
                    {alert.location} · <span className="font-semibold text-[#71717a]">{alert.status}</span>
                  </p>
                  <p className="text-xs font-semibold text-[#94a3b8]">{timeAgo(alert.loggedAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </LiveMonitorCard>

      {status?.lastUpdated && (
        <p className="text-center text-xs font-semibold text-[#94a3b8]">
          ServiceNow sync {timeAgo(status.lastUpdated)} · refreshes every {LIVE_TAB_REFRESH_MS / 1000}s
        </p>
      )}
    </div>
  );
}

function ResidentProfileDetails({
  senior,
  onBack,
  onSave,
}: {
  senior: Senior;
  onBack: () => void;
  onSave: (senior: Senior, details: SeniorDetailsInput) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState<SeniorDetailsInput>({
    name: senior.name || '',
    phone: senior.phone || '',
    email: senior.email || '',
    location: senior.location || '',
    address: senior.address || '',
  });
  const displayName = getSeniorDetailValue(senior.name);
  const phone = getSeniorDetailValue(senior.phone);
  const email = getSeniorDetailValue(senior.email);
  const gender = getSeniorDetailValue(senior.gender);
  const dateOfBirth = getSeniorDetailValue(senior.dateOfBirth);
  const relationship = getSeniorDetailValue(senior.relationship);
  const emergencyContactName = getSeniorDetailValue(senior.emergencyContactName);
  const emergencyContactPhone = getSeniorDetailValue(senior.emergencyContactPhone);
  const address = getSeniorDetailValue(senior.address);
  const location = getSeniorDetailValue(senior.location);
  const bloodType = getSeniorDetailValue(senior.bloodType);
  const allergies = getSeniorDetailValue(senior.allergies);
  const medicalConditions = getSeniorDetailValue(senior.medicalConditions);
  const currentMedication = getSeniorDetailValue(senior.currentMedication);

  useEffect(() => {
    setFormValues({
      name: senior.name || '',
      phone: senior.phone || '',
      email: senior.email || '',
      location: senior.location || '',
      address: senior.address || '',
    });
  }, [senior]);

  const updateFormValue = (field: keyof SeniorDetailsInput, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!formValues.name.trim()) {
      alert('Senior name is required.');
      return;
    }

    setIsSaving(true);

    try {
      await onSave(senior, {
        name: formValues.name.trim(),
        phone: formValues.phone.trim(),
        email: formValues.email.trim(),
        location: formValues.location.trim(),
        address: formValues.address.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Unable to update senior details:', error);
      alert(error instanceof Error ? error.message : 'Unable to update senior details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="-mx-5 -my-5 min-h-full bg-[#f4f6f8] pb-8">
      <div className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-[#f4f6f8] px-5 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#075fc7] active:bg-blue-50"
          aria-label={t('backToDashboard')}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="truncate text-2xl font-bold text-black">{t('seniorDetails')}</h1>

      </div>

      <section className="px-5 pt-5">
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#17353d] shadow-sm">
            {getInitials(displayName)}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[30px] font-bold leading-9 text-[#111827]">{displayName}</h2>
            <a href={getPhoneHref(senior.phone)} className="mt-2 flex items-center gap-2 text-lg font-medium text-[#334155]">
              <Phone className="h-5 w-5" />
              {phone}
            </a>
            <p className="mt-2 flex items-center gap-2 truncate text-lg font-medium text-[#334155]">
              <Mail className="h-5 w-5" />
              {email}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 space-y-5 px-5">
        {isEditing ? (
          <div className="rounded-[10px] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-black uppercase tracking-wide text-[#3d8508]">{t('editInformation')}</h3>
            <SeniorDetailField label={t('fullName')} value={formValues.name} onChange={(value) => updateFormValue('name', value)} />
            <SeniorDetailField label={t('address')} value={formValues.address} onChange={(value) => updateFormValue('address', value)} />
            <SeniorDetailField label={t('locationZone')} value={formValues.location} onChange={(value) => updateFormValue('location', value)} />
            <SeniorDetailField label={t('phoneNumber')} value={formValues.phone} onChange={(value) => updateFormValue('phone', value)} type="tel" />
            <SeniorDetailField label={t('email')} value={formValues.email} onChange={(value) => updateFormValue('email', value)} type="email" />
                  <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-[10px] bg-[#4b8508] text-lg font-bold text-white shadow-sm active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
            >
              <Pencil className="h-5 w-5" />
              {isSaving ? t('saving') : t('saveInformation')}
            </button>
          </div>
        ) : (
          <>
            <SeniorDetailSection title={t('basicInformation')} tone="green" icon={<Info className="h-6 w-6" />}>
              <SeniorDetailRow icon={<User className="h-6 w-6" />} label={t('fullName')} value={displayName} />
              <SeniorDetailRow icon={<Calendar className="h-6 w-6" />} label={t('dateOfBirth')} value={dateOfBirth} />
              <SeniorDetailRow icon={<User className="h-6 w-6" />} label={t('gender')} value={gender} />
              <SeniorDetailRow icon={<Handshake className="h-6 w-6" />} label={t('relationship')} value={relationship} />
              <SeniorDetailRow icon={<MapPin className="h-6 w-6" />} label={t('address')} value={address} />
              <SeniorDetailRow icon={<Phone className="h-6 w-6" />} label={t('phoneNumber')} value={phone} />
              <SeniorDetailRow icon={<Mail className="h-6 w-6" />} label={t('email')} value={email} />
            </SeniorDetailSection>

            <SeniorDetailSection title={t('emergencyContact')} tone="red" icon={<ShieldAlert className="h-6 w-6" />}>
              <SeniorDetailRow icon={<User className="h-6 w-6" />} label={t('contactName')} value={emergencyContactName} />
              <SeniorDetailRow icon={<Phone className="h-6 w-6" />} label={t('contactPhone')} value={emergencyContactPhone} />
            </SeniorDetailSection>

            <SeniorDetailSection title={t('medicalInformation')} tone="blue" icon={<Pill className="h-6 w-6" />}>
              <SeniorDetailRow icon={<Heart className="h-6 w-6" />} label={t('bloodType')} value={bloodType} />
              <SeniorDetailRow icon={<Shield className="h-6 w-6" />} label={t('allergies')} value={allergies} />
              <SeniorDetailRow icon={<Activity className="h-6 w-6" />} label={t('medicalConditions')} value={medicalConditions} />
              <SeniorDetailRow icon={<Pill className="h-6 w-6" />} label={t('currentMedication')} value={currentMedication} />
            </SeniorDetailSection>

            <LiveSensorStatus seniorKey={senior.userId || senior.id} />

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-[10px] bg-[#4b8508] text-xl font-bold text-white shadow-sm active:scale-[0.98]"
            >
              <Pencil className="h-6 w-6" />
              {t('updateSeniorProfiles')}
            </button>
          </>
        )}
      </section>
    </div>
  );
}

function SeniorDetailSection({
  children,
  icon,
  title,
  tone,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  tone: 'green' | 'red' | 'blue';
}) {
  const toneClass = {
    green: 'bg-[#f5fff7] text-[#3d8508] border-[#cfe9d6]',
    red: 'bg-[#fff7f7] text-[#c8171d] border-[#ffd7d7]',
    blue: 'bg-[#f6faff] text-[#075fc7] border-[#d5e6ff]',
  }[tone];

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-sm">
      <div className={`flex items-center gap-3 border-b px-5 py-4 ${toneClass}`}>
        {icon}
        <h3 className="text-lg font-black uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SeniorDetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[28px_minmax(92px,0.9fr)_minmax(0,1.8fr)] items-center gap-3 border-b border-[#eef0f2] px-5 py-4 last:border-b-0">
      <div className="text-[#94a3b8]">{icon}</div>
      <p className="text-base font-semibold leading-5 text-[#111827]">{label}</p>
      <p className="min-w-0 break-words text-right text-base font-semibold leading-6 text-black">{value}</p>
    </div>
  );
}

function SeniorDetailField({
  label,
  onChange,
  placeholder,
  type = 'text',
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block border-b border-gray-200 py-3 last:border-b-0">
      <span className="mb-1 block text-sm font-semibold text-[#71717a]">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl bg-[#f4f6f8] px-4 py-3 text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#075fc7]"
      />
    </label>
  );
}

function CaregiverProfile({
  caregiverName,
  caregiverEmail,
  isAdminMode,
  onChangeLanguage,
  onLogout,
}: {
  caregiverName: string;
  caregiverEmail: string;
  isAdminMode: boolean;
  onChangeLanguage: () => void;
  onLogout: () => void;
}) {
  const { t } = useTranslation();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showTelegramSetup, setShowTelegramSetup] = useState(false);
  const [phone, setPhone] = useState('91234567');
  const [personalEmail, setPersonalEmail] = useState(caregiverEmail);
  const [address, setAddress] = useState('Block 123 Woodlands');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem(CAREGIVER_PROFILE_IMAGE_KEY) || '');
  const [telegramId, setTelegramId] = useState('');
  const [loadingTelegramId, setLoadingTelegramId] = useState(false);
  const [telegramMessage, setTelegramMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const savedInfo = localStorage.getItem(CAREGIVER_PERSONAL_INFO_KEY);

    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo) as {
          phone?: string;
          email?: string;
          address?: string;
        };

        setPhone(parsedInfo.phone || '91234567');
        setPersonalEmail(parsedInfo.email || caregiverEmail);
        setAddress(parsedInfo.address || 'Block 123 Woodlands');
        return;
      } catch {
        localStorage.removeItem(CAREGIVER_PERSONAL_INFO_KEY);
      }
    }

    setPersonalEmail(caregiverEmail);
  }, [caregiverEmail]);

  useEffect(() => {
    const user = getStoredUser();
    setUserData(user);

    const identityKey = String(user?.uid || user?.email || '').trim();
    const localTelegramId = identityKey ? localStorage.getItem(getCaregiverTelegramStorageKey(identityKey)) || '' : '';
    setTelegramId(localTelegramId);

    if (user?.uid || user?.email) {
      loadTelegramId(String(user?.uid || ''), String(user?.email || ''));
      return;
    }

    setTelegramId('');
  }, [caregiverEmail]);

  const loadTelegramId = async (caregiverId: string, caregiverAccountEmail = '') => {
    try {
      const params = new URLSearchParams();
      if (caregiverId) params.set('caregiverId', caregiverId);
      if (caregiverAccountEmail) params.set('caregiverEmail', caregiverAccountEmail);

      const response = await fetch(`/api/caregiver/telegram-id?${params.toString()}`);
      const data = await response.json();

      const identityKey = String(caregiverId || caregiverAccountEmail || '').trim();

      if (data.telegramId) {
        setTelegramId(data.telegramId);
        if (identityKey) {
          localStorage.setItem(getCaregiverTelegramStorageKey(identityKey), data.telegramId);
        }
      } else {
        setTelegramId('');
        if (identityKey) {
          localStorage.removeItem(getCaregiverTelegramStorageKey(identityKey));
        }
      }
    } catch (error) {
      console.error('Error loading Telegram ID:', error);
    }
  };

  const handleSaveTelegramId = async () => {
    const trimmedTelegramId = telegramId.trim();

    setLoadingTelegramId(true);
    try {
      const response = await fetch('/api/caregiver/telegram-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caregiverId: userData?.uid,
          caregiverEmail: userData?.email,
          telegramId: trimmedTelegramId,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to save Telegram ID');
      }

      const identityKey = String(userData?.uid || userData?.email || '').trim();
      if (trimmedTelegramId) {
        setTelegramId(trimmedTelegramId);
        if (identityKey) {
          localStorage.setItem(getCaregiverTelegramStorageKey(identityKey), trimmedTelegramId);
        }
        setTelegramMessage({ type: 'success', text: 'Telegram Chat ID saved successfully!' });
      } else {
        setTelegramId('');
        if (identityKey) {
          localStorage.removeItem(getCaregiverTelegramStorageKey(identityKey));
        }
        setTelegramMessage({ type: 'success', text: 'Telegram Chat ID removed. Caregiver notifications will fallback to email.' });
      }

      window.setTimeout(() => loadTelegramId(String(userData?.uid || ''), String(userData?.email || '')), 500);
      window.setTimeout(() => setTelegramMessage(null), 3000);
    } catch (error: any) {
      setTelegramMessage({ type: 'error', text: error.message || 'Failed to save Telegram ID' });
    } finally {
      setLoadingTelegramId(false);
    }
  };

  const handleSavePersonalInfo = () => {
    localStorage.setItem(
      CAREGIVER_PERSONAL_INFO_KEY,
      JSON.stringify({
        phone,
        email: personalEmail,
        address,
      }),
    );

    alert(t('personalInfoSaved'));
    setShowPersonalInfo(false);
  };

  const handleProfileImageChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = typeof reader.result === 'string' ? reader.result : '';

      if (imageDataUrl) {
        setProfileImage(imageDataUrl);
        localStorage.setItem(CAREGIVER_PROFILE_IMAGE_KEY, imageDataUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  if (showTelegramSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTelegramSetup(false)}
            className="rounded-lg p-2 transition hover:bg-white"
          >
            <ArrowLeft className="h-6 w-6 text-indigo-600" />
          </button>
          <h1 className="text-2xl font-bold text-indigo-900">Telegram Bot Setup</h1>
        </div>

        <div className="mx-auto max-w-md">
          <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800">Telegram Bot Setup</h2>
              <p className="mb-4 text-sm text-gray-600">
                Enter your Telegram Chat ID manually. Once saved, it is reused automatically for MFA and notifications.
              </p>

              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="mb-2 text-sm font-medium text-blue-900">How to set up the bot:</p>
                <ol className="list-inside list-decimal space-y-1 text-sm text-blue-800">
                  <li>Open Telegram and start a chat with your CareConnect bot.</li>
                  <li>Get your chat ID using a helper bot such as <strong>@userinfobot</strong>.</li>
                  <li>Paste the chat ID below and press <strong>Save Chat ID</strong>.</li>
                </ol>
              </div>

              <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
                <p className="cursor-default text-sm font-semibold text-gray-800">
                  Enter Telegram Chat ID
                </p>
                <input
                  type="text"
                  value={telegramId}
                  onChange={(event) => setTelegramId(event.target.value)}
                  placeholder="e.g., 1234567890"
                  className="mt-3 w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveTelegramId}
                  disabled={loadingTelegramId}
                  className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition ${
                    loadingTelegramId
                      ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Save Chat ID
                </button>
              </div>

              {telegramMessage && (
                <div
                  className={`mb-4 flex items-start gap-3 rounded-lg border p-3 ${
                    telegramMessage.type === 'success'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  {telegramMessage.type === 'success' ? (
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                  )}
                  <p className={telegramMessage.type === 'success' ? 'text-sm text-green-800' : 'text-sm text-red-800'}>
                    {telegramMessage.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPersonalInfo) {
    const backButtonClass = isAdminMode ? 'text-[#0b2f57] active:bg-[#dfeaf8]' : 'text-[#075fc7] active:bg-blue-50';
    const profileAccentTextClass = isAdminMode ? 'text-[#0b2f57]' : 'text-[#075fc7]';
    const profilePlaceholderClass = isAdminMode ? 'bg-[#e4eefb] text-[#0b2f57]' : 'bg-[#edf4ff] text-[#075fc7]';
    const profileActionClass = isAdminMode ? 'bg-[#0b2f57]' : 'bg-[#2875e0]';

    return (
      <div className="-mx-5 -my-6 min-h-full bg-gray-50 min-[390px]:-mx-6">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-gray-50 px-5 shadow-sm">
          <button
            type="button"
            onClick={() => setShowPersonalInfo(false)}
            className={`flex h-11 w-11 items-center justify-center rounded-full ${backButtonClass}`}
            aria-label={t('backToProfile')}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t('personalInfo')}</h1>
        </div>

        <div className="p-5 min-[390px]:p-8">
          <div className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className={`mb-5 text-2xl font-bold ${profileAccentTextClass}`}>{t('profilePhoto')}</h2>

            <div className="flex flex-col items-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={t('profile')}
                  className="mb-4 h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className={`mb-4 flex h-32 w-32 items-center justify-center rounded-full ${profilePlaceholderClass}`}>
                  <User className="h-16 w-16" />
                </div>
              )}

              <label className={`cursor-pointer rounded-full px-6 py-3 text-lg font-semibold text-white shadow-sm active:scale-95 ${profileActionClass}`}>
                {t('changePhoto')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      handleProfileImageChange(file);
                    }
                  }}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className={`mb-5 text-2xl font-bold ${profileAccentTextClass}`}>{t('basicInformation')}</h2>

            <ProfileField label={t('phoneNumber')} value={phone} onChange={setPhone} type="tel" />
            <ProfileField label={t('email')} value={personalEmail} onChange={setPersonalEmail} type="email" />
            <ProfileField label={t('address')} value={address} onChange={setAddress} isLast />

            <button
              type="button"
              onClick={handleSavePersonalInfo}
              className={`mt-5 w-full rounded-2xl py-3 text-lg font-semibold text-white active:scale-95 ${profileActionClass}`}
            >
              {t('saveChanges')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const profileHeaderClass = isAdminMode
    ? 'bg-[#0b2f57]'
    : 'bg-gradient-to-br from-[#4f8ff0] to-[#2875e0]';
  const profileAvatarClass = isAdminMode ? 'text-[#0b2f57]' : 'text-[#075fc7]';
  const profileEmailClass = isAdminMode ? 'text-blue-100' : 'text-blue-100';

  return (
    <div className="-mx-5 -my-6 min-h-full bg-gray-50 min-[390px]:-mx-6">
      <div className={`${profileHeaderClass} px-5 pb-5 pt-6 text-white min-[390px]:px-7 min-[390px]:pb-7 min-[390px]:pt-8`}>
        <div className="mb-4 flex items-center gap-4 min-[390px]:gap-5">
          {profileImage ? (
            <img
              src={profileImage}
              alt={t('profile')}
              className="h-16 w-16 rounded-full bg-white object-cover min-[390px]:h-20 min-[390px]:w-20"
            />
          ) : (
            <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-white ${profileAvatarClass} min-[390px]:h-20 min-[390px]:w-20`}>
              <User className="h-8 w-8 min-[390px]:h-10 min-[390px]:w-10" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold min-[390px]:text-3xl">{caregiverName}</h2>
            <p className={`mt-1 truncate text-sm ${profileEmailClass} min-[390px]:text-base`}>
              {caregiverEmail || t('registeredCaregiver')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 min-[390px]:space-y-6 min-[390px]:p-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem
            icon={<User className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title={t('personalInfo')}
            onClick={() => setShowPersonalInfo(true)}
          />
          <SettingsItem
            icon={<Bell className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title="Telegram Bot Setup"
            onClick={() => setShowTelegramSetup(true)}
          />
          <div className="px-5 pb-4 pt-1 text-sm text-gray-500 min-[390px]:px-8">
            {telegramId.trim() ? 'Telegram bot connected' : 'No Telegram bot connected yet'}
          </div>
          <SettingsItem
            icon={<Languages className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title={t('selectLanguage')}
            onClick={onChangeLanguage}
          />
          
        </div>

          <SettingsItem
            icon={<LogOut className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title={t('logOut')}
            textColor="text-red-500"
            onClick={onLogout}
          />
        </div>
      </div>
  );
}

function ProfileField({
  isLast = false,
  label,
  onChange,
  type = 'text',
  value,
}: {
  isLast?: boolean;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className={`block py-4 ${isLast ? '' : 'border-b border-gray-200'}`}>
      <span className="mb-1 block text-sm text-gray-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-xl font-semibold text-gray-900 outline-none"
      />
    </label>
  );
}

function SettingsItem({
  icon,
  isAdminMode = false,
  title,
  textColor = 'text-gray-900',
  onClick,
}: {
  icon: React.ReactNode;
  isAdminMode?: boolean;
  title: string;
  textColor?: string;
  onClick?: () => void;
}) {
  const isDestructive = textColor.includes('red');
  const hoverClass = isDestructive
    ? 'hover:bg-red-50'
    : isAdminMode
      ? 'hover:bg-[#e4eefb]'
      : 'hover:bg-green-50';
  const iconHoverClass = isDestructive
    ? 'group-hover:text-red-500'
    : isAdminMode
      ? 'group-hover:text-[#0b2f57]'
      : 'group-hover:text-green-700';
  const chevronHoverClass = isDestructive
    ? 'group-hover:text-red-400'
    : isAdminMode
      ? 'group-hover:text-[#0b2f57]'
      : 'group-hover:text-green-600';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 transition-colors last:border-b-0 active:bg-gray-50 min-[390px]:gap-6 min-[390px]:px-8 min-[390px]:py-6 ${hoverClass}`}
    >
      <div className={`text-gray-600 ${iconHoverClass}`}>{icon}</div>
      <span className={`flex-1 text-left text-xl font-bold min-[390px]:text-2xl ${textColor}`}>
        {title}
      </span>
      <ChevronRight className={`h-7 w-7 text-gray-400 min-[390px]:h-8 min-[390px]:w-8 ${chevronHoverClass}`} />
    </button>
  );
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return initials || 'SR';
}

function SeniorCard({
  senior,
  name,
  location,
  tone,
  isSendingReminder,
  isDeleting,
  canDelete,
  isAdminMode,
  onOpenProfile,
  onSendReminder,
  onRequestDeleteSenior,
}: {
  senior: Senior;
  name: string;
  location: string;
  tone: 'good' | 'alert';
  isSendingReminder: boolean;
  isDeleting: boolean;
  canDelete: boolean;
  isAdminMode: boolean;
  onOpenProfile: (senior: Senior) => void;
  onSendReminder: (senior: Senior) => void;
  onRequestDeleteSenior: (senior: Senior) => void;
}) {
  const { t } = useTranslation();
  const isAlert = tone === 'alert';
  const isSosAlert = isSosTriggered(senior);
  const checkedInToday = hasCheckedInToday(senior.lastCheckIn);
  const phoneHref = getPhoneHref(senior.phone);
  const cardClass = isSosAlert
    ? 'border-4 border-[#c8171d] bg-[#fff1f1] shadow-[0_0_0_4px_rgba(200,23,29,0.12),0_14px_30px_rgba(200,23,29,0.16)]'
    : isAlert
      ? 'border-2 border-[#c8171d] bg-white shadow-[0_10px_24px_rgba(200,23,29,0.08)]'
    : isAdminMode
      ? 'border-[#bed0e8] bg-[#f8fbff] shadow-sm'
      : 'border-[#dde2e8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.07)]';
  const avatarClass = isSosAlert
    ? 'bg-[#c8171d] text-white'
    : isAlert
      ? 'bg-[#14353d] text-white'
    : isAdminMode
      ? 'bg-[#dbe8f8] text-[#12365f]'
      : 'bg-[#dcecef] text-[#17353d]';
  const callActionClass = !phoneHref
    ? 'pointer-events-none border-[#c7cbd1] bg-[#f0f2f5] text-[#71717a]'
    : isAlert
      ? 'border-[#075fc7] bg-[#075fc7] text-white'
      : isAdminMode
        ? 'border-[#1f4f82] bg-white text-[#1f4f82]'
        : 'border-[#075fc7] bg-white text-[#075fc7]';
  const primaryActionClass = isAdminMode
    ? 'border-[#0b2f57] bg-[#0b2f57] text-white'
    : 'border-[#075fc7] bg-[#075fc7] text-white';
  const alertLabel = isSosAlert ? t('sosTriggered') : isAlert ? t('noCheckInToday') : t('checkedInToday');
  const seniorDisplayId = getSeniorDisplayId(senior);
  const displayLocation = location || t('unknown');
  const medicationTaken = /^taken$/i.test(senior.medicationStatus || '');
  const medicationValue = medicationTaken
    ? [t('taken'), senior.medicationTakenAt].filter(Boolean).join('\n')
    : t('untaken');
  const alertTextClass = isSosAlert
    ? 'rounded-full bg-[#c8171d] px-3 py-2 text-white'
    : isAlert
      ? 'text-[#c8171d]'
      : 'text-[#30343a]';
  const adminStatusLabel = isSosAlert ? t('sosActive') : isAlert ? t('noCheckIn') : t('checkedIn');
  const lastCheckInParts = formatCheckInDateTimeParts(senior.lastCheckIn);
  const lastCheckInDisplay = lastCheckInParts.time === 'NO'
    ? 'NO'
    : `${lastCheckInParts.time}, ${lastCheckInParts.date}`;
  const adminAssignedCaregiver = senior.caregiverNames?.length
    ? senior.caregiverNames.join(', ')
    : senior.caregiverName || senior.caregiverEmail || 'NO';

  if (isAdminMode) {
    return (
      <div className={`relative rounded-[24px] border p-5 ${cardClass}`}>
        {canDelete && (
          <button
            type="button"
            onClick={() => onRequestDeleteSenior(senior)}
            disabled={isDeleting}
            aria-label={`Delete ${name}`}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dbe0] bg-white text-[#c8171d] shadow-sm transition-colors hover:border-[#c8171d] hover:bg-[#fee2e2] hover:text-[#c8171d] active:scale-95 disabled:cursor-wait disabled:opacity-60 disabled:active:scale-100"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}

        <div className="pr-11">
          <h3 className="whitespace-normal break-words text-[28px] font-bold leading-8 text-black">{name}</h3>
          <div className="mt-5 grid gap-4">
            <AdminSeniorSummaryRow label={t('assignedCaregiver')} value={adminAssignedCaregiver} />
            <AdminSeniorSummaryRow label={t('status')} value={adminStatusLabel} valueClassName={isAlert || isSosAlert ? 'text-[#c8171d]' : 'text-[#18833b]'} />
            <AdminSeniorSummaryRow label={t('lastCheckIn')} value={lastCheckInDisplay} valueClassName={checkedInToday ? 'text-[#18833b]' : 'text-[#c8171d]'} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenProfile(senior)}
          className="mt-5 flex h-16 w-full items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-lg font-bold uppercase text-[#30343a] transition-transform active:scale-[0.98]"
        >
          {t('details')}
        </button>
      </div>
    );
  }

  return (
      <div className={`relative rounded-[16px] border p-4 shadow-sm ${cardClass}`}>
      {canDelete && (
        <button
          type="button"
          onClick={() => onRequestDeleteSenior(senior)}
          disabled={isDeleting}
          aria-label={`Delete ${name}`}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#d7dbe0] bg-white text-[#c8171d] shadow-sm transition-colors hover:border-[#c8171d] hover:bg-[#fee2e2] hover:text-[#c8171d] active:scale-95 disabled:cursor-wait disabled:opacity-60 disabled:active:scale-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
      <div className="flex items-start gap-4 pr-9">
        <div className={`flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-[14px] text-xl font-bold ${canDelete ? 'mt-3' : ''} ${avatarClass}`}>
          {getInitials(name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start">
            <div className="min-w-0">
              <h3 className="whitespace-normal break-words text-[24px] font-bold leading-7 text-black">{name}</h3>
              <p className="mt-1 inline-flex max-w-full items-center rounded-full bg-[#f4f6f8] px-2.5 py-1 text-xs font-black uppercase tracking-wide text-[#5f6368]">
                <span className="truncate">{t('seniorId')}: {seniorDisplayId}</span>
              </p>
              <p className={`mt-2 inline-flex items-center gap-2 text-base font-bold ${alertTextClass}`}>
                {isSosAlert ? (
                  <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                ) : isAlert ? (
                  <TriangleAlert className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#12c759]" />
                )}
                <span className="truncate">{alertLabel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isSosAlert && (
        <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-[#f3a2a5] bg-white px-4 py-3 text-[#8f1015]">
          <ShieldAlert className="h-6 w-6 flex-shrink-0" />
          <p className="text-base font-black leading-5">
            {t('emergencySosActiveForSenior')}
          </p>
        </div>
      )}

      {isSosAlert && !isAdminMode && (
        <div className="mt-4 rounded-[14px] border border-[#f3a2a5] bg-white px-4 py-3">
          <div className="mb-2 flex items-center gap-2 text-[#c8171d]">
            <MapPin className="h-6 w-6 flex-shrink-0" />
            <p className="text-base font-black">{t('currentLocation')}</p>
          </div>
          <p className="whitespace-normal break-words text-lg font-bold leading-7 text-black">
            {displayLocation}
          </p>
        </div>
      )}

      {!isAdminMode && (
        <LastCheckInPanel
          checkedInToday={checkedInToday}
          date={lastCheckInParts.date}
          time={lastCheckInParts.time}
        />
      )}

      {!isAdminMode && !isSosAlert && (
        <div className="mt-3 border-y border-[#eef1f4] py-3">
          <ResidentInfoTile
            icon={<Pill className="h-6 w-6" />}
            iconColor={medicationTaken ? 'text-[#12b962]' : 'text-[#c8171d]'}
            label={t('medication')}
            value={medicationValue}
          />
        </div>
      )}

      {!isAdminMode && !isSosAlert && (
        <div className="mt-3 rounded-[14px] bg-[#f7f9fb] px-4 py-3">
          <div className="mb-1 flex items-center gap-2 text-[#075fc7]">
            <MapPin className="h-5 w-5 flex-shrink-0" />
            <p className="text-xs font-black uppercase tracking-wide text-[#71717a]">{t('currentLocation')}</p>
          </div>
          <p className="whitespace-normal break-words text-sm font-bold leading-5 text-black">{displayLocation}</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        {!isAdminMode && (
          <>
            <a
              href={phoneHref}
              aria-disabled={!phoneHref}
              className={`flex h-14 items-center justify-center gap-2 rounded-[10px] border text-lg font-bold uppercase transition-transform active:scale-[0.98] ${callActionClass}`}
            >
              <Phone className="h-5 w-5" />
              {t('call')}
            </a>
            {isSosAlert ? (
              <a
                href="tel:995"
                aria-label={`${t('emergency')} 995`}
                className="flex h-14 items-center justify-center gap-2 rounded-[10px] border border-[#c8171d] bg-[#c8171d] text-lg font-bold uppercase text-white transition-transform active:scale-[0.98]"
              >
                <Phone className="h-5 w-5" />
                {t('emergency')}
              </a>
            ) : (
              <button
                type="button"
                disabled={isSendingReminder}
                onClick={() => onSendReminder(senior)}
                className={`flex h-14 items-center justify-center gap-2 rounded-[10px] border text-lg font-bold uppercase transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100 ${primaryActionClass}`}
              >
                <Bell className="h-5 w-5" />
                {isSendingReminder ? t('sending') : t('remind')}
              </button>
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => onOpenProfile(senior)}
          className="col-span-2 flex h-14 items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-base font-bold uppercase text-[#30343a] transition-transform active:scale-[0.98]"
        >
          {t('details')}
        </button>
      </div>
    </div>
  );
}

function AdminSeniorSummaryRow({
  label,
  value,
  valueClassName = 'text-[#111827]',
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-[#6b7280]">{label}</p>
      <p className={`mt-1 whitespace-normal break-words text-lg font-black leading-6 ${valueClassName}`}>{value}</p>
    </div>
  );
}

function LastCheckInPanel({
  checkedInToday,
  date,
  time,
}: {
  checkedInToday: boolean;
  date: string;
  time: string;
}) {
  const { t } = useTranslation();
  const hasCheckIn = time !== 'NO';
  const accentClass = checkedInToday ? 'text-[#18833b]' : 'text-[#c8171d]';
  const surfaceClass = checkedInToday
    ? 'bg-[#f4fbf5] ring-1 ring-[#d7eddd]'
    : 'bg-[#fff7f7] ring-1 ring-[#ffdcdc]';

  return (
    <div className={`mt-4 flex min-h-[70px] items-center gap-3 rounded-[16px] px-3 py-3 ${surfaceClass}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${accentClass}`}>
        <Clock className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-black uppercase tracking-wide text-[#71717a]">{t('lastCheckIn')}</p>
        {hasCheckIn ? (
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p className="text-lg font-black leading-6 text-black">{time}</p>
            <p className="text-sm font-bold leading-5 text-[#5f6368]">{date}</p>
          </div>
        ) : (
          <p className="mt-1 text-lg font-black leading-6 text-black">NO</p>
        )}
      </div>
    </div>
  );
}

function ResidentInfoTile({
  icon,
  iconColor,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-[56px] min-w-0 items-center gap-2 px-1 py-1">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7f9fb] ${iconColor}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-wide text-[#71717a]">{label}</p>
        <p className="whitespace-pre-line break-words text-base font-bold leading-5 text-black">{value}</p>
      </div>
    </div>
  );
}

function DashboardMetricCard({
  icon,
  title,
  subtitle,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tone: 'blue' | 'green';
}) {
  return (
    <div className="flex min-h-[196px] flex-col justify-between rounded-[20px] bg-[#e9ecef] p-6">
      <div className={tone === 'blue' ? 'text-[#075fc7]' : 'text-[#12b962]'}>{icon}</div>
      <div>
        <h3 className="text-[28px] font-bold leading-8 text-black">{title}</h3>
        <p className="mt-1 text-lg font-bold text-[#71717a]">{subtitle}</p>
      </div>
    </div>
  );
}

function HealthBuddyScreen({
  canManageAppointments,
  appointmentError,
  appointmentLoadError,
  appointmentForm,
  appointmentStats,
  appointments,
  editingAppointmentId,
  isSavingAppointment,
  tomorrowAppointmentCount,
  caregiverName,
  onChangeAppointmentForm,
  onEditAppointment,
  onCloseForm,
  onCreateAppointment,
  onDeleteAppointment,
  onOpenForm,
  onUpdateAppointmentStatus,
  seniors,
  showAppointmentForm,
  appointmentStatusFilter,
  onChangeStatusFilter,
}: {
  canManageAppointments: boolean;
  appointmentError: string;
  appointmentLoadError: string;
  appointmentForm: HealthBuddyAppointmentInput;
  appointmentStats: { today: number; upcoming: number; completed: number };
  appointments: HealthBuddyAppointment[];
  editingAppointmentId: string;
  isSavingAppointment: boolean;
  tomorrowAppointmentCount: number;
  caregiverName: string;
  onChangeAppointmentForm: React.Dispatch<React.SetStateAction<HealthBuddyAppointmentInput>>;
  onEditAppointment: (appointment: HealthBuddyAppointment) => void;
  onCloseForm: () => void;
  onCreateAppointment: (event: React.FormEvent) => void;
  onDeleteAppointment: (appointmentId: string) => void;
  onOpenForm: () => void;
  onUpdateAppointmentStatus: (appointmentId: string, status: HealthBuddyAppointment['status']) => void;
  seniors: Senior[];
  showAppointmentForm: boolean;
  appointmentStatusFilter: 'all' | 'today' | 'upcoming' | 'completed';
  onChangeStatusFilter: (filter: 'all' | 'today' | 'upcoming' | 'completed') => void;
}) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (showAppointmentForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAppointmentForm]);

  const categoryCounts = appointments.reduce(
    (summary, appointment) => {
      const category = getAppointmentCategory(appointment);
      summary[category] += 1;
      return summary;
    },
    {
      medical: 0,
      therapy: 0,
      vaccination: 0,
      community: 0,
    },
  );

  // Filter appointments based on selected status
  const getFilteredAppointments = () => {
    // 'all' shows only scheduled (active) appointments by default
    if (appointmentStatusFilter === 'all') {
      return appointments.filter((apt) => apt.status !== 'completed' && apt.status !== 'cancelled');
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    
    return appointments.filter((apt) => {
      // Parse appointment date - handle YYYY-MM-DD format
      const parts = (apt.date || '').split('-');
      const aptDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      aptDate.setHours(0, 0, 0, 0);
      const aptDateTime = aptDate.getTime();
      
      if (appointmentStatusFilter === 'today') {
        // Hide completed and cancelled appointments from today's view
        return aptDateTime === todayTime && apt.status !== 'completed' && apt.status !== 'cancelled';
      } else if (appointmentStatusFilter === 'upcoming') {
        return aptDateTime > todayTime;
      } else if (appointmentStatusFilter === 'completed') {
        return apt.status === 'completed';
      }
      return true;
    });
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-[22px] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          {canManageAppointments && (
            <button
              type="button"
              onClick={onOpenForm}
              className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#416642] px-3 text-sm font-black text-white shadow-sm active:scale-95"
            >
              <Plus className="h-4 w-4" />
              {t('newAppointment')}
            </button>
          )}

          <div className="flex flex-col items-start gap-4">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-wide text-[#71717a]">{t('healthBuddy')}</p>
              <h2 className="mt-1 text-[30px] font-bold leading-9 text-black">{t('appointmentManager')}</h2>
            </div>
          </div>

        <div className="grid gap-3 min-[390px]:grid-cols-3">
          <button
            type="button"
            onClick={() => onChangeStatusFilter('today')}
            className={`rounded-[18px] p-4 text-center transition-all cursor-pointer ${
              appointmentStatusFilter === 'today'
                ? 'bg-[#416642] text-white'
                : 'bg-[#f4f6f8] text-black hover:bg-[#e8f0eb]'
            }`}
          >
            <p className={`text-sm font-black uppercase tracking-wide ${appointmentStatusFilter === 'today' ? 'text-white' : 'text-[#71717a]'}`}>{t('today')}</p>
            <p className="mt-2 text-3xl font-black">{appointmentStats.today}</p>
          </button>
          <button
            type="button"
            onClick={() => onChangeStatusFilter('upcoming')}
            className={`rounded-[18px] p-4 text-center transition-all cursor-pointer ${
              appointmentStatusFilter === 'upcoming'
                ? 'bg-[#416642] text-white'
                : 'bg-[#f4f6f8] text-black hover:bg-[#e8f0eb]'
            }`}
          >
            <p className={`text-sm font-black uppercase tracking-wide ${appointmentStatusFilter === 'upcoming' ? 'text-white' : 'text-[#71717a]'}`}>{t('upcoming')}</p>
            <p className="mt-2 text-3xl font-black">{appointmentStats.upcoming}</p>
          </button>
          <button
            type="button"
            onClick={() => onChangeStatusFilter('completed')}
            className={`rounded-[18px] p-4 text-center transition-all cursor-pointer ${
              appointmentStatusFilter === 'completed'
                ? 'bg-[#416642] text-white'
                : 'bg-[#f4f6f8] text-black hover:bg-[#e8f0eb]'
            }`}
          >
            <p className={`text-sm font-black uppercase tracking-wide ${appointmentStatusFilter === 'completed' ? 'text-white' : 'text-[#71717a]'}`}>{t('completed')}</p>
            <p className="mt-2 text-3xl font-black">{appointmentStats.completed}</p>
          </button>
        </div>

        {appointmentStatusFilter !== 'all' && (
          <button
            type="button"
            onClick={() => onChangeStatusFilter('all')}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#416642] bg-white px-3 text-sm font-black text-[#416642] active:scale-95"
          >
            {t('viewAll') || 'View All'}
          </button>
        )}

        {tomorrowAppointmentCount > 0 && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#ffe39a] bg-[#fff7df] px-4 py-3 text-[#8c5a00]">
            <Bell className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-black">
              {t('appointmentTomorrowBanner', { count: tomorrowAppointmentCount })}
            </p>
          </div>
        )}
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {canManageAppointments && showAppointmentForm && (
          <form ref={formRef} onSubmit={onCreateAppointment} className="rounded-[22px] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-black text-black">{editingAppointmentId ? t('saveChanges') : t('createAppointment')}</h3>
            <button
              type="button"
              onClick={onCloseForm}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ee] text-[#416642] active:scale-95"
              aria-label={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#71717a]">{t('selectSenior')}</span>
              <select
                value={appointmentForm.seniorId}
                onChange={(event) => {
                  const selectedSenior = seniors.find((senior) => senior.id === event.target.value || senior.userId === event.target.value || senior.connectionId === event.target.value);

                  onChangeAppointmentForm((currentValue) => ({
                    ...currentValue,
                    seniorId: event.target.value,
                    seniorName: selectedSenior?.name || currentValue.seniorName,
                  }));
                }}
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-base font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              >
                <option value="">{t('selectSenior')}</option>
                {seniors.map((senior) => (
                  <option key={senior.id} value={senior.id}>
                    {senior.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#71717a]">{t('appointmentTitle')}</span>
              <input
                value={appointmentForm.title}
                onChange={(event) => onChangeAppointmentForm((currentValue) => ({ ...currentValue, title: event.target.value }))}
                placeholder={t('medicalReview')}
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-base font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              />
            </label>

            <div className="grid gap-4 min-[390px]:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#71717a]">{t('appointmentDate')}</span>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(event) => onChangeAppointmentForm((currentValue) => ({ ...currentValue, date: event.target.value }))}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-base font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#71717a]">{t('appointmentTime')}</span>
                <input
                  type="time"
                  required
                  value={appointmentForm.time}
                  onChange={(event) => onChangeAppointmentForm((currentValue) => ({ ...currentValue, time: event.target.value }))}
                  className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-base font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
                />
                {appointmentForm.time && (
                  <p className="mt-1 text-sm font-bold text-[#416642]">
                    Selected: {formatAppointmentTimeOnly(appointmentForm.time)}
                  </p>
                )}
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#71717a]">{t('location')}</span>
              <input
                value={appointmentForm.location}
                onChange={(event) => onChangeAppointmentForm((currentValue) => ({ ...currentValue, location: event.target.value }))}
                placeholder={t('appointmentLocation')}
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-base font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#71717a]">{t('notes')}</span>
              <textarea
                value={appointmentForm.notes}
                onChange={(event) => onChangeAppointmentForm((currentValue) => ({ ...currentValue, notes: event.target.value }))}
                placeholder={t('appointmentNotes')}
                rows={3}
                className="w-full rounded-2xl bg-[#f4f6f8] px-4 py-3 text-base font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              />
            </label>
          </div>

          {appointmentError && (
            <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">
              {appointmentError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSavingAppointment}
            className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#416642] text-lg font-black text-white active:scale-95"
          >
            <Calendar className="h-5 w-5" />
            {isSavingAppointment ? t('saving') : t('saveAppointment')}
          </button>
          </form>
        )}

        <section className="flex flex-col gap-3">
          {appointmentLoadError && (
            <div className="rounded-[18px] bg-red-50 p-4 text-sm font-bold text-red-700">
              {appointmentLoadError}
            </div>
          )}
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => {
            const appointmentDate = getAppointmentDateTime(appointment);
            const appointmentSeniorName = resolveAppointmentSeniorName(appointment, seniors);
            const appointmentCategory = getAppointmentCategory(appointment);
            const directionsHref = getDirectionsHref(appointment.location || '');
            const teleconsultHref = extractFirstUrl(appointment.notes || '');
            const transportReminderLabel = getTransportReminderLabel(appointmentDate, t);
            const isCompleted = appointment.status === 'completed';
            const isCancelled = appointment.status === 'cancelled';
            const displayTime = appointment.time && /^\d{2}:\d{2}/.test(appointment.time) ? formatAppointmentTimeOnly(appointment.time) : 'Time not set';

            return (
              <div key={appointment.id} className="rounded-[22px] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-wide text-[#71717a]">{appointmentSeniorName}</p>
                    <h3 className="mt-1 text-2xl font-black text-black">{appointment.title}</h3>
                    <p className="mt-2 text-base font-bold text-[#416642]">{formatAppointmentDateOnly(appointment.date)} at {displayTime}</p>
                    <p className="mt-2 inline-flex rounded-full bg-[#edf3ff] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#2c4f8f]">
                      {getAppointmentCategoryLabel(appointmentCategory, t)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                      isCompleted
                        ? 'bg-[#e7f3e8] text-[#416642]'
                        : isCancelled
                        ? 'bg-[#f4f6f8] text-[#71717a]'
                        : 'bg-[#fff4df] text-[#8c5a00]'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm font-semibold text-[#5f6368]">
                  <p>Date: {formatAppointmentDateOnly(appointment.date)}</p>
                  <p>Time: {displayTime}</p>
                  {appointment.location && <p>{t('location')}: {appointment.location}</p>}
                  {appointment.notes && <p>{appointment.notes}</p>}
                </div>

                {appointment.status !== 'completed' && (
                  <div className="mt-3 rounded-xl border border-[#d9e4ff] bg-[#f4f8ff] px-3 py-2 text-sm font-bold text-[#26426f]">
                    {t('transportReminder')}: {transportReminderLabel}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {directionsHref && appointment.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => {
                        void openDirectionsFromCurrentLocation(appointment.location || '');
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#9ab5df] bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-[#2c4f8f]"
                    >
                      <MapPin className="h-4 w-4" />
                      {t('openDirections')}
                    </button>
                  )}
                  {teleconsultHref && appointment.status !== 'completed' && (
                    <a
                      href={teleconsultHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#92d6a5] bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-[#1d6b34]"
                    >
                      <Video className="h-4 w-4" />
                      {t('joinTeleconsultation')}
                    </a>
                  )}
                </div>

                {canManageAppointments && appointment.status !== 'completed' && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onEditAppointment(appointment)}
                      className="rounded-full border border-[#2c4f8f] bg-white px-4 py-2 text-sm font-black text-[#2c4f8f] active:scale-95"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateAppointmentStatus(appointment.id, 'completed')}
                      className="rounded-full bg-[#18833b] px-4 py-2 text-sm font-black text-white active:scale-95"
                    >
                      {t('markCompleted')}
                    </button>
                    {appointment.status !== 'cancelled' && (
                      <button
                        type="button"
                        onClick={() => onUpdateAppointmentStatus(appointment.id, 'cancelled')}
                        className="rounded-full bg-[#954a00] px-4 py-2 text-sm font-black text-white active:scale-95"
                      >
                        {t('cancel')}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDeleteAppointment(appointment.id)}
                      className="rounded-full border border-[#c7cbd1] bg-white px-4 py-2 text-sm font-black text-[#30343a] active:scale-95"
                    >
                      {t('remove')}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-[22px] bg-white p-5 text-center shadow-sm">
            <h3 className="text-xl font-black text-black">{t('noAppointmentsYet')}</h3>
            <p className="mt-2 text-base font-semibold text-[#71717a]">{t('healthBuddyEmptyState')}</p>
          </div>
        )}
        </section>
      </div>
    </div>
  );
}

function HealthBuddyStatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[18px] bg-[#f4f6f8] p-4 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-[#71717a]">{label}</p>
      <p className="mt-2 text-3xl font-black text-black">{value}</p>
    </div>
  );
}

function DashboardNavItem({
  icon,
  isAdminMode = false,
  label,
  onClick,
  active = false,
  hasAlert = false,
}: {
  icon: React.ReactNode;
  isAdminMode?: boolean;
  label: string;
  onClick?: () => void;
  active?: boolean;
  hasAlert?: boolean;
}) {
  const activeClass = isAdminMode
    ? 'bg-[#0b2f57] text-white shadow-sm'
    : 'bg-[#2875e0] text-white shadow-sm';
  const inactiveClass = isAdminMode
    ? 'text-[#3f4147] hover:bg-[#e4eefb] hover:text-[#0b2f57]'
    : 'text-[#3f4147] hover:bg-blue-50 hover:text-[#075fc7]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 overflow-hidden rounded-[18px] px-1 py-3 transition-transform active:scale-95 ${
        active ? activeClass : inactiveClass
      }`}
    >
      {icon}
      <span className="block w-full truncate text-center text-xs font-bold leading-tight tracking-tight">{label}</span>
      {hasAlert && <span className="absolute right-5 top-3 h-2.5 w-2.5 rounded-full bg-[#c8171d]" />}
    </button>
  );
}
