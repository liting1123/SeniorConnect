import { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Clock, Gamepad2, Home, User, Trophy, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { LANGUAGE_STORAGE_KEY } from '../i18n';
import LoginScreen from './components/LoginScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import HomePage from './components/HomePage';
import SOSConfirmationScreen from './components/SOSConfirmation';
import ProfileScreen, { PERSONAL_INFO_KEY } from './components/ProfileScreen';
import PointsScreen from './components/PointsScreen';
import MedicationScreen, { getCurrentMinutes, getMinutesFromTimeLabel } from './components/MedicationScreen';
import CarePortalScreen from './components/CarePortalScreen';
import CaregiverDashboardScreen from './components/CaregiverDashboardScreen';
import GameScreen from './components/GameScreen';
import {
  type AppUser,
  type CheckInReminder,
  type Medicine,
  addCheckIn,
  clearStoredUser,
  deleteMedicine,
  getCheckInReminders,
  getMedicines,
  getSeniorProfile,
  getStoredUser,
  getUserStorageIdentity,
  saveMedicine,
  setCachedUserPoints,
  updateSeniorProfile,
} from './services/backend';
import {
  createSosAlert,
} from './services/serviceNow';

type Screen = 'welcome' | 'language' | 'home' | 'profile' | 'points' | 'medication' | 'game' | 'carePortal' | 'caregiverDashboard';
type LanguageReturnScreen = 'home' | 'caregiverDashboard';
type CheckInWindowId = 'morning' | 'evening';
const HIGH_CONTRAST_STORAGE_KEY = 'careconnect.highContrast';
type CompletedCheckInStatus = {
  dateKey: string;
  time: string;
  windowId: CheckInWindowId;
};
const MEDICINE_REMINDER_EARLY_MINUTES = 5;

function normalizeRole(role = '') {
  return role.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function isFamilyRole(role = '') {
  return ['children', 'family', 'families', 'familymember', 'familymembers', 'volunteer'].includes(normalizeRole(role));
}

function isSeniorRole(role = '') {
  return ['elderly', 'senior', 'seniors'].includes(normalizeRole(role));
}

function isCaregiverRole(role = '') {
  return ['caregiver', 'caregivers', 'nok', 'nextofkin', 'caregiverfamily', 'admin'].includes(normalizeRole(role));
}

function getSavedPersonalInfo() {
  const savedInfo = localStorage.getItem(PERSONAL_INFO_KEY);

  if (!savedInfo) {
    return {};
  }

  try {
    return JSON.parse(savedInfo) as {
      phone?: string;
      email?: string;
      address?: string;
    };
  } catch {
    localStorage.removeItem(PERSONAL_INFO_KEY);
    return {};
  }
}

function getCurrentBrowserPosition(options?: PositionOptions) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not available on this device.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function reverseGeocodePosition(position: GeolocationPosition) {
  const params = new URLSearchParams({
    lat: String(position.coords.latitude),
    lon: String(position.coords.longitude),
  });
  const response = await fetch(`/api/reverse-geocode?${params.toString()}`);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'Unable to convert current location into an address.');
  }

  return String(data?.address || '').trim();
}

async function getReadableSosLocation(fallbackLocation: string) {
  try {
    const position = await getCurrentBrowserPosition({
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 0,
    });
    const readableAddress = await reverseGeocodePosition(position);

    return readableAddress || fallbackLocation || 'Unknown location';
  } catch (error) {
    console.error('Unable to capture readable SOS location:', error);
    return fallbackLocation || 'Unknown location';
  }
}

async function getReadableCurrentLocation() {
  const position = await getCurrentBrowserPosition({
    enableHighAccuracy: true,
    timeout: 12000,
    maximumAge: 0,
  });

  return reverseGeocodePosition(position);
}

function getMedicineNameOverridesKey(user: AppUser) {
  return `medicine_names_${getUserStorageIdentity(user)}`;
}

function getMedicineNameOverrides(user: AppUser) {
  const rawOverrides = localStorage.getItem(getMedicineNameOverridesKey(user));

  if (!rawOverrides) {
    return {};
  }

  try {
    return JSON.parse(rawOverrides) as Record<string, string>;
  } catch {
    localStorage.removeItem(getMedicineNameOverridesKey(user));
    return {};
  }
}

