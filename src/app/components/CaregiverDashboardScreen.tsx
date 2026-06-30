import {
  Activity,
  ArrowLeft,
  Bell,
  Calendar,
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
  Mail,
  MapPin,
  Phone,
  Pill,
  Pencil,
  ShieldAlert,
  Shield,
  TriangleAlert,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStoredUser } from '../services/backend';

const CAREGIVER_PERSONAL_INFO_KEY = 'careconnect.caregiverPersonalInfo';
const CAREGIVER_PROFILE_IMAGE_KEY = 'careconnect.caregiverProfileImage';
const CAREGIVER_DASHBOARD_REFRESH_MS = 5000;

type SosAlertHistory = {
  id: string;
  seniorName: string;
  status: string;
  location?: string;
  message?: string;
  alertTime?: string;
  resolvedAt: string;
};

type Senior = {
  id: string;
  connectionId?: string;
  userId?: string;
  name: string;
  phone: string;
  email: string;
  location?: string;
  address?: string;
  lastCheckIn?: string;
  points?: number;
  relationship?: string;
  status?: string;
  alertId?: string;
  alertMessage?: string;
  alertStatus?: string;
  alertTime?: string;
};

type SeniorDetailsInput = {
  name: string;
  phone: string;
  email: string;
  location: string;
  address: string;
};

function getSosHistoryKey(caregiverEmail: string) {
  return `careconnect.sosHistory.${caregiverEmail.trim().toLowerCase() || 'unknown'}`;
}

function getStoredSosHistory(caregiverEmail: string) {
  const rawHistory = localStorage.getItem(getSosHistoryKey(caregiverEmail));

  if (!rawHistory) {
    return [];
  }

  try {
    return JSON.parse(rawHistory) as SosAlertHistory[];
  } catch {
    localStorage.removeItem(getSosHistoryKey(caregiverEmail));
    return [];
  }
}

function saveSosHistory(caregiverEmail: string, history: SosAlertHistory[]) {
  localStorage.setItem(getSosHistoryKey(caregiverEmail), JSON.stringify(history));
}

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
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [resolvingAlertIds, setResolvingAlertIds] = useState<string[]>([]);
  const [sendingReminderIds, setSendingReminderIds] = useState<string[]>([]);
  const [sosHistory, setSosHistory] = useState<SosAlertHistory[]>(() => getStoredSosHistory(caregiverEmail));
