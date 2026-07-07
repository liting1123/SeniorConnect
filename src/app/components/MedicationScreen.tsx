import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, CheckCircle, Clock, Pill, Trash2, Utensils, X } from 'lucide-react';
import type { Medicine, MedicineInput } from '../services/backend';

export function getMinutesFromTimeLabel(timeLabel: string) {
  const match = timeLabel.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);

  if (!match) {
    return null;
  }

  const [, rawHour, rawMinute, period] = match;
  let hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  }

  if (period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minute;
}

export function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export default function MedicationScreen({
  medicines = [],
  takenMedicineIds,
  onMedicineTaken,
  onSaveMedicine,
  onDeleteMedicine,
}: {
  medicines?: Medicine[];
  takenMedicineIds: string[];
  onMedicineTaken: (medicineId: string) => void;
  onSaveMedicine: (medicine: MedicineInput) => Promise<void>;
  onDeleteMedicine: (medicineId: string) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [currentMinutes, setCurrentMinutes] = useState(() => getCurrentMinutes());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentMinutes(getCurrentMinutes());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full overflow-y-auto bg-[#f7f7f7]">
      <main className="px-5 pb-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold leading-tight text-[#07122e]">
              {t('medicineReminder')}
            </h1>
          </div>

          <button
            aria-label={t('notificationsLabel')}
            className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#f04a24] shadow-sm active:scale-95"
          >
            <Bell className="h-7 w-7" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <MedicineCard
                currentMinutes={currentMinutes}
                key={medicine.id}
                isTaken={takenMedicineIds.includes(medicine.id)}
                medicine={medicine}
                onTaken={() => onMedicineTaken(medicine.id)}
                t={t}
              />
            ))
          ) : (
            <div className="rounded-[24px] bg-white p-5 text-center shadow-[0_8px_20px_rgba(7,18,46,0.08)]">
              <p className="text-xl font-bold text-[#07122e]">{t('noMedicineAdded')}</p>
              <p className="mt-2 text-base text-gray-500">{t('yourMedicineRemindersAppearHere')}</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

function MedicineCard({
  currentMinutes,
  isTaken,
  medicine,
  onTaken,
  t,
}: {
  currentMinutes: number;
  isTaken: boolean;
  medicine: {
    id: string;
    name: string;
    dose: string;
    time: string;
    frequency?: string;
    notes?: string;
    isExtra?: boolean;
  };
  onTaken: () => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}) {
  const medicineMinutes = getMinutesFromTimeLabel(medicine.time);
  const status =
    isTaken ? 'Taken' : medicineMinutes !== null && currentMinutes > medicineMinutes ? 'Missed' : 'Not yet';
  const scheduleLabel = medicine.frequency ? t(medicine.frequency) : t('oneTabletDaily');
  const instructionLabel = medicine.notes ? t(medicine.notes) : '';
  const statusLabel = {
    Taken: t('taken'),
    'Not yet': t('notYet'),
    Missed: t('missed'),
  }[status];
  const statusStyle = {
    Taken: {
      badge: 'bg-[#e9f6ed] text-[#18833b]',
      row: 'bg-[#e9f6ed]',
      text: 'text-[#18833b]',
      button: 'bg-[#18833b]',
    },
    'Not yet': {
      badge: 'bg-[#fff5ef] text-[#f04a24]',
      row: 'bg-[#fff5ef]',
      text: 'text-[#f04a24]',
      button: 'bg-[#f04a24]',
    },
    Missed: {
      badge: 'bg-[#fdeaea] text-[#c62828]',
      row: 'bg-[#fdeaea]',
      text: 'text-[#c62828]',
      button: 'bg-[#c62828]',
    },
  }[status];

  return (
    <section className="rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(7,18,46,0.08)]">
      <div className="mb-3 flex justify-end">
        <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${statusStyle.badge}`}>
          <CheckCircle className="h-4 w-4" />
          {statusLabel}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#fff4ec]">
          <div className="relative">
            <div className="flex h-16 w-14 items-center justify-center rounded-xl bg-[#f04a24]">
              <Pill className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -right-2 bottom-0 h-8 w-8 rounded-full bg-white shadow" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-tight text-[#07122e]">
            {medicine.name}
          </h2>
          <p className="text-2xl font-bold leading-tight text-[#07122e]">
            {medicine.dose}
          </p>

          <p className="mt-2 text-lg text-gray-500">{scheduleLabel}</p>

          <div className="my-3 border-t border-gray-200" />

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0e8]">
              <Utensils className="h-5 w-5 text-[#f04a24]" />
            </div>
            <p className="text-lg font-semibold text-[#07122e]">
              {instructionLabel}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-colors ${
          statusStyle.row
        }`}
      >
        <div className={`flex items-center gap-2 ${statusStyle.text}`}>
          <Clock className="h-7 w-7" />
          <p className="text-3xl font-bold">{medicine.time}</p>
        </div>
        <button
          onClick={onTaken}
          className={`rounded-full px-4 py-2 text-base font-bold text-white transition-colors active:scale-95 ${statusStyle.button}`}
        >
          {isTaken ? t('done') : t('taken')}
        </button>
      </div>
    </section>
  );
}

