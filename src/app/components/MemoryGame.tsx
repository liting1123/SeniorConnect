import { useEffect, useRef, useState } from 'react';

type MemoryGameProps = {
  onBack: () => void;
};

type Card = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
};

const EMOJIS = [
  '🍎','🍌','🍇','🍓','🍉','🍒','🍑','🍍','🥝','🍋','🥥','🥭',
  '🍐','🍊','🥑','🌽','🥕','🥔','🍆','🌶️','🥦','🧀','🍪','🍩','🍰','🍫','🍿','☕','🍵','🍺','🍷',
];

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function speak(text: string, soundOn: boolean) {
  if (!soundOn) return;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const [gridN, setGridN] = useState(4);
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const firstRef = useRef<number | null>(null);
  const secondRef = useRef<number | null>(null);
  const lockRef = useRef(false);
  const matchedRef = useRef(0);
  const timerRef = useRef<number>();

  const buildDeck = (pairs: number): Card[] => {
    const pool = shuffle(EMOJIS).slice(0, pairs);
    const deck = shuffle([...pool, ...pool]);
    return deck.map((value, index) => ({ id: index, value, flipped: false, matched: false }));
  };

  const startGame = () => {
    const total = gridN * gridN;
    if (total % 2 !== 0) {
      setMessage('Grid must have an even number of cards.');
      return;
    }

    const deck = buildDeck(total / 2);
    setCards(deck);
    setMoves(0);
    setSeconds(0);
    matchedRef.current = 0;
    firstRef.current = null;
    secondRef.current = null;
    lockRef.current = false;
    setMessage('Match all pairs to win.');
    speak('Game started', soundOn);

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
  };

  const resetTurn = () => {
    firstRef.current = null;
    secondRef.current = null;
    lockRef.current = false;
  };

  const flipCard = (index: number) => {
    if (lockRef.current || cards[index].flipped || cards[index].matched) {
      return;
    }

    const updated = [...cards];
    updated[index].flipped = true;

    if (firstRef.current === null) {
      firstRef.current = index;
      setCards(updated);
      return;
    }

    secondRef.current = index;
    lockRef.current = true;
    setMoves((value) => value + 1);
    setCards(updated);

    const firstIndex = firstRef.current;
    const secondIndex = index;

    if (updated[firstIndex].value === updated[secondIndex].value) {
      updated[firstIndex].matched = true;
      updated[secondIndex].matched = true;
      matchedRef.current += 2;
      setMessage(`Matched! ${matchedRef.current}/${updated.length}`);
      speak('Match', soundOn);
      setCards(updated);
      resetTurn();
      if (matchedRef.current === updated.length) {
        endGame();
      }
      return;
    }

    speak('Not a match', soundOn);
    setTimeout(() => {
      updated[firstIndex].flipped = false;
      updated[secondIndex].flipped = false;
      setCards(updated);
      resetTurn();
    }, 900);
  };

  const endGame = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setMessage(`You won in ${moves} moves and ${seconds} seconds!`);
    speak('Congratulations, you won', soundOn);
  };

  useEffect(() => {
    startGame();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`h-full overflow-y-auto ${highContrast ? 'bg-black text-white' : 'bg-[#fbf9f8] text-[#1b1c1c]'}`}>
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-5 py-3 min-[390px]:h-16 min-[390px]:px-6">
          <div>
            <h1 className="text-xl font-bold text-[#316342]">Memory Game</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-[#cbd5e1] bg-white px-3 py-1 text-sm text-[#1f2937] transition hover:bg-[#e2e8f0]"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 py-5 min-[390px]:gap-6 min-[390px]:px-6 min-[390px]:py-7">
        <section className="rounded-[28px] bg-[#eef7ef] p-5 shadow-[0_8px_20px_rgba(49,99,66,0.08)]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="font-semibold text-[#1b1c1c]">Grid Size:</label>
              <select
                value={gridN}
                onChange={(e) => setGridN(Number(e.target.value))}
                className="rounded-xl border border-[#d1d5db] bg-white px-3 py-2"
              >
                <option value={2}>2x2</option>
                <option value={4}>4x4</option>
                <option value={6}>6x6</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startGame}
                className="rounded-full bg-[#316342] px-4 py-3 text-white shadow-sm"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className="rounded-full border border-[#cbd5e1] bg-white px-4 py-3"
              >
                Contrast: {highContrast ? 'On' : 'Off'}
              </button>
              <button
                type="button"
                onClick={() => setSoundOn(!soundOn)}
                className="rounded-full border border-[#cbd5e1] bg-white px-4 py-3"
              >
                Sound: {soundOn ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-[#316342]">Moves</div>
            <div className="mt-2 text-3xl font-bold">{moves}</div>
          </div>
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold text-[#316342]">Time</div>
            <div className="mt-2 text-3xl font-bold">{seconds}s</div>
          </div>
        </section>

        <section className="grid gap-3 rounded-[28px] bg-white p-4 shadow-sm" style={{ gridTemplateColumns: `repeat(${gridN}, minmax(0, 1fr))` }}>
          <div className={`grid gap-3 ${gridN === 2 ? 'grid-cols-2' : gridN === 4 ? 'grid-cols-4' : 'grid-cols-6'}`}>
            {cards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => flipCard(card.id)}
                disabled={card.matched}
                className={`aspect-square rounded-[20px] border-2 p-2 text-4xl transition ${
                  card.flipped || card.matched
                    ? 'border-[#316342] bg-[#e1ffe5]'
                    : 'border-[#d1d5db] bg-[#f8fafc]'
                }`}
              >
                <span>{card.flipped || card.matched ? card.value : ''}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-4 shadow-sm">
          <p className="text-base text-[#414942]">{message}</p>
        </section>
      </main>
    </div>
  );
}
