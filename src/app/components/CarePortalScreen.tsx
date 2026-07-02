import {ArrowLeft,Bell,CheckCircle,ChevronDown,ChevronRight,Circle,Clock, Handshake,HelpCircle,Info, Languages,LayoutDashboard,LogOut, MapPin, Phone,
  Search, Shield, ShieldAlert, SlidersHorizontal, User, Users, TriangleAlert
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  clearStoredUser,
  getStoredUser,
  startFamilyVerification,
  updateStoredUserRole,
  verifyFamilyCode,
} from '../services/backend';

const CARE_PORTAL_PERSONAL_INFO_KEY = 'careconnect.carePortalPersonalInfo';
const CARE_PORTAL_PROFILE_IMAGE_KEY = 'careconnect.carePortalProfileImage';

type Senior = {
  id: string;
  name: string;
  phone: string;
  email?: string;
};

function getRoleFromRelationship(relationship: string) {
  const normalizedRelationship = relationship.trim().toLowerCase();

  if (['children', 'volunteer', 'caregiver'].includes(normalizedRelationship)) {
    return normalizedRelationship;
  }

  return /next-of-kin|nok/i.test(relationship) ? 'NOK' : 'Family';
}

export default function CarePortalScreen({
  onBack,
  onRegistered,
  registrationNotice = '',
}: {
  onBack: () => void;
  onRegistered?: () => void;
  registrationNotice?: string;
}) {
  const [seniorId, setSeniorId] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [relationship, setRelationship] = useState('children');
  const [confirmed, setConfirmed] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(registrationNotice);

  useEffect(() => {
    setNotice(registrationNotice);
  }, [registrationNotice]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!seniorId.trim()) {
      setError('Please enter the senior ID.');
      return;
    }

    const currentUser = getStoredUser();

    if (!currentUser) {
      setError('Please register or log in again before linking a senior.');
      return;
    }

    setError('');
    setNotice('');
    setIsRegistering(true);

    try {
      if (!verificationId) {
        const verification = await startFamilyVerification(currentUser, seniorId.trim());
        setVerificationId(verification.id);
        setNotice('Code sent. Ask the senior to open Profile and read the 6-digit code.');
        return;
      }

      await verifyFamilyCode(currentUser, {
        code: verificationCode,
        relationship,
        seniorId: seniorId.trim(),
        verificationId,
      });
      updateStoredUserRole(getRoleFromRelationship(relationship));
      setRegistered(true);
      if (onRegistered) {
        onRegistered();
      }
    } catch (error) {
      console.error('Senior link failed:', error);
      setError(error instanceof Error ? error.message : 'Unable to link this senior.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (registered) {
    return <CaregiverDashboard onBack={onBack} />;
  }

  return (
    <div className="h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-[#fbf9f8] px-4 shadow-sm min-[390px]:h-16 min-[390px]:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center text-[#174b2c] transition-transform active:scale-95 min-[390px]:h-14 min-[390px]:w-14"
          aria-label="Back"
        >
          <ArrowLeft className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
        </button>
        <h1 className="text-xl font-bold text-[#174b2c] min-[390px]:text-2xl">Care Portal</h1>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center text-[#414942] transition-transform active:scale-95 min-[390px]:h-14 min-[390px]:w-14"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-5 pb-8 pt-5 min-[390px]:gap-8 min-[390px]:px-6 min-[390px]:pb-12 min-[390px]:pt-8">
        <section className="flex flex-col gap-3 min-[390px]:gap-4">
          <SectionTitle title="Verify Your Senior" />
          <p className="text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            Enter the short senior ID from the senior's Profile page. A 6-digit code will appear on the senior app.
          </p>

          <Field
            icon={<Search className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />}
            label="Senior ID"
            placeholder="Enter 8-character senior ID"
            value={seniorId}
            onChange={(value) => {
              setSeniorId(value);
              setVerificationId('');
              setVerificationCode('');
              setError('');
              setNotice('');
            }}
          />

          {verificationId && (
            <>
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-lg font-bold text-[#174b2c]">Code Requested</p>
                <p className="mt-2 text-base leading-6 text-[#414942]">
                  Ask the senior to open Profile. Enter the 6-digit code shown there.
                </p>
              </div>

              <Field
                icon={<Shield className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />}
                label="Verification Code"
                placeholder="6-digit code"
                value={verificationCode}
                onChange={(value) => setVerificationCode(value.replace(/\D/g, '').slice(0, 6))}
              />
            </>
          )}
        </section>

        <section className="flex flex-col gap-3 min-[390px]:gap-4">
          <SectionTitle title="Your Relationship" />
          <label className="flex flex-col gap-2">
            <span className="text-base font-semibold text-[#1b1c1c] ml-2">Select Relationship</span>
            <div className="relative flex h-14 items-center rounded-2xl bg-[#f5f3f3] px-4 focus-within:ring-2 focus-within:ring-[#174b2c] min-[390px]:h-16">
              <Users className="mr-3 h-6 w-6 text-[#717971] min-[390px]:h-7 min-[390px]:w-7" />
              <select
                value={relationship}
                onChange={(event) => setRelationship(event.target.value)}
                className="w-full appearance-none border-none bg-transparent text-lg text-[#1b1c1c] outline-none focus:ring-0 min-[390px]:text-xl"
              >
                <option value="children">CHILDREN</option>
                <option value="volunteer">VOLUNTEER</option>
                <option value="caregiver">CAREGIVER</option>
              </select>
              <ChevronDown className="pointer-events-none h-6 w-6 text-[#717971] min-[390px]:h-7 min-[390px]:w-7" />
            </div>
          </label>
        </section>

        <section className="flex flex-col gap-3 min-[390px]:gap-4">
          <SectionTitle title="Confirmation" />
          <label className="flex cursor-pointer gap-3 rounded-2xl border border-[#c1c9bf]/50 bg-white p-4 shadow-sm transition-transform active:scale-[0.99] min-[390px]:gap-4 min-[390px]:p-6">
            <input
              type="checkbox"
              className="sr-only"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
            />
            {confirmed ? (
              <CheckCircle className="h-7 w-7 flex-shrink-0 fill-[#174b2c] text-[#174b2c] min-[390px]:h-8 min-[390px]:w-8" />
            ) : (
              <Circle className="h-7 w-7 flex-shrink-0 text-[#717971] min-[390px]:h-8 min-[390px]:w-8" />
            )}
            <span className="text-sm font-medium leading-6 text-[#414942] min-[390px]:text-base min-[390px]:leading-7">
              I confirm that I have the legal authority to register this senior and agree to
              CareConnect's <span className="text-[#174b2c] font-bold underline">Privacy Policy</span>
              {' '}and <span className="text-[#174b2c] font-bold underline">Terms of Service</span>.
            </span>
          </label>
        </section>

        <button
          type="submit"
          disabled={!confirmed || !seniorId.trim() || (Boolean(verificationId) && verificationCode.length !== 6) || isRegistering}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#174b2c] text-lg font-bold text-white shadow-md transition-transform active:scale-95 disabled:bg-gray-300 disabled:text-gray-600 disabled:active:scale-100 min-[390px]:h-16 min-[390px]:text-xl"
        >
          {isRegistering ? 'Please wait...' : verificationId ? 'Verify & Complete' : 'Send Verification Code'}
        </button>
        {notice && <p className="text-center text-base font-bold text-[#174b2c]">{notice}</p>}
        {error && <p className="text-center text-base font-bold text-red-600">{error}</p>}
      </form>
    </div>
  );
}

function CaregiverDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'profile'>('dashboard');
  const currentUser = getStoredUser();
  const caregiverName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Caregiver';
  const caregiverEmail = currentUser?.email || '';

  const handleLogout = () => {
    clearStoredUser();
    onBack();
  };

  return (
    <div className="h-full overflow-y-auto bg-[#fbf9f8] pb-24 text-[#1b1c1c]">
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-4 min-[390px]:h-16 min-[390px]:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#9dd3aa] bg-[#e1ffe5] text-[#174b2c] min-[390px]:h-12 min-[390px]:w-12">
              <User className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
            </div>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#414942] transition-transform active:scale-95 min-[390px]:h-12 min-[390px]:w-12"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#fbf9f8] bg-[#ba1a1a] text-[10px] font-bold text-white">
              1
            </span>
          </button>
        </div>
      </header>

      <main className="px-5 py-6 min-[390px]:px-6">
        {activeTab === 'dashboard' && <CaregiverDashboardHome />}
        {activeTab === 'alerts' && <CaregiverAlerts />}
        {activeTab === 'profile' && (
          <CaregiverProfile
            caregiverName={caregiverName}
            caregiverEmail={caregiverEmail}
            onLogout={handleLogout}
          />
        )}
      </main>

      <nav className="absolute bottom-0 left-0 right-0 z-20 flex h-20 items-center justify-around rounded-t-[32px] border-t border-[#c1c9bf] bg-[#efeded] px-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <DashboardNavItem
          active={activeTab === 'dashboard'}
          icon={<LayoutDashboard className="h-6 w-6" />}
          label="Dashboard"
          onClick={() => setActiveTab('dashboard')}
        />
        <DashboardNavItem
          active={activeTab === 'alerts'}
          icon={<TriangleAlert className="h-6 w-6" />}
          label="Alerts"
          hasAlert
          onClick={() => setActiveTab('alerts')}
        />
        <DashboardNavItem
          active={activeTab === 'profile'}
          icon={<User className="h-6 w-6" />}
          label="Profile"
          onClick={() => setActiveTab('profile')}
        />
      </nav>
    </div>
  );
}

function CaregiverDashboardHome() {
  return (
    <div className="flex flex-col gap-6 min-[390px]:gap-8">
      <section>
        <h1 className="text-2xl font-bold leading-8 text-[#1b1c1c] min-[390px]:text-3xl min-[390px]:leading-10">
          Good Morning, Mei Ling
        </h1>
        <p className="mt-1 text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
          Here's what's happening with your seniors today.
        </p>
      </section>

      <section className="rounded-[28px] border border-[#ffdad6] bg-[#ffdad6]/30 p-4 shadow-sm min-[390px]:rounded-[32px] min-[390px]:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-[#ba1a1a] min-[390px]:h-9 min-[390px]:w-9" />
            <div>
              <p className="text-base font-semibold text-[#414942] min-[390px]:text-lg">Needs Attention</p>
              <p className="text-lg font-bold text-[#ba1a1a] min-[390px]:text-xl">Ah Gong Tan</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-[#ba1a1a] min-[390px]:text-5xl">1</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1b1c1c] min-[390px]:text-3xl">My Seniors</h2>
          <button type="button" className="text-base font-bold text-[#174b2c] active:scale-95 min-[390px]:text-lg">
            View all
          </button>
        </div>

        <SeniorCard
          name="Ah Ma Tan"
          status="All Good"
          lastCheckIn="Today, 8:30 AM"
          tone="good"
        />
        <SeniorCard
          name="Ah Gong Tan"
          status="No Reply"
          lastCheckIn="No check-in since 9:00 AM"
          tone="alert"
        />
        <SeniorCard
          name="Aunt Lily"
          status="All Good"
          lastCheckIn="Today, 7:45 AM"
          tone="good"
        />
      </section>
    </div>
  );
}

function CaregiverAlerts() {
  return (
    <div className="flex flex-col gap-7">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold leading-10 text-[#1b1c1c] min-[390px]:text-[32px]">Alerts</h1>
          <p className="mt-1 text-base leading-6 text-[#414942] min-[390px]:text-lg">
            Managing urgent caregiver notifications
          </p>
        </div>
        <button
          type="button"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f5f3f3] text-[#717971] transition-transform active:scale-95"
          aria-label="Filter alerts"
        >
          <SlidersHorizontal className="h-6 w-6" />
        </button>
      </section>

      <section className="flex flex-col gap-5">
        <AlertCard
          kind="sos"
          title="Ah Gong Tan"
          label="Urgent SOS"
          time="2 mins ago"
          icon={<ShieldAlert className="h-8 w-8" />}
        />
        <AlertCard
          kind="missed"
          title="Aunty Mei"
          label="Missed Check-in"
          icon={<Bell className="h-8 w-8" />}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1b1c1c]">Recent History</h2>
          <button type="button" className="text-base font-bold text-[#174b2c] active:scale-95">
            View All
          </button>
        </div>
        <AlertHistoryItem
          name="Ah Gong Tan"
          time="10:45 AM"
          message="Caregiver responded to medication reminder alert"
        />
        <AlertHistoryItem
          name="Uncle Bob"
          time="4:35 PM"
          message="Missed activity check-in resolved via phone call"
        />
      </section>
    </div>
  );
}

function AlertCard({
  kind,
  title,
  label,
  time,
  icon,
}: {
  kind: 'sos' | 'missed';
  title: string;
  label: string;
  time?: string;
  icon: React.ReactNode;
}) {
  const isSos = kind === 'sos';

  return (
    <div
      className={`rounded-[28px] border-l-8 p-5 shadow-sm min-[390px]:rounded-[32px] ${
        isSos
          ? 'border-[#831318] bg-[#a42d2d] text-[#ffc1bc]'
          : 'border-[#954a00] bg-[#ffdcc6] text-[#301400]'
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isSos ? 'bg-[#831318] text-white' : 'bg-[#954a00] text-white'
            }`}
          >
            {icon}
          </div>
          <div>
            <p className={`text-sm font-bold uppercase tracking-wide ${isSos ? 'text-[#ffc1bc]' : 'text-[#713700]'}`}>
              {label}
            </p>
            <h2 className="text-2xl font-bold text-current">{title}</h2>
          </div>
        </div>
        {time && (
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-current">
            {time}
          </span>
        )}
      </div>

      {isSos ? (
        <div className="mb-5 flex items-center gap-2 rounded-2xl bg-white/10 p-3">
          <MapPin className="h-5 w-5 flex-shrink-0 text-[#ffdad7]" />
          <span className="text-base font-semibold text-[#ffdad7]">Woodlands Block 123, Level 4</span>
        </div>
      ) : (
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 flex-shrink-0 text-[#954a00]" />
            <p className="text-base font-semibold text-[#301400]">No check-in since 9:00 AM</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-[#fd8a2a]/20 p-3 text-[#713700]">
            <Clock className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-bold">Expected: 5:00 AM - 9:00 AM</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {isSos ? (
          <>
            <AlertActionButton icon={<Phone className="h-5 w-5" />} label="Call" variant="light" />
            <AlertActionButton icon={<CheckCircle className="h-5 w-5" />} label="Resolve" variant="danger" />
          </>
        ) : (
          <>
            <AlertActionButton icon={<Handshake className="h-5 w-5" />} label="Remind" variant="light" />
            <AlertActionButton icon={<Phone className="h-5 w-5" />} label="Call" variant="warning" />
          </>
        )}
      </div>
    </div>
  );
}

function AlertActionButton({
  icon,
  label,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  variant: 'light' | 'danger' | 'warning';
}) {
  const className =
    variant === 'danger'
      ? 'bg-[#831318] text-white'
      : variant === 'warning'
        ? 'bg-[#954a00] text-white'
        : 'bg-white text-[#831318]';

  return (
    <button
      type="button"
      className={`flex h-14 items-center justify-center gap-2 rounded-full text-base font-bold shadow-sm transition-transform active:scale-95 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AlertHistoryItem({
  name,
  time,
  message,
}: {
  name: string;
  time: string;
  message: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[28px] bg-[#f5f3f3] p-4 min-[390px]:rounded-[32px]">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#a7ddb3]/40 text-[#1d5031]">
        <CheckCircle className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-bold text-[#1b1c1c]">{name}</p>
          <span className="flex-shrink-0 text-sm font-semibold text-[#717971]">{time}</span>
        </div>
        <p className="mt-1 text-sm leading-5 text-[#414942]">{message}</p>
        <div className="mt-2 flex items-center gap-1 text-sm font-bold text-[#1d5031]">
          <CheckCircle className="h-4 w-4" />
          <span>Resolved</span>
        </div>
      </div>
    </div>
  );
}

function CaregiverProfile({
  caregiverName,
  caregiverEmail,
  onLogout,
}: {
  caregiverName: string;
  caregiverEmail: string;
  onLogout: () => void;
}) {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [phone, setPhone] = useState('91234567');
  const [personalEmail, setPersonalEmail] = useState(caregiverEmail);
  const [address, setAddress] = useState('Block 123 Woodlands');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem(CARE_PORTAL_PROFILE_IMAGE_KEY) || '');

  useEffect(() => {
    const savedInfo = localStorage.getItem(CARE_PORTAL_PERSONAL_INFO_KEY);

    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo) as {
          phone?: string;
          email?: string;
          address?: string;
        };

        setPhone(parsedInfo.phone || '91234567');
        setPersonalEmail(parsedInfo.email || caregiverEmail);
        setAddress(parsedInfo.address || 'Block 123 Woodlands');
        return;
      } catch {
        localStorage.removeItem(CARE_PORTAL_PERSONAL_INFO_KEY);
      }
    }

    setPersonalEmail(caregiverEmail);
  }, [caregiverEmail]);

  const handleSavePersonalInfo = () => {
    localStorage.setItem(
      CARE_PORTAL_PERSONAL_INFO_KEY,
      JSON.stringify({
        phone,
        email: personalEmail,
        address,
      }),
    );

    alert('Personal information saved.');
    setShowPersonalInfo(false);
  };

  const handleProfileImageChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = typeof reader.result === 'string' ? reader.result : '';

      if (imageDataUrl) {
        setProfileImage(imageDataUrl);
        localStorage.setItem(CARE_PORTAL_PROFILE_IMAGE_KEY, imageDataUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  if (showPersonalInfo) {
    return (
      <div className="-mx-5 -my-6 min-h-full bg-gray-50 min-[390px]:-mx-6">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-gray-50 px-5 shadow-sm">
          <button
            type="button"
            onClick={() => setShowPersonalInfo(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 active:bg-green-50"
            aria-label="Back to profile"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        </div>

        <div className="p-5 min-[390px]:p-8">
          <div className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-green-600">Profile Photo</h2>

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
                Change Photo
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
            <h2 className="mb-5 text-2xl font-bold text-green-600">Basic Information</h2>

            <ProfileField label="Phone Number" value={phone} onChange={setPhone} type="tel" />
            <ProfileField label="Email" value={personalEmail} onChange={setPersonalEmail} type="email" />
            <ProfileField label="Address" value={address} onChange={setAddress} isLast />

            <button
              type="button"
              onClick={handleSavePersonalInfo}
              className="mt-5 w-full rounded-2xl bg-green-500 py-3 text-lg font-semibold text-white active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-5 -my-6 min-h-full bg-gray-50 min-[390px]:-mx-6">
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
            <h2 className="truncate text-2xl font-bold min-[390px]:text-3xl">{caregiverName}</h2>
            <p className="mt-1 truncate text-sm text-green-100 min-[390px]:text-base">
              {caregiverEmail || 'Registered caregiver'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 min-[390px]:space-y-6 min-[390px]:p-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem
            icon={<User className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title="Personal Information"
            onClick={() => setShowPersonalInfo(true)}
          />
          <SettingsItem
            icon={<Languages className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title="Select Language"
          />
          <SettingsItem
            icon={<Shield className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title="Privacy & Security"
          />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem
            icon={<HelpCircle className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title="Help & Support"
          />
          <SettingsItem
            icon={<LogOut className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            title="Log Out"
            textColor="text-red-500"
            onClick={onLogout}
          />
        </div>
      </div>
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
  const isDestructive = textColor.includes('red');

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 transition-colors last:border-b-0 active:bg-gray-50 min-[390px]:gap-6 min-[390px]:px-8 min-[390px]:py-6 ${
        isDestructive ? 'hover:bg-red-50' : 'hover:bg-green-50'
      }`}
    >
      <div className={isDestructive ? 'text-gray-600 group-hover:text-red-500' : 'text-gray-600 group-hover:text-green-700'}>{icon}</div>
      <span className={`flex-1 text-left text-xl font-bold min-[390px]:text-2xl ${textColor}`}>
        {title}
      </span>
      <ChevronRight className={isDestructive ? 'h-7 w-7 text-gray-400 group-hover:text-red-400 min-[390px]:h-8 min-[390px]:w-8' : 'h-7 w-7 text-gray-400 group-hover:text-green-600 min-[390px]:h-8 min-[390px]:w-8'} />
    </button>
  );
}

function SeniorCard({
  name,
  status,
  lastCheckIn,
  tone,
}: {
  name: string;
  status: string;
  lastCheckIn: string;
  tone: 'good' | 'alert';
}) {
  const isAlert = tone === 'alert';

  return (
    <div
      className={`flex items-center gap-3 rounded-[28px] border p-4 shadow-sm min-[390px]:gap-4 min-[390px]:rounded-[32px] min-[390px]:p-5 ${
        isAlert
          ? 'border-[#ffdad6] bg-[#ffdad6]/20'
          : 'border-[#c1c9bf]/40 bg-white'
      }`}
    >
      <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#e1ffe5] text-[#174b2c] min-[390px]:h-20 min-[390px]:w-20">
        <User className="h-8 w-8 min-[390px]:h-10 min-[390px]:w-10" />
        <span
          className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
            isAlert ? 'bg-[#ba1a1a]' : 'bg-green-500'
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-lg font-bold text-[#1b1c1c] min-[390px]:text-xl">{name}</p>
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
              isAlert ? 'bg-[#ba1a1a] text-white' : 'bg-[#174b2c]/10 text-[#174b2c]'
            }`}
          >
            {status}
          </span>
        </div>
        <p className={`mt-1 text-sm font-medium min-[390px]:text-base ${isAlert ? 'text-[#ba1a1a]' : 'text-[#414942]'}`}>
          {lastCheckIn}
        </p>
      </div>

      <button
        type="button"
        aria-label={`Call ${name}`}
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#174b2c] text-white shadow-md transition-transform active:scale-90 min-[390px]:h-14 min-[390px]:w-14"
      >
        <Phone className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
      </button>
    </div>
  );
}

function DashboardNavItem({
  icon,
  label,
  onClick,
  active = false,
  hasAlert = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  hasAlert?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-w-[84px] flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 transition-transform active:scale-95 ${
        active ? 'bg-[#fd8a2a] text-[#632f00]' : 'text-[#414942] hover:bg-[#fff0e3] hover:text-[#8a4200]'
      }`}
    >
      {icon}
      <span className="text-xs font-bold">{label}</span>
      {hasAlert && <span className="absolute right-5 top-2 h-2 w-2 rounded-full bg-[#ba1a1a]" />}
    </button>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-7 w-1 rounded-full bg-[#fd8a2a] min-[390px]:h-8" />
      <h2 className="text-xl font-bold text-[#174b2c] min-[390px]:text-2xl">{title}</h2>
    </div>
  );
}

function Field({
  icon,
  label,
  placeholder,
  type = 'text',
  value,
  onChange
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-base font-semibold text-[#1b1c1c] ml-2">{label}</span>
      <div className="relative flex h-14 items-center rounded-2xl bg-[#f5f3f3] px-4 focus-within:ring-2 focus-within:ring-[#174b2c] min-[390px]:h-16">
        <div className="text-[#717971] mr-3">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-lg outline-none placeholder:text-[#9ca39c] focus:ring-0 min-[390px]:text-xl"
        />
      </div>
    </label>
  );
}