function MedicineForm({
  medicine,
  onClose,
  onSave,
  onDelete,
}: {
  medicine: Medicine | null;
  onClose: () => void;
  onSave: (medicine: MedicineInput) => Promise<void>;
  onDelete: (medicineId: string) => Promise<void>;
}) {
  const { t } = useTranslation();
  const isFixedMedicine = Boolean(medicine && !medicine.isExtra);
  const [name, setName] = useState(medicine?.name || '');
  const [dose, setDose] = useState(medicine?.dose || '');
  const [frequency, setFrequency] = useState(medicine?.frequency || '');
  const [notes, setNotes] = useState(medicine?.notes || '');
  const [time, setTime] = useState(medicine?.time || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      alert(t('medicineNameRequired'));
      return;
    }

    setIsSaving(true);

    try {
      await onSave({
        id: medicine?.id,
        name: name.trim(),
        dose: dose.trim(),
        frequency: frequency.trim(),
        notes: notes.trim(),
        time: time.trim(),
        status: medicine?.status || '',
        isExtra: medicine?.isExtra ?? true,
      });
    } catch (error) {
      console.error('Unable to save medicine:', error);
      alert(error instanceof Error ? error.message : t('unableSaveMedicine'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!medicine?.id || !medicine.isExtra) {
      return;
    }

    const confirmed = window.confirm(t('removeExtraMedicine'));

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await onDelete(medicine.id);
    } catch (error) {
      console.error('Unable to remove medicine:', error);
      alert(error instanceof Error ? error.message : t('unableRemoveMedicine'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-black/40">
      <form onSubmit={handleSubmit} className="max-h-[88%] w-full overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-[#07122e]">
            {medicine ? (isFixedMedicine ? t('fixedMedicine') : t('addExtraMedicine')) : t('addExtraMedicine')}
          </h2>
          <button
            aria-label={t('close')}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3f4f6] text-[#07122e] active:scale-95"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <MedicineInput
            label={t('medicineName')}
            value={name}
            onChange={setName}
            placeholder="Metformin"
          />
          <MedicineInput disabled={isFixedMedicine} label={t('dose')} value={dose} onChange={setDose} placeholder="500mg" />
          <MedicineInput disabled={isFixedMedicine} label={t('time')} value={time} onChange={setTime} placeholder="8:00 AM" />
          <MedicineInput disabled={isFixedMedicine} label="Frequency" value={frequency} onChange={setFrequency} placeholder="1 tablet - Daily" />
          <MedicineInput disabled={isFixedMedicine} label="Notes" value={notes} onChange={setNotes} placeholder={t('afterBreakfast')} />
        </div>

        <button
          disabled={isSaving || isDeleting}
          className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-[#18833b] text-xl font-bold text-white active:scale-95 disabled:opacity-60"
        >
          {isSaving ? t('saving') : t('save')}
        </button>

        {medicine?.isExtra && (
          <button
            disabled={isSaving || isDeleting}
            type="button"
            onClick={handleDelete}
            className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-[#c62828] bg-white text-xl font-bold text-[#c62828] active:scale-95 disabled:opacity-60"
          >
            <Trash2 className="h-5 w-5" />
            {isDeleting ? t('removing') : t('remove')}
          </button>
        )}
      </form>
    </div>
  );
}

function MedicineInput({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-base font-bold text-[#07122e]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-13 rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg font-semibold text-[#07122e] outline-none focus:border-[#f04a24] disabled:bg-gray-100 disabled:text-gray-500"
      />
    </label>
  );
}
