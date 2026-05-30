import {
  Activity,
  ArrowLeft,
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
  Handshake,
  HelpCircle,
  Info,
  Languages,
  LayoutDashboard,
  LogOut,
  MapPin,
  Phone,
  Pill,
  ShieldAlert,
  Shield,
  SlidersHorizontal,
  TriangleAlert,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStoredUser } from '../services/backend';
import { updateSosAlertStatus } from '../services/serviceNow';

const CAREGIVER_PERSONAL_INFO_KEY = 'careconnect.caregiverPersonalInfo';
const CAREGIVER_PROFILE_IMAGE_KEY = 'careconnect.caregiverProfileImage';

type Senior = {
  id: string;
  name: string;
  phone: string;
  email: string;
  location?: string;
  relationship?: string;
  status?: string;
  alertId?: string;
  alertMessage?: string;
  alertStatus?: string;
  alertTime?: string;
};

export default function CaregiverDashboardScreen({
  onBack,
  onChangeLanguage,
  onLogout,
}: {
  onBack: () => void;
  onChangeLanguage: () => void;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'profile'>('dashboard');
  const currentUser = getStoredUser();
  const caregiverName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Caregiver';
  const caregiverId = currentUser?.uid || '';
  const caregiverEmail = currentUser?.email || '';
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [isLoadingSeniors, setIsLoadingSeniors] = useState(false);
  const [seniorError, setSeniorError] = useState('');
  const [resolvedAlertIds, setResolvedAlertIds] = useState<string[]>([]);
  const [resolvingAlertIds, setResolvingAlertIds] = useState<string[]>([]);
  const resolveAlert = async (seniorId: string) => {
    const senior = seniors.find((item) => item.id === seniorId);

    if (senior?.alertId && !resolvingAlertIds.includes(senior.alertId)) {
      setResolvingAlertIds((current) => [...current, senior.alertId as string]);

      try {
        await updateSosAlertStatus(senior.alertId, 'Resolved');
      } catch (error) {
        console.error('Unable to resolve SOS alert:', error);
        alert(error instanceof Error ? error.message : 'Unable to resolve SOS alert.');
        return;
      } finally {
        setResolvingAlertIds((current) => current.filter((id) => id !== senior.alertId));
      }
    }

    setResolvedAlertIds((current) => (
      current.includes(seniorId) ? current : [...current, seniorId]
    ));
  };

  useEffect(() => {
    if (!caregiverEmail) {
      setSeniors([]);
      return;
    }

    const controller = new AbortController();

    async function loadSeniors() {
      setIsLoadingSeniors(true);
      setSeniorError('');

      try {
        const params = new URLSearchParams({ caregiverId, caregiverEmail });
        const response = await fetch(`/api/servicenow/caregiver-seniors?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load caregiver dashboard');
        }

        setSeniors(data?.seniors || []);
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }

        console.error('Caregiver dashboard load failed:', error);
        setSeniorError(error instanceof Error ? error.message : 'Unable to load caregiver dashboard');
        setSeniors([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSeniors(false);
        }
      }
    }

    loadSeniors();

    return () => {
      controller.abort();
    };
  }, [caregiverEmail, caregiverId]);

  const alertCount = seniors.filter((senior) => (
    isAlertStatus(senior.status) && !resolvedAlertIds.includes(senior.id)
  )).length;

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6f8] pb-24 text-[#101418]">
      <header className="sticky top-0 z-10 bg-[#f4f6f8] shadow-sm">
        <div className="flex h-[88px] items-center justify-between px-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#b8d5df] bg-[#dcecef] text-[#0f5f75] shadow-sm">
              <User className="h-8 w-8" />
            </div>
            <h1 className="truncate text-[28px] font-bold leading-8 tracking-normal text-black">
              Caregiver Dashboard
            </h1>
          </div>

          <button
            type="button"
            className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-black transition-transform active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="h-8 w-8" />
            {alertCount > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#f4f6f8] bg-[#c8171d] text-[11px] font-bold text-white">
                {alertCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="px-5 py-5">
        {activeTab === 'dashboard' && (
          <CaregiverDashboardHome
            caregiverName={caregiverName}
            seniors={seniors}
            isLoading={isLoadingSeniors}
            error={seniorError}
            resolvedAlertIds={resolvedAlertIds}
            resolvingAlertIds={resolvingAlertIds}
            onResolveAlert={resolveAlert}
          />
        )}
        {activeTab === 'alerts' && (
          <CaregiverAlerts
            seniors={seniors}
            resolvedAlertIds={resolvedAlertIds}
            resolvingAlertIds={resolvingAlertIds}
            onResolveAlert={resolveAlert}
          />
        )}
        {activeTab === 'profile' && (
          <CaregiverProfile
            caregiverName={caregiverName}
            caregiverEmail={caregiverEmail}
            onChangeLanguage={onChangeLanguage}
            onLogout={onLogout}
          />
        )}
      </main>

      <nav className="absolute bottom-0 left-0 right-0 z-20 flex h-24 items-center justify-around bg-[#f4f6f8] px-5 pb-3 pt-2 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
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
          hasAlert={alertCount > 0}
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

function isAlertStatus(status = '') {
  return /alert|sos|urgent|miss|no reply|attention/i.test(status);
}

function getSeniorStatus(senior: Senior) {
  return senior.status?.trim() || 'Connected';
}

function getTimeGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat('en-SG', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Asia/Singapore',
    }).format(new Date()),
  );

  if (hour < 12) {
    return 'Good Morning';
  }

  if (hour < 18) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
}

function formatAlertTime(value = '') {
  if (!value) {
    return undefined;
  }

  const date = new Date(value.replace(' ', 'T'));

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function CaregiverDashboardHome({
  caregiverName,
  seniors,
  isLoading,
  error,
  resolvedAlertIds,
  resolvingAlertIds,
  onResolveAlert,
}: {
  caregiverName: string;
  seniors: Senior[];
  isLoading: boolean;
  error: string;
  resolvedAlertIds: string[];
  resolvingAlertIds: string[];
  onResolveAlert: (seniorId: string) => void | Promise<void>;
}) {
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status));
  const activeAlertSeniors = alertSeniors.filter((senior) => !resolvedAlertIds.includes(senior.id));
  const alertSenior = activeAlertSeniors[0];
  const stableSeniors = seniors.filter((senior) => !isAlertStatus(senior.status));
  const featuredSeniors = [...alertSeniors, ...stableSeniors];
  const recentAlertTitle = alertSenior
    ? `${alertSenior.name}'s status needs attention`
    : 'All residents stable';

  return (
    <div className="flex flex-col gap-6">
      <section className="-mx-5 -mt-5">
        <div className="flex h-16 items-center justify-between bg-[#c8171d] px-6 text-white">
          <div className="flex min-w-0 items-center gap-3">
            <TriangleAlert className="h-8 w-8 flex-shrink-0" />
            <p className="truncate text-lg font-bold uppercase tracking-wide">
              {alertSenior ? `Active SOS: ${alertSenior.name}` : 'No Active SOS'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (alertSenior) {
                onResolveAlert(alertSenior.id);
              }
            }}
            disabled={!alertSenior || (alertSenior.alertId ? resolvingAlertIds.includes(alertSenior.alertId) : false)}
            className="flex h-9 flex-shrink-0 items-center justify-center rounded-full bg-white px-4 text-base font-bold uppercase text-[#c8171d] shadow-sm active:scale-95 disabled:opacity-60"
          >
            {alertSenior?.alertId && resolvingAlertIds.includes(alertSenior.alertId) ? 'Resolving' : 'Acknowledge'}
          </button>
        </div>
      </section>

      <section className="flex items-center justify-between gap-4">
        <h2 className="text-[30px] font-bold leading-9 text-black">Monitored Residents</h2>
        <p className="shrink-0 text-right text-base font-bold text-[#71717a]">
          {seniors.length} Residents Active
        </p>
      </section>

      <section className="flex flex-col gap-5">
        {isLoading ? (
          <p className="rounded-[18px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            Loading seniors from ServiceNow...
          </p>
        ) : error ? (
          <p className="rounded-[18px] bg-red-50 p-5 text-base font-semibold text-red-700">{error}</p>
        ) : featuredSeniors.length > 0 ? (
          featuredSeniors.map((senior) => (
            <SeniorCard
              key={senior.id}
              name={senior.name}
              status={getSeniorStatus(senior)}
              location={senior.location || 'Unknown'}
              tone={resolvedAlertIds.includes(senior.id) ? 'resolved' : isAlertStatus(senior.status) ? 'alert' : 'good'}
            />
          ))
        ) : (
          <div className="rounded-[18px] border border-[#d8dbe0] bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-[#30343a]">No seniors found for this caregiver account.</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-[#71717a]">
              {caregiverName} is not linked to a resident profile yet.
            </p>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[30px] font-bold leading-9 text-black">Recent Alerts</h2>
        <div className="rounded-[22px] bg-[#2875e0] p-6 text-white shadow-sm">
          <p className="text-base font-medium uppercase text-white/90">Critical Update</p>
          <h3 className="mt-3 text-2xl font-bold leading-8">{recentAlertTitle}</h3>
          <p className="mt-4 flex items-center gap-2 text-base font-bold">
            <Clock className="h-5 w-5" />
            {alertSenior ? '2 mins ago' : 'Just now'}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <DashboardMetricCard
          icon={<Activity className="h-10 w-10" />}
          title={alertSenior ? 'Review' : 'Active'}
          subtitle={alertSenior ? `${alertSenior.name}'s activity` : 'Resident activity'}
          tone="blue"
        />
        <DashboardMetricCard
          icon={<Heart className="h-10 w-10" />}
          title={alertSenior ? 'Attention' : 'Normal'}
          subtitle="Sleep quality"
          tone="green"
        />
      </section>
    </div>
  );
}

function CaregiverAlerts({
  seniors,
  resolvedAlertIds,
  resolvingAlertIds,
  onResolveAlert,
}: {
  seniors: Senior[];
  resolvedAlertIds: string[];
  resolvingAlertIds: string[];
  onResolveAlert: (seniorId: string) => void | Promise<void>;
}) {
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status));

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
        {alertSeniors.length > 0 ? (
          alertSeniors.map((senior) => (
            <AlertCard
              key={senior.id}
              kind={/sos|urgent/i.test(senior.status || '') ? 'sos' : 'missed'}
              title={senior.name}
              label={senior.status || 'Needs Attention'}
              location={senior.location}
              message={senior.alertMessage}
              time={formatAlertTime(senior.alertTime)}
              isResolved={resolvedAlertIds.includes(senior.id)}
              isResolving={senior.alertId ? resolvingAlertIds.includes(senior.alertId) : false}
              onResolve={() => onResolveAlert(senior.id)}
              icon={/sos|urgent/i.test(senior.status || '') ? <ShieldAlert className="h-8 w-8" /> : <Bell className="h-8 w-8" />}
            />
          ))
        ) : (
          <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            No active alerts from your caregiver dashboard records.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#1b1c1c]">Recent History</h2>
        {seniors.slice(0, 3).map((senior) => (
          <AlertHistoryItem
            key={senior.id}
            name={senior.name}
            time={senior.status || 'Connected'}
            message={`${senior.name} is linked to your caregiver dashboard.`}
          />
        ))}
      </section>
    </div>
  );
}

function AlertCard({
  kind,
  title,
  label,
  location,
  message,
  time,
  isResolved,
  isResolving,
  onResolve,
  icon,
}: {
  kind: 'sos' | 'missed';
  title: string;
  label: string;
  location?: string;
  message?: string;
  time?: string;
  isResolved: boolean;
  isResolving: boolean;
  onResolve: () => void | Promise<void>;
  icon: React.ReactNode;
}) {
  const isSos = kind === 'sos';
  const cardClassName = isResolved
    ? 'border-[#18833b] bg-[#e9f8ed] text-[#12351f]'
    : isSos
      ? 'border-[#831318] bg-[#a42d2d] text-[#ffc1bc]'
      : 'border-[#954a00] bg-[#ffdcc6] text-[#301400]';
  const iconClassName = isResolved
    ? 'bg-[#18833b] text-white'
    : isSos
      ? 'bg-[#831318] text-white'
      : 'bg-[#954a00] text-white';
  const labelClassName = isResolved
    ? 'text-[#18833b]'
    : isSos
      ? 'text-[#ffc1bc]'
      : 'text-[#713700]';

  return (
    <div
      className={`rounded-[28px] border-l-8 p-5 shadow-sm min-[390px]:rounded-[32px] ${cardClassName}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClassName}`}>
            {isResolved ? <CheckCircle className="h-8 w-8" /> : icon}
          </div>
          <div>
            <p className={`text-sm font-bold uppercase tracking-wide ${labelClassName}`}>
              {isResolved ? 'Resolved' : label}
            </p>
            <h2 className="text-2xl font-bold text-current">{title}</h2>
          </div>
        </div>
        {time && <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-current">{time}</span>}
      </div>

      {isSos || isResolved ? (
        <div className={`mb-5 flex items-center gap-2 rounded-2xl p-3 ${isResolved ? 'bg-white text-[#18833b]' : 'bg-white/10'}`}>
          <MapPin className={`h-5 w-5 flex-shrink-0 ${isResolved ? 'text-[#18833b]' : 'text-[#ffdad7]'}`} />
          <span className={`text-base font-semibold ${isResolved ? 'text-[#18833b]' : 'text-[#ffdad7]'}`}>
            {isResolved ? 'This alert has been resolved.' : location || message || 'Location details unavailable'}
          </span>
        </div>
      ) : (
        <div className="mb-5 flex items-center gap-2">
          <Info className="h-5 w-5 flex-shrink-0 text-[#954a00]" />
          <p className="text-base font-semibold text-[#301400]">Review this senior's latest status.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <AlertActionButton icon={<Phone className="h-5 w-5" />} label="Call" variant={isSos ? 'light' : 'warning'} />
        <AlertActionButton
          icon={<CheckCircle className="h-5 w-5" />}
          label={isResolving ? 'Resolving...' : isResolved ? 'Resolved' : 'Resolve'}
          variant={isResolved ? 'success' : isSos ? 'danger' : 'light'}
          disabled={isResolving || isResolved}
          onClick={onResolve}
        />
      </div>
    </div>
  );
}

function AlertActionButton({
  disabled = false,
  icon,
  label,
  onClick,
  variant,
}: {
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant: 'light' | 'danger' | 'warning' | 'success';
}) {
  const className =
    variant === 'success'
      ? 'bg-[#18833b] text-white'
      : variant === 'danger'
      ? 'bg-[#831318] text-white'
      : variant === 'warning'
        ? 'bg-[#954a00] text-white'
        : 'bg-white text-[#831318]';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-14 items-center justify-center gap-2 rounded-full text-base font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AlertHistoryItem({ name, time, message }: { name: string; time: string; message: string }) {
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
      </div>
    </div>
  );
}

function CaregiverProfile({
  caregiverName,
  caregiverEmail,
  onChangeLanguage,
  onLogout,
}: {
  caregiverName: string;
  caregiverEmail: string;
  onChangeLanguage: () => void;
  onLogout: () => void;
}) {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [phone, setPhone] = useState('91234567');
  const [personalEmail, setPersonalEmail] = useState(caregiverEmail);
  const [address, setAddress] = useState('Block 123 Woodlands');
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem(CAREGIVER_PROFILE_IMAGE_KEY) || '');

  useEffect(() => {
    const savedInfo = localStorage.getItem(CAREGIVER_PERSONAL_INFO_KEY);

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
        localStorage.removeItem(CAREGIVER_PERSONAL_INFO_KEY);
      }
    }

    setPersonalEmail(caregiverEmail);
  }, [caregiverEmail]);

  const handleSavePersonalInfo = () => {
    localStorage.setItem(
      CAREGIVER_PERSONAL_INFO_KEY,
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
        localStorage.setItem(CAREGIVER_PROFILE_IMAGE_KEY, imageDataUrl);
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
            onClick={onChangeLanguage}
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
  return (
    <button
      type="button"
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

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return initials || 'SR';
}

function SeniorCard({
  name,
  status,
  location,
  tone,
}: {
  name: string;
  status: string;
  location: string;
  tone: 'good' | 'alert' | 'resolved';
}) {
  const isAlert = tone === 'alert';
  const isResolved = tone === 'resolved';
  const borderClassName = isResolved
    ? 'border-2 border-[#18833b]'
    : isAlert
      ? 'border-2 border-[#c8171d]'
      : 'border-[#d0d3d8]';
  const avatarClassName = isResolved
    ? 'bg-[#18833b] text-white'
    : isAlert
      ? 'bg-[#14353d] text-white'
      : 'bg-[#dcecef] text-[#17353d]';
  const statusTextClassName = isResolved
    ? 'text-[#18833b]'
    : isAlert
      ? 'text-[#c8171d]'
      : 'text-[#30343a]';
  const badgeClassName = isResolved
    ? 'bg-[#dff5e6] text-[#18833b]'
    : isAlert
      ? 'bg-[#ffdada] text-[#a90000]'
      : 'bg-[#e2e5e9] text-[#30343a]';
  const tileIconColor = isResolved ? 'text-[#18833b]' : isAlert ? 'text-[#c8171d]' : 'text-[#12b962]';

  return (
    <div className={`rounded-[18px] border bg-white p-5 shadow-sm ${borderClassName}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-[86px] w-[86px] flex-shrink-0 items-center justify-center rounded-[14px] text-2xl font-bold ${avatarClassName}`}>
          {getInitials(name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[28px] font-bold leading-8 text-black">{name}</h3>
              <p className={`mt-3 flex items-center gap-2 text-lg font-bold ${statusTextClassName}`}>
                {isResolved ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#18833b]" />
                ) : isAlert ? (
                  <TriangleAlert className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#12c759]" />
                )}
                <span className="truncate">{isResolved ? 'Resolved' : isAlert ? 'No check-in today' : 'Checked in today'}</span>
              </p>
            </div>
            <span className={`shrink-0 rounded-[12px] px-3 py-2 text-base font-bold uppercase ${badgeClassName}`}>
              {isResolved ? 'Resolved' : isAlert ? 'SOS Active' : status || 'Stable'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ResidentInfoTile
          icon={<Pill className="h-8 w-8" />}
          iconColor={tileIconColor}
          label="Medication"
          value={isResolved ? 'Resolved' : isAlert ? 'Missed' : 'Taken'}
        />
        <ResidentInfoTile
          icon={<MapPin className="h-8 w-8" />}
          iconColor="text-[#075fc7]"
          label="Location"
          value={location || 'Unknown'}
        />
      </div>

      <div className="mt-5 grid grid-cols-[1fr_128px] gap-3">
        <button
          type="button"
          className={`flex h-16 items-center justify-center gap-3 rounded-[10px] border text-xl font-bold uppercase transition-transform active:scale-[0.98] ${isAlert ? 'border-[#075fc7] bg-[#075fc7] text-white' : isResolved ? 'border-[#18833b] bg-[#18833b] text-white' : 'border-[#075fc7] bg-white text-[#075fc7]'}`}
        >
          <Phone className="h-6 w-6" />
          {isAlert ? 'Call Emergency' : isResolved ? 'Resolved' : 'Call'}
        </button>
        <button
          type="button"
          className="flex h-16 items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-lg font-bold uppercase text-[#30343a] transition-transform active:scale-[0.98]"
        >
          Profile
        </button>
      </div>
    </div>
  );
}

function ResidentInfoTile({
  icon,
  iconColor,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-[76px] items-center gap-3 rounded-[12px] bg-[#f0f2f5] px-4">
      <div className={iconColor}>{icon}</div>
      <div className="min-w-0">
        <p className="text-base font-semibold text-[#71717a]">{label}</p>
        <p className="truncate text-lg font-bold leading-6 text-black">{value}</p>
      </div>
    </div>
  );
}

function DashboardMetricCard({
  icon,
  title,
  subtitle,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tone: 'blue' | 'green';
}) {
  return (
    <div className="flex min-h-[196px] flex-col justify-between rounded-[20px] bg-[#e9ecef] p-6">
      <div className={tone === 'blue' ? 'text-[#075fc7]' : 'text-[#12b962]'}>{icon}</div>
      <div>
        <h3 className="text-[28px] font-bold leading-8 text-black">{title}</h3>
        <p className="mt-1 text-lg font-bold text-[#71717a]">{subtitle}</p>
      </div>
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
      className={`relative flex min-w-[96px] flex-col items-center justify-center gap-1 rounded-[18px] px-4 py-3 transition-transform active:scale-95 ${
        active ? 'bg-[#2875e0] text-white shadow-sm' : 'text-[#3f4147]'
      }`}
    >
      {icon}
      <span className="text-sm font-bold">{label}</span>
      {hasAlert && <span className="absolute right-5 top-3 h-2.5 w-2.5 rounded-full bg-[#c8171d]" />}
    </button>
  );
}
