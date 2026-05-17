import {
  ArrowLeft,
  Bell,
  CheckCircle,
  ChevronDown,
  Circle,
  Phone,
  Search,
  Users
} from 'lucide-react';
import { useState } from 'react';

export default function CarePortalScreen({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [seniorError, setSeniorError] = useState('');
  const [relationshipError, setRelationshipError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasSeniorSearch = name.trim().length > 0 || phone.trim().length > 0;
    const hasRelationship = relationship.trim().length > 0;

    setSeniorError(hasSeniorSearch ? '' : 'Please enter either senior name or phone number.');
    setRelationshipError(hasRelationship ? '' : 'Please select your relationship.');

    if (!hasSeniorSearch || !hasRelationship) {
      return;
    }

    alert('Caregiver registration completed.');
  };

  return (
    <div className="h-full bg-[#fbf9f8] text-[#1b1c1c] overflow-y-auto">
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm flex items-center justify-between px-6 h-16">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center w-14 h-14 text-[#174b2c] active:scale-95 transition-transform"
          aria-label="Back"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="text-2xl font-bold text-[#174b2c]">Care Portal</h1>
        <button
          type="button"
          className="flex items-center justify-center w-14 h-14 text-[#414942] active:scale-95 transition-transform"
          aria-label="Notifications"
        >
          <Bell className="w-7 h-7" />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="px-6 pt-8 pb-12 flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <SectionTitle title="Find Your Senior" />
          <p className="text-lg leading-7 text-[#414942]">
            Search for the senior you want to connect with.
          </p>

          <Field
            icon={<Search className="w-7 h-7" />}
            label="Search by Name"
            placeholder="Search by name"
            value={name}
            onChange={(value) => {
              setName(value);
              if (value.trim() || phone.trim()) {
                setSeniorError('');
              }
            }}
          />

          <div className="flex items-center gap-4 py-1">
            <div className="flex-1 h-px bg-[#c1c9bf]" />
            <span className="text-base font-medium text-[#717971] italic">or</span>
            <div className="flex-1 h-px bg-[#c1c9bf]" />
          </div>

          <Field
            icon={<Phone className="w-7 h-7" />}
            label="Search by Phone Number"
            placeholder="Enter senior's phone number"
            type="tel"
            value={phone}
            onChange={(value) => {
              setPhone(value);
              if (name.trim() || value.trim()) {
                setSeniorError('');
              }
            }}
          />
          {seniorError && (
            <p className="text-base font-semibold text-[#ba1a1a] ml-2">{seniorError}</p>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle title="Your Relationship" />
          <label className="flex flex-col gap-2">
            <span className="text-base font-semibold text-[#1b1c1c] ml-2">Select Relationship</span>
            <div className="relative flex items-center bg-[#f5f3f3] rounded-2xl h-16 px-4 focus-within:ring-2 focus-within:ring-[#174b2c]">
              <Users className="w-7 h-7 text-[#717971] mr-3" />
              <select
                value={relationship}
                onChange={(event) => {
                  setRelationship(event.target.value);
                  if (event.target.value) {
                    setRelationshipError('');
                  }
                }}
                className={`appearance-none bg-transparent border-none outline-none w-full text-xl focus:ring-0 ${
                  relationship ? 'text-[#1b1c1c]' : 'text-[#9ca39c]'
                }`}
              >
                <option value="">Select relationship</option>
                <option>Next-of-Kin</option>
                <option>Family Member</option>
                <option>Caregiver</option>
                <option>Helper</option>
              </select>
              <ChevronDown className="w-7 h-7 text-[#717971] pointer-events-none" />
            </div>
            {relationshipError && (
              <span className="text-base font-semibold text-[#ba1a1a] ml-2">{relationshipError}</span>
            )}
          </label>
        </section>

        <section className="flex flex-col gap-4">
          <SectionTitle title="Confirmation" />
          <label className="bg-white p-6 rounded-2xl shadow-sm border border-[#c1c9bf]/50 flex gap-4 active:scale-[0.99] transition-transform cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
            />
            {confirmed ? (
              <CheckCircle className="w-8 h-8 text-[#174b2c] fill-[#174b2c] flex-shrink-0" />
            ) : (
              <Circle className="w-8 h-8 text-[#717971] flex-shrink-0" />
            )}
            <span className="text-base font-medium text-[#414942] leading-7">
              I confirm that I have the legal authority to register this senior and agree to
              CareConnect's <span className="text-[#174b2c] font-bold underline">Privacy Policy</span>
              {' '}and <span className="text-[#174b2c] font-bold underline">Terms of Service</span>.
            </span>
          </label>
        </section>

        <button
          type="submit"
          disabled={!confirmed}
          className="w-full h-16 bg-[#174b2c] text-white rounded-full text-xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-md disabled:bg-[#9ca39c] disabled:shadow-none disabled:active:scale-100"
        >
          Complete
        </button>
      </form>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-8 bg-[#fd8a2a] rounded-full" />
      <h2 className="text-2xl font-bold text-[#174b2c]">{title}</h2>
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
      <div className="relative flex items-center bg-[#f5f3f3] rounded-2xl h-16 px-4 focus-within:ring-2 focus-within:ring-[#174b2c]">
        <div className="text-[#717971] mr-3">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none w-full text-xl placeholder:text-[#9ca39c] focus:ring-0"
        />
      </div>
    </label>
  );
}
