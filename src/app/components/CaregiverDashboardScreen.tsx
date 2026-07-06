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
  Plus,
  ShieldAlert,
  Shield,
  TriangleAlert,
  User,
  X,
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
    return (JSON.parse(rawHistory) as SosAlertHistory[]).filter((item) => !isCheckInReminderAlert(item));
  } catch {
    localStorage.removeItem(getSosHistoryKey(caregiverEmail));
    return [];
  }
}

function saveSosHistory(caregiverEmail: string, history: SosAlertHistory[]) {
  localStorage.setItem(getSosHistoryKey(caregiverEmail), JSON.stringify(history.filter((item) => !isCheckInReminderAlert(item))));
}

export default function CaregiverDashboardScreen({
  dashboardLabel = 'Dashboard',
  emptyMessage,
  loadMode = 'caregiver',
  onBack,
  onChangeLanguage,
  onLogout,
  alertsLabel = 'Alerts',
}: {
  dashboardLabel?: string;
  emptyMessage?: string;
  loadMode?: 'caregiver' | 'admin';
  onBack: () => void;
  onChangeLanguage: () => void;
  onLogout: () => void;
  alertsLabel?: string;
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
  const [showAddSenior, setShowAddSenior] = useState(false);
  const [seniorPendingDelete, setSeniorPendingDelete] = useState<Senior | null>(null);
  const [deletingSeniorIds, setDeletingSeniorIds] = useState<string[]>([]);
  const [addSeniorId, setAddSeniorId] = useState('');
  const [addSeniorRelationship, setAddSeniorRelationship] = useState('caregiver');
  const [isAddingSenior, setIsAddingSenior] = useState(false);
  const [addSeniorError, setAddSeniorError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
//Senior data loading and polling logic
  useEffect(() => {
    if (loadMode !== 'admin' && !caregiverEmail) {
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
        const url = loadMode === 'admin'
          ? '/api/servicenow/admin-seniors'
          : `/api/servicenow/caregiver-seniors?${params.toString()}`;
        const response = await fetch(url, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || `Unable to load ${loadMode === 'admin' ? 'admin' : 'caregiver'} dashboard`);
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
          setSeniorError(error instanceof Error ? error.message : `Unable to load ${loadMode === 'admin' ? 'admin' : 'caregiver'} dashboard`);

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
  }, [caregiverEmail, caregiverId, loadMode, refreshKey]);

  useEffect(() => {
    if (loadMode !== 'admin') {
      setSosHistory(getStoredSosHistory(caregiverEmail));
      return;
    }

    const controller = new AbortController();
    let isMounted = true;
    let isRefreshing = false;

    async function loadSosHistory() {
      if (isRefreshing) {
        return;
      }

      isRefreshing = true;

      try {
        const response = await fetch('/api/servicenow/sos-alert-history?limit=50', {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to load SOS history');
        }

        if (isMounted) {
          setSosHistory((data?.history || []).filter((item: SosAlertHistory) => !isCheckInReminderAlert(item)));
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('SOS history load failed:', error);
        }
      } finally {
        isRefreshing = false;
      }
    }

    loadSosHistory();
    const refreshTimer = window.setInterval(loadSosHistory, CAREGIVER_DASHBOARD_REFRESH_MS);

    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        loadSosHistory();
      }
    };

    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      controller.abort();
    };
  }, [caregiverEmail, loadMode]);

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
        status: 'Resolved',
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
      const response = await fetch('/api/check-in-reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seniorUserId: senior.userId,
          seniorProfileId: senior.id,
          seniorName: senior.name,
          seniorPhone: senior.phone,
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

  const handleAddSenior = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!addSeniorId.trim()) {
      setAddSeniorError('Please enter the Senior ID.');
      return;
    }

    if (!caregiverId && !caregiverEmail) {
      setAddSeniorError('Please log in again before adding a senior.');
      return;
    }

    setIsAddingSenior(true);
    setAddSeniorError('');

    try {
      const response = await fetch('/api/servicenow/connect-senior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caregiverId,
          caregiverEmail,
          caregiverName,
          seniorId: addSeniorId.trim(),
          relationship: addSeniorRelationship,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to add senior.');
      }

      setShowAddSenior(false);
      setAddSeniorId('');
      setAddSeniorRelationship('caregiver');
      setRefreshKey((currentValue) => currentValue + 1);
    } catch (error) {
      console.error('Add senior failed:', error);
      setAddSeniorError(error instanceof Error ? error.message : 'Unable to add senior.');
    } finally {
      setIsAddingSenior(false);
    }
  };

  const handleDeleteSenior = async () => {
    if (!seniorPendingDelete) {
      return;
    }

    const deleteKey = loadMode === 'admin'
      ? seniorPendingDelete.id
      : seniorPendingDelete.connectionId;

    if (!deleteKey) {
      alert('This senior cannot be deleted because its ServiceNow ID is missing.');
      setSeniorPendingDelete(null);
      return;
    }

    const seniorName = seniorPendingDelete.name || 'Senior';
    setDeletingSeniorIds((ids) => [...ids, deleteKey]);

    try {
      const response = await fetch(loadMode === 'admin' ? '/api/servicenow/admin-senior' : '/api/servicenow/caregiver-senior', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loadMode === 'admin'
          ? JSON.stringify({
              seniorId: seniorPendingDelete.id,
            })
          : JSON.stringify({
              connectionId: seniorPendingDelete.connectionId,
              caregiverId,
              caregiverEmail,
            }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to delete senior.');
      }

      setSeniors((currentSeniors) =>
        currentSeniors.filter((senior) => {
          const currentDeleteKey = loadMode === 'admin' ? senior.id : senior.connectionId;
          return currentDeleteKey !== deleteKey;
        }),
      );
      setSeniorPendingDelete(null);
      alert(`${seniorName} has been deleted!`);
      setRefreshKey((currentValue) => currentValue + 1);
    } catch (error) {
      console.error('Delete senior failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to delete senior.');
    } finally {
      setDeletingSeniorIds((ids) => ids.filter((id) => id !== deleteKey));
    }
  };

  const alertCount = seniors.filter((senior) => isAlertStatus(senior.status, senior)).length;
  const canAddSenior = loadMode !== 'admin';
  const canDeleteSenior = true;
  const isAdminMode = loadMode === 'admin';
  const dashboardSurfaceClass = isAdminMode ? 'bg-[#eef3fb]' : 'bg-[#f4f6f8]';

  return (
    <div className={`h-full overflow-y-auto ${dashboardSurfaceClass} pb-24 text-[#101418]`}>
      <main className="px-5 py-5">
        {selectedSenior ? (
          <ResidentProfileDetails
            senior={selectedSenior}
            onBack={() => setSelectedSenior(null)}
            onSave={handleUpdateSeniorDetails}
          />
        ) : activeTab === 'dashboard' && (
          <CaregiverDashboardHome
            canAddSenior={canAddSenior}
            caregiverName={caregiverName}
            emptyMessage={emptyMessage}
            seniors={seniors}
            isLoading={isLoadingSeniors}
            error={seniorError}
            onOpenProfile={setSelectedSenior}
            onOpenAddSenior={() => {
              setAddSeniorError('');
              setShowAddSenior(true);
            }}
            onSendReminder={handleSendCheckInReminder}
            onRequestDeleteSenior={setSeniorPendingDelete}
            sendingReminderIds={sendingReminderIds}
            deletingSeniorIds={deletingSeniorIds}
            canDeleteSenior={canDeleteSenior}
            isAdminMode={isAdminMode}
          />
        )}
        {!selectedSenior && activeTab === 'alerts' && (
          <CaregiverAlerts
            alertsLabel={alertsLabel}
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
            isAdminMode={isAdminMode}
            onChangeLanguage={onChangeLanguage}
            onLogout={onLogout}
          />
        )}
      </main>

      {showAddSenior && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <form
            onSubmit={handleAddSenior}
            className="w-full max-w-[360px] rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f3e8] text-[#416642]">
                  <Plus className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black leading-7 text-[#151515]">Add a Senior</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSenior(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ee] text-[#416642] active:scale-95"
                aria-label="Close add senior"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-base font-bold text-[#111827]">Senior ID</span>
              <input
                value={addSeniorId}
                onChange={(event) => {
                  setAddSeniorId(event.target.value);
                  setAddSeniorError('');
                }}
                placeholder="Enter Senior ID"
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block text-base font-bold text-[#111827]">Relationship</span>
              <select
                value={addSeniorRelationship}
                onChange={(event) => setAddSeniorRelationship(event.target.value)}
                className="h-14 w-full rounded-2xl bg-[#f4f6f8] px-4 text-lg font-bold text-black outline-none focus:ring-2 focus:ring-[#416642]"
              >
                <option value="caregiver">Caregiver</option>
                <option value="children">Children</option>
                <option value="volunteer">Volunteer</option>
                <option value="NOK">Next-of-Kin</option>
              </select>
            </label>

            {addSeniorError && (
              <p className="mt-4 rounded-2xl bg-red-50 p-3 text-center text-sm font-bold text-red-700">
                {addSeniorError}
              </p>
            )}

            <button
              type="submit"
              disabled={isAddingSenior || !addSeniorId.trim()}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#416642] text-lg font-black text-white active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              <Plus className="h-5 w-5" />
              {isAddingSenior ? 'Adding...' : 'Add Senior'}
            </button>
          </form>
        </div>
      )}

      {seniorPendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[360px] rounded-[24px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
            <p className="text-xl font-black leading-7 text-[#151515]">
              Do you want to delete "{seniorPendingDelete.name || 'Senior'}"?
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDeleteSenior}
                disabled={deletingSeniorIds.includes(loadMode === 'admin' ? seniorPendingDelete.id : seniorPendingDelete.connectionId || '')}
                className="flex h-12 items-center justify-center rounded-[10px] bg-[#c8171d] text-base font-black text-white active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setSeniorPendingDelete(null)}
                disabled={deletingSeniorIds.includes(loadMode === 'admin' ? seniorPendingDelete.id : seniorPendingDelete.connectionId || '')}
                className="flex h-12 items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-base font-black text-[#30343a] active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className={`absolute bottom-0 left-0 right-0 z-20 flex min-h-24 items-center justify-around ${dashboardSurfaceClass} pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,0.04)]`}>
        <DashboardNavItem
          active={activeTab === 'dashboard'}
          icon={<LayoutDashboard className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label={dashboardLabel}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('dashboard');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'alerts'}
          icon={<TriangleAlert className="h-6 w-6" />}
          isAdminMode={isAdminMode}
          label={alertsLabel}
          hasAlert={alertCount > 0}
          onClick={() => {
            setSelectedSenior(null);
            setActiveTab('alerts');
          }}
        />
        <DashboardNavItem
          active={activeTab === 'profile'}
          icon={<User className="h-6 w-6" />}
          isAdminMode={isAdminMode}
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

function isCheckInReminderAlert(alert: Pick<SosAlertHistory, 'status' | 'message'> | Pick<Senior, 'status' | 'alertMessage'>) {
  const status = 'status' in alert ? String(alert.status || '') : '';
  const message = 'message' in alert
    ? String(alert.message || '')
    : String('alertMessage' in alert ? alert.alertMessage || '' : '');

  return /reminder/i.test(status) || /check[-\s]?in/i.test(message);
}

function isResolvedSosAlert(status = '') {
  return /resolved|closed|cancelled|canceled/i.test(status);
}

function isAlertStatus(status = '', senior?: Senior) {
  if (senior && isCheckInReminderAlert(senior)) {
    return false;
  }

  return /alert|sos|urgent|miss|no reply|attention/i.test(status);
}

function isSosTriggered(senior: Senior) {
  const statusText = [
    senior.status,
    senior.alertStatus,
    senior.alertMessage,
  ].join(' ');

  return /sos|urgent|emergency/i.test(statusText);
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

function parseServiceNowDate(value = '', options: { localServiceNowTime?: boolean } = {}) {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim().replace(' ', 'T');
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalizedValue);
  const date = new Date(
    hasTimezone
      ? normalizedValue
      : options.localServiceNowTime
        ? `${normalizedValue}+08:00`
        : `${normalizedValue}Z`,
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function hasCheckedInToday(value = '') {
  const date = parseServiceNowDate(value, { localServiceNowTime: true });

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

function formatAlertDate(value = '') {
  const date = parseServiceNowDate(value);

  if (!date) {
    return undefined;
  }

  return new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Singapore',
    year: 'numeric',
  }).format(date);
}

function formatDetailDateTime(value = '') {
  if (!value) {
    return 'Not provided';
  }

  const date = parseServiceNowDate(value, { localServiceNowTime: true });

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
  canAddSenior,
  caregiverName,
  emptyMessage,
  seniors,
  isLoading,
  error,
  onOpenProfile,
  onOpenAddSenior,
  onSendReminder,
  onRequestDeleteSenior,
  sendingReminderIds,
  deletingSeniorIds,
  canDeleteSenior,
  isAdminMode,
}: {
  canAddSenior: boolean;
  caregiverName: string;
  emptyMessage?: string;
  seniors: Senior[];
  isLoading: boolean;
  error: string;
  onOpenProfile: (senior: Senior) => void;
  onOpenAddSenior: () => void;
  onSendReminder: (senior: Senior) => void;
  onRequestDeleteSenior: (senior: Senior) => void;
  sendingReminderIds: string[];
  deletingSeniorIds: string[];
  canDeleteSenior: boolean;
  isAdminMode: boolean;
}) {
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status, senior) || !hasCheckedInToday(senior.lastCheckIn));
  const alertSenior = alertSeniors[0];
  const stableSeniors = seniors.filter((senior) => !isAlertStatus(senior.status, senior) && hasCheckedInToday(senior.lastCheckIn));
  const featuredSeniors = [...alertSeniors, ...stableSeniors];

  return (
    <div className="flex flex-col gap-6">
      <section className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold leading-9 text-black">Seniors</h2>
          <p className="mt-1 text-base font-bold text-[#71717a]">
            {seniors.length} Residents Active
          </p>
        </div>
        {canAddSenior && (
          <button
            type="button"
            onClick={onOpenAddSenior}
            className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#416642] px-5 text-lg font-black text-white shadow-sm active:scale-95"
          >
            <Plus className="h-6 w-6" />
            Add a Senior
          </button>
        )}
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
              tone={isAlertStatus(senior.status, senior) || !hasCheckedInToday(senior.lastCheckIn) ? 'alert' : 'good'}
              onOpenProfile={onOpenProfile}
              onSendReminder={onSendReminder}
              onRequestDeleteSenior={onRequestDeleteSenior}
              isSendingReminder={sendingReminderIds.includes(senior.userId || senior.id || senior.connectionId || senior.name)}
              isDeleting={deletingSeniorIds.includes(canDeleteSenior && !senior.connectionId ? senior.id : senior.connectionId || '')}
              canDelete={canDeleteSenior}
              isAdminMode={isAdminMode}
            />
          ))
        ) : (
          <div className="rounded-[18px] border border-[#d8dbe0] bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-[#30343a]">{emptyMessage || 'No seniors found for this caregiver account.'}</p>
            <p className="mt-2 text-sm font-semibold leading-5 text-[#71717a]">
              {emptyMessage ? 'Senior records will appear here after they are added in ServiceNow.' : `${caregiverName} is not linked to a resident profile yet.`}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}

// Placeholder component for senior card - can be expanded with more details and actions
function CaregiverAlerts({
  alertsLabel,
  seniors,
  sosHistory,
  resolvingAlertIds,
  onResolveAlert,
}: {
  alertsLabel: string;
  seniors: Senior[];
  sosHistory: SosAlertHistory[];
  resolvingAlertIds: string[];
  onResolveAlert: (senior: Senior) => void;
}) {
  const [historyView, setHistoryView] = useState<'pending' | 'resolved'>('pending');
  const alertSeniors = seniors.filter((senior) => isAlertStatus(senior.status, senior));
  const filteredSosHistory = sosHistory.filter((alert) => !isCheckInReminderAlert(alert));
  const activeAlertIds = new Set(alertSeniors.map((senior) => senior.alertId).filter(Boolean));
  const pendingSosHistory = filteredSosHistory.filter((alert) => !isResolvedSosAlert(alert.status) && !activeAlertIds.has(alert.id));
  const resolvedSosHistory = filteredSosHistory.filter((alert) => isResolvedSosAlert(alert.status));
  const isPendingView = historyView === 'pending';

  return (
    <div className="flex flex-col gap-7">
      <section className="flex items-center justify-between gap-4">
        <h2 className="text-[30px] font-bold leading-9 text-black">{alertsLabel}</h2>
        <p className="shrink-0 text-right text-base font-bold text-[#71717a]">
          {seniors.length} Total
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-[#1b1c1c]">SOS History</h2>
          <div className="grid h-11 grid-cols-2 rounded-full bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setHistoryView('pending')}
              className={`rounded-full px-4 text-sm font-black transition-colors ${
                isPendingView
                  ? 'bg-[#954a00] text-white'
                  : 'text-[#713700]'
              }`}
            >
              Pending
            </button>
            <button
              type="button"
              onClick={() => setHistoryView('resolved')}
              className={`rounded-full px-4 text-sm font-black transition-colors ${
                !isPendingView
                  ? 'bg-[#18833b] text-white'
                  : 'text-[#124f25]'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {isPendingView && (alertSeniors.length > 0 || pendingSosHistory.length > 0) ? (
          <>
            {alertSeniors.map((senior) => (
              <AlertCard
                key={senior.id}
                kind={/sos|urgent/i.test(senior.status || '') ? 'sos' : 'missed'}
                title={senior.name}
                label={senior.status || 'Needs Attention'}
                location={senior.location}
                message={senior.alertMessage}
                phone={senior.phone}
                time={formatAlertTime(senior.alertTime)}
                date={formatAlertDate(senior.alertTime)}
                icon={/sos|urgent/i.test(senior.status || '') ? <ShieldAlert className="h-8 w-8" /> : <Bell className="h-8 w-8" />}
                isResolving={senior.alertId ? resolvingAlertIds.includes(senior.alertId) : false}
                onResolve={() => onResolveAlert(senior)}
              />
            ))}
            {pendingSosHistory.map((alert) => (
              <AlertHistoryItem
                key={alert.id}
                name={alert.seniorName}
                time={formatAlertTime(alert.alertTime) || 'Pending'}
                date={formatAlertDate(alert.alertTime)}
                message={alert.message || alert.status || 'SOS alert pending'}
                location={alert.location}
                statusLabel={alert.status || 'Pending'}
                variant="pending"
              />
            ))}
          </>
        ) : isPendingView ? (
          <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            No pending SOS alerts.
          </p>
        ) : resolvedSosHistory.length > 0 ? (
          resolvedSosHistory.map((alert) => (
            <AlertHistoryItem
              key={alert.id}
              name={alert.seniorName}
              time={formatAlertTime(alert.alertTime) || formatAlertTime(alert.resolvedAt) || 'Resolved'}
              date={formatAlertDate(alert.alertTime) || formatAlertDate(alert.resolvedAt)}
              message={alert.message || `${alert.status} SOS alert`}
              location={alert.location}
              statusLabel={alert.status || 'Resolved'}
              variant="resolved"
            />
          ))
        ) : (
          <p className="rounded-[28px] bg-white p-5 text-base font-semibold text-[#414942] shadow-sm">
            No resolved SOS alerts yet.
          </p>
        )}
      </section>
    </div>
  );
}

function AlertCard({
  date,
  kind,
  title,
  label,
  location,
  message,
  phone,
  time,
  icon,
  isResolving,
  onResolve,
}: {
  date?: string;
  kind: 'sos' | 'missed';
  title: string;
  label: string;
  location?: string;
  message?: string;
  phone?: string;
  time?: string;
  icon: React.ReactNode;
  isResolving: boolean;
  onResolve: () => void;
}) {
  const isSos = kind === 'sos';
  const phoneHref = getPhoneHref(phone || '');

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
        {(time || date) && (
          <div className="flex flex-shrink-0 flex-col items-end gap-1 text-right">
            {time && <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold text-current">{time}</span>}
            {date && <span className="text-xs font-bold text-current opacity-80">{date}</span>}
          </div>
        )}
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
        <AlertActionButton
          href={phoneHref}
          icon={<Phone className="h-5 w-5" />}
          label="Call"
          variant={isSos ? 'light' : 'warning'}
        />
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
  href,
  icon,
  label,
  onClick,
  variant,
}: {
  disabled?: boolean;
  href?: string;
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
  const buttonClass = `flex h-14 items-center justify-center gap-2 rounded-full text-base font-bold shadow-sm transition-transform active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`;

  if (href && !disabled) {
    return (
      <a href={href} className={buttonClass}>
        {icon}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function AlertHistoryItem({
  date,
  location,
  name,
  statusLabel,
  time,
  message,
  variant = 'resolved',
}: {
  date?: string;
  location?: string;
  name: string;
  statusLabel?: string;
  time: string;
  message: string;
  variant?: 'pending' | 'resolved';
}) {
  const isPending = variant === 'pending';

  return (
    <div className={`flex items-start gap-4 rounded-[28px] p-4 shadow-sm min-[390px]:rounded-[32px] ${isPending ? 'bg-[#fff2e8]' : 'bg-[#e9f6ed]'}`}>
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white ${isPending ? 'bg-[#954a00]' : 'bg-[#18833b]'}`}>
        {isPending ? <TriangleAlert className="h-6 w-6" /> : <CheckCircle className="h-6 w-6" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className={`font-bold ${isPending ? 'text-[#713700]' : 'text-[#124f25]'}`}>{name}</p>
          <div className="flex flex-shrink-0 flex-col items-end gap-1 text-right">
            <span className={`text-sm font-semibold ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}>{time}</span>
            {date && <span className={`text-xs font-bold ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}>{date}</span>}
          </div>
        </div>
        {statusLabel && (
          <p className={`mt-1 text-xs font-bold uppercase ${isPending ? 'text-[#954a00]' : 'text-[#18833b]'}`}>
            {statusLabel}
          </p>
        )}
        <p className={`mt-1 text-sm leading-5 ${isPending ? 'text-[#301400]' : 'text-[#1d5031]'}`}>{message}</p>
        {location && <p className={`mt-1 text-sm font-semibold leading-5 ${isPending ? 'text-[#713700]' : 'text-[#2e6f42]'}`}>{location}</p>}
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
              Update Senior Profiles
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
  isAdminMode,
  onChangeLanguage,
  onLogout,
}: {
  caregiverName: string;
  caregiverEmail: string;
  isAdminMode: boolean;
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
    const backButtonClass = isAdminMode ? 'text-[#0b2f57] active:bg-[#dfeaf8]' : 'text-[#075fc7] active:bg-blue-50';
    const profileAccentTextClass = isAdminMode ? 'text-[#0b2f57]' : 'text-[#075fc7]';
    const profilePlaceholderClass = isAdminMode ? 'bg-[#e4eefb] text-[#0b2f57]' : 'bg-[#edf4ff] text-[#075fc7]';
    const profileActionClass = isAdminMode ? 'bg-[#0b2f57]' : 'bg-[#2875e0]';

    return (
      <div className="-mx-5 -my-6 min-h-full bg-gray-50 min-[390px]:-mx-6">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-gray-50 px-5 shadow-sm">
          <button
            type="button"
            onClick={() => setShowPersonalInfo(false)}
            className={`flex h-11 w-11 items-center justify-center rounded-full ${backButtonClass}`}
            aria-label="Back to profile"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        </div>

        <div className="p-5 min-[390px]:p-8">
          <div className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <h2 className={`mb-5 text-2xl font-bold ${profileAccentTextClass}`}>Profile Photo</h2>

            <div className="flex flex-col items-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="mb-4 h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className={`mb-4 flex h-32 w-32 items-center justify-center rounded-full ${profilePlaceholderClass}`}>
                  <User className="h-16 w-16" />
                </div>
              )}

              <label className={`cursor-pointer rounded-full px-6 py-3 text-lg font-semibold text-white shadow-sm active:scale-95 ${profileActionClass}`}>
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
            <h2 className={`mb-5 text-2xl font-bold ${profileAccentTextClass}`}>Basic Information</h2>

            <ProfileField label="Phone Number" value={phone} onChange={setPhone} type="tel" />
            <ProfileField label="Email" value={personalEmail} onChange={setPersonalEmail} type="email" />
            <ProfileField label="Address" value={address} onChange={setAddress} isLast />

            <button
              type="button"
              onClick={handleSavePersonalInfo}
              className={`mt-5 w-full rounded-2xl py-3 text-lg font-semibold text-white active:scale-95 ${profileActionClass}`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const profileHeaderClass = isAdminMode
    ? 'bg-[#0b2f57]'
    : 'bg-gradient-to-br from-[#4f8ff0] to-[#2875e0]';
  const profileAvatarClass = isAdminMode ? 'text-[#0b2f57]' : 'text-[#075fc7]';
  const profileEmailClass = isAdminMode ? 'text-blue-100' : 'text-blue-100';

  return (
    <div className="-mx-5 -my-6 min-h-full bg-gray-50 min-[390px]:-mx-6">
      <div className={`${profileHeaderClass} px-5 pb-5 pt-6 text-white min-[390px]:px-7 min-[390px]:pb-7 min-[390px]:pt-8`}>
        <div className="mb-4 flex items-center gap-4 min-[390px]:gap-5">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-16 w-16 rounded-full bg-white object-cover min-[390px]:h-20 min-[390px]:w-20"
            />
          ) : (
            <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-white ${profileAvatarClass} min-[390px]:h-20 min-[390px]:w-20`}>
              <User className="h-8 w-8 min-[390px]:h-10 min-[390px]:w-10" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold min-[390px]:text-3xl">{caregiverName}</h2>
            <p className={`mt-1 truncate text-sm ${profileEmailClass} min-[390px]:text-base`}>
              {caregiverEmail || 'Registered caregiver'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 min-[390px]:space-y-6 min-[390px]:p-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem
            icon={<User className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title="Personal Information"
            onClick={() => setShowPersonalInfo(true)}
          />
          <SettingsItem
            icon={<Languages className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title="Select Language"
            onClick={onChangeLanguage}
          />
          
        </div>

          <SettingsItem
            icon={<LogOut className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
            isAdminMode={isAdminMode}
            title="Log Out"
            textColor="text-red-500"
            onClick={onLogout}
          />
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
  isAdminMode = false,
  title,
  textColor = 'text-gray-900',
  onClick,
}: {
  icon: React.ReactNode;
  isAdminMode?: boolean;
  title: string;
  textColor?: string;
  onClick?: () => void;
}) {
  const isDestructive = textColor.includes('red');
  const hoverClass = isDestructive
    ? 'hover:bg-red-50'
    : isAdminMode
      ? 'hover:bg-[#e4eefb]'
      : 'hover:bg-green-50';
  const iconHoverClass = isDestructive
    ? 'group-hover:text-red-500'
    : isAdminMode
      ? 'group-hover:text-[#0b2f57]'
      : 'group-hover:text-green-700';
  const chevronHoverClass = isDestructive
    ? 'group-hover:text-red-400'
    : isAdminMode
      ? 'group-hover:text-[#0b2f57]'
      : 'group-hover:text-green-600';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 transition-colors last:border-b-0 active:bg-gray-50 min-[390px]:gap-6 min-[390px]:px-8 min-[390px]:py-6 ${hoverClass}`}
    >
      <div className={`text-gray-600 ${iconHoverClass}`}>{icon}</div>
      <span className={`flex-1 text-left text-xl font-bold min-[390px]:text-2xl ${textColor}`}>
        {title}
      </span>
      <ChevronRight className={`h-7 w-7 text-gray-400 min-[390px]:h-8 min-[390px]:w-8 ${chevronHoverClass}`} />
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
  isDeleting,
  canDelete,
  isAdminMode,
  onOpenProfile,
  onSendReminder,
  onRequestDeleteSenior,
}: {
  senior: Senior;
  name: string;
  location: string;
  tone: 'good' | 'alert';
  isSendingReminder: boolean;
  isDeleting: boolean;
  canDelete: boolean;
  isAdminMode: boolean;
  onOpenProfile: (senior: Senior) => void;
  onSendReminder: (senior: Senior) => void;
  onRequestDeleteSenior: (senior: Senior) => void;
}) {
  const isAlert = tone === 'alert';
  const isSosAlert = isSosTriggered(senior);
  const checkedInToday = hasCheckedInToday(senior.lastCheckIn);
  const phoneHref = getPhoneHref(senior.phone);
  const cardClass = isSosAlert
    ? 'border-4 border-[#c8171d] bg-[#fff1f1] shadow-[0_0_0_4px_rgba(200,23,29,0.12),0_14px_30px_rgba(200,23,29,0.16)]'
    : isAlert
      ? 'border-2 border-[#c8171d] bg-white'
    : isAdminMode
      ? 'border-[#bed0e8] bg-[#f8fbff]'
      : 'border-[#d0d3d8] bg-white';
  const avatarClass = isSosAlert
    ? 'bg-[#c8171d] text-white'
    : isAlert
      ? 'bg-[#14353d] text-white'
    : isAdminMode
      ? 'bg-[#dbe8f8] text-[#12365f]'
      : 'bg-[#dcecef] text-[#17353d]';
  const callActionClass = !phoneHref
    ? 'pointer-events-none border-[#c7cbd1] bg-[#f0f2f5] text-[#71717a]'
    : isAlert
      ? 'border-[#075fc7] bg-[#075fc7] text-white'
      : isAdminMode
        ? 'border-[#1f4f82] bg-white text-[#1f4f82]'
        : 'border-[#075fc7] bg-white text-[#075fc7]';
  const primaryActionClass = isAdminMode
    ? 'border-[#0b2f57] bg-[#0b2f57] text-white'
    : 'border-[#075fc7] bg-[#075fc7] text-white';
  const alertLabel = isSosAlert ? 'SOS triggered' : isAlert ? 'No check-in today' : 'Checked in today';
  const alertTextClass = isSosAlert
    ? 'rounded-full bg-[#c8171d] px-3 py-2 text-white'
    : isAlert
      ? 'text-[#c8171d]'
      : 'text-[#30343a]';

  return (
    <div className={`relative rounded-[18px] border p-5 shadow-sm ${cardClass}`}>
      {canDelete && (
        <button
          type="button"
          onClick={() => onRequestDeleteSenior(senior)}
          disabled={isDeleting}
          aria-label={`Delete ${name}`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#d7dbe0] bg-white text-[#c8171d] shadow-sm transition-colors hover:border-[#c8171d] hover:bg-[#fee2e2] hover:text-[#c8171d] active:scale-95 disabled:cursor-wait disabled:opacity-60 disabled:active:scale-100"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-start gap-4">
        <div className={`flex h-[86px] w-[86px] flex-shrink-0 items-center justify-center rounded-[14px] text-2xl font-bold ${canDelete ? 'mt-5' : ''} ${avatarClass}`}>
          {getInitials(name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start">
            <div className="min-w-0">
              <h3 className="whitespace-normal break-words text-[28px] font-bold leading-8 text-black">{name}</h3>
              <p className={`mt-3 inline-flex items-center gap-2 text-lg font-bold ${alertTextClass}`}>
                {isSosAlert ? (
                  <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                ) : isAlert ? (
                  <TriangleAlert className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#12c759]" />
                )}
                <span className="truncate">{alertLabel}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isSosAlert && (
        <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-[#f3a2a5] bg-white px-4 py-3 text-[#8f1015]">
          <ShieldAlert className="h-6 w-6 flex-shrink-0" />
          <p className="text-base font-black leading-5">
            Emergency SOS is active for this senior.
          </p>
        </div>
      )}

      {isSosAlert && !isAdminMode && (
        <div className="mt-4 rounded-[14px] border border-[#f3a2a5] bg-white px-4 py-3">
          <div className="mb-2 flex items-center gap-2 text-[#c8171d]">
            <MapPin className="h-6 w-6 flex-shrink-0" />
            <p className="text-base font-black">Current Location</p>
          </div>
          <p className="whitespace-normal break-words text-lg font-bold leading-7 text-black">
            {location || senior.address || 'Unknown'}
          </p>
        </div>
      )}

      {!isAdminMode && !isSosAlert && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <ResidentInfoTile
            icon={<Pill className="h-8 w-8" />}
            iconColor={isAlert ? 'text-[#c8171d]' : 'text-[#12b962]'}
            isAdminMode={isAdminMode}
            label="Medication"
            value={isAlert ? 'Missed' : 'Taken'}
          />
          <ResidentInfoTile
            icon={<MapPin className="h-8 w-8" />}
            iconColor={isAdminMode ? 'text-[#1f4f82]' : 'text-[#075fc7]'}
            isAdminMode={isAdminMode}
            label="Location"
            value={location || 'Unknown'}
          />
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <a
          href={phoneHref}
          aria-disabled={!phoneHref}
          className={`flex h-16 items-center justify-center gap-3 rounded-[10px] border text-xl font-bold uppercase transition-transform active:scale-[0.98] ${callActionClass}`}
        >
          <Phone className="h-6 w-6" />
          Call
        </a>
        <button
          type="button"
          disabled={isSendingReminder}
          onClick={() => onSendReminder(senior)}
          className={`flex h-16 items-center justify-center gap-3 rounded-[10px] border text-xl font-bold uppercase transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100 ${primaryActionClass}`}
        >
          <Bell className="h-6 w-6" />
          {isSendingReminder ? 'Sending' : 'Remind'}
        </button>
        <button
          type="button"
          onClick={() => onOpenProfile(senior)}
          className="col-span-2 flex h-16 items-center justify-center rounded-[10px] border border-[#c7cbd1] bg-white text-lg font-bold uppercase text-[#30343a] transition-transform active:scale-[0.98]"
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
  isAdminMode,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconColor: string;
  isAdminMode: boolean;
  label: string;
  value: string;
}) {
  return (
    <div className={`flex min-h-[76px] items-center gap-3 rounded-[12px] px-4 ${isAdminMode ? 'bg-[#e4eefb]' : 'bg-[#f0f2f5]'}`}>
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
  isAdminMode = false,
  label,
  onClick,
  active = false,
  hasAlert = false,
}: {
  icon: React.ReactNode;
  isAdminMode?: boolean;
  label: string;
  onClick?: () => void;
  active?: boolean;
  hasAlert?: boolean;
}) {
  const activeClass = isAdminMode
    ? 'bg-[#0b2f57] text-white shadow-sm'
    : 'bg-[#2875e0] text-white shadow-sm';
  const inactiveClass = isAdminMode
    ? 'text-[#3f4147] hover:bg-[#e4eefb] hover:text-[#0b2f57]'
    : 'text-[#3f4147] hover:bg-blue-50 hover:text-[#075fc7]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-w-[96px] flex-col items-center justify-center gap-1 rounded-[18px] px-4 py-3 transition-transform active:scale-95 ${
        active ? activeClass : inactiveClass
      }`}
    >
      {icon}
      <span className="text-sm font-bold">{label}</span>
      {hasAlert && <span className="absolute right-5 top-3 h-2.5 w-2.5 rounded-full bg-[#c8171d]" />}
    </button>
  );
}