//Senior data loading and polling logic
  useEffect(() => {
    if (!caregiverEmail) {
      setSeniors([]);
      return;
    }

    const controller = new AbortController();
    let isMounted = true;
    let isRefreshing = false;
    let hasLoadedOnce = false;

    async function loadSeniors() {
      if (isRefreshing) {
        return;
      }

      isRefreshing = true;

      if (!hasLoadedOnce) {
        setIsLoadingSeniors(true);
      }

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

        if (isMounted) {
          setSeniors(data?.seniors || []);
          hasLoadedOnce = true;
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }

        console.error('Caregiver dashboard load failed:', error);
        if (isMounted) {
          setSeniorError(error instanceof Error ? error.message : 'Unable to load caregiver dashboard');

          if (!hasLoadedOnce) {
            setSeniors([]);
          }
        }
      } finally {
        isRefreshing = false;

        if (isMounted && !controller.signal.aborted) {
          setIsLoadingSeniors(false);
        }
      }
    }

    loadSeniors();
    const refreshTimer = window.setInterval(loadSeniors, CAREGIVER_DASHBOARD_REFRESH_MS);

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        loadSeniors();
      }
    };

    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      controller.abort();
    };
  }, [caregiverEmail, caregiverId]);

  useEffect(() => {
    setSosHistory(getStoredSosHistory(caregiverEmail));
  }, [caregiverEmail]);

  const handleUpdateSeniorDetails = async (senior: Senior, details: SeniorDetailsInput) => {
    const seniorId = senior.userId || senior.id;

    if (!seniorId) {
      throw new Error('Senior profile ID is missing.');
    }

    if (!currentUser?.token) {
      throw new Error('Please log in again before updating senior details.');
    }

    const response = await fetch(`/api/users/${encodeURIComponent(seniorId)}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        phone: details.phone,
        locationZones: details.location,
        address: details.address,
      }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || 'Unable to update senior details.');
    }

    const updatedUser = data?.user || {};
    const updatedSenior: Senior = {
      ...senior,
      name: updatedUser.name || details.name,
      phone: updatedUser.phone || details.phone,
      email: updatedUser.email || details.email,
      location: updatedUser.locationZones || details.location,
      address: updatedUser.address || details.address,
    };

    setSelectedSenior(updatedSenior);
    setSeniors((currentSeniors) =>
      currentSeniors.map((currentSenior) =>
        currentSenior.id === senior.id || currentSenior.userId === senior.userId
          ? { ...currentSenior, ...updatedSenior }
          : currentSenior,
      ),
    );
  };

  const handleResolveAlert = async (senior: Senior) => {
    if (!senior.alertId) {
      alert('This alert cannot be resolved because its ServiceNow alert ID is missing.');
      return;
    }

    setResolvingAlertIds((ids) => [...ids, senior.alertId as string]);

    try {
      const response = await fetch('/api/servicenow/sos-alert', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alertId: senior.alertId,
          status: 'Resolved',
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to resolve ServiceNow alert');
      }

      const resolvedHistoryItem: SosAlertHistory = {
        id: senior.alertId,
        seniorName: senior.name || 'Senior',
        status: senior.status || senior.alertStatus || 'SOS Active',
        location: senior.location,
        message: senior.alertMessage,
        alertTime: senior.alertTime,
        resolvedAt: new Date().toISOString(),
      };

      setSosHistory((currentHistory) => {
        const nextHistory = [
          resolvedHistoryItem,
          ...currentHistory.filter((item) => item.id !== resolvedHistoryItem.id),
        ].slice(0, 20);

        saveSosHistory(caregiverEmail, nextHistory);
        return nextHistory;
      });

      setSeniors((currentSeniors) =>
        currentSeniors.map((currentSenior) =>
          currentSenior.alertId === senior.alertId
            ? {
                ...currentSenior,
                status: 'Connected',
                alertStatus: 'Resolved',
                alertMessage: '',
                alertTime: '',
              }
            : currentSenior,
        ),
      );
    } catch (error) {
      console.error('Resolve alert failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to resolve ServiceNow alert');
    } finally {
      setResolvingAlertIds((ids) => ids.filter((id) => id !== senior.alertId));
    }
  };

  const handleSendCheckInReminder = async (senior: Senior) => {
    const reminderKey = senior.userId || senior.id || senior.connectionId || senior.name;

    setSendingReminderIds((ids) => [...ids, reminderKey]);

    try {
      const response = await fetch('/api/servicenow/sos-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seniorName: senior.name,
          seniorPhone: senior.phone,
          location: senior.location || '',
          status: 'Reminder Sent',
          message: 'Please complete your check-in for today.',
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send check-in reminder');
      }

      alert(`Reminder sent to ${senior.name || 'Senior'}.`);
    } catch (error) {
      console.error('Send reminder failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to send check-in reminder');
    } finally {
      setSendingReminderIds((ids) => ids.filter((id) => id !== reminderKey));
    }
  };

  const alertCount = seniors.filter((senior) => isAlertStatus(senior.status)).length;

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6f8] pb-24 text-[#101418]">
      <main className="px-5 py-5">
        {selectedSenior ? (
          <ResidentProfileDetails
            senior={selectedSenior}
            onBack={() => setSelectedSenior(null)}
            onSave={handleUpdateSeniorDetails}
          />
        ) : activeTab === 'dashboard' && (
          <CaregiverDashboardHome
            caregiverName={caregiverName}
            seniors={seniors}
            isLoading={isLoadingSeniors}
            error={seniorError}
            onOpenProfile={setSelectedSenior}
            onSendReminder={handleSendCheckInReminder}
            sendingReminderIds={sendingReminderIds}
          />
        )}
        {!selectedSenior && activeTab === 'alerts' && (
          <CaregiverAlerts
            seniors={seniors}
            sosHistory={sosHistory}
            resolvingAlertIds={resolvingAlertIds}
            onResolveAlert={handleResolveAlert}
          />
        )}
        {!selectedSenior && activeTab === 'profile' && (
          <CaregiverProfile
            caregiverName={caregiverName}
            caregiverEmail={caregiverEmail}
            onChangeLanguage={onChangeLanguage}
            onLogout={onLogout}
          />
        )}
      </main>

      <nav className="absolute bottom-0 left-0 right-0 z-20 flex min-h-24 items-center justify-around bg-[#f4f6f8] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
        <DashboardNavItem
          active={activeTab === 'dashboard'}
          icon={<LayoutDashboard className="h-6 w-6" />}
          label="Dashboard"
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('dashboard');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'alerts'}
          icon={<TriangleAlert className="h-6 w-6" />}
          label="Alerts"
          hasAlert={alertCount > 0}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('alerts');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'profile'}
          icon={<User className="h-6 w-6" />}
          label="Profile"
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('profile');
          }}
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

function getSeniorDetailValue(value?: string | number | null) {
  const normalizedValue = String(value ?? '').trim();

  return normalizedValue || 'NO';
}

//Phone number cleaning for tel: links, removing non-digit characters except for leading
function getPhoneHref(phone = '') {
  const cleanedPhone = phone.replace(/[^\d+]/g, '');

  return cleanedPhone ? `tel:${cleanedPhone}` : undefined;
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

function parseServiceNowDate(value = '') {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim().replace(' ', 'T');
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalizedValue);
  const date = new Date(hasTimezone ? normalizedValue : `${normalizedValue}Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function hasCheckedInToday(value = '') {
  const date = parseServiceNowDate(value);

  if (!date) {
    return false;
  }

  const formatDate = (dateValue: Date) =>
    new Intl.DateTimeFormat('en-CA', {
      day: '2-digit',
      month: '2-digit',
      timeZone: 'Asia/Singapore',
      year: 'numeric',
    }).format(dateValue);

  return formatDate(date) === formatDate(new Date());
}

function formatAlertTime(value = '') {
  const date = parseServiceNowDate(value);

  if (!date) {
    return undefined;
  }

  return new Intl.DateTimeFormat('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function formatDetailDateTime(value = '') {
  if (!value) {
    return 'Not provided';
  }

  const date = parseServiceNowDate(value);

  if (!date) {
    return value;
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Singapore',
  }).format(date);
}

function CaregiverDashboardHome({
  caregiverName,
  seniors,
  isLoading,
  error,
  onOpenProfile,
  onSendReminder,
  sendingReminderIds,
}: {
  caregiverName: string;
  seniors: Senior[];
  isLoading: boolean;
  error: string;
  onOpenProfile: (senior: Senior) => void;
  onSendReminder: (senior: Senior) => void;
  sendingReminderIds: string[];
}) {
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status) || !hasCheckedInToday(senior.lastCheckIn));
  const alertSenior = alertSeniors[0];
  const stableSeniors = seniors.filter((senior) => !isAlertStatus(senior.status) && hasCheckedInToday(senior.lastCheckIn));
  const featuredSeniors = [...alertSeniors, ...stableSeniors];

  return (
    <div className="flex flex-col gap-6">
      <section className="flex items-center justify-between gap-4">
        <h2 className="text-[30px] font-bold leading-9 text-black">Seniors</h2>
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
              senior={senior}
              name={senior.name}
              location={senior.location || 'Unknown'}
              tone={isAlertStatus(senior.status) || !hasCheckedInToday(senior.lastCheckIn) ? 'alert' : 'good'}
              onOpenProfile={onOpenProfile}
              onSendReminder={onSendReminder}
              isSendingReminder={sendingReminderIds.includes(senior.userId || senior.id || senior.connectionId || senior.name)}
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

    </div>
  );
}

