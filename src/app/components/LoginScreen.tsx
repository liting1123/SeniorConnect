import { Eye, EyeOff, LogIn, Lock, Mail, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { type AppUser, login, registerFamilyMember } from '../services/backend';

export default function LoginScreen({
  onGetStarted,
  onFamilyRegister,
}: {
  onGetStarted: (user: AppUser) => void;
  onFamilyRegister: (user: AppUser) => void;
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState<'care' | 'family'>('care');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const user = await login(identifier.trim(), password, selectedLoginType);
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

  const handleFamilyRegister = async () => {
    if (!identifier.trim() || !password) {
      setError('Please enter your email and password before registering.');
      return;
    }

    setError('');
    setIsLoggingIn(true);

    try {
      const user = await registerFamilyMember(identifier.trim(), password);
      onFamilyRegister(user);
    } catch (error) {
      console.error('Family registration failed:', error);
      setError(error instanceof Error ? error.message : 'Unable to register family member.');
    } finally {
      setIsLoggingIn(false);
    }
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
              <div className="flex h-14 items-center rounded-2xl bg-[#f3f4f6] px-4 ring-1 ring-transparent focus-within:bg-white focus-within:ring-[#2d6b2f]">
                <Mail className="h-6 w-6 shrink-0 text-[#7a7a7a]" />
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="Enter username or email"
                  autoComplete="username"
                  className="ml-3 min-w-0 flex-1 bg-transparent text-[18px] font-semibold text-black outline-none placeholder:text-[#8c8c8c]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-[18px] font-bold text-black">
                Password
              </label>
              <div className="flex h-14 items-center rounded-2xl bg-[#f3f4f6] px-4 ring-1 ring-transparent focus-within:bg-white focus-within:ring-[#2d6b2f]">
                <Lock className="h-6 w-6 shrink-0 text-[#7a7a7a]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="ml-3 min-w-0 flex-1 bg-transparent text-[18px] font-semibold text-black outline-none placeholder:text-[#8c8c8c]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                  className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#5f6368] active:bg-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="mt-4 text-[16px] font-semibold text-[#2d6b2f] active:opacity-70"
            >
              Forgot password?
            </button>

            {error && (
              <p className="mt-4 rounded-2xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!identifier.trim() || !password || isLoggingIn}
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#2d6b2f] text-[20px] font-bold text-white shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              <LogIn className="h-6 w-6" />
              {isLoggingIn ? 'Please wait...' : 'Login'}
            </button>

            {selectedLoginType === 'family' && (
              <div className="mt-6 border-t border-[#eeeeee] pt-5">
                <p className="text-center text-[15px] font-semibold text-[#666666]">
                  Registering as a family member?
                </p>
                <button
                  type="button"
                  onClick={handleFamilyRegister}
                  disabled={isLoggingIn}
                  className="mt-3 flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-[#2d6b2f] bg-white text-[18px] font-bold text-[#2d6b2f] transition active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                >
                  <UserPlus className="h-5 w-5" />
                  Create family account
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
