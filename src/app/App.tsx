import { useEffect, useMemo, useRef, useState } from 'react';
import { Clock, Gamepad2, Home, User, Trophy, Pill } from 'lucide-react';
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
  type Medicine,
  addCheckIn,
  clearStoredUser,
  deleteMedicine,
  getMedicines,
  getSeniorProfile,
  getStoredUser,
  getUserStorageIdentity,
  saveMedicine,
  setCachedUserPoints,
} from './services/backend';
import { createSosAlert } from './services/serviceNow';

type Screen = 'welcome' | 'language' | 'home' | 'profile' | 'points' | 'medication' | 'game' | 'carePortal' | 'caregiverDashboard';
type LanguageReturnScreen = 'home' | 'caregiverDashboard';
const MEDICINE_REMINDER_EARLY_MINUTES = 5;

function normalizeRole(role = '') {
  return role.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function isFamilyRole(role = '') {
  return ['family', 'families', 'familymember', 'familymembers'].includes(normalizeRole(role));
}

function isCaregiverRole(role = '') {
  return ['caregiver', 'caregivers', 'nok', 'nextofkin', 'caregiverfamily'].includes(normalizeRole(role));
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

export default function App() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [languageReturnScreen, setLanguageReturnScreen] = useState<LanguageReturnScreen>('home');
  const [showSOSConfirmation, setShowSOSConfirmation] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const isSendingSOSRef = useRef(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const isCheckingInRef = useRef(false);
  const [takenMedicineIds, setTakenMedicineIds] = useState<string[]>([]);
  const takenMedicineIdsRef = useRef<string[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const hasLoadedMedicinesRef = useRef(false);
  const [activeMedicineReminderId, setActiveMedicineReminderId] = useState<string | null>(null);
  const activeMedicineReminderIdRef = useRef<string | null>(null);
  const [snoozedMedicineUntil, setSnoozedMedicineUntil] = useState<Record<string, number>>({});
  const snoozedMedicineUntilRef = useRef<Record<string, number>>({});
  const [familyRegistrationNotice, setFamilyRegistrationNotice] = useState('');

  const activeMedicineReminder = useMemo(() => {
    return medicines.find((medicine) => medicine.id === activeMedicineReminderId) || null;
  }, [activeMedicineReminderId]);

  const markMedicineTaken = (medicineId: string) => {
    if (!takenMedicineIdsRef.current.includes(medicineId)) {
      takenMedicineIdsRef.current = [...takenMedicineIdsRef.current, medicineId];
    }
    activeMedicineReminderIdRef.current = null;
    setTakenMedicineIds(takenMedicineIdsRef.current);
    setSnoozedMedicineUntil((current) => {
      const next = { ...current };
      delete next[medicineId];
      snoozedMedicineUntilRef.current = next;
      return next;
    });
    setActiveMedicineReminderId(null);
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
      alert('Please log in again before editing medicines.');
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
      alert('Please log in again before removing medicines.');
      setCurrentScreen('welcome');
      return;
    }

    await deleteMedicine(user, medicineId);
    setMedicines((current) => current.filter((medicine) => medicine.id !== medicineId));
  };

  useEffect(() => {
    const user = getStoredUser();

    if (!user || isCaregiverRole(user.role) || isFamilyRole(user.role) || hasLoadedMedicinesRef.current) {
      return;
    }

    let isMounted = true;

    getMedicines(user)
      .then((serviceNowMedicines) => {
        if (isMounted && serviceNowMedicines.length > 0) {
          hasLoadedMedicinesRef.current = true;
          setMedicines(applyMedicineNameOverrides(serviceNowMedicines, user));
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
      const location = seniorProfile?.locationZones || personalInfo.address || 'Unknown location';

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

  const handleCheckIn = async () => {
    if (isCheckingInRef.current) {
      return;
    }

    const user = getStoredUser();

    if (!user) {
      alert('Please log in again before checking in.');
      setCurrentScreen('welcome');
      return;
    }

    isCheckingInRef.current = true;
    setIsCheckingIn(true);

    try {
      const nextPoints = await addCheckIn(user);
      setCachedUserPoints(user, nextPoints);
      window.dispatchEvent(
        new CustomEvent('careconnect-points-updated', {
          detail: { uid: user.uid, points: nextPoints },
        }),
      );
      setCurrentScreen('points');
    } catch (error) {
      console.error('Check-in failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to check in right now. Please try again later.');
    } finally {
      isCheckingInRef.current = false;
      setIsCheckingIn(false);
    }
  };

  const handleLogout = () => {
    clearStoredUser();
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
    if (isCaregiverRole(user.role) || isFamilyRole(user.role)) {
      setCurrentScreen('caregiverDashboard');
      return;
    }

    goToSeniorHome();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <LoginScreen
            onGetStarted={handleLoginSuccess}
            onFamilyRegister={(user) => {
              setFamilyRegistrationNotice(`${user.email || 'Family member'} has been registered.`);
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
            isCheckingIn={isCheckingIn}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onChangeLanguage={() => openLanguageSelection('home')}
            onLogout={handleLogout}
          />
        );
      case 'points':
        return <PointsScreen />;
      case 'medication':
        return (
          <MedicationScreen
            medicines={medicines}
            takenMedicineIds={takenMedicineIds}
            onMedicineTaken={markMedicineTaken}
            onSaveMedicine={handleSaveMedicine}
            onDeleteMedicine={handleDeleteMedicine}
          />
        );
      case 'game':
        return <GameScreen />;
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
            isCheckingIn={isCheckingIn}
          />
        );
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-gray-100 min-[415px]:flex min-[415px]:items-center min-[415px]:justify-center">
      <div className="mx-auto flex h-full max-h-[896px] min-h-0 w-full max-w-[414px] flex-col bg-white shadow-2xl min-[415px]:rounded-[2px] relative">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {currentScreen !== 'welcome' && currentScreen !== 'language' && currentScreen !== 'carePortal' && currentScreen !== 'caregiverDashboard' && (
          <nav className="shrink-0 bg-white border-t-2 border-gray-200 flex justify-around items-center">
            <NavButton
              icon={<Home className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('home')}
              active={currentScreen === 'home'}
              onClick={() => setCurrentScreen('home')}
            />
            <NavButton
              icon={<Pill className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('meds')}
              active={currentScreen === 'medication'}
              onClick={() => setCurrentScreen('medication')}
            />
            <NavButton
              icon={<Trophy className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('points')}
              active={currentScreen === 'points'}
              onClick={() => setCurrentScreen('points')}
            />
            <NavButton
              icon={<Gamepad2 className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('game')}
              active={currentScreen === 'game'}
              onClick={() => setCurrentScreen('game')}
            />
            <NavButton
              icon={<User className="h-7 w-7 min-[390px]:h-9 min-[390px]:w-9" />}
              label={t('profile')}
              active={currentScreen === 'profile'}
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
      </div>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-[72px] flex-col items-center gap-1 rounded-lg px-1 py-2 transition-colors active:scale-95 min-[390px]:gap-2 min-[390px]:px-2 ${
        active ? 'text-green-600' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-sm font-bold min-[390px]:text-base">{label}</span>
    </button>
  );
}
