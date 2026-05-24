import { ArrowLeft, Eye, HeartHandshake, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { login } from '../services/backend';

export default function CaregiverLoginScreen({
  onBack,
  onLoginSuccess,
}: {
  onBack: () => void;
  onLoginSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      await login(email.trim(), password);
      onLoginSuccess();
    } catch (error) {
      console.error('Caregiver login failed:', error);
      setError(error instanceof Error ? error.message : 'Caregiver email or password is incorrect.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="flex min-h-full items-center justify-center px-5 py-6 min-[390px]:px-8 min-[390px]:py-8">
        <div className="w-full rounded-3xl bg-white p-5 shadow-lg min-[390px]:p-8">
          <button
            type="button"
            onClick={onBack}
            className="mb-5 flex h-11 w-11 items-center justify-center rounded-full text-[#174b2c] transition-colors active:bg-green-50 min-[390px]:mb-7 min-[390px]:h-12 min-[390px]:w-12"
            aria-label="Back"
          >
            <ArrowLeft className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
          </button>

          <div className="mb-5 flex items-center gap-3 min-[390px]:mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-gray-800 min-[390px]:h-14 min-[390px]:w-14">
              <HeartHandshake className="h-6 w-6 text-gray-800 min-[390px]:h-7 min-[390px]:w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold min-[390px]:text-2xl">CareConnect</h2>
              <p className="text-sm text-gray-600">Caregiver Portal</p>
            </div>
          </div>

          <h1 className="mb-2 text-center text-4xl font-bold leading-tight min-[390px]:text-5xl">
            Caregiver Login
          </h1>
          <p className="mb-5 text-center text-base font-medium leading-6 text-gray-600 min-[390px]:mb-8 min-[390px]:text-lg">
            Sign in to manage senior care and alerts.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 min-[390px]:space-y-6">
            <div>
              <label className="mb-2 block text-lg font-bold text-gray-900 min-[390px]:mb-3 min-[390px]:text-xl">
                Caregiver Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 min-[390px]:h-6 min-[390px]:w-6" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter caregiver email"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-[390px]:py-5 min-[390px]:pl-14 min-[390px]:text-xl"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-lg font-bold text-gray-900 min-[390px]:mb-3 min-[390px]:text-xl">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 min-[390px]:h-6 min-[390px]:w-6" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 min-[390px]:py-5 min-[390px]:pl-14 min-[390px]:pr-14 min-[390px]:text-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Eye className="h-5 w-5 min-[390px]:h-6 min-[390px]:w-6" />
                </button>
              </div>
            </div>

            {error && <p className="text-base font-bold text-red-600 min-[390px]:text-lg">{error}</p>}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 py-4 text-xl font-bold text-white transition-transform active:scale-95 disabled:bg-gray-400 disabled:active:scale-100 min-[390px]:py-5 min-[390px]:text-2xl"
            >
              <ShieldCheck className="h-5 w-5 min-[390px]:h-6 min-[390px]:w-6" />
              {isLoggingIn ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
