import { Bell, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-8 py-6 flex justify-between items-center">
        <div>
          <p className="text-xl text-gray-500">{t('goodMorning')}</p>
          <h2 className="text-3xl font-bold">John Tan</h2>
        </div>
        <div className="relative">
          <Bell className="w-10 h-10" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Daily Check-in Card */}
      <div className="p-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 ${
              checkedIn ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                checkedIn ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {checkedIn ? (
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-5xl text-white">✓</span>
                )}
              </div>
            </div>
            <h3 className="text-4xl font-bold mb-4">
              {checkedIn ? t('checkedIn') : t('dailyCheckIn')}
            </h3>
            <p className="text-2xl text-gray-600 leading-relaxed">
              {checkedIn ? t('checkedInDesc') : t('checkInDesc')}
            </p>
          </div>

          {!checkedIn && (
            <button
              onClick={() => setCheckedIn(true)}
              className="w-full bg-red-500 text-white py-6 rounded-full text-2xl font-bold active:scale-95 transition-transform"
            >
              {t('doCheckIn')}
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-5">
          <QuickActionItem
            icon="📋"
            title={t('viewMedicalRecords')}
            subtitle={t('viewMedicalRecordsDesc')}
          />
          <QuickActionItem
            icon="💊"
            title={t('medicationReminders')}
            subtitle={t('medicationRemindersDesc')}
          />
          <QuickActionItem
            icon="📅"
            title={t('upcomingAppointments')}
            subtitle={t('upcomingAppointmentsDesc')}
          />
        </div>
      </div>
    </div>
  );
}

function QuickActionItem({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <button className="w-full bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm active:bg-gray-50 transition-colors">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-lg text-gray-500 mt-1">{subtitle}</p>
      </div>
      <ChevronRight className="w-8 h-8 text-gray-400 flex-shrink-0" />
    </button>
  );
}
