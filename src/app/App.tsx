import { useState } from 'react';
import { Home, AlertCircle, User, Trophy, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import WelcomeScreen from './components/WelcomeScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import HomeScreen from './components/HomeScreen';
import SOSConfirmationScreen from './components/SOSConfirmation';
import ProfileScreen from './components/ProfileScreen';
import PointsScreen from './components/PointsScreen';
import MedicationScreen from './components/MedicationScreen';

type Screen = 'welcome' | 'language' | 'home' | 'sos' | 'profile' | 'points' | 'medication';

export default function App() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleSOSConfirm = () => {
    alert('Emergency contacts have been notified!');
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentScreen('language')} />;
      case 'language':
        return <LanguageSelectionScreen onContinue={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen onSOSClick={() => setCurrentScreen('sos')} />;
      case 'sos':
        return (
          <SOSConfirmationScreen
            onConfirm={handleSOSConfirm}
            onCancel={() => setCurrentScreen('home')}
          />
        );
      case 'profile':
        return <ProfileScreen />;
      case 'points':
        return <PointsScreen />;
      case 'medication':
        return <MedicationScreen />;
      default:
        return <HomeScreen onSOSClick={() => setCurrentScreen('sos')} />;
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col relative">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {currentScreen !== 'welcome' && currentScreen !== 'language' && (
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
              icon={<AlertCircle className="w-9 h-9" />}
              label={t('sos')}
              active={currentScreen === 'sos'}
              onClick={() => setCurrentScreen('sos')}
              special
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
      </div>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
  special
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  special?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-colors active:scale-95 ${
        active
          ? special
            ? 'text-red-500'
            : 'text-green-600'
          : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-base font-bold">{label}</span>
    </button>
  );
}
