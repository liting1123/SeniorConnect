import { Gamepad2 } from 'lucide-react';

type GameLauncherProps = {
  onSelect: (mode: 'friendly' | 'memory' | 'puzzle') => void;
};

export default function GameLauncher({ onSelect }: GameLauncherProps) {
  return (
    <div className="h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]">
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-5 min-[390px]:h-16 min-[390px]:px-6">
          <div className="flex items-center gap-2 text-[#316342]">
            <Gamepad2 className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
            <span className="text-xl font-bold min-[390px]:text-2xl">Play a game</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 py-5 min-[390px]:gap-6 min-[390px]:px-6 min-[390px]:py-7">
        <section className="rounded-[28px] bg-[#eef7ef] p-5 shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6">
          <h1 className="text-3xl font-bold text-[#316342] min-[390px]:text-4xl">Choose your game</h1>
          <p className="mt-2 text-base leading-6 text-[#414942] min-[390px]:text-lg">Select one of the games to play today.</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onSelect('friendly')}
            className="rounded-[24px] border-2 border-[#e3dfdd] bg-white p-6 text-left shadow-sm transition hover:border-[#316342] hover:bg-[#e1ffe5]"
          >
            <h2 className="text-xl font-bold text-[#1b1c1c]">Friendly Game</h2>
            <p className="mt-2 text-sm text-[#414942]">Reveal a few friendly messages and earn points.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelect('memory')}
            className="rounded-[24px] border-2 border-[#e3dfdd] bg-white p-6 text-left shadow-sm transition hover:border-[#316342] hover:bg-[#e1ffe5]"
          >
            <h2 className="text-xl font-bold text-[#1b1c1c]">Memory Game</h2>
            <p className="mt-2 text-sm text-[#414942]">Match emoji pairs and train your memory.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelect('puzzle')}
            className="rounded-[24px] border-2 border-[#e3dfdd] bg-white p-6 text-left shadow-sm transition hover:border-[#316342] hover:bg-[#e1ffe5]"
          >
            <h2 className="text-xl font-bold text-[#1b1c1c]">Puzzle Game</h2>
            <p className="mt-2 text-sm text-[#414942]">Solve the slide puzzle and beat the timer.</p>
          </button>
        </section>
      </main>
    </div>
  );
}
