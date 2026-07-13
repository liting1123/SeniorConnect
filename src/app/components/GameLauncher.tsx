import { Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type GameLauncherProps = {
  onSelect: (mode: 'memory' | 'puzzle') => void;
  highContrast: boolean;
};

export default function GameLauncher({ onSelect, highContrast }: GameLauncherProps) {
  const { t } = useTranslation();

  return (
    <div className={`h-full overflow-y-auto ${highContrast ? 'bg-black text-white' : 'bg-[#fbf9f8] text-[#1b1c1c]'}`}>
      <header className={`sticky top-0 z-10 shadow-sm ${highContrast ? 'border-b border-white/40 bg-black' : 'bg-[#fbf9f8]'}`}>
        <div className="flex h-14 items-center justify-between px-5 min-[390px]:h-16 min-[390px]:px-6">
          <div className={`flex items-center gap-2 ${highContrast ? 'text-white' : 'text-[#316342]'}`}>
            <Gamepad2 className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
            <span className="text-xl font-bold min-[390px]:text-2xl">{t('playAGame')}</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 py-5 min-[390px]:gap-6 min-[390px]:px-6 min-[390px]:py-7">
        <section
          className={`rounded-[28px] p-5 shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6 ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-[#eef7ef]'
          }`}
        >
          <h1 className={`text-3xl font-bold min-[390px]:text-4xl ${highContrast ? 'text-white' : 'text-[#316342]'}`}>
            {t('chooseYourGame')}
          </h1>
          <p className={`mt-2 text-base leading-6 min-[390px]:text-lg ${highContrast ? 'text-white/90' : 'text-[#414942]'}`}>
            {t('selectGameToPlay')}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onSelect('memory')}
            className={`rounded-[24px] border-2 p-6 text-left shadow-sm transition ${
              highContrast
                ? 'border-white bg-black text-white hover:bg-[#121212]'
                : 'border-[#e3dfdd] bg-white hover:border-[#316342] hover:bg-[#e1ffe5]'
            }`}
          >
            <h2 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-[#1b1c1c]'}`}>{t('memoryGame')}</h2>
            <p className={`mt-2 text-sm ${highContrast ? 'text-white/85' : 'text-[#414942]'}`}>{t('memoryGameDescription')}</p>
          </button>

          <button
            type="button"
            onClick={() => onSelect('puzzle')}
            className={`rounded-[24px] border-2 p-6 text-left shadow-sm transition ${
              highContrast
                ? 'border-white bg-black text-white hover:bg-[#121212]'
                : 'border-[#e3dfdd] bg-white hover:border-[#316342] hover:bg-[#e1ffe5]'
            }`}
          >
            <h2 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-[#1b1c1c]'}`}>{t('puzzleGame')}</h2>
            <p className={`mt-2 text-sm ${highContrast ? 'text-white/85' : 'text-[#414942]'}`}>{t('puzzleGameDescription')}</p>
          </button>
        </section>
      </main>
    </div>
  );
}
