import { useState } from 'react';
import { Gamepad2, Home, User, Trophy, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import LoginScreen from './components/LoginScreen';
import CaregiverLoginScreen from './components/CaregiverLoginScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import HomePage from './components/HomePage';
import SOSConfirmationScreen from './components/SOSConfirmation';
import ProfileScreen from './components/ProfileScreen';
import PointsScreen from './components/PointsScreen';
import MedicationScreen from './components/MedicationScreen';
import CarePortalScreen from './components/CarePortalScreen';
import CaregiverDashboardScreen from './components/CaregiverDashboardScreen';
import GameScreen from './components/GameScreen';
import { addCheckIn, clearStoredUser, getStoredUser, setCachedUserPoints } from './services/backend';
import { createSosAlert } from './services/serviceNow';

type Screen = 'welcome' | 'language' | 'home' | 'profile' | 'points' | 'medication' | 'game' | 'caregiverLogin' | 'carePortal' | 'caregiverDashboard';

export default function App() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showSOSConfirmation, setShowSOSConfirmation] = useState(false);
  const [isSendingSOS, setIsSendingSOS] = useState(false);

  const handleSOSConfirm = async () => {
    if (isSendingSOS) {
      return;
    }

    setIsSendingSOS(true);

    try {
      const user = getStoredUser();

      await createSosAlert({
        location: 'Block 123 Woodlands',
        message: 'SOS alert triggered',
        seniorName: user?.displayName || 'Tan HA HA',
        seniorPhone: '91234567',
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <LoginScreen
            onGetStarted={() => setCurrentScreen('language')}
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
        return <ProfileScreen onLogout={handleLogout} />;
      case 'points':
        return <PointsScreen />;
      case 'medication':
        return <MedicationScreen />;
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
              label="Game"
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
