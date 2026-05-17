import { Heart, Mail, Lock, Eye, HelpCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function LoginScreen({
  onGetStarted,
  onCaregiverLogin
}: {
  onGetStarted: () => void;
  onCaregiverLogin: () => void;
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onGetStarted();
    } catch (error) {
      console.error('Login failed:', error);
      setError('Email or password is incorrect.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 border-2 border-gray-800 rounded-2xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-gray-800" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('careConnect')}</h2>
              <p className="text-sm text-gray-600">{t('mobile')}</p>
            </div>
          </div>

          {/* Welcome Title */}
          <h1 className="text-5xl font-bold text-center mb-8">{t('welcomeBack')}</h1>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="text-xl font-bold text-gray-900 mb-3 block">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('enterEmail')}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-14 pr-5 text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xl font-bold text-gray-900 mb-3 block">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-14 pr-14 text-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>

            {error && <p className="text-lg font-bold text-red-600">{error}</p>}

            {/* Log In Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-green-700 text-white py-5 rounded-2xl text-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:bg-gray-400 disabled:active:scale-100"
            >
              <Lock className="w-6 h-6" />
              {isLoggingIn ? 'Logging in...' : t('logIn')}
            </button>

            {/* Forgot Password */}
            <button
              type="button"
              className="w-full text-gray-700 text-xl font-bold underline"
            >
              {t('forgotPassword')}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-500 font-bold text-lg">{t('or')}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Caregiver Login */}
          <button
            type="button"
            onClick={onCaregiverLogin}
            className="w-full bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 active:bg-green-100 transition-colors"
          >
            <div className="flex-1 text-left">
              <h3 className="text-xl font-bold text-gray-900">{t('caregiverLogin')}</h3>
              <p className="text-base text-gray-600">{t('caregiverDesc')}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}
