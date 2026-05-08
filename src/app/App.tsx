import { useState } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { RoleSelection } from './components/RoleSelection';
import { Rewards } from './components/Rewards';
import { Profile } from './components/Profile';
import { SOSConfirmation } from './components/SOSConfirmation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'role' | 'home' | 'rewards' | 'profile' | 'sos'>('login');
  const [userRole, setUserRole] = useState<'nok' | 'caregiver' | null>(null);

  const handleLogin = () => {
    setCurrentScreen('role');
  };

  const handleRoleSelect = (role: 'nok' | 'caregiver') => {
    setUserRole(role);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: 'home' | 'rewards' | 'profile') => {
    setCurrentScreen(screen);
  };

  const handleSOSClick = () => {
    setCurrentScreen('sos');
  };

  const handleSOSCancel = () => {
    setCurrentScreen('home');
  };

  const handleSOSConfirm = () => {
    alert('Emergency contacts have been notified!');
    setCurrentScreen('home');
  };

  return (
    <div className="size-full bg-white overflow-auto">
      {currentScreen === 'login' && <Login onLogin={handleLogin} />}
      {currentScreen === 'role' && <RoleSelection onRoleSelect={handleRoleSelect} />}
      {currentScreen === 'home' && (
        <Home
          onNavigate={handleNavigate}
          onSOSClick={handleSOSClick}
          currentTab="home"
        />
      )}
      {currentScreen === 'rewards' && (
        <Rewards onNavigate={handleNavigate} currentTab="rewards" />
      )}
      {currentScreen === 'profile' && (
        <Profile onNavigate={handleNavigate} currentTab="profile" />
      )}
      {currentScreen === 'sos' && (
        <SOSConfirmation
          onCancel={handleSOSCancel}
          onConfirm={handleSOSConfirm}
        />
      )}
    </div>
  );
}
