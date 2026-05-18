import { Heart, Mail, Lock, Eye, ChevronRight } from 'lucide-react';
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
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="flex min-h-full items-center justify-center px-5 py-6 min-[390px]:px-8 min-[390px]:py-8">
        <div className="w-full rounded-3xl bg-white p-5 shadow-lg min-[390px]:p-8">
          {/* Logo */}
          <div className="mb-5 flex items-center gap-3 min-[390px]:mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-gray-800 min-[390px]:h-14 min-[390px]:w-14">
              <Heart className="h-6 w-6 text-gray-800 min-[390px]:h-7 min-[390px]:w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold min-[390px]:text-2xl">{t('careConnect')}</h2>
              <p className="text-sm text-gray-600">{t('mobile')}</p>
            </div>
          </div>

          {/* Welcome Title */}
          <h1 className="mb-5 text-center text-4xl font-bold leading-tight min-[390px]:mb-8 min-[390px]:text-5xl">{t('welcomeBack')}</h1>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 min-[390px]:space-y-6">
            {/* Email Input */}
            <div>
              <label className="mb-2 block text-lg font-bold text-gray-900 min-[390px]:mb-3 min-[390px]:text-xl">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 min-[390px]:h-6 min-[390px]:w-6" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('enterEmail')}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-[390px]:py-5 min-[390px]:pl-14 min-[390px]:text-xl"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-2 block text-lg font-bold text-gray-900 min-[390px]:mb-3 min-[390px]:text-xl">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 min-[390px]:h-6 min-[390px]:w-6" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-[390px]:py-5 min-[390px]:pl-14 min-[390px]:pr-14 min-[390px]:text-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye className="h-5 w-5 min-[390px]:h-6 min-[390px]:w-6" />
                </button>
              </div>
            </div>

            {error && <p className="text-base font-bold text-red-600 min-[390px]:text-lg">{error}</p>}

            {/* Log In Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 py-4 text-xl font-bold text-white transition-transform active:scale-95 disabled:bg-gray-400 disabled:active:scale-100 min-[390px]:py-5 min-[390px]:text-2xl"
            >
              <Lock className="h-5 w-5 min-[390px]:h-6 min-[390px]:w-6" />
              {isLoggingIn ? 'Logging in...' : t('logIn')}
            </button>

            {/* Forgot Password */}
            <button
              type="button"
              className="w-full text-lg font-bold text-gray-700 underline min-[390px]:text-xl"
            >
              {t('forgotPassword')}
            </button>
          </form>

          {/* OR Divider */}
          <div className="my-5 flex items-center gap-4 min-[390px]:my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-500 font-bold text-lg">{t('or')}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Caregiver Login */}
          <button
            type="button"
            onClick={onCaregiverLogin}
            className="flex w-full items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-4 transition-colors active:bg-green-100 min-[390px]:p-5"
          >
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-gray-900 min-[390px]:text-xl">{t('caregiverLogin')}</h3>
              <p className="text-sm text-gray-600 min-[390px]:text-base">{t('caregiverDesc')}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}
