import { ArrowLeft, ChevronRight, User, Shield, HelpCircle, LogOut, Languages, KeyRound, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type AppUser,
  type FamilyVerification,
  getFamilyVerificationCodes,
  getSeniorProfile,
  getStoredUser,
} from '../services/backend';

export const PERSONAL_INFO_KEY = 'careconnect.personalInfo';
const PROFILE_IMAGE_KEY = 'careconnect.profileImage';
const SENIOR_ID_LENGTH = 8;

function getDisplaySeniorId(value = '') {
  return value ? value.slice(0, SENIOR_ID_LENGTH).toUpperCase() : '';
}

export default function ProfileScreen({
  onChangeLanguage,
  onLogout,
}: {
  onChangeLanguage: () => void;
  onLogout: () => void;
}) {
  const { t } = useTranslation();
  const [user, setUser] = useState<AppUser | null>(() => getStoredUser());
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [phone, setPhone] = useState('91234567');
  const [personalEmail, setPersonalEmail] = useState(() => getStoredUser()?.email || '');
  const [address, setAddress] = useState('Block 123 Woodlands');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem(PROFILE_IMAGE_KEY) || '');
  const [verificationCodes, setVerificationCodes] = useState<FamilyVerification[]>([]);
  const [verificationError, setVerificationError] = useState('');
  const [seniorIdForFamily, setSeniorIdForFamily] = useState('');
  const [isLoadingSeniorId, setIsLoadingSeniorId] = useState(false);
  const [activeVerification, setActiveVerification] = useState<FamilyVerification | null>(null);
  const [dismissedVerificationId, setDismissedVerificationId] = useState('');
  const profileEmail = user?.email ?? 'No email found';
  const shouldShowSeniorId = /senior|elderly/i.test(user?.role || '');
  const displayName = useMemo(() => {
    if (user?.displayName?.trim()) {
      return user.displayName.trim();
    }

    return user?.email?.split('@')[0] || 'My Profile';
  }, [user]);

  useEffect(() => {
    const handleUserUpdate = () => setUser(getStoredUser());

    window.addEventListener('careconnect-user-updated', handleUserUpdate);

    return () => {
      window.removeEventListener('careconnect-user-updated', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const savedInfo = localStorage.getItem(PERSONAL_INFO_KEY);

    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo) as {
          phone?: string;
          email?: string;
          address?: string;
        };

        setPhone(parsedInfo.phone || '91234567');
        setPersonalEmail(parsedInfo.email || user?.email || '');
        setAddress(parsedInfo.address || 'Block 123 Woodlands');
        return;
      } catch {
        localStorage.removeItem(PERSONAL_INFO_KEY);
      }
    }

    setPersonalEmail(user?.email || '');
  }, [user]);

  useEffect(() => {
    if (!user || !shouldShowSeniorId) {
      setVerificationCodes([]);
      setSeniorIdForFamily('');
      setIsLoadingSeniorId(false);
      return;
    }

    let isMounted = true;

    const loadVerificationCodes = async () => {
      try {
        setIsLoadingSeniorId(true);
        const profile = await getSeniorProfile(user).catch(() => null);

        if (isMounted) {
          setSeniorIdForFamily(getDisplaySeniorId(profile?.sysId || profile?.userId || user.uid));
          setIsLoadingSeniorId(false);
        }

        const codes = await getFamilyVerificationCodes(user);

        if (isMounted) {
          setVerificationCodes(codes);
          const newestCode = codes[0];

          if (newestCode && newestCode.id !== dismissedVerificationId) {
            setActiveVerification(newestCode);
          }

          setVerificationError('');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Unable to load family verification codes:', error);
          setVerificationError(error instanceof Error ? error.message : 'Unable to load verification codes.');
          setIsLoadingSeniorId(false);
        }
      }
    };

    loadVerificationCodes();
    const timer = window.setInterval(loadVerificationCodes, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, [dismissedVerificationId, shouldShowSeniorId, user]);

  const handleSavePersonalInfo = () => {
    localStorage.setItem(
      PERSONAL_INFO_KEY,
      JSON.stringify({
        phone,
        email: personalEmail,
        address,
      }),
    );

    alert(t('personalInfoSaved'));
    setShowPersonalInfo(false);
  };

  const handleProfileImageChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = typeof reader.result === 'string' ? reader.result : '';

      if (imageDataUrl) {
        setProfileImage(imageDataUrl);
        localStorage.setItem(PROFILE_IMAGE_KEY, imageDataUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  if (showPersonalInfo) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-gray-50 px-5 shadow-sm">
          <button
            type="button"
            onClick={() => setShowPersonalInfo(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 active:bg-green-50"
            aria-label={t('backToProfile')}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t('personalInfo')}</h1>
        </div>

        <main className="p-5 min-[390px]:p-8">
          <div className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-green-600">
              {t('profilePhoto')}
            </h2>

            <div className="flex flex-col items-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="mb-4 h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-green-50 text-green-700">
                  <User className="h-16 w-16" />
                </div>
              )}

              <label className="cursor-pointer rounded-full bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-sm active:scale-95">
                {t('changePhoto')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      handleProfileImageChange(file);
                    }
                  }}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-green-600">
              {t('basicInformation')}
            </h2>

            <ProfileField
              label={t('phoneNumber')}
              value={phone}
              onChange={setPhone}
              type="tel"
            />

            <ProfileField
              label={t('email')}
              value={personalEmail}
              onChange={setPersonalEmail}
              type="email"
            />

            <ProfileField
              label={t('address')}
              value={address}
              onChange={setAddress}
              isLast
            />

            <button
              type="button"
              onClick={handleSavePersonalInfo}
              className="mt-5 w-full rounded-2xl bg-green-500 py-3 text-lg font-semibold text-white active:scale-95"
            >
              {t('saveChanges')}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-y-auto bg-gray-50">
      <div className="bg-gradient-to-br from-green-400 to-green-600 px-5 pb-5 pt-6 text-white min-[390px]:px-7 min-[390px]:pb-7 min-[390px]:pt-8">
        <div className="mb-4 flex items-center gap-4 min-[390px]:gap-5">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-16 w-16 rounded-full bg-white object-cover min-[390px]:h-20 min-[390px]:w-20"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#316342] min-[390px]:h-20 min-[390px]:w-20">
              <User className="h-8 w-8 min-[390px]:h-10 min-[390px]:w-10" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold min-[390px]:text-3xl">{displayName}</h2>
            <p className="mt-1 truncate text-sm text-green-100 min-[390px]:text-base">{profileEmail}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 min-[390px]:space-y-6 min-[390px]:p-8">
        {shouldShowSeniorId && user && (
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 min-[390px]:text-2xl">Senior ID</h3>
                <p className="text-sm font-semibold text-gray-500">Give this ID to your family member.</p>
              </div>
            </div>
            <p className="break-all rounded-2xl bg-gray-50 p-4 text-lg font-bold text-gray-900">
              {isLoadingSeniorId && !seniorIdForFamily ? 'Loading Senior ID...' : seniorIdForFamily}
            </p>

            <div className="mt-5">
              <h4 className="text-lg font-bold text-gray-900">Family Verification Codes</h4>
              {verificationCodes.length > 0 ? (
                <div className="mt-3 flex flex-col gap-3">
                  {verificationCodes.map((verification) => (
                    <div key={verification.id} className="rounded-2xl bg-green-50 p-4">
                      <p className="text-sm font-semibold text-green-900">{verification.familyEmail}</p>
                      <p className="mt-1 text-3xl font-black tracking-wide text-green-700">{verification.code}</p>
                      <p className="mt-1 text-sm font-medium text-green-900">
                        Expires at {verification.expiresAt || 'soon'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-2xl bg-gray-50 p-4 text-base font-medium text-gray-600">
                  No pending family verification code.
                </p>
              )}
              {verificationError && <p className="mt-3 text-sm font-bold text-red-600">{verificationError}</p>}
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem
            icon={<User className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title={t('personalInfo')}
            onClick={() => setShowPersonalInfo(true)}
          />
          <SettingsItem
            icon={<Languages className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title={t('selectLanguage')}
            onClick={onChangeLanguage}
          />
          <SettingsItem icon={<Shield className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />} title={t('privacySecurity')} />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem icon={<HelpCircle className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />} title={t('helpSupport')} />
          <SettingsItem
            icon={<LogOut className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title={t('logOut')}
            textColor="text-red-500"
            onClick={onLogout}
          />
        </div>
      </div>

      {activeVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setDismissedVerificationId(activeVerification.id);
                  setActiveVerification(null);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 active:scale-95"
                aria-label="Close verification code"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
              <KeyRound className="h-9 w-9" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-gray-900">Family Verification Code</h2>
            <p className="mt-2 text-base font-semibold text-gray-600">
              Give this code to {activeVerification.familyEmail}.
            </p>
            <p className="mt-5 rounded-3xl bg-green-50 px-5 py-6 text-5xl font-black tracking-[0.18em] text-green-700">
              {activeVerification.code}
            </p>
            <p className="mt-4 text-sm font-semibold text-gray-500">
              It will become Verified after your family member enters this code.
            </p>
            <button
              type="button"
              onClick={() => {
                setDismissedVerificationId(activeVerification.id);
                setActiveVerification(null);
              }}
              className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white active:scale-95"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileField({
  isLast = false,
  label,
  onChange,
  type = 'text',
  value,
}: {
  isLast?: boolean;
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className={`block py-4 ${isLast ? '' : 'border-b border-gray-200'}`}>
      <span className="mb-1 block text-sm text-gray-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-xl font-semibold text-gray-900 outline-none"
      />
    </label>
  );
}

function SettingsItem({
  icon,
  title,
  textColor = 'text-gray-900',
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  textColor?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 transition-colors last:border-b-0 active:bg-gray-50 min-[390px]:gap-6 min-[390px]:px-8 min-[390px]:py-6"
    >
      <div className="text-gray-600">{icon}</div>
      <span className={`flex-1 text-left text-xl font-bold min-[390px]:text-2xl ${textColor}`}>
        {title}
      </span>
      <ChevronRight className="h-7 w-7 text-gray-400 min-[390px]:h-8 min-[390px]:w-8" />
    </button>
  );
}
