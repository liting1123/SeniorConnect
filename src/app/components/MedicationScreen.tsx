import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, CheckCircle, Clock, Pill, Utensils } from 'lucide-react';

export const medicines = [
  {
    id: 'atorvastatin',
    name: 'Atorvastatin',
    dose: '20mg',
    scheduleKey: 'oneTabletDaily',
    instructionKey: 'afterDinner',
    time: '5:45 PM',
  },
  {
    id: 'metformin',
    name: 'Metformin',
    dose: '500mg',
    scheduleKey: 'oneTabletDaily',
    instructionKey: 'afterBreakfast',
    time: '8:00 AM',
  },
];

export type Medicine = (typeof medicines)[number];
const MEDICINE_REMINDER_EARLY_MINUTES = 5;

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
  takenMedicineIds,
  onMedicineTaken,
}: {
  takenMedicineIds: string[];
  onMedicineTaken: (medicineId: string) => void;
}) {
  const { t } = useTranslation();
  const [currentMinutes, setCurrentMinutes] = useState(() => getCurrentMinutes());
  const [activeReminderId, setActiveReminderId] = useState<string | null>(null);
  const [snoozedMedicineUntil, setSnoozedMedicineUntil] = useState<Record<string, number>>({});

  const activeReminder = useMemo(() => {
    return medicines.find((medicine) => medicine.id === activeReminderId) || null;
  }, [activeReminderId]);

  const markMedicineDone = (medicineId: string) => {
    onMedicineTaken(medicineId);
    setSnoozedMedicineUntil((current) => {
      const next = { ...current };
      delete next[medicineId];
      return next;
    });
    setActiveReminderId(null);
  };

  const snoozeMedicineReminder = (medicineId: string) => {
    setSnoozedMedicineUntil((current) => ({
      ...current,
      [medicineId]: getCurrentMinutes() + 5,
    }));
    setActiveReminderId(null);
  };

  useEffect(() => {
    const checkForDueMedicine = () => {
      if (activeReminderId) {
        return;
      }

      const currentMinutes = getCurrentMinutes();
      const dueMedicine = medicines.find((medicine) => {
        const medicineMinutes = getMinutesFromTimeLabel(medicine.time);
        const snoozedUntil = snoozedMedicineUntil[medicine.id] ?? 0;

        return (
          medicineMinutes !== null &&
          currentMinutes >= medicineMinutes - MEDICINE_REMINDER_EARLY_MINUTES &&
          currentMinutes >= snoozedUntil &&
          !takenMedicineIds.includes(medicine.id)
        );
      });

      if (dueMedicine) {
        setActiveReminderId(dueMedicine.id);
      }
    };

    checkForDueMedicine();
    const timer = window.setInterval(checkForDueMedicine, 30000);

    return () => window.clearInterval(timer);
  }, [activeReminderId, snoozedMedicineUntil, takenMedicineIds]);

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
            <p className="mt-2 text-lg text-gray-500">{t('takeOnTime')}</p>
          </div>

          <button
            aria-label={t('notificationsLabel')}
            className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#f04a24] shadow-sm active:scale-95"
          >
            <Bell className="h-7 w-7" />
          </button>
        </div>

        <section className="mt-6 flex items-center gap-3 rounded-[22px] bg-[#fff7ef] px-4 py-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe8dd]">
            <Clock className="h-6 w-6 text-[#f04a24]" />
          </div>
          <p className="text-xl font-bold leading-tight text-[#07122e]">
            {t('todaysMedicine')}
          </p>
        </section>

        <div className="mt-5 flex flex-col gap-4">
          {medicines.map((medicine) => (
            <MedicineCard
              currentMinutes={currentMinutes}
              key={medicine.id}
              isTaken={takenMedicineIds.includes(medicine.id)}
              medicine={medicine}
              onTaken={() => markMedicineDone(medicine.id)}
              t={t}
            />
          ))}
        </div>
      </main>

      {activeReminder && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full rounded-[28px] bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0e8] text-[#f04a24]">
              <Clock className="h-9 w-9" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-[#07122e]">
              {t('medicineReminderPopup')}
            </h2>
            <p className="mt-3 text-xl leading-7 text-gray-600">
              {t('timeToTakeMedicine', { name: activeReminder.name, dose: activeReminder.dose })}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => markMedicineDone(activeReminder.id)}
                className="flex h-14 items-center justify-center rounded-full bg-[#18833b] text-xl font-bold text-white active:scale-95"
              >
                {t('done')}
              </button>
              <button
                onClick={() => snoozeMedicineReminder(activeReminder.id)}
                className="flex h-14 items-center justify-center rounded-full border-2 border-[#f04a24] bg-white text-xl font-bold text-[#f04a24] active:scale-95"
              >
                {t('remindLater')}
              </button>
            </div>
          </div>
        </div>
      )}
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
    scheduleKey: string;
    instructionKey: string;
    time: string;
  };
  onTaken: () => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}) {
  const medicineMinutes = getMinutesFromTimeLabel(medicine.time);
  const status =
    isTaken ? 'Taken' : medicineMinutes !== null && currentMinutes > medicineMinutes ? 'Missed' : 'Not yet';
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

          <p className="mt-2 text-lg text-gray-500">{t(medicine.scheduleKey)}</p>

          <div className="my-3 border-t border-gray-200" />

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0e8]">
              <Utensils className="h-5 w-5 text-[#f04a24]" />
            </div>
            <p className="text-lg font-semibold text-[#07122e]">
              {t(medicine.instructionKey)}
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
