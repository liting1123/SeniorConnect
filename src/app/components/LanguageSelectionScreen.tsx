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
    <div className="flex h-full flex-col overflow-y-auto bg-gray-50 p-5 min-[390px]:p-8">
      <div className="flex-1">
        <h1 className="mb-8 text-4xl font-bold leading-tight text-green-700 min-[390px]:mb-12 min-[390px]:text-5xl">{t('selectLanguage')}</h1>

        <div className="space-y-3 min-[390px]:space-y-4">
          {languages.map((language, index) => (
            <button
              key={language.id}
              onClick={() => handleLanguageSelect(language.id)}
              className={`flex w-full items-center gap-4 rounded-2xl bg-white p-4 transition-all min-[390px]:gap-5 min-[390px]:p-6 ${
                selectedLanguage === language.id
                  ? 'ring-2 ring-green-600'
                  : 'ring-1 ring-gray-200'
              }`}
            >
              <span className="w-7 text-xl font-bold text-gray-600 min-[390px]:w-8 min-[390px]:text-2xl">
                {index + 1}.
              </span>
              <span className="flex-1 text-left text-xl font-bold text-gray-900 min-[390px]:text-2xl">
                {language.name}
              </span>
              {selectedLanguage === language.id && (
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-600 min-[390px]:h-10 min-[390px]:w-10">
                  <Check className="h-5 w-5 text-white min-[390px]:h-6 min-[390px]:w-6" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-green-700 py-4 text-xl font-bold text-white transition-transform active:scale-95 min-[390px]:py-6 min-[390px]:text-2xl"
      >
        {t('continue')}
        <ArrowRight className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
      </button>
    </div>
  );
}