function applyMedicineNameOverrides(medicines: Medicine[], user: AppUser) {
  const overrides = getMedicineNameOverrides(user);

  return medicines.map((medicine) => ({
    ...medicine,
    name: overrides[medicine.id] || medicine.name,
  }));
}

function saveMedicineNameOverride(user: AppUser, medicineId: string, name: string) {
  const overrides = {
    ...getMedicineNameOverrides(user),
    [medicineId]: name,
  };

  localStorage.setItem(getMedicineNameOverridesKey(user), JSON.stringify(overrides));
}

function getSeenCheckInRemindersKey(user: AppUser) {
  return `careconnect.seenCheckInReminders.${getUserStorageIdentity(user)}`;
}

function getSeenCheckInReminderIds(user: AppUser) {
  const rawIds = localStorage.getItem(getSeenCheckInRemindersKey(user));

  if (!rawIds) {
    return [];
  }

  try {
    const parsedIds = JSON.parse(rawIds);
    return Array.isArray(parsedIds) ? parsedIds.map(String) : [];
  } catch {
    localStorage.removeItem(getSeenCheckInRemindersKey(user));
    return [];
  }
}

function saveSeenCheckInReminderId(user: AppUser, reminderId: string) {
  const nextIds = [reminderId, ...getSeenCheckInReminderIds(user).filter((id) => id !== reminderId)].slice(0, 50);
  localStorage.setItem(getSeenCheckInRemindersKey(user), JSON.stringify(nextIds));
}

function getSingaporeCheckInParts(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(value);
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const hour = Number(partMap.hour);
  const minute = Number(partMap.minute);

  return {
    dateKey: `${partMap.year}-${partMap.month}-${partMap.day}`,
    displayTime: `${partMap.hour}:${partMap.minute}`,
    totalMinutes: hour * 60 + minute,
  };
}

function getCurrentCheckInWindowId(value = new Date()): CheckInWindowId | null {
  const { totalMinutes } = getSingaporeCheckInParts(value);

  if (totalMinutes >= 5 * 60 && totalMinutes <= 11 * 60 + 59) {
    return 'morning';
  }

  if (totalMinutes >= 13 * 60 && totalMinutes <= 23 * 60 + 59) {
    return 'evening';
  }

  return null;
}

function getCompletedCheckInKey(user: AppUser) {
  return `careconnect.completedCheckIn.${getUserStorageIdentity(user)}`;
}

function getSavedCompletedCheckIn(user: AppUser | null): CompletedCheckInStatus | null {
  if (!user) {
    return null;
  }

  const rawStatus = localStorage.getItem(getCompletedCheckInKey(user));

  if (!rawStatus) {
    return null;
  }

  try {
    const status = JSON.parse(rawStatus) as CompletedCheckInStatus;
    const todayKey = getSingaporeCheckInParts().dateKey;

    return status?.dateKey === todayKey ? status : null;
  } catch {
    localStorage.removeItem(getCompletedCheckInKey(user));
    return null;
  }
}

function saveCompletedCheckIn(user: AppUser, windowId: CheckInWindowId) {
  const parts = getSingaporeCheckInParts();
  const status: CompletedCheckInStatus = {
    dateKey: parts.dateKey,
    time: parts.displayTime,
    windowId,
  };

  localStorage.setItem(getCompletedCheckInKey(user), JSON.stringify(status));
  return status;
}

function isMedicineTakenToday(medicine: Medicine) {
  const todayDate = new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Singapore',
    year: 'numeric',
  }).format(new Date());

  if (/^taken at/i.test(medicine.status || '')) {
    return medicine.status.includes(todayDate);
  }

  if (!/^taken$/i.test(medicine.status || '') || !medicine.updatedAt) {
    return false;
  }

  const updatedAtText = String(medicine.updatedAt).trim();
  const updatedAt = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(?::\d{2})?$/.test(updatedAtText)
    ? new Date(`${updatedAtText.replace(' ', 'T')}Z`)
    : new Date(updatedAtText);
  const updatedDate = new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Singapore',
    year: 'numeric',
  }).format(updatedAt);

  return updatedDate === todayDate;
}

function getCompletedWindowFromError(error: unknown): CheckInWindowId | null {
  const message = error instanceof Error ? error.message : String(error || '');

  if (/morning/i.test(message)) {
    return 'morning';
  }

  if (/evening/i.test(message)) {
    return 'evening';
  }

  return null;
}

