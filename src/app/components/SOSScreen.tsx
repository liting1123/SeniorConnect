import { Phone, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SOSScreen() {
  const { t } = useTranslation();
  const [pressed, setPressed] = useState(false);

  const handleSOSPress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 2000);
  };

  return (
    <div className="h-full bg-white flex flex-col p-8">
      <div className="flex-1 flex flex-col justify-center items-center">
        <AlertCircle className="w-24 h-24 text-red-500 mb-6" />
        <h1 className="text-5xl font-bold mb-4">{t('emergencySOS')}</h1>
        <p className="text-2xl text-gray-700 text-center mb-16 max-w-md leading-relaxed">
          {t('sosDesc')}
        </p>

        {/* SOS Button */}
        <button
          onClick={handleSOSPress}
          className={`w-80 h-80 rounded-full flex flex-col items-center justify-center transition-all ${
            pressed
              ? 'bg-red-700 scale-95'
              : 'bg-red-500 hover:bg-red-600 active:scale-95'
          } shadow-2xl`}
        >
          <div className="w-64 h-64 rounded-full bg-white/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <Phone className="w-14 h-14 text-red-500" />
              </div>
              <span className="text-white text-5xl font-bold">SOS</span>
            </div>
          </div>
        </button>

        {pressed && (
          <p className="mt-8 text-red-500 text-2xl font-bold animate-pulse">
            {t('sendingAlert')}
          </p>
        )}

        <p className="mt-12 text-gray-600 text-xl text-center leading-relaxed">
          {t('sosWarning')}
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className="mt-auto space-y-4">
        <button className="w-full border-2 border-red-500 text-red-500 py-5 rounded-full text-xl font-bold active:bg-red-50 transition-colors">
          {t('editEmergencyContacts')}
        </button>
        <button className="w-full border-2 border-gray-300 text-gray-700 py-5 rounded-full text-xl font-bold active:bg-gray-50 transition-colors">
          {t('viewSupport')}
        </button>
      </div>
    </div>
  );
}
