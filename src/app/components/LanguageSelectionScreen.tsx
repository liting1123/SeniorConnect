import { Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelectionScreen({ onContinue }: { onContinue: () => void }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { id: 'en', name: t('english') },
    { id: 'ms', name: t('malay') },
    { id: 'zh', name: t('chinese') },
    { id: 'ta', name: t('tamil') },
  ];

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    i18n.changeLanguage(langId);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col p-8">
      <div className="flex-1">
        <h1 className="text-5xl font-bold text-green-700 mb-12">{t('selectLanguage')}</h1>

        <div className="space-y-4">
          {languages.map((language, index) => (
            <button
              key={language.id}
              onClick={() => handleLanguageSelect(language.id)}
              className={`w-full bg-white rounded-2xl p-6 flex items-center gap-5 transition-all ${
                selectedLanguage === language.id
                  ? 'ring-2 ring-green-600'
                  : 'ring-1 ring-gray-200'
              }`}
            >
              <span className="text-2xl font-bold text-gray-600 w-8">
                {index + 1}.
              </span>
              <span className="flex-1 text-left text-2xl font-bold text-gray-900">
                {language.name}
              </span>
              {selectedLanguage === language.id && (
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-green-700 text-white py-6 rounded-full text-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        {t('continue')}
        <ArrowRight className="w-7 h-7" />
      </button>
    </div>
  );
}
