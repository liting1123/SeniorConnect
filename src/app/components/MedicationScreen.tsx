import { Clock, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MedicationScreen() {
  const { t } = useTranslation();
  const medications = [
    { name: 'Aspirin', dosage: '100mg', time: '08:00 AM', status: 'taken' },
    { name: 'Metformin', dosage: '500mg', time: '08:00 AM', status: 'taken' },
    { name: 'Lisinopril', dosage: '10mg', time: '02:00 PM', status: 'pending' },
    { name: 'Atorvastatin', dosage: '20mg', time: '08:00 PM', status: 'pending' },
  ];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-8 py-6">
        <h1 className="text-4xl font-bold">{t('medicationRemindersTitle')}</h1>
        <p className="text-gray-600 text-xl mt-2">Thursday, May 7, 2026</p>
      </div>

      {/* Medications List */}
      <div className="p-8 space-y-5">
        {medications.map((med, index) => (
          <MedicationCard key={index} {...med} />
        ))}
      </div>

      {/* Add Medication Button */}
      <div className="p-8">
        <button className="w-full bg-green-500 text-white py-6 rounded-full text-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <Plus className="w-8 h-8" />
          {t('addNewMedication')}
        </button>
      </div>
    </div>
  );
}

function MedicationCard({
  name,
  dosage,
  time,
  status
}: {
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'pending';
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
          💊
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-3xl">{name}</h3>
          <p className="text-gray-600 text-xl mt-1">{dosage}</p>
          <div className="flex items-center gap-2 mt-2 text-gray-500 text-lg">
            <Clock className="w-6 h-6" />
            <span>{time}</span>
          </div>
        </div>
        <button
          className={`px-6 py-4 rounded-full text-xl font-bold flex-shrink-0 active:scale-95 transition-transform ${
            status === 'taken'
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}
        >
          {status === 'taken' ? `✓ ${t('taken')}` : t('takeNow')}
        </button>
      </div>
    </div>
  );
}
