/**
 * Memory Game Component
 * Match pairs of emoji cards
 */

import React, { useEffect, useRef, useState } from 'react';
import { shuffle, speak } from './shared/utils';

const EMOJIS: string[] = [
  '\u{1F34E}',
  '\u{1F34C}',
  '\u{1F347}',
  '\u{1F353}',
];

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

interface MemoryGameProps {
  onBack?: () => void;
}

const buttonClass = (highContrast: boolean) =>
  `min-h-10 rounded-full border px-4 py-2 transition ${
    highContrast
      ? 'border-white bg-[#111] text-white'
      : 'border-[#cbd5e1] bg-white text-[#1f2937] hover:bg-[#eaf4ec]'
  }`;

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [gridN, setGridN] = useState(2);
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [easyMode, setEasyMode] = useState(false);

  const firstCardRef = useRef<number | null>(null);
  const lockRef = useRef(false);
  const matchedRef = useRef(0);
  const timerRef = useRef<number | undefined>(undefined);
  const previewTimeoutRef = useRef<number | undefined>(undefined);
  const movesRef = useRef(0);
  const secondsRef = useRef(0);

  const buildCards = (pairs: number): Card[] => {
    const pool = shuffle(EMOJIS).slice(0, pairs);
    const combined = shuffle([...pool, ...pool]);

    return combined.map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false,
    }));
  };

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
  };

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setSeconds((value) => {
        const nextValue = value + 1;
        secondsRef.current = nextValue;
        return nextValue;
      });
    }, 1000);
  };

  const startGame = () => {
    const total = gridN * gridN;

    if (total % 2 !== 0) {
      setMessage('Grid must have even number of cards');
      return;
    }

    const newCards = buildCards(total / 2);
    clearTimers();
    setMoves(0);
    setSeconds(0);
    movesRef.current = 0;
    secondsRef.current = 0;
    matchedRef.current = 0;
    firstCardRef.current = null;
    lockRef.current = false;

    if (easyMode) {
      setCards(newCards.map((card) => ({ ...card, flipped: true })));
      setMessage('Previewing cards...');
      speak('Previewing cards', soundOn);

      previewTimeoutRef.current = window.setTimeout(() => {
        setCards(newCards);
        setMessage('Game started (Easy Mode)');
        speak('Game started', soundOn);
        startTimer();
      }, 3000);
      return;
    }

    setCards(newCards);
    setMessage('Game started');
    speak('Game started', soundOn);
    startTimer();
  };

  const endGame = (finalMoves: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMessage(`You won in ${finalMoves} moves and ${secondsRef.current} seconds!`);
    speak('Congratulations, you won', soundOn);
  };

  const flipCard = (index: number) => {
    if (lockRef.current || cards[index].flipped || cards[index].matched) {
      return;
    }

    const newCards = cards.map((card, cardIndex) =>
      cardIndex === index ? { ...card, flipped: true } : card,
    );

    if (firstCardRef.current === null) {
      firstCardRef.current = index;
      setCards(newCards);
      return;
    }

    lockRef.current = true;
    const firstIdx = firstCardRef.current;
    const secondIdx = index;
    const nextMoves = movesRef.current + 1;
    movesRef.current = nextMoves;
    setMoves(nextMoves);

    if (newCards[firstIdx].value === newCards[secondIdx].value) {
      const matchedCards = newCards.map((card, cardIndex) =>
        cardIndex === firstIdx || cardIndex === secondIdx
          ? { ...card, matched: true }
          : card,
      );

      matchedRef.current += 2;
      speak('Match', soundOn);
      setMessage(`Matched! ${matchedRef.current}/${matchedCards.length}`);
      setCards(matchedCards);
      firstCardRef.current = null;
      lockRef.current = false;

      if (matchedRef.current === matchedCards.length) {
        endGame(nextMoves);
      }
      return;
    }

    speak('Not a match', soundOn);
    setCards(newCards);
    window.setTimeout(() => {
      setCards((currentCards) =>
        currentCards.map((card, cardIndex) =>
          cardIndex === firstIdx || cardIndex === secondIdx
            ? { ...card, flipped: false }
            : card,
        ),
      );
      firstCardRef.current = null;
      lockRef.current = false;
    }, easyMode ? 1600 : 900);
  };

  useEffect(() => {
    startGame();

    return () => {
      clearTimers();
    };
  }, []);

  return (
    <div className={`h-full overflow-y-auto ${highContrast ? 'bg-black text-white' : 'bg-[#fbf9f8] text-[#1b1c1c]'}`}>
      <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-3 bg-inherit px-6 py-3 shadow-sm">
        <h1 className={`m-0 text-2xl font-bold ${highContrast ? 'text-white' : 'text-[#316342]'}`}>
          Memory Game
        </h1>
        {onBack && (
          <button className={buttonClass(highContrast)} onClick={onBack} aria-label="Back to menu">
            Back
          </button>
        )}
      </header>

      <main className="mx-auto flex max-w-[560px] flex-col gap-5 p-6 max-[430px]:p-[18px]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="size">Grid Size:</label>
            <select
              id="size"
              value={gridN}
              onChange={(event) => setGridN(Number(event.target.value))}
              disabled
              className={buttonClass(highContrast)}
            >
              <option value={2}>2x2</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="easy">Easy Mode:</label>
            <button
              id="easy"
              className={buttonClass(highContrast)}
              onClick={() => setEasyMode((value) => !value)}
              aria-pressed={easyMode}
            >
              {easyMode ? 'On' : 'Off'}
            </button>
          </div>

          <button className={buttonClass(highContrast)} onClick={startGame} aria-label="Start new game">
            Start New Game
          </button>

          <button
            className={buttonClass(highContrast)}
            onClick={() => setHighContrast((value) => !value)}
            aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast`}
          >
            Contrast: {highContrast ? 'On' : 'Off'}
          </button>

          <button
            className={buttonClass(highContrast)}
            onClick={() => setSoundOn((value) => !value)}
            aria-label={`Sound: ${soundOn ? 'On' : 'Off'}`}
          >
            Sound: {soundOn ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex min-w-[120px] items-center gap-2 rounded-2xl p-4 shadow-sm ${highContrast ? 'bg-[#111]' : 'bg-white'}`}>
            <span className={`font-bold ${highContrast ? 'text-white' : 'text-[#316342]'}`}>Moves:</span>
            <span className="text-2xl font-bold">{moves}</span>
          </div>
          <div className={`flex min-w-[120px] items-center gap-2 rounded-2xl p-4 shadow-sm ${highContrast ? 'bg-[#111]' : 'bg-white'}`}>
            <span className={`font-bold ${highContrast ? 'text-white' : 'text-[#316342]'}`}>Time:</span>
            <span className="text-2xl font-bold">{seconds}s</span>
          </div>
        </div>

        <div
          className={`mx-auto grid w-full max-w-[420px] gap-3 rounded-3xl p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] max-[430px]:gap-2.5 max-[430px]:p-3 ${
            highContrast ? 'bg-[#111]' : 'bg-white'
          }`}
          style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              className={`aspect-square rounded-[18px] border-2 text-5xl leading-none transition hover:-translate-y-px ${
                card.flipped || card.matched
                  ? 'border-[#316342] bg-[#e1ffe5]'
                  : 'border-[#d1d5db] bg-[#f8fafc]'
              } ${card.matched ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
              onClick={() => flipCard(card.id)}
              disabled={card.matched}
              aria-label={
                card.matched
                  ? `Matched card ${card.value}`
                  : card.flipped
                    ? `Card ${card.value}`
                    : 'Hidden card'
              }
              aria-pressed={card.flipped}
              role="gridcell"
            >
              <span className="flex h-full w-full items-center justify-center">
                {card.flipped ? card.value : ''}
              </span>
            </button>
          ))}
        </div>

        <div className={`min-h-[52px] rounded-[18px] p-4 text-lg leading-6 shadow-sm ${highContrast ? 'bg-[#111] text-white' : 'bg-white text-[#414942]'}`}>
          {message}
        </div>
      </main>
    </div>
  );
};

export default MemoryGame;
