import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Camera, CheckCircle, ChevronLeft, Clock, Pill, Trash2, X } from 'lucide-react';
import {
  getStoredUser,
  getUserStorageIdentity,
  type Medicine,
  type MedicineInput,
} from '../services/backend';

const MEDICINE_PHOTO_STORAGE_PREFIX = 'careconnect.medicinePhotos';
const MEDICINE_PHOTO_MAX_SIZE = 640;
const MEDICINE_PHOTO_QUALITY = 0.72;
const MEDICINE_PHOTO_MAX_DATA_URL_LENGTH = 450000;

function getMedicinePhotoStorageKey() {
  const user = getStoredUser();
  const userKey = user ? getUserStorageIdentity(user) : 'guest';

  return `${MEDICINE_PHOTO_STORAGE_PREFIX}.${userKey}`;
}

function getStoredMedicinePhotos() {
  const rawPhotos = localStorage.getItem(getMedicinePhotoStorageKey());

  if (!rawPhotos) {
    return {};
  }

  try {
    const parsedPhotos = JSON.parse(rawPhotos);
    if (!parsedPhotos || typeof parsedPhotos !== 'object' || Array.isArray(parsedPhotos)) {
      return {};
    }

    const safePhotos = Object.fromEntries(
      Object.entries(parsedPhotos as Record<string, string>).filter(([, photo]) => (
        typeof photo === 'string' &&
        photo.startsWith('data:image/') &&
        photo.length <= MEDICINE_PHOTO_MAX_DATA_URL_LENGTH
      )),
    );

    if (Object.keys(safePhotos).length !== Object.keys(parsedPhotos).length) {
      saveStoredMedicinePhotos(safePhotos);
    }

    return safePhotos;
  } catch {
    localStorage.removeItem(getMedicinePhotoStorageKey());
    return {};
  }
}

function saveStoredMedicinePhotos(photos: Record<string, string>) {
  try {
    localStorage.setItem(getMedicinePhotoStorageKey(), JSON.stringify(photos));
    return true;
  } catch (error) {
    console.error('Unable to save medicine photo:', error);
    return false;
  }
}

function resizeMedicinePhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    const imageUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(imageUrl);

      const scale = Math.min(
        1,
        MEDICINE_PHOTO_MAX_SIZE / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height),
      );
      const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
      const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');

      if (!context) {
        reject(new Error('Unable to prepare photo.'));
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', MEDICINE_PHOTO_QUALITY));
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error('Unable to read selected photo.'));
    };

    image.src = imageUrl;
  });
}

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
  highContrast = false,
  medicines = [],
  takenMedicineIds,
  onMedicineTaken,
  onSaveMedicine,
  onDeleteMedicine,
}: {
  highContrast?: boolean;
  medicines?: Medicine[];
  takenMedicineIds: string[];
  onMedicineTaken: (medicineId: string) => void;
  onSaveMedicine: (medicine: MedicineInput) => Promise<void>;
  onDeleteMedicine: (medicineId: string) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [currentMinutes, setCurrentMinutes] = useState(() => getCurrentMinutes());
  const [medicinePhotos, setMedicinePhotos] = useState<Record<string, string>>(() => getStoredMedicinePhotos());
  const [pendingPhotoRemovalId, setPendingPhotoRemovalId] = useState<string | null>(null);
  const activeMedicineCount = medicines.length;
  const sortedMedicines = [...medicines].sort((firstMedicine, secondMedicine) => {
    const firstMinutes = getMinutesFromTimeLabel(firstMedicine.time);
    const secondMinutes = getMinutesFromTimeLabel(secondMedicine.time);

    return (firstMinutes ?? Number.MAX_SAFE_INTEGER) - (secondMinutes ?? Number.MAX_SAFE_INTEGER);
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentMinutes(getCurrentMinutes());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  const updateMedicinePhoto = (medicineId: string, photo: string) => {
    setMedicinePhotos((currentPhotos) => {
      const nextPhotos = {
        ...currentPhotos,
        [medicineId]: photo,
      };

      return saveStoredMedicinePhotos(nextPhotos) ? nextPhotos : currentPhotos;
    });
  };

  const removeMedicinePhoto = (medicineId: string) => {
    setMedicinePhotos((currentPhotos) => {
      const nextPhotos = { ...currentPhotos };
      delete nextPhotos[medicineId];
      return saveStoredMedicinePhotos(nextPhotos) ? nextPhotos : currentPhotos;
    });
    setPendingPhotoRemovalId(null);
  };

  return (
    <div className={`relative h-full overflow-y-auto ${highContrast ? 'bg-black text-white' : 'bg-[#f7f8fb]'}`}>
      <main className="px-4 pb-8 pt-5">
        <header className="flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label={t('backToMenu')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#2f62bf] active:bg-blue-50"
          >
          </button>
          <h1 className="text-center text-2xl font-black text-[#171b25]">
            {t('medicineReminder')}
          </h1>
          <button
            aria-label={t('notificationsLabel')}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#d84232] shadow-sm active:scale-95"
          >
            <Bell className="h-6 w-6" />
          </button>
        </header>

        <section className="mt-7">
          <h2 className="text-sm font-black uppercase tracking-wide text-[#5f6872]">
            Today's Medications
          </h2>

          <div className="mt-3 flex flex-col gap-4">
            {medicines.length > 0 ? (
              sortedMedicines.map((medicine) => (
                <MedicineCard
                  currentMinutes={currentMinutes}
                  key={medicine.id}
                  isTaken={takenMedicineIds.includes(medicine.id)}
                  medicine={medicine}
                  medicinePhoto={medicinePhotos[medicine.id] || ''}
                  onPhotoChange={(photo) => updateMedicinePhoto(medicine.id, photo)}
                  onPhotoRemove={() => setPendingPhotoRemovalId(medicine.id)}
                  onTaken={() => onMedicineTaken(medicine.id)}
                  highContrast={highContrast}
                  t={t}
                />
              ))
            ) : (
              <div className="rounded-[16px] bg-white p-5 text-center shadow-sm">
                <p className="text-xl font-bold text-[#07122e]">{t('noMedicineAdded')}</p>
                <p className="mt-2 text-base text-gray-500">{t('yourMedicineRemindersAppearHere')}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      {pendingPhotoRemovalId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[320px] rounded-[24px] bg-white p-5 text-center shadow-2xl">
            <h2 className="text-2xl font-black leading-8 text-[#07122e]">{t('removePhoto')}</h2>
            <p className="mt-3 text-lg font-bold leading-6 text-[#475569]">
              {t('removeMedicinePhotoConfirm')}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPendingPhotoRemovalId(null)}
                className="flex h-13 flex-1 items-center justify-center rounded-full border-2 border-[#416642] bg-white text-lg font-black text-[#416642] active:scale-95"
              >
                {t('no')}
              </button>
              <button
                type="button"
                onClick={() => removeMedicinePhoto(pendingPhotoRemovalId)}
                className="flex h-13 flex-1 items-center justify-center rounded-full bg-[#c62828] text-lg font-black text-white active:scale-95"
              >
                {t('yes')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MedicineCard({
  currentMinutes,
  isTaken,
  medicine,
  medicinePhoto,
  onPhotoChange,
  onPhotoRemove,
  onTaken,
  highContrast,
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
  medicinePhoto: string;
  onPhotoChange: (photo: string) => void;
  onPhotoRemove: () => void;
  onTaken: () => void;
  highContrast: boolean;
  t: (key: string, options?: Record<string, string | number>) => string;
}) {
  const medicineMinutes = getMinutesFromTimeLabel(medicine.time);
  const isLate = medicineMinutes !== null && currentMinutes > medicineMinutes;
  const status = isTaken ? 'Taken' : isLate ? 'Not taken' : 'Not taken';
  const purposeLabel = medicine.notes || medicine.name || t('medicineReminder');
  const medicineNameLabel = medicine.name || t('currentMedication');
  const takeLabel = medicine.dose || 'Take 1 tablet';
  const statusStyle = isTaken
    ? {
        badge: highContrast ? 'border border-white bg-black text-white' : 'bg-[#edf8e9] text-[#3d9b46]',
        icon: highContrast ? 'border border-white bg-black text-[#ffe452]' : 'bg-[#eaf7ef] text-[#3d9b46]',
        pill: 'bg-[#4fba43]',
      }
    : {
        badge: highContrast ? 'border border-white bg-black text-white' : 'bg-[#fff1ea] text-[#e25935]',
        icon: highContrast ? 'border border-white bg-black text-[#ffe452]' : 'bg-[#eef7e8] text-[#5aaa3d]',
        pill: 'bg-[#5aaa3d]',
      };

  const handlePhotoSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const imageDataUrl = await resizeMedicinePhoto(file);
      onPhotoChange(imageDataUrl);
    } catch (error) {
      console.error('Unable to process medicine photo:', error);
      alert(error instanceof Error ? error.message : 'Unable to save medicine photo.');
    }
  };

  return (
    <section className={`rounded-[16px] p-4 shadow-[0_6px_18px_rgba(15,23,42,0.08)] ${highContrast ? 'border border-white bg-black' : 'bg-white'}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className={`rounded-full px-5 py-2 text-base font-black ${highContrast ? 'border border-white bg-black text-white' : 'bg-[#fff1ed] text-[#d84232]'}`}>
          {medicine.time || '--'}
        </div>
        {medicine.frequency ? (
          <div className={`rounded-full px-4 py-2 text-sm font-black ${highContrast ? 'border border-white bg-black text-white' : 'bg-[#eef6ff] text-[#2f62bf]'}`}>
            {medicine.frequency}
          </div>
        ) : null}
      </div>

      <div className="flex gap-4">
        <div className="flex w-20 shrink-0 flex-col items-center gap-2">
          <label
            className={`relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full ${statusStyle.icon} active:scale-95`}
            title={medicinePhoto ? t('retakePhoto') : t('takePhoto')}
          >
            {medicinePhoto ? (
              <img
                alt={t('medicinePhoto')}
                className="h-full w-full object-cover"
                src={medicinePhoto}
              />
            ) : (
              <div className={`flex h-12 w-10 rotate-45 items-center justify-center rounded-full ${statusStyle.pill} text-white`}>
                <Pill className="h-7 w-7 -rotate-45" />
              </div>
            )}
            <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#2f62bf] text-white shadow-sm">
              <Camera className="h-4 w-4" />
            </span>
            <span className="sr-only">{medicinePhoto ? t('retakePhoto') : t('takePhoto')}</span>
            <input
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoSelected}
              type="file"
            />
          </label>
          {medicinePhoto ? (
            <button
              type="button"
              onClick={onPhotoRemove}
              className="text-xs font-black text-[#c62828] active:scale-95"
            >
              {t('removePhoto')}
            </button>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-black leading-6 text-[#111827]">
                {purposeLabel}
              </h2>
            </div>
          </div>

          <p className="mt-2 text-sm font-bold text-[#2f62bf]">
            Medicine: <span className="font-semibold text-[#334155]">{medicineNameLabel}</span>
          </p>

          <div className="mt-4 flex items-center gap-3 text-[#475569]">
            <Pill className="h-4 w-4" />
            <p className="text-base font-bold">{takeLabel}</p>
          </div>

          <div className="mt-4 flex items-end justify-end gap-3">
            <button
              type="button"
              onClick={onTaken}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black active:scale-95 ${statusStyle.badge}`}
            >
              {isTaken ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
              {isTaken ? t('taken') : 'Not taken'}
            </button>
          </div>
        </div>
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