export default function App() {
  const { t } = useTranslation();
  const [highContrast, setHighContrast] = useState(() => {
    const stored = localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY);

    if (stored === 'true') return true;
    if (stored === 'false') return false;

    return window.matchMedia('(prefers-contrast: more)').matches;
  });
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [languageReturnScreen, setLanguageReturnScreen] = useState<LanguageReturnScreen>('home');
  const [showSOSConfirmation, setShowSOSConfirmation] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const isSendingSOSRef = useRef(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const isCheckingInRef = useRef(false);
  const [completedCheckIn, setCompletedCheckIn] = useState<CompletedCheckInStatus | null>(() => getSavedCompletedCheckIn(getStoredUser()));
  const [takenMedicineIds, setTakenMedicineIds] = useState<string[]>([]);
  const takenMedicineIdsRef = useRef<string[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const hasLoadedMedicinesRef = useRef(false);
  const loadedMedicinesUserIdRef = useRef<string | null>(null);
  const [activeMedicineReminderId, setActiveMedicineReminderId] = useState<string | null>(null);
  const activeMedicineReminderIdRef = useRef<string | null>(null);
  const [activeCheckInReminder, setActiveCheckInReminder] = useState<CheckInReminder | null>(null);
  const [snoozedMedicineUntil, setSnoozedMedicineUntil] = useState<Record<string, number>>({});
  const snoozedMedicineUntilRef = useRef<Record<string, number>>({});
  const [familyRegistrationNotice, setFamilyRegistrationNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(highContrast));
    document.documentElement.classList.toggle('careconnect-high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    const handleStorageUpdate = (event: StorageEvent) => {
      if (event.key !== HIGH_CONTRAST_STORAGE_KEY) {
        return;
      }

      if (event.newValue === 'true') {
        setHighContrast(true);
      }

      if (event.newValue === 'false') {
        setHighContrast(false);
      }
    };

    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const activeMedicineReminder = useMemo(() => {
    return medicines.find((medicine) => medicine.id === activeMedicineReminderId) || null;
  }, [activeMedicineReminderId]);
  const currentCheckInWindowId = getCurrentCheckInWindowId();
  const isCurrentCheckInWindowCompleted = Boolean(
    completedCheckIn && currentCheckInWindowId && completedCheckIn.windowId === currentCheckInWindowId,
  );

  const resetMedicineState = () => {
    hasLoadedMedicinesRef.current = false;
    loadedMedicinesUserIdRef.current = null;
    takenMedicineIdsRef.current = [];
    activeMedicineReminderIdRef.current = null;
    snoozedMedicineUntilRef.current = {};
    setMedicines([]);
    setTakenMedicineIds([]);
    setActiveMedicineReminderId(null);
    setSnoozedMedicineUntil({});
  };

  const markMedicineTaken = async (medicineId: string) => {
    const user = getStoredUser();
    const medicine = medicines.find((item) => item.id === medicineId);
    const nextStatus = 'Taken';
    const nextUpdatedAt = new Date().toISOString();

    if (!takenMedicineIdsRef.current.includes(medicineId)) {
      takenMedicineIdsRef.current = [...takenMedicineIdsRef.current, medicineId];
    }
    setMedicines((current) => current.map((item) => (
      item.id === medicineId ? { ...item, status: nextStatus, updatedAt: nextUpdatedAt } : item
    )));
    activeMedicineReminderIdRef.current = null;
    setTakenMedicineIds(takenMedicineIdsRef.current);
    setSnoozedMedicineUntil((current) => {
      const next = { ...current };
      delete next[medicineId];
      snoozedMedicineUntilRef.current = next;
      return next;
    });
    setActiveMedicineReminderId(null);

    if (user && medicine) {
      try {
        await saveMedicine(user, {
          ...medicine,
          status: nextStatus,
        });
      } catch (error) {
        console.error('Unable to update medicine taken status:', error);
      }
    }
  };

  const snoozeMedicineReminder = (medicineId: string) => {
    const nextSnoozedMedicineUntil = {
      ...snoozedMedicineUntilRef.current,
      [medicineId]: getCurrentMinutes() + 5,
    };

    snoozedMedicineUntilRef.current = nextSnoozedMedicineUntil;
    activeMedicineReminderIdRef.current = null;
    setSnoozedMedicineUntil((current) => ({
      ...current,
      [medicineId]: nextSnoozedMedicineUntil[medicineId],
    }));
    setActiveMedicineReminderId(null);
  };

  const handleSaveMedicine = async (medicine: Partial<Medicine> & { name: string }) => {
    const user = getStoredUser();

    if (!user) {
      alert(t('loginAgainEditMedicines'));
      setCurrentScreen('welcome');
      return;
    }

    if (medicine.id && medicine.isExtra === false) {
      saveMedicineNameOverride(user, medicine.id, medicine.name);
      setMedicines((current) => current.map((item) => (
        item.id === medicine.id ? { ...item, name: medicine.name } : item
      )));
      return;
    }

    const savedMedicine = await saveMedicine(user, medicine);
    setMedicines((current) => {
      const savedId = savedMedicine.id || medicine.id;
      const updatedMedicine = {
        ...savedMedicine,
        id: savedId || savedMedicine.id,
        name: medicine.name || savedMedicine.name,
      };
      const exists = current.some((item) => item.id === savedId);

      if (exists) {
        return current.map((item) => (item.id === savedId ? { ...item, ...updatedMedicine } : item));
      }

      return [...current, updatedMedicine];
    });
  };

  const handleDeleteMedicine = async (medicineId: string) => {
    const user = getStoredUser();

    if (!user) {
      alert(t('loginAgainRemoveMedicines'));
      setCurrentScreen('welcome');
      return;
    }

    await deleteMedicine(user, medicineId);
    setMedicines((current) => current.filter((medicine) => medicine.id !== medicineId));
  };

  useEffect(() => {
    const user = getStoredUser();

    if (!user || isCaregiverRole(user.role) || isFamilyRole(user.role)) {
      return;
    }

    const medicineUserId = getUserStorageIdentity(user);

    if (hasLoadedMedicinesRef.current && loadedMedicinesUserIdRef.current === medicineUserId) {
      return;
    }

    let isMounted = true;
    setMedicines([]);

    getMedicines(user)
      .then((serviceNowMedicines) => {
        if (isMounted) {
          hasLoadedMedicinesRef.current = true;
          loadedMedicinesUserIdRef.current = medicineUserId;
          const nextMedicines = applyMedicineNameOverrides(serviceNowMedicines, user);
          const takenIds = nextMedicines.filter(isMedicineTakenToday).map((medicine) => medicine.id);
          takenMedicineIdsRef.current = takenIds;
          setTakenMedicineIds(takenIds);
          setMedicines(nextMedicines);
        }
      })
      .catch((error) => {
        console.error('Unable to load medicines:', error);
      });

    return () => {
      isMounted = false;
    };
  }, [currentScreen]);

  useEffect(() => {
    const user = getStoredUser();

    if (!user || !isSeniorRole(user.role) || currentScreen === 'welcome' || currentScreen === 'language') {
      return;
    }

    let isMounted = true;

    const syncSeniorLocation = async () => {
      try {
        const readableLocation = await getReadableCurrentLocation();

        if (!isMounted || !readableLocation) {
          return;
        }

        await updateSeniorProfile(user, {
          email: user.email,
          name: user.displayName,
          locationZones: readableLocation,
        });
      } catch (error) {
        console.warn('Unable to update senior current location:', error);
      }
    };

    syncSeniorLocation();
    const timer = window.setInterval(syncSeniorLocation, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, [currentScreen]);

  useEffect(() => {
    const checkForDueMedicine = () => {
      if (
        activeMedicineReminderIdRef.current ||
        currentScreen !== 'medication'
      ) {
        return;
      }

      const currentMinutes = getCurrentMinutes();
      const dueMedicine = medicines.find((medicine) => {
        const medicineMinutes = getMinutesFromTimeLabel(medicine.time);
        const snoozedUntil = snoozedMedicineUntilRef.current[medicine.id] ?? 0;

        return (
          medicineMinutes !== null &&
          currentMinutes >= medicineMinutes - MEDICINE_REMINDER_EARLY_MINUTES &&
          currentMinutes >= snoozedUntil &&
          !takenMedicineIdsRef.current.includes(medicine.id)
        );
      });

      if (dueMedicine) {
        activeMedicineReminderIdRef.current = dueMedicine.id;
        setActiveMedicineReminderId(dueMedicine.id);
      }
    };

    checkForDueMedicine();
    const timer = window.setInterval(checkForDueMedicine, 30000);

    return () => window.clearInterval(timer);
  }, [currentScreen, medicines]);

  useEffect(() => {
    const user = getStoredUser();
    const seniorScreens: Screen[] = ['home', 'profile', 'points', 'medication', 'game'];

    if (!user || !isSeniorRole(user.role) || !seniorScreens.includes(currentScreen)) {
      return;
    }

    let isMounted = true;

    const loadCheckInReminders = async () => {
      try {
        const reminders = await getCheckInReminders(user);
        const seenIds = getSeenCheckInReminderIds(user);
        const unseenReminder = reminders.find((reminder) => !seenIds.includes(reminder.id));

        if (isMounted && unseenReminder) {
          setActiveCheckInReminder(unseenReminder);
        }
      } catch (error) {
        console.error('Unable to load check-in reminders:', error);
      }
    };

    loadCheckInReminders();
    const timer = window.setInterval(loadCheckInReminders, 10000);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, [currentScreen]);

  const dismissCheckInReminder = () => {
    const user = getStoredUser();

    if (user && activeCheckInReminder?.id) {
      saveSeenCheckInReminderId(user, activeCheckInReminder.id);
    }

    setActiveCheckInReminder(null);
  };

  const handleSOSConfirm = async () => {
    if (isSendingSOSRef.current) {
      return;
    }

    isSendingSOSRef.current = true;
    setIsSendingSOS(true);

    try {
      const user = getStoredUser();
      const personalInfo = getSavedPersonalInfo();
      const seniorProfile = user ? await getSeniorProfile(user).catch((error) => {
        console.error('Unable to load senior profile for SOS:', error);
        return null;
      }) : null;
      const seniorName = seniorProfile?.name || user?.displayName || user?.email?.split('@')[0] || 'Senior';
      const seniorPhone = seniorProfile?.phone || personalInfo.phone || '';
      const fallbackLocation = seniorProfile?.locationZones || seniorProfile?.address || personalInfo.address || 'Unknown location';
      const location = await getReadableSosLocation(fallbackLocation);

      await createSosAlert({
        location,
        message: 'SOS alert triggered',
        seniorName,
        seniorPhone,
        status: 'New',
      });

      alert('Emergency contacts have been notified!');
      setShowSOSConfirmation(false);
    } catch (error) {
      console.error('SOS alert failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to send SOS alert. Please try again.');
    } finally {
      isSendingSOSRef.current = false;
      setIsSendingSOS(false);
    }
  };

  const handleCheckIn = async ({
    redirectToPoints = true,
    suppressWindowCompletedAlert = false,
  }: {
    redirectToPoints?: boolean;
    suppressWindowCompletedAlert?: boolean;
  } = {}) => {
    if (isCheckingInRef.current) {
      return;
    }

    const user = getStoredUser();

    if (!user) {
      alert(t('loginAgainCheckIn'));
      setCurrentScreen('welcome');
      return;
    }

    isCheckingInRef.current = true;
    setIsCheckingIn(true);

    try {
      const nextPoints = await addCheckIn(user);
      if (activeCheckInReminder?.id) {
        saveSeenCheckInReminderId(user, activeCheckInReminder.id);
        setActiveCheckInReminder(null);
      }
      setCachedUserPoints(user, nextPoints);
      const completedWindowId = getCurrentCheckInWindowId() || 'morning';
      setCompletedCheckIn(saveCompletedCheckIn(user, completedWindowId));
      window.dispatchEvent(
        new CustomEvent('careconnect-points-updated', {
          detail: { uid: user.uid, points: nextPoints },
        }),
      );
      if (redirectToPoints) {
        setCurrentScreen('points');
      }
    } catch (error) {
      console.error('Check-in failed:', error);
      const completedWindowId = getCompletedWindowFromError(error);

      if (completedWindowId) {
        setCompletedCheckIn(saveCompletedCheckIn(user, completedWindowId));
      }

      if (!(suppressWindowCompletedAlert && completedWindowId)) {
        alert(error instanceof Error ? error.message : t('unableCheckIn'));
      }
    } finally {
      isCheckingInRef.current = false;
      setIsCheckingIn(false);
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    resetMedicineState();
    setCompletedCheckIn(null);
    setCurrentScreen('welcome');
  };

  const goToSeniorHome = () => {
    if (localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
      setCurrentScreen('home');
      return;
    }

    setLanguageReturnScreen('home');
    setCurrentScreen('language');
  };

  const openLanguageSelection = (returnScreen: LanguageReturnScreen) => {
    setLanguageReturnScreen(returnScreen);
    setCurrentScreen('language');
  };

  const handleLoginSuccess = async (user: AppUser) => {
    resetMedicineState();
    setCompletedCheckIn(getSavedCompletedCheckIn(user));

    if (isCaregiverRole(user.role) || isFamilyRole(user.role)) {
      setCurrentScreen('caregiverDashboard');
      return;
    }

    goToSeniorHome();
  };

  const renderScreen = () => {
    const activeUser = getStoredUser();
    const activeUserName = activeUser?.displayName || activeUser?.email?.split('@')[0] || '';

    switch (currentScreen) {
      case 'welcome':
        return (
          <LoginScreen
            highContrast={highContrast}
            onGetStarted={handleLoginSuccess}
            onFamilyRegister={(user) => {
              setFamilyRegistrationNotice(t('familyMemberRegistered', { email: user.email || t('familyMember') }));
              setCurrentScreen('carePortal');
            }}
          />
        );
      case 'language':
        return <LanguageSelectionScreen onContinue={() => setCurrentScreen(languageReturnScreen)} />;
      case 'home':
        return (
          <HomePage
            onSOSClick={() => setShowSOSConfirmation(true)}
            onCheckIn={handleCheckIn}
            displayName={activeUserName}
            isCheckingIn={isCheckingIn}
            completedCheckIn={completedCheckIn}
            isCurrentCheckInWindowCompleted={isCurrentCheckInWindowCompleted}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onChangeLanguage={() => openLanguageSelection('home')}
            onLogout={handleLogout}
            highContrast={highContrast}
            onToggleHighContrast={() => setHighContrast((value) => !value)}
          />
        );
      case 'points':
        return <PointsScreen highContrast={highContrast} />;
      case 'medication':
        return (
          <MedicationScreen
            highContrast={highContrast}
            medicines={medicines}
            takenMedicineIds={takenMedicineIds}
            onMedicineTaken={markMedicineTaken}
            onSaveMedicine={handleSaveMedicine}
            onDeleteMedicine={handleDeleteMedicine}
          />
        );
      case 'game':
        return (
          <GameScreen
            highContrast={highContrast}
            onToggleHighContrast={() => setHighContrast((value) => !value)}
            onGamePlayCheckIn={() => handleCheckIn({ redirectToPoints: false, suppressWindowCompletedAlert: true })}
            shouldPromptCheckIn={Boolean(activeUser && isSeniorRole(activeUser.role) && !isCurrentCheckInWindowCompleted)}
          />
        );
      case 'carePortal':
        return (
          <CarePortalScreen
            registrationNotice={familyRegistrationNotice}
            onBack={() => {
              setFamilyRegistrationNotice('');
              setCurrentScreen('welcome');
            }}
            onRegistered={() => {
              setFamilyRegistrationNotice('');
              setCurrentScreen('caregiverDashboard');
            }}
          />
        );
      case 'caregiverDashboard':
        return (
          <CaregiverDashboardScreen
            onBack={() => setCurrentScreen('carePortal')}
            onChangeLanguage={() => openLanguageSelection('caregiverDashboard')}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomePage
            onSOSClick={() => setShowSOSConfirmation(true)}
            onCheckIn={handleCheckIn}
            displayName={activeUserName}
            isCheckingIn={isCheckingIn}
            completedCheckIn={completedCheckIn}
            isCurrentCheckInWindowCompleted={isCurrentCheckInWindowCompleted}
          />
        );
    }
  };

  return (
    <div className={`h-[100dvh] w-full overflow-hidden bg-gray-100 min-[415px]:flex min-[415px]:items-center min-[415px]:justify-center ${highContrast ? 'careconnect-contrast-shell' : ''}`}>
      <div className={`mx-auto flex h-full max-h-[896px] min-h-0 w-full max-w-[414px] flex-col bg-white shadow-2xl min-[415px]:rounded-[2px] relative ${highContrast ? 'careconnect-contrast-app' : ''}`}>
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {currentScreen !== 'welcome' && currentScreen !== 'language' && currentScreen !== 'carePortal' && currentScreen !== 'caregiverDashboard' && (
          <nav
            className={`shrink-0 border-t-2 flex justify-around items-center ${
              highContrast ? 'border-white bg-black' : 'border-gray-200 bg-white'
            }`}
          >
            <NavButton
              icon={<Home className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('home')}
              active={currentScreen === 'home'}
              highContrast={highContrast}
              onClick={() => setCurrentScreen('home')}
            />
            <NavButton
              icon={<Pill className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('meds')}
              active={currentScreen === 'medication'}
              highContrast={highContrast}
              onClick={() => setCurrentScreen('medication')}
            />
            <NavButton
              icon={<Trophy className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('points')}
              active={currentScreen === 'points'}
              highContrast={highContrast}
              onClick={() => setCurrentScreen('points')}
            />
            <NavButton
              icon={<Gamepad2 className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('game')}
              active={currentScreen === 'game'}
              highContrast={highContrast}
              onClick={() => setCurrentScreen('game')}
            />
            <NavButton
              icon={<User className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('profile')}
              active={currentScreen === 'profile'}
              highContrast={highContrast}
              onClick={() => setCurrentScreen('profile')}
            />
          </nav>
        )}

        {showSOSConfirmation && (
          <div className="absolute inset-0 z-50 bg-white">
            <SOSConfirmationScreen
              onConfirm={handleSOSConfirm}
              onCancel={() => setShowSOSConfirmation(false)}
              isSending={isSendingSOS}
            />
          </div>
        )}

        {currentScreen === 'medication' && activeMedicineReminder && !showSOSConfirmation && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
            <div className="w-full rounded-[28px] bg-white p-6 text-center shadow-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0e8] text-[#f04a24]">
                <Clock className="h-9 w-9" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-[#07122e]">
                {t('medicineReminderPopup')}
              </h2>
              <p className="mt-3 text-xl leading-7 text-gray-600">
                {t('timeToTakeMedicine', {
                  name: activeMedicineReminder.name,
                  dose: activeMedicineReminder.dose,
                })}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => markMedicineTaken(activeMedicineReminder.id)}
                  className="flex h-14 items-center justify-center rounded-full bg-[#18833b] text-xl font-bold text-white active:scale-95"
                >
                  {t('done')}
                </button>
                <button
                  onClick={() => snoozeMedicineReminder(activeMedicineReminder.id)}
                  className="flex h-14 items-center justify-center rounded-full border-2 border-[#f04a24] bg-white text-xl font-bold text-[#f04a24] active:scale-95"
                >
                  {t('remindLater')}
                </button>
              </div>
            </div>
          </div>
        )}

        {['home', 'profile', 'points', 'medication', 'game'].includes(currentScreen) && activeCheckInReminder && !showSOSConfirmation && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
            <div className="w-full rounded-[28px] bg-white p-6 text-center shadow-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f3e8] text-[#416642]">
                <Bell className="h-9 w-9" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-[#07122e]">
                {t('checkInReminder')}
              </h2>
              <p className="mt-3 text-xl leading-7 text-gray-600">
                {activeCheckInReminder.message || t('pleaseCompleteCheckIn')}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => handleCheckIn()}
                  disabled={isCheckingIn}
                  className="flex h-14 items-center justify-center rounded-full bg-[#18833b] text-xl font-bold text-white active:scale-95 disabled:cursor-wait disabled:opacity-70"
                >
                  {isCheckingIn ? t('checking') : t('checkInNow')}
                </button>
                <button
                  onClick={dismissCheckInReminder}
                  className="flex h-14 items-center justify-center rounded-full border-2 border-[#416642] bg-white text-xl font-bold text-[#416642] active:scale-95"
                >
                  {t('later')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  highContrast,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  highContrast: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-[72px] flex-col items-center gap-1 rounded-lg px-1 py-2 transition-colors active:scale-95 min-[390px]:gap-2 min-[390px]:px-2 ${
        highContrast
          ? active
            ? 'bg-white text-black'
            : 'text-white hover:bg-white/10 hover:text-white'
          : active
          ? 'bg-green-50 text-green-700'
          : 'text-gray-400 hover:bg-green-50 hover:text-green-700'
      }`}
    >
      {icon}
      <span className="text-sm font-bold min-[390px]:text-base">{label}</span>
    </button>
  );
}
