import { Calendar, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CaregiverAppointment } from '../services/serviceNow';

type SeniorAppointmentsScreenProps = {
  appointments: CaregiverAppointment[];
  isLoading: boolean;
};

function formatAppointmentDateTime(date: string, time: string) {
  const normalizedTime = time && time.length === 5 ? `${time}:00` : (time || '00:00:00');
  const parsed = new Date(`${date}T${normalizedTime}`);

  if (Number.isNaN(parsed.getTime())) {
    return `${date} ${time}`.trim() || 'Not scheduled';
  }

  return new Intl.DateTimeFormat('en-SG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Singapore',
  }).format(parsed);
}

function getSafeSeniorName(name: string, fallback: string) {
  const normalized = String(name || '').trim();

  if (!normalized || /^[a-f0-9]{32}$/i.test(normalized)) {
    return fallback;
  }

  return normalized;
}

export default function SeniorAppointmentsScreen({ appointments, isLoading }: SeniorAppointmentsScreenProps) {
  const { t } = useTranslation();

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
        ) : appointments.length === 0 ? (
          <div className="rounded-[20px] bg-[#f4f6f8] p-5 text-center text-base font-bold text-[#5f6368]">
            {t('noAppointmentsYet')}
          </div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="rounded-[20px] border border-[#e4e8ec] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#416642]">
                <Calendar className="h-5 w-5" />
                <p className="text-base font-black">{formatAppointmentDateTime(appointment.date, appointment.time)}</p>
              </div>
              <h2 className="mt-2 text-2xl font-black text-black">{appointment.title || t('healthBuddy')}</h2>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-[#71717a]">{getSafeSeniorName(appointment.seniorName, t('senior'))}</p>

              {appointment.location && (
                <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-[#5f6368]">
                  <MapPin className="mt-0.5 h-4 w-4" />
                  <span>{appointment.location}</span>
                </p>
              )}

              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#2c4f8f]">
                <Clock className="h-4 w-4" />
                {appointment.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
