import { useEffect, useMemo, useState } from 'react';
import { Clock, Gamepad2, Home, User, Trophy, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { LANGUAGE_STORAGE_KEY } from '../i18n';
import LoginScreen from './components/LoginScreen';
import CaregiverLoginScreen from './components/CaregiverLoginScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import HomePage from './components/HomePage';
import SOSConfirmationScreen from './components/SOSConfirmation';
import ProfileScreen, { PERSONAL_INFO_KEY } from './components/ProfileScreen';
import PointsScreen from './components/PointsScreen';
import MedicationScreen, { getCurrentMinutes, getMinutesFromTimeLabel, medicines } from './components/MedicationScreen';
import CarePortalScreen from './components/CarePortalScreen';
import CaregiverDashboardScreen from './components/CaregiverDashboardScreen';
import GameScreen from './components/GameScreen';
import { addCheckIn, clearStoredUser, getStoredUser, setCachedUserPoints } from './services/backend';
import { createSosAlert } from './services/serviceNow';

type Screen = 'welcome' | 'language' | 'home' | 'profile' | 'points' | 'medication' | 'game' | 'caregiverLogin' | 'carePortal' | 'caregiverDashboard';
const MEDICINE_REMINDER_EARLY_MINUTES = 5;

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

export default function App() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showSOSConfirmation, setShowSOSConfirmation] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const [takenMedicineIds, setTakenMedicineIds] = useState<string[]>([]);
  const [activeMedicineReminderId, setActiveMedicineReminderId] = useState<string | null>(null);
  const [snoozedMedicineUntil, setSnoozedMedicineUntil] = useState<Record<string, number>>({});

  const activeMedicineReminder = useMemo(() => {
    return medicines.find((medicine) => medicine.id === activeMedicineReminderId) || null;
  }, [activeMedicineReminderId]);

  const markMedicineTaken = (medicineId: string) => {
    setTakenMedicineIds((current) => (current.includes(medicineId) ? current : [...current, medicineId]));
    setSnoozedMedicineUntil((current) => {
      const next = { ...current };
      delete next[medicineId];
      return next;
    });
    setActiveMedicineReminderId(null);
  };

  const snoozeMedicineReminder = (medicineId: string) => {
    setSnoozedMedicineUntil((current) => ({
      ...current,
      [medicineId]: getCurrentMinutes() + 5,
    }));
    setActiveMedicineReminderId(null);
  };

  useEffect(() => {
    const checkForDueMedicine = () => {
      if (
        activeMedicineReminderId ||
        currentScreen !== 'medication'
      ) {
        return;
      }

      const currentMinutes = getCurrentMinutes();
      const dueMedicine = medicines.find((medicine) => {
        const medicineMinutes = getMinutesFromTimeLabel(medicine.time);
        const snoozedUntil = snoozedMedicineUntil[medicine.id] ?? 0;

        return (
          medicineMinutes !== null &&
          currentMinutes >= medicineMinutes - MEDICINE_REMINDER_EARLY_MINUTES &&
          currentMinutes >= snoozedUntil &&
          !takenMedicineIds.includes(medicine.id)
        );
      });

      if (dueMedicine) {
        setActiveMedicineReminderId(dueMedicine.id);
      }
    };

    checkForDueMedicine();
    const timer = window.setInterval(checkForDueMedicine, 30000);

    return () => window.clearInterval(timer);
  }, [activeMedicineReminderId, currentScreen, snoozedMedicineUntil, takenMedicineIds]);

  const handleSOSConfirm = async () => {
    if (isSendingSOS) {
      return;
    }

    setIsSendingSOS(true);

    try {
      const user = getStoredUser();
      const personalInfo = getSavedPersonalInfo();

      await createSosAlert({
        location: personalInfo.address || 'Block 123 Woodlands',
        message: 'SOS alert triggered',
        seniorName: user?.displayName || 'Tan HA HA',
        seniorPhone: personalInfo.phone || '91234567',
        status: 'New',
      });

      alert('Emergency contacts have been notified!');
      setShowSOSConfirmation(false);
    } catch (error) {
      console.error('SOS alert failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to send SOS alert. Please try again.');
    } finally {
      setIsSendingSOS(false);
    }
  };

  const handleCheckIn = async () => {
    const user = getStoredUser();

    if (!user) {
      alert('Please log in again before checking in.');
      setCurrentScreen('welcome');
      return;
    }

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
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    setCurrentScreen('welcome');
  };

  const goToSeniorHome = () => {
    setCurrentScreen(localStorage.getItem(LANGUAGE_STORAGE_KEY) ? 'home' : 'language');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <LoginScreen
            onGetStarted={goToSeniorHome}
            onCaregiverLogin={() => setCurrentScreen('caregiverLogin')}
          />
        );
      case 'caregiverLogin':
        return (
          <CaregiverLoginScreen
            onBack={() => setCurrentScreen('welcome')}
            onLoginSuccess={() => setCurrentScreen('caregiverDashboard')}
            onRegister={() => setCurrentScreen('carePortal')}
          />
        );
      case 'language':
        return <LanguageSelectionScreen onContinue={() => setCurrentScreen('home')} />;
      case 'home':
        return (
          <HomePage
            onSOSClick={() => setShowSOSConfirmation(true)}
            onCheckIn={handleCheckIn}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onChangeLanguage={() => setCurrentScreen('language')}
            onLogout={handleLogout}
          />
        );
      case 'points':
        return <PointsScreen />;
      case 'medication':
        return <MedicationScreen takenMedicineIds={takenMedicineIds} onMedicineTaken={markMedicineTaken} />;
      case 'game':
        return <GameScreen />;
      case 'carePortal':
        return (
          <CarePortalScreen
            onBack={() => setCurrentScreen('welcome')}
            onRegistered={() => setCurrentScreen('caregiverDashboard')}
          />
        );
      case 'caregiverDashboard':
        return <CaregiverDashboardScreen onBack={() => setCurrentScreen('carePortal')} />;
      default:
        return (
          <HomePage
            onSOSClick={() => setShowSOSConfirmation(true)}
            onCheckIn={handleCheckIn}
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

        {currentScreen !== 'welcome' && currentScreen !== 'language' && currentScreen !== 'caregiverLogin' && currentScreen !== 'carePortal' && currentScreen !== 'caregiverDashboard' && (
          <nav className="shrink-0 bg-white border-t-2 border-gray-200 px-2 py-2 flex justify-around items-center">
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
