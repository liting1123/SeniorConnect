import {
  ArrowLeft,
  Bell,
  CheckCircle,
  ChevronDown,
  Circle,
  Phone,
  Search,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStoredUser } from '../services/backend';

type Senior = {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship?: string;
  status?: string;
};

export default function CarePortalScreen({
  onBack,
  onRegistered,
}: {
  onBack: () => void;
  onRegistered: () => void;
}) {
  const currentUser = getStoredUser();
  const caregiverEmail = currentUser?.email || '';
  const [searchName, setSearchName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [relationship, setRelationship] = useState('Next-of-Kin');
  const [confirmed, setConfirmed] = useState(false);
  const [searchResults, setSearchResults] = useState<Senior[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const hasSearch = Boolean(searchName.trim() || phone.trim());

  useEffect(() => {
    if (!caregiverEmail || !hasSearch) {
      setSearchResults([]);
      setSearchError('');
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError('');

      try {
        const params = new URLSearchParams({
          caregiverEmail,
          searchName: searchName.trim(),
          phone: phone.trim(),
        });
        const response = await fetch(`/api/servicenow/caregiver-seniors?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || 'Unable to search seniors');
        }

        setSearchResults(data?.seniors || []);
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }

        console.error('Senior search failed:', error);
        setSearchError(error instanceof Error ? error.message : 'Unable to search seniors');
        setSearchResults([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [caregiverEmail, hasSearch, phone, searchName]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedSenior || !currentUser || isRegistering) {
      return;
    }

    setRegisterError('');
    setIsRegistering(true);

    try {
      const response = await fetch('/api/servicenow/connect-senior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caregiverName: currentUser.displayName,
          caregiverEmail,
          seniorName: selectedSenior.name,
          seniorPhone: selectedSenior.phone,
          seniorEmail: selectedSenior.email,
          relationship,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to register this senior');
      }

      onRegistered();
    } catch (error) {
      console.error('Senior registration failed:', error);
      setRegisterError(error instanceof Error ? error.message : 'Unable to register this senior');
    } finally {
      setIsRegistering(false);
    }
  };

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
            value={searchName}
            onChange={(value) => {
              setSearchName(value);
              setSelectedSenior(null);
            }}
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
            onChange={(value) => {
              setPhone(value);
              setSelectedSenior(null);
            }}
          />

          {hasSearch && (
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
              {isSearching ? (
                <p className="p-4 text-base text-[#717971]">Searching ServiceNow...</p>
              ) : searchError ? (
                <p className="p-4 text-base font-semibold text-red-700">{searchError}</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((senior) => (
                  <button
                    key={senior.id}
                    type="button"
                    onClick={() => {
                      setSelectedSenior(senior);
                      setSearchName(senior.name);
                      setPhone(senior.phone);
                      setRelationship(senior.relationship || relationship);
                    }}
                    className="flex w-full flex-col border-b border-gray-100 p-4 text-left transition-colors last:border-b-0 active:bg-gray-100"
                  >
                    <span className="text-lg font-bold text-[#1b1c1c]">{senior.name}</span>
                    <span className="text-base text-[#717971]">{senior.phone}</span>
                    {senior.email && <span className="text-sm text-[#717971]">{senior.email}</span>}
                  </button>
                ))
              ) : (
                <p className="p-4 text-base text-[#717971]">No senior found for {caregiverEmail}</p>
              )}
            </div>
          )}

          {selectedSenior && (
            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-lg font-bold text-[#174b2c]">Connected Senior</p>
              <p className="mt-2 text-lg font-semibold text-[#1b1c1c]">{selectedSenior.name}</p>
              <p className="text-base text-[#414942]">{selectedSenior.phone}</p>
              <p className="text-base text-[#414942]">{selectedSenior.email}</p>
            </div>
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
          disabled={!confirmed || !selectedSenior || isRegistering}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#174b2c] text-lg font-bold text-white shadow-md transition-transform active:scale-95 disabled:bg-gray-300 disabled:text-gray-600 disabled:active:scale-100 min-[390px]:h-16 min-[390px]:text-xl"
        >
          {isRegistering ? 'Registering...' : 'Complete'}
        </button>
        {registerError && <p className="text-center text-base font-bold text-red-700">{registerError}</p>}
      </form>
    </div>
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
