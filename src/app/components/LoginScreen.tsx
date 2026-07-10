import { Eye, EyeOff, LogIn, Lock, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type AppUser, login, registerFamilyMember, resetPassword } from '../services/backend';

function createMfaCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function LoginScreen({
  highContrast = false,
  onGetStarted,
  onFamilyRegister,
}: {
  highContrast?: boolean;
  onGetStarted: (user: AppUser) => void;
  onFamilyRegister: (user: AppUser) => void;
}) {
  const { t } = useTranslation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetPasswordValue, setResetPasswordValue] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [selectedLoginType, setSelectedLoginType] = useState<'senior' | 'family'>('senior');
  const [mfaCodeInput, setMfaCodeInput] = useState('');
  const [pendingMfaCode, setPendingMfaCode] = useState('');
  const [pendingMfaUser, setPendingMfaUser] = useState<AppUser | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setIsLoggingIn(true);

    try {
      const user = await login(identifier.trim(), password, selectedLoginType);

      if (selectedLoginType === 'family') {
        const nextCode = createMfaCode();
        setPendingMfaUser(user);
        setPendingMfaCode(nextCode);
        setMfaCodeInput('');
        setNotice(t('verificationCode', { code: nextCode }));
        return;
      }

      onGetStarted(user);
    } catch (error) {
      console.error('Login failed:', error);
      const message = error instanceof Error ? error.message : 'Email or password is incorrect.';
      setError(
        /Seniors\s*&\s*Caregivers/i.test(message)
          ? 'This account is for Seniors. Please use Seniors login tab.'
          : message,
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleVerifyMfa = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pendingMfaUser) {
      setError(t('noPendingVerification'));
      return;
    }

    if (mfaCodeInput.trim() !== pendingMfaCode) {
      setError(t('incorrectVerificationCode'));
      return;
    }

    setError('');
    setNotice(t('verificationSuccessful'));
    const verifiedUser = pendingMfaUser;
    setPendingMfaUser(null);
    setPendingMfaCode('');
    setMfaCodeInput('');
    onGetStarted(verifiedUser);
  };

  const handleResendMfaCode = () => {
    const nextCode = createMfaCode();
    setPendingMfaCode(nextCode);
    setMfaCodeInput('');
    setError('');
    setNotice(t('verificationCode', { code: nextCode }));
  };

  const handleCancelMfa = () => {
    setPendingMfaUser(null);
    setPendingMfaCode('');
    setMfaCodeInput('');
    setNotice('');
    setError('');
  };

  const handleForgotPassword = () => {
    setError('');
    setNotice('');
    setPassword('');
    setResetPasswordValue('');
    setResetConfirmPassword('');
    setIsResetMode(true);
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!identifier.trim()) {
      setError(t('pleaseEnterUsernameOrEmail'));
      return;
    }

    if (!resetPasswordValue || !resetConfirmPassword) {
      setError(t('pleaseEnterAndConfirmNewPassword'));
      return;
    }

    if (resetPasswordValue !== resetConfirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    setError('');
    setNotice('');
    setIsLoggingIn(true);

    try {
      await resetPassword(identifier.trim(), resetPasswordValue, selectedLoginType);
      setPassword('');
      setResetPasswordValue('');
      setResetConfirmPassword('');
      setIsResetMode(false);
      setNotice(t('passwordUpdated'));
    } catch (error) {
      console.error('Password reset failed:', error);
      setError(error instanceof Error ? error.message : t('unableResetPassword'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleFamilyRegister = async () => {
    if (!identifier.trim() || !password) {
      setError(t('pleaseEnterEmailPasswordRegister'));
      return;
    }

    setError('');
    setNotice('');
    setIsLoggingIn(true);

    try {
      const user = await registerFamilyMember(identifier.trim(), password);
      onFamilyRegister(user);
    } catch (error) {
      console.error('Family registration failed:', error);
      setError(error instanceof Error ? error.message : t('unableRegisterFamily'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fieldShellClass = highContrast
    ? 'flex h-14 items-center rounded-2xl border border-white bg-black px-4 ring-1 ring-transparent focus-within:ring-[#ffe452]'
    : 'flex h-14 items-center rounded-2xl bg-[#f3f4f6] px-4 ring-1 ring-transparent focus-within:bg-white focus-within:ring-[#2d6b2f]';

  const fieldInputClass = highContrast
    ? 'ml-3 min-w-0 flex-1 bg-transparent text-[18px] font-semibold text-white outline-none placeholder:text-white/75'
    : 'ml-3 min-w-0 flex-1 bg-transparent text-[18px] font-semibold text-black outline-none placeholder:text-[#8c8c8c]';

  return (
    <div className={`h-full overflow-y-auto ${highContrast ? 'bg-black' : 'bg-[#f7f7f5]'}`}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`w-full max-w-sm rounded-[32px] p-6 shadow-sm ${highContrast ? 'border-2 border-white bg-black text-white' : 'bg-white'}`}>
          <div className="mt-4">
            <h1 className={`text-[48px] font-bold leading-[54px] min-[390px]:text-[52px] min-[390px]:leading-[58px] ${highContrast ? 'text-white' : 'text-black'}`}>
              {t('hello')}
            </h1>
          </div>

          <div className={`mt-8 flex rounded-2xl p-1 shadow-sm ${highContrast ? 'border border-white bg-black' : 'bg-[#f1f1f1]'}`}>
            <button
              type="button"
              aria-pressed={selectedLoginType === 'senior'}
              onClick={() => {
                setSelectedLoginType('senior');
                setError('');
                setNotice('');
              }}
              className={`flex-1 rounded-2xl px-2 py-4 transition active:scale-[0.98] ${
                selectedLoginType === 'senior'
                  ? highContrast
                    ? 'bg-[#ffe452] shadow-sm'
                    : 'bg-white shadow-sm'
                  : 'bg-transparent'
              }`}
            >
              <span className={`text-[16px] font-semibold leading-6 ${
                selectedLoginType === 'senior'
                  ? highContrast
                    ? 'text-black'
                    : 'text-[#2d6b2f]'
                  : highContrast
                  ? 'text-white/80'
                  : 'text-[#2f2f2f]'
              }`}>
                {t('senior')}
              </span>
            </button>

            <button
              type="button"
              aria-pressed={selectedLoginType === 'family'}
              onClick={() => {
                setSelectedLoginType('family');
                setError('');
                setNotice('');
              }}
              className={`flex-1 rounded-2xl px-2 py-4 transition active:scale-[0.98] ${
                selectedLoginType === 'family'
                  ? highContrast
                    ? 'bg-[#ffe452] shadow-sm'
                    : 'bg-white shadow-sm'
                  : 'bg-transparent'
              }`}
            >
              <span className={`text-[16px] font-semibold leading-6 ${
                selectedLoginType === 'family'
                  ? highContrast
                    ? 'text-black'
                    : 'text-[#2d6b2f]'
                  : highContrast
                  ? 'text-white/80'
                  : 'text-[#2f2f2f]'
              }`}>
                {t('caregiverFamily').split('/')[0].trim()} /
                <br />
                {t('caregiverFamily').split('/')[1]?.trim() || 'Family'}
              </span>
            </button>
          </div>

          {pendingMfaUser ? (
            <form onSubmit={handleVerifyMfa}>
              <div className="mt-10">
                <label className={`mb-3 block text-[18px] font-bold ${highContrast ? 'text-white' : 'text-black'}`}>
                  {t('caregiverVerificationCode')}
                </label>
                <div className={fieldShellClass}>
                  <ShieldCheck className={`h-6 w-6 shrink-0 ${highContrast ? 'text-white/75' : 'text-[#7a7a7a]'}`} />
                  <input
                    value={mfaCodeInput}
                    onChange={(event) => setMfaCodeInput(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t('enter6DigitCode')}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className={`${fieldInputClass} tracking-[0.25em] placeholder:tracking-normal`}
                  />
                </div>
                <p className={`mt-3 text-sm font-semibold ${highContrast ? 'text-white/80' : 'text-[#5f6368]'}`}>
                  {t('pleaseEnterOneTimeCode')}
                </p>
              </div>

              {error && (
                <p className="mt-4 rounded-2xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
                  {error}
                </p>
              )}

              {notice && (
                <p className="mt-4 rounded-2xl bg-green-50 p-3 text-center text-sm font-bold text-green-700">
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={mfaCodeInput.trim().length !== 6}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#2d6b2f] text-[20px] font-bold text-white shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              >
                <ShieldCheck className="h-6 w-6" />
                {t('verifyAndContinue')}
              </button>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleResendMfaCode}
                  className={`h-12 rounded-full border-2 text-sm font-bold transition active:scale-[0.98] ${highContrast ? 'border-white bg-black text-white' : 'border-[#2d6b2f] bg-white text-[#2d6b2f]'}`}
                >
                  {t('resendCode')}
                </button>
                <button
                  type="button"
                  onClick={handleCancelMfa}
                  className={`h-12 rounded-full border text-sm font-bold transition active:scale-[0.98] ${highContrast ? 'border-white bg-black text-white' : 'border-[#c7cbd1] bg-white text-[#30343a]'}`}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          ) : (
          <form onSubmit={isResetMode ? handleResetPassword : handleLogin}>
            <div className="mt-10">
              <label className={`mb-3 block text-[18px] font-bold ${highContrast ? 'text-white' : 'text-black'}`}>
                {t('usernameEmail')}
              </label>
              <div className={fieldShellClass}>
                <Mail className={`h-6 w-6 shrink-0 ${highContrast ? 'text-white/75' : 'text-[#7a7a7a]'}`} />
                <input
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder={t('enterUsernameOrEmail')}
                  autoComplete="username"
                  className={fieldInputClass}
                />
              </div>
            </div>

            {isResetMode ? (
              <>
                <div className="mt-6">
                  <label className={`mb-3 block text-[18px] font-bold ${highContrast ? 'text-white' : 'text-black'}`}>
                    {t('newPassword')}
                  </label>
                  <div className={fieldShellClass}>
                    <Lock className={`h-6 w-6 shrink-0 ${highContrast ? 'text-white/75' : 'text-[#7a7a7a]'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={resetPasswordValue}
                      onChange={(event) => setResetPasswordValue(event.target.value)}
                      placeholder={t('enterNewPassword')}
                      autoComplete="new-password"
                      className={fieldInputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((currentValue) => !currentValue)}
                      className={`ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${highContrast ? 'text-white/75 active:bg-white/10' : 'text-[#5f6368] active:bg-gray-200'}`}
                      aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                    >
                      {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <label className={`mb-3 block text-[18px] font-bold ${highContrast ? 'text-white' : 'text-black'}`}>
                    {t('confirmPassword')}
                  </label>
                  <div className={fieldShellClass}>
                    <Lock className={`h-6 w-6 shrink-0 ${highContrast ? 'text-white/75' : 'text-[#7a7a7a]'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={resetConfirmPassword}
                      onChange={(event) => setResetConfirmPassword(event.target.value)}
                      placeholder={t('confirmNewPassword')}
                      autoComplete="new-password"
                      className={fieldInputClass}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setError('');
                    setNotice('');
                    setResetPasswordValue('');
                    setResetConfirmPassword('');
                  }}
                  className={`mt-4 text-[16px] font-semibold active:opacity-70 ${highContrast ? 'text-white' : 'text-[#2d6b2f]'}`}
                >
                  {t('backToLogin')}
                </button>
              </>
            ) : (
              <div className="mt-6">
              <label className={`mb-3 block text-[18px] font-bold ${highContrast ? 'text-white' : 'text-black'}`}>
                {t('password')}
              </label>
              <div className={fieldShellClass}>
                <Lock className={`h-6 w-6 shrink-0 ${highContrast ? 'text-white/75' : 'text-[#7a7a7a]'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={t('enterPassword')}
                  autoComplete="current-password"
                  className={fieldInputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((currentValue) => !currentValue)}
                  className={`ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${highContrast ? 'text-white/75 active:bg-white/10' : 'text-[#5f6368] active:bg-gray-200'}`}
                  aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
              </div>
            )}

            {!isResetMode && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className={`mt-4 text-[16px] font-semibold active:opacity-70 ${highContrast ? 'text-white' : 'text-[#2d6b2f]'}`}
              >
                {t('forgotPassword')}
              </button>
            )}

            {error && (
              <p className="mt-4 rounded-2xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
                {error}
              </p>
            )}

            {notice && (
              <p className="mt-4 rounded-2xl bg-green-50 p-3 text-center text-sm font-bold text-green-700">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={
                isLoggingIn ||
                !identifier.trim() ||
                (isResetMode ? (!resetPasswordValue || !resetConfirmPassword) : !password)
              }
              className={`mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full text-[20px] font-bold shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed ${
                highContrast
                  ? 'bg-[#ffe452] text-black disabled:border disabled:border-white disabled:bg-black disabled:text-white/80'
                  : 'bg-[#2d6b2f] text-white disabled:bg-gray-300 disabled:text-gray-600'
              }`}
            >
              <LogIn className="h-6 w-6" />
              {isLoggingIn ? t('pleaseWait') : isResetMode ? t('updatePassword') : t('login')}
            </button>

            {selectedLoginType === 'family' && !isResetMode && (
              <div className={`mt-6 border-t pt-5 ${highContrast ? 'border-white/30' : 'border-[#eeeeee]'}`}>
                <p className={`text-center text-[15px] font-semibold ${highContrast ? 'text-white/75' : 'text-[#666666]'}`}>
                  {t('registeringAsFamily')}
                </p>
                <button
                  type="button"
                  onClick={handleFamilyRegister}
                  disabled={isLoggingIn}
                  className={`mt-3 flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 text-[18px] font-bold transition active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 ${highContrast ? 'border-white bg-black text-white' : 'border-[#2d6b2f] bg-white text-[#2d6b2f]'}`}
                >
                  <UserPlus className="h-5 w-5" />
                  {t('createFamilyAccount')}
                </button>
              </div>
            )}
          </form>
          )}
        </div>
      </div>
    </div>
  );
}
