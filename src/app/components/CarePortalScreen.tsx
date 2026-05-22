import {
  ArrowLeft,
  Bell,
  CheckCircle,
  ChevronDown,
  Circle,
  Clock,
  Handshake,
  Info,
  LayoutDashboard,
  MapPin,
  Phone,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  User,
  Users,
  TriangleAlert
} from 'lucide-react';
import { useState } from 'react';

export default function CarePortalScreen({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Next-of-Kin');
  const [confirmed, setConfirmed] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setRegistered(true);
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
          <SectionTitle title="Find Your Senior" />
          <p className="text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            Search for the senior you want to connect with.
          </p>

          <Field
            icon={<Search className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />}
            label="Search by Name"
            placeholder="Search by name"
            value={name}
            onChange={setName}
          />

          <div className="flex items-center gap-4 py-1">
            <div className="flex-1 h-px bg-[#c1c9bf]" />
            <span className="text-base font-medium text-[#717971] italic">or</span>
            <div className="flex-1 h-px bg-[#c1c9bf]" />
          </div>

          <Field
            icon={<Phone className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />}
            label="Search by Phone Number"
            placeholder="Enter senior's phone number"
            type="tel"
            value={phone}
            onChange={setPhone}
          />
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
                <option>Next-of-Kin</option>
                <option>Family Member</option>
                <option>Caregiver</option>
                <option>Helper</option>
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
          disabled={!confirmed}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#174b2c] text-lg font-bold text-white shadow-md transition-transform active:scale-95 min-[390px]:h-16 min-[390px]:text-xl"
        >
          Complete
        </button>
      </form>
    </div>
  );
}

function CaregiverDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'profile'>('dashboard');

  return (
    <div className="h-full overflow-y-auto bg-[#fbf9f8] pb-24 text-[#1b1c1c]">
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-4 min-[390px]:h-16 min-[390px]:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#174b2c] transition-transform active:scale-95 min-[390px]:h-12 min-[390px]:w-12"
              aria-label="Back"
            >
              <ArrowLeft className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
            </button>
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
        {activeTab === 'profile' && <CaregiverProfile />}
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

function CaregiverProfile() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="text-3xl font-bold leading-10 text-[#1b1c1c]">Profile</h1>
        <p className="mt-1 text-base leading-6 text-[#414942]">Caregiver account details</p>
      </section>
      <section className="rounded-[28px] border border-[#c1c9bf]/40 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e1ffe5] text-[#174b2c]">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1b1c1c]">Mei Ling</h2>
            <p className="text-base text-[#414942]">Registered caregiver</p>
          </div>
        </div>
      </section>
    </div>
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
        active ? 'bg-[#fd8a2a] text-[#632f00]' : 'text-[#414942]'
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
