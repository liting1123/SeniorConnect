import { useState } from 'react';
import { Home, User, Trophy, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import LoginScreen from './components/LoginScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import HomePage from './components/HomePage';
import SOSConfirmationScreen from './components/SOSConfirmation';
import ProfileScreen from './components/ProfileScreen';
import PointsScreen from './components/PointsScreen';
import MedicationScreen from './components/MedicationScreen';
import CarePortalScreen from './components/CarePortalScreen';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

type Screen = 'welcome' | 'language' | 'home' | 'profile' | 'points' | 'medication' | 'carePortal';

export default function App() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showSOSConfirmation, setShowSOSConfirmation] = useState(false);

  const handleSOSConfirm = () => {
    alert('Emergency contacts have been notified!');
    setShowSOSConfirmation(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Unable to log out. Please try again.');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <LoginScreen
            onGetStarted={() => setCurrentScreen('language')}
            onCaregiverLogin={() => setCurrentScreen('carePortal')}
          />
        );
      case 'language':
        return <LanguageSelectionScreen onContinue={() => setCurrentScreen('home')} />;
      case 'home':
        return (
          <HomePage
            onSOSClick={() => setShowSOSConfirmation(true)}
            onCheckIn={() => setCurrentScreen('points')}
          />
        );
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      case 'points':
        return <PointsScreen />;
      case 'medication':
        return <MedicationScreen />;
      case 'carePortal':
        return <CarePortalScreen onBack={() => setCurrentScreen('welcome')} />;
      default:
        return (
          <HomePage
            onSOSClick={() => setShowSOSConfirmation(true)}
            onCheckIn={() => setCurrentScreen('points')}
          />
        );
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col relative">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {currentScreen !== 'welcome' && currentScreen !== 'language' && currentScreen !== 'carePortal' && (
          <nav className="bg-white border-t-2 border-gray-200 px-2 py-3 flex justify-around items-center">
            <NavButton
              icon={<Home className="w-9 h-9" />}
              label={t('home')}
              active={currentScreen === 'home'}
              onClick={() => setCurrentScreen('home')}
            />
            <NavButton
              icon={<Pill className="w-9 h-9" />}
              label={t('meds')}
              active={currentScreen === 'medication'}
              onClick={() => setCurrentScreen('medication')}
            />
            <NavButton
              icon={<Trophy className="w-9 h-9" />}
              label={t('points')}
              active={currentScreen === 'points'}
              onClick={() => setCurrentScreen('points')}
            />
            <NavButton
              icon={<User className="w-9 h-9" />}
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
      className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-colors active:scale-95 ${
        active ? 'text-green-600' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-base font-bold">{label}</span>
    </button>
  );
}
