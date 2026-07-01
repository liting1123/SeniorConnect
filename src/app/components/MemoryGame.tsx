/**
 * Memory Game Component
 * Match pairs of emoji cards
 */

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shuffle } from './shared/utils';

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

const buttonClass = (highContrast: boolean, variant: 'primary' | 'secondary' = 'secondary') =>
  variant === 'primary'
    ? `min-h-10 rounded-full border border-transparent bg-[#416642] px-4 py-2 font-semibold text-white shadow-sm transition active:scale-95`
    : `min-h-10 rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-[#1f2937] shadow-sm transition hover:bg-[#eef7ef] ${
        highContrast ? 'border-white bg-[#111] text-white hover:bg-[#111]' : ''
      }`;

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [gridN, setGridN] = useState(2);
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
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
      setMessage(t('gridMustBeEven'));
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
      setMessage(t('previewingCards'));

      previewTimeoutRef.current = window.setTimeout(() => {
        setCards(newCards);
        setMessage(t('gameStartedEasyMode'));
        startTimer();
      }, 3000);
      return;
    }

    setCards(newCards);
    setMessage(t('gameStarted'));
    startTimer();
  };

  const endGame = (finalMoves: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMessage(t('youWonIn', { moves: finalMoves, seconds: secondsRef.current }));
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
      setMessage(t('matchedCards', { matched: matchedRef.current, total: matchedCards.length }));
      setCards(matchedCards);
      firstCardRef.current = null;
      lockRef.current = false;

      if (matchedRef.current === matchedCards.length) {
        endGame(nextMoves);
      }
      return;
    }

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
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-5 min-[390px]:h-16 min-[390px]:px-6">
          <h1 className={`text-xl font-bold min-[390px]:text-2xl ${highContrast ? 'text-white' : 'text-[#316342]'}`}>
            {t('memoryGameTitle')}
          </h1>
          {onBack && (
            <button className={buttonClass(highContrast, 'secondary')} onClick={onBack} aria-label={t('backToMenu')}>
              {t('backToMenu')}
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 pb-8 pt-5 min-[390px]:gap-6 min-[390px]:px-6 min-[390px]:pt-6">
        <section className="rounded-[30px] bg-white p-5 shadow-[0_10px_28px_rgba(49,99,66,0.08)] min-[390px]:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="size" className="text-sm font-semibold text-[#4a6b4b]">{t('gridSize')}:</label>
              <select
                id="size"
                value={gridN}
                onChange={(event) => setGridN(Number(event.target.value))}
                disabled
                className={buttonClass(highContrast, 'secondary')}
              >
                <option value={2}>2x2</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="easy" className="text-sm font-semibold text-[#4a6b4b]">{t('easyMode')}:</label>
              <button
                id="easy"
                className={buttonClass(highContrast, 'secondary')}
                onClick={() => setEasyMode((value) => !value)}
                aria-pressed={easyMode}
              >
                {easyMode ? 'On' : 'Off'}
              </button>
            </div>

            <button className={buttonClass(highContrast, 'primary')} onClick={startGame} aria-label={t('startNewGame')}>
              {t('startNewGame')}
            </button>

            <button
              className={buttonClass(highContrast, 'secondary')}
              onClick={() => setHighContrast((value) => !value)}
              aria-label={`${highContrast ? t('disable') : t('enable')} ${t('highContrast')}`}
            >
              {t('highContrast')}: {highContrast ? t('on') : t('off')}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className={`flex min-h-[90px] flex-col justify-center gap-2 rounded-[28px] bg-white p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] ${highContrast ? 'bg-[#111]' : ''}`}>
              <span className={`text-sm font-semibold uppercase tracking-[0.08em] ${highContrast ? 'text-white/70' : 'text-[#5d655d]'}`}>
                {t('moves')}
              </span>
              <span className={`text-3xl font-black ${highContrast ? 'text-white' : 'text-[#316342]'}`}>{moves}</span>
            </div>
            <div className={`flex min-h-[90px] flex-col justify-center gap-2 rounded-[28px] bg-white p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] ${highContrast ? 'bg-[#111]' : ''}`}>
              <span className={`text-sm font-semibold uppercase tracking-[0.08em] ${highContrast ? 'text-white/70' : 'text-[#5d655d]'}`}>
                {t('time')}
              </span>
              <span className={`text-3xl font-black ${highContrast ? 'text-white' : 'text-[#316342]'}`}>{seconds}s</span>
            </div>
          </div>
        </section>

        <section className={`rounded-[30px] bg-white p-5 shadow-[0_10px_28px_rgba(49,99,66,0.08)] min-[390px]:p-6 ${highContrast ? 'bg-[#111]' : ''}`}>
          <div
            className={`mx-auto grid w-full max-w-[420px] gap-3 rounded-3xl p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] max-[430px]:p-3 ${
              highContrast ? 'bg-[#111]' : 'bg-[#f8fafc]'
            }`}
            style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
          >
            {cards.map((card) => (
              <button
                key={card.id}
                className={`aspect-square rounded-[18px] border-2 text-5xl leading-none transition hover:-translate-y-px ${
                  card.flipped || card.matched
                    ? 'border-[#316342] bg-[#e1ffe5]'
                    : 'border-[#d1d5db] bg-white'
                } ${card.matched ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                onClick={() => flipCard(card.id)}
                disabled={card.matched}
                aria-label={
                  card.matched
                    ? t('matchedCard', { value: card.value })
                    : card.flipped
                    ? t('cardLabel', { value: card.value })
                    : t('hiddenCard')
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

          <div className={`mt-4 min-h-[52px] rounded-[24px] p-4 text-lg leading-6 shadow-sm ${highContrast ? 'bg-[#111] text-white' : 'bg-[#effaf0] text-[#314f33]'}`}>
            {message}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MemoryGame;
