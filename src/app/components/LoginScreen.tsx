import { Eye, EyeOff, LogIn, Lock, Mail, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { type AppUser, login } from '../services/backend';

export default function LoginScreen({
  onGetStarted,
  onFamilyRegister,
}: {
  onGetStarted: (user: AppUser) => void;
  onFamilyRegister: () => void;
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState<'care' | 'family'>('care');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const user = await login(identifier.trim(), password);
      onGetStarted(user);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error instanceof Error ? error.message : 'Email or password is incorrect.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = () => {
    setError('Forgot password is not connected yet.');
  };

  const handleFamilyRegister = () => {
    if (!identifier.trim() || !password) {
      setError('Please enter your email and password before registering.');
      return;
    }

    setError('');
    onFamilyRegister();
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f7f7f5]">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-sm">
          <div className="mt-4">
            <h1 className="text-[48px] font-bold leading-[54px] text-black min-[390px]:text-[52px] min-[390px]:leading-[58px]">
              Hello❤️!
            </h1>
          </div>

          <div className="mt-8 flex rounded-2xl bg-[#f1f1f1] p-1 shadow-sm">
            <button
              type="button"
              aria-pressed={selectedLoginType === 'care'}
              onClick={() => {
                setSelectedLoginType('care');
                setError('');
              }}
              className={`flex-1 rounded-2xl px-2 py-4 transition active:scale-[0.98] ${
                selectedLoginType === 'care' ? 'bg-white shadow-sm' : 'bg-transparent'
              }`}
            >
              <span className={`text-[16px] font-semibold leading-6 ${
                selectedLoginType === 'care' ? 'text-[#2d6b2f]' : 'text-[#2f2f2f]'
              }`}>
                Seniors &
                <br />
                Caregivers
              </span>
            </button>

            <button
              type="button"
              aria-pressed={selectedLoginType === 'family'}
              onClick={() => {
                setSelectedLoginType('family');
                setError('');
              }}
              className={`flex-1 rounded-2xl px-2 py-4 transition active:scale-[0.98] ${
                selectedLoginType === 'family' ? 'bg-white shadow-sm' : 'bg-transparent'
              }`}
            >
              <span className={`text-[16px] font-semibold leading-6 ${
                selectedLoginType === 'family' ? 'text-[#2d6b2f]' : 'text-[#2f2f2f]'
              }`}>
                Family
                <br />
                Members
              </span>
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mt-10">
              <label className="mb-3 block text-[18px] font-bold text-black">
                Username / Email
              </label>

              <div className="flex items-center gap-4 rounded-2xl border-2 border-[#c8d1bf] bg-white px-5 py-5">
                <Mail className="h-6 w-6 flex-shrink-0 text-[#2f7328]" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-transparent text-[18px] text-gray-700 outline-none placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="mb-3 block text-[18px] font-bold text-black">
                Password
              </label>

              <div className="flex items-center gap-4 rounded-2xl border-2 border-[#c8d1bf] bg-white px-5 py-5">
                <Lock className="h-6 w-6 flex-shrink-0 text-[#2f7328]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent text-[18px] text-gray-700 outline-none placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-[#2f7328]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {error && <p className="mt-5 text-base font-bold text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#2f7328] py-5 text-[20px] font-semibold text-white shadow-md transition-all hover:bg-[#296422] active:scale-95 disabled:bg-gray-400 disabled:active:scale-100"
            >
              <LogIn className="h-6 w-6" />
              {isLoggingIn ? 'Logging in...' : 'Log In'}
            </button>

            {selectedLoginType === 'family' && (
              <button
                type="button"
                onClick={handleFamilyRegister}
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#2f7328] bg-white py-5 text-[20px] font-semibold text-[#2f7328] transition-all hover:bg-[#f1f8ef] active:scale-95"
              >
                <UserPlus className="h-6 w-6" />
                Register
              </button>
            )}

            <div className="mb-2 mt-8 text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[18px] font-semibold text-[#2f7328] hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
