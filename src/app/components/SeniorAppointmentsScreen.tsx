import { Calendar, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CaregiverAppointment } from '../services/serviceNow';
import AppointmentDirections from './AppointmentDirections';

type SeniorAppointmentsScreenProps = {
  appointments: CaregiverAppointment[];
  isLoading: boolean;
};

function formatDate(date: string) {
  if (!date) return null;
  const dateObj = new Date(`${date}T00:00:00`);
  if (Number.isNaN(dateObj.getTime())) return date.trim() || null;
  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeZone: 'Asia/Singapore',
  }).format(dateObj);
}

function formatTime12h(time: string) {
  if (!time) return null;
  const timeMatch = /^(\d{2}):(\d{2})/.exec(time);
  if (!timeMatch) return time;
  const hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2];
  if (hours === 0) return `12:${minutes} AM`;
  if (hours < 12) return `${hours}:${minutes} AM`;
  if (hours === 12) return `12:${minutes} PM`;
  return `${hours - 12}:${minutes} PM`;
}

function getSafeSeniorName(name: string, fallback: string) {
  const normalized = String(name || '').trim();
  if (!normalized || /^[a-f0-9]{32}$/i.test(normalized)) return fallback;
  return normalized;
}

function translateStatus(status: string, t: (key: string) => string) {
  const s = status.toLowerCase();
  if (s === 'completed') return t('statusCompleted');
  if (s === 'cancelled' || s === 'canceled') return t('statusCancelled');
  return t('statusScheduled');
}

export default function SeniorAppointmentsScreen({ appointments, isLoading }: SeniorAppointmentsScreenProps) {
  const { t } = useTranslation();

  // Only show scheduled appointments to the elderly user
  const scheduledAppointments = appointments.filter((a) => a.status !== 'completed' && a.status !== 'cancelled');

  return (
    <div className="h-full overflow-y-auto bg-white px-5 pb-28 pt-5 min-[390px]:px-6">
      <div className="rounded-[24px] bg-[#f4f6f8] p-5">
        <p className="text-sm font-black uppercase tracking-wide text-[#71717a]">{t('healthBuddy')}</p>
        <h1 className="mt-1 text-[30px] font-bold leading-9 text-black">{t('healthBuddy')}</h1>
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <div className="rounded-[20px] bg-[#f4f6f8] p-5 text-center text-base font-bold text-[#5f6368]">
            {t('loading')}
          </div>
        ) : scheduledAppointments.length === 0 ? (
          <div className="rounded-[20px] bg-[#f4f6f8] p-5 text-center text-base font-bold text-[#5f6368]">
            {t('noAppointmentsYet')}
          </div>
        ) : (
          scheduledAppointments.map((appointment) => {
            const formattedDate = formatDate(appointment.date);
            const formattedTime = formatTime12h(appointment.time);
            const dateTimeDisplay = formattedDate
              ? formattedTime
                ? t('appointmentAtTime', { date: formattedDate, time: formattedTime })
                : formattedDate
              : t('notScheduled');

            return (
              <div key={appointment.id} className="rounded-[20px] border border-[#e4e8ec] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#416642]">
                  <Calendar className="h-5 w-5" />
                  <p className="text-base font-black">{dateTimeDisplay}</p>
                </div>
                <h2 className="mt-2 text-2xl font-black text-black">{appointment.title || t('healthBuddy')}</h2>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide text-[#71717a]">{getSafeSeniorName(appointment.seniorName, t('senior'))}</p>

                {appointment.location && <AppointmentDirections location={appointment.location} appointmentTitle={appointment.title || t('healthBuddy')} />}

                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#2c4f8f]">
                  <Clock className="h-4 w-4" />
                  {translateStatus(appointment.status, t)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