// Placeholder component for senior card - can be expanded with more details and actions
function CaregiverAlerts({
  seniors,
  sosHistory,
  resolvingAlertIds,
  onResolveAlert,
}: {
  seniors: Senior[];
  sosHistory: SosAlertHistory[];
  resolvingAlertIds: string[];
  onResolveAlert: (senior: Senior) => void;
}) {
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status));

  return (
    <div className="flex flex-col gap-7">
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
              icon={/sos|urgent/i.test(senior.status || '') ? <ShieldAlert className="h-8 w-8" /> : <Bell className="h-8 w-8" />}
              isResolving={senior.alertId ? resolvingAlertIds.includes(senior.alertId) : false}
              onResolve={() => onResolveAlert(senior)}
            />
          ))
        ) : (
          <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            No active alerts from your caregiver dashboard records.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#1b1c1c]">SOS History</h2>
        {sosHistory.length > 0 ? (
          sosHistory.map((alert) => (
            <AlertHistoryItem
              key={alert.id}
              name={alert.seniorName}
              time={formatAlertTime(alert.alertTime) || formatAlertTime(alert.resolvedAt) || 'Resolved'}
              message={alert.message || `${alert.status} resolved`}
              location={alert.location}
            />
          ))
        ) : (
          <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            Resolved SOS alerts will appear here.
          </p>
        )}
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
  icon,
  isResolving,
  onResolve,
}: {
  kind: 'sos' | 'missed';
  title: string;
  label: string;
  location?: string;
  message?: string;
  time?: string;
  icon: React.ReactNode;
  isResolving: boolean;
  onResolve: () => void;
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
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isSos ? 'bg-[#831318] text-white' : 'bg-[#954a00] text-white'}`}>
            {icon}
          </div>
          <div>
            <p className={`text-sm font-bold uppercase tracking-wide ${isSos ? 'text-[#ffc1bc]' : 'text-[#713700]'}`}>
              {label}
            </p>
            <h2 className="text-2xl font-bold text-current">{title}</h2>
          </div>
        </div>
        {time && <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-current">{time}</span>}
      </div>

      {isSos ? (
        <div className="mb-5 flex items-center gap-2 rounded-2xl bg-white/10 p-3">
          <MapPin className="h-5 w-5 flex-shrink-0 text-[#ffdad7]" />
          <span className="text-base font-semibold text-[#ffdad7]">{location || message || 'Location details unavailable'}</span>
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
          label={isResolving ? 'Resolving' : 'Resolve'}
          variant={isResolving ? 'success' : isSos ? 'danger' : 'light'}
          disabled={isResolving}
          onClick={onResolve}
        />
      </div>
    </div>
  );
}

// Action button component used in alert cards with different styles based on variant
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
      className={`flex h-14 items-center justify-center gap-2 rounded-full text-base font-bold shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AlertHistoryItem({
  location,
  name,
  time,
  message,
}: {
  location?: string;
  name: string;
  time: string;
  message: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[28px] bg-[#e9f6ed] p-4 shadow-sm min-[390px]:rounded-[32px]">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#18833b] text-white">
        <CheckCircle className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-bold text-[#124f25]">{name}</p>
          <span className="flex-shrink-0 text-sm font-semibold text-[#18833b]">{time}</span>
        </div>
        <p className="mt-1 text-sm leading-5 text-[#1d5031]">{message}</p>
        {location && <p className="mt-1 text-sm font-semibold leading-5 text-[#2e6f42]">{location}</p>}
      </div>
    </div>
  );
}

function ResidentProfileDetails({
  senior,
  onBack,
  onSave,
}: {
  senior: Senior;
  onBack: () => void;
  onSave: (senior: Senior, details: SeniorDetailsInput) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState<SeniorDetailsInput>({
    name: senior.name || '',
    phone: senior.phone || '',
    email: senior.email || '',
    location: senior.location || '',
    address: senior.address || '',
  });
  const displayName = getSeniorDetailValue(senior.name);
  const phone = getSeniorDetailValue(senior.phone);
  const email = getSeniorDetailValue(senior.email);
  const relationship = getSeniorDetailValue(senior.relationship);
  const address = getSeniorDetailValue(senior.address);
  const location = getSeniorDetailValue(senior.location);
  const status = getSeniorStatus(senior);

  useEffect(() => {
    setFormValues({
      name: senior.name || '',
      phone: senior.phone || '',
      email: senior.email || '',
      location: senior.location || '',
      address: senior.address || '',
    });
  }, [senior]);

  const updateFormValue = (field: keyof SeniorDetailsInput, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!formValues.name.trim()) {
      alert('Senior name is required.');
      return;
    }

    setIsSaving(true);

    try {
      await onSave(senior, {
        name: formValues.name.trim(),
        phone: formValues.phone.trim(),
        email: formValues.email.trim(),
        location: formValues.location.trim(),
        address: formValues.address.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Unable to update senior details:', error);
      alert(error instanceof Error ? error.message : 'Unable to update senior details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="-mx-5 -my-5 min-h-full bg-[#f4f6f8] pb-8">
      <div className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-[#f4f6f8] px-5 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#075fc7] active:bg-blue-50"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="truncate text-2xl font-bold text-black">Senior Details</h1>
        <button
          type="button"
          onClick={() => setIsEditing((currentValue) => !currentValue)}
          className="ml-auto flex items-center gap-2 rounded-[10px] border border-[#d5dde8] bg-white px-4 py-2 text-base font-bold text-[#14213d] shadow-sm active:scale-95"
        >
          {!isEditing && <Pencil className="h-4 w-4" />}
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <section className="px-5 pt-5">
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#17353d] shadow-sm">
            {getInitials(displayName)}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[30px] font-bold leading-9 text-[#111827]">{displayName}</h2>
            <a href={getPhoneHref(senior.phone)} className="mt-2 flex items-center gap-2 text-lg font-medium text-[#334155]">
              <Phone className="h-5 w-5" />
              {phone}
            </a>
            <p className="mt-2 flex items-center gap-2 truncate text-lg font-medium text-[#334155]">
              <Mail className="h-5 w-5" />
              {email}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 space-y-5 px-5">
        {isEditing ? (
          <div className="rounded-[10px] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-black uppercase tracking-wide text-[#3d8508]">Edit Information</h3>
            <SeniorDetailField label="Full Name" value={formValues.name} onChange={(value) => updateFormValue('name', value)} />
            <SeniorDetailField label="Address" value={formValues.address} onChange={(value) => updateFormValue('address', value)} />
            <SeniorDetailField label="Location Zone" value={formValues.location} onChange={(value) => updateFormValue('location', value)} />
            <SeniorDetailField label="Phone Number" value={formValues.phone} onChange={(value) => updateFormValue('phone', value)} type="tel" />
            <SeniorDetailField label="Email" value={formValues.email} onChange={(value) => updateFormValue('email', value)} type="email" />
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-[10px] bg-[#4b8508] text-lg font-bold text-white shadow-sm active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
            >
              <Pencil className="h-5 w-5" />
              {isSaving ? 'Saving...' : 'Save Information'}
            </button>
          </div>
        ) : (
          <>
            <SeniorDetailSection title="Basic Information" tone="green" icon={<Info className="h-6 w-6" />}>
              <SeniorDetailRow icon={<User className="h-6 w-6" />} label="Full Name" value={displayName} />
              <SeniorDetailRow icon={<Calendar className="h-6 w-6" />} label="Date of Birth" value="NO" />
              <SeniorDetailRow icon={<Handshake className="h-6 w-6" />} label="Relationship" value={relationship} />
              <SeniorDetailRow icon={<MapPin className="h-6 w-6" />} label="Address" value={address} />
              <SeniorDetailRow icon={<MapPin className="h-6 w-6" />} label="Location Zone" value={location} />
              <SeniorDetailRow icon={<Phone className="h-6 w-6" />} label="Phone Number" value={phone} />
              <SeniorDetailRow icon={<Mail className="h-6 w-6" />} label="Email" value={email} />
            </SeniorDetailSection>

            <SeniorDetailSection title="Emergency Contact" tone="red" icon={<ShieldAlert className="h-6 w-6" />}>
              <SeniorDetailRow icon={<User className="h-6 w-6" />} label="Contact Name" value="NO" />
              <SeniorDetailRow icon={<Phone className="h-6 w-6" />} label="Contact Phone" value="NO" />
              <SeniorDetailRow icon={<Handshake className="h-6 w-6" />} label="Relationship" value={relationship} />
            </SeniorDetailSection>

            <SeniorDetailSection title="Medical Information" tone="blue" icon={<Pill className="h-6 w-6" />}>
              <SeniorDetailRow icon={<Heart className="h-6 w-6" />} label="Blood Type" value="NO" />
              <SeniorDetailRow icon={<Shield className="h-6 w-6" />} label="Allergies" value="NO" />
              <SeniorDetailRow icon={<Activity className="h-6 w-6" />} label="Medical Conditions" value="NO" />
              <SeniorDetailRow icon={<Pill className="h-6 w-6" />} label="Current Medication" value="NO" />
            </SeniorDetailSection>

            <SeniorDetailSection title="Status" tone="blue" icon={<CheckCircle className="h-6 w-6" />}>
              <SeniorDetailRow icon={<Calendar className="h-6 w-6" />} label="Last Check-In" value={senior.lastCheckIn ? formatDetailDateTime(senior.lastCheckIn) : 'NO'} />
              <SeniorDetailRow icon={<Activity className="h-6 w-6" />} label="Points" value={String(senior.points ?? 0)} />
              <SeniorDetailRow icon={<CheckCircle className="h-6 w-6" />} label="Current Status" value={getSeniorDetailValue(status)} />
            </SeniorDetailSection>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-[10px] bg-[#4b8508] text-xl font-bold text-white shadow-sm active:scale-[0.98]"
            >
              <Pencil className="h-6 w-6" />
              Edit Information
            </button>
          </>
        )}
      </section>
    </div>
  );
}

function SeniorDetailSection({
  children,
  icon,
  title,
  tone,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  tone: 'green' | 'red' | 'blue';
}) {
  const toneClass = {
    green: 'bg-[#f5fff7] text-[#3d8508] border-[#cfe9d6]',
    red: 'bg-[#fff7f7] text-[#c8171d] border-[#ffd7d7]',
    blue: 'bg-[#f6faff] text-[#075fc7] border-[#d5e6ff]',
  }[tone];

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-sm">
      <div className={`flex items-center gap-3 border-b px-5 py-4 ${toneClass}`}>
        {icon}
        <h3 className="text-lg font-black uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SeniorDetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[28px_minmax(104px,1fr)_minmax(112px,1.35fr)_20px] items-center gap-3 border-b border-[#eef0f2] px-5 py-4 last:border-b-0">
      <div className="text-[#94a3b8]">{icon}</div>
      <p className="text-base font-semibold leading-5 text-[#111827]">{label}</p>
      <p className="break-words text-right text-base font-semibold leading-6 text-black">{value}</p>
      <ChevronRight className="h-5 w-5 text-[#cbd5e1]" />
    </div>
  );
}

function SeniorDetailField({
  label,
  onChange,
  placeholder,
  type = 'text',
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block border-b border-gray-200 py-3 last:border-b-0">
      <span className="mb-1 block text-sm font-semibold text-[#71717a]">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl bg-[#f4f6f8] px-4 py-3 text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#075fc7]"
      />
    </label>
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
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#075fc7] active:bg-blue-50"
            aria-label="Back to profile"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        </div>

        <div className="p-5 min-[390px]:p-8">
          <div className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-[#075fc7]">Profile Photo</h2>

            <div className="flex flex-col items-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="mb-4 h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-[#edf4ff] text-[#075fc7]">
                  <User className="h-16 w-16" />
                </div>
              )}

              <label className="cursor-pointer rounded-full bg-[#2875e0] px-6 py-3 text-lg font-semibold text-white shadow-sm active:scale-95">
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
            <h2 className="mb-5 text-2xl font-bold text-[#075fc7]">Basic Information</h2>

            <ProfileField label="Phone Number" value={phone} onChange={setPhone} type="tel" />
            <ProfileField label="Email" value={personalEmail} onChange={setPersonalEmail} type="email" />
            <ProfileField label="Address" value={address} onChange={setAddress} isLast />

            <button
              type="button"
              onClick={handleSavePersonalInfo}
              className="mt-5 w-full rounded-2xl bg-[#2875e0] py-3 text-lg font-semibold text-white active:scale-95"
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
      <div className="bg-gradient-to-br from-[#4f8ff0] to-[#2875e0] px-5 pb-5 pt-6 text-white min-[390px]:px-7 min-[390px]:pb-7 min-[390px]:pt-8">
        <div className="mb-4 flex items-center gap-4 min-[390px]:gap-5">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-16 w-16 rounded-full bg-white object-cover min-[390px]:h-20 min-[390px]:w-20"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#075fc7] min-[390px]:h-20 min-[390px]:w-20">
              <User className="h-8 w-8 min-[390px]:h-10 min-[390px]:w-10" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold min-[390px]:text-3xl">{caregiverName}</h2>
            <p className="mt-1 truncate text-sm text-blue-100 min-[390px]:text-base">
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
  senior,
  name,
  location,
  tone,
  isSendingReminder,
  onOpenProfile,
  onSendReminder,
}: {
  senior: Senior;
  name: string;
  location: string;
  tone: 'good' | 'alert';
  isSendingReminder: boolean;
  onOpenProfile: (senior: Senior) => void;
  onSendReminder: (senior: Senior) => void;
}) {
  const isAlert = tone === 'alert';
  const checkedInToday = hasCheckedInToday(senior.lastCheckIn);
  const phoneHref = getPhoneHref(senior.phone);

  return (
    <div className={`rounded-[18px] border bg-white p-5 shadow-sm ${isAlert ? 'border-2 border-[#c8171d]' : 'border-[#d0d3d8]'}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-[86px] w-[86px] flex-shrink-0 items-center justify-center rounded-[14px] text-2xl font-bold ${isAlert ? 'bg-[#14353d] text-white' : 'bg-[#dcecef] text-[#17353d]'}`}>
          {getInitials(name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start">
            <div className="min-w-0">
              <h3 className="whitespace-normal break-words text-[28px] font-bold leading-8 text-black">{name}</h3>
              <p className={`mt-3 flex items-center gap-2 text-lg font-bold ${isAlert ? 'text-[#c8171d]' : 'text-[#30343a]'}`}>
                {isAlert ? (
                  <TriangleAlert className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#12c759]" />
                )}
                <span className="truncate">{isAlert ? 'No check-in today' : 'Checked in today'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ResidentInfoTile
          icon={<Pill className="h-8 w-8" />}
          iconColor={isAlert ? 'text-[#c8171d]' : 'text-[#12b962]'}
          label="Medication"
          value={isAlert ? 'Missed' : 'Taken'}
        />
        <ResidentInfoTile
          icon={<MapPin className="h-8 w-8" />}
          iconColor="text-[#075fc7]"
          label="Location"
          value={location || 'Unknown'}
        />
      </div>

      <div className={`mt-5 grid gap-3 ${checkedInToday ? 'grid-cols-[1fr_128px]' : 'grid-cols-2'}`}>
        <a
          href={phoneHref}
          aria-disabled={!phoneHref}
          className={`flex h-16 items-center justify-center gap-3 rounded-[10px] border text-xl font-bold uppercase transition-transform active:scale-[0.98] ${
            !phoneHref
              ? 'pointer-events-none border-[#c7cbd1] bg-[#f0f2f5] text-[#71717a]'
              : isAlert
                ? 'border-[#075fc7] bg-[#075fc7] text-white'
                : 'border-[#075fc7] bg-white text-[#075fc7]'
          }`}
        >
          <Phone className="h-6 w-6" />
          {isAlert ? 'Call Emergency' : 'Call'}
        </a>
        {!checkedInToday && (
          <button
            type="button"
            disabled={isSendingReminder}
            onClick={() => onSendReminder(senior)}
            className="flex h-16 items-center justify-center gap-3 rounded-[10px] border border-[#075fc7] bg-[#075fc7] text-xl font-bold uppercase text-white transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
          >
            <Bell className="h-6 w-6" />
            {isSendingReminder ? 'Sending' : 'Remind'}
          </button>
        )}
        <button
          type="button"
          onClick={() => onOpenProfile(senior)}
          className={`flex h-16 items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-lg font-bold uppercase text-[#30343a] transition-transform active:scale-[0.98] ${checkedInToday ? '' : 'col-span-2'}`}
        >
          Details
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
