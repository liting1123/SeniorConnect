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
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

const buttonClass = (highContrast: boolean, variant: 'primary' | 'secondary' = 'secondary') =>
  variant === 'primary'
    ? `min-h-10 rounded-full border border-transparent bg-[#416642] px-4 py-2 font-semibold text-white shadow-sm transition active:scale-95 ${
        highContrast ? 'border-[#ffe452] bg-[#ffe452] text-black hover:bg-[#ffe452]/90' : ''
      }`
    : `min-h-10 rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-[#1f2937] shadow-sm transition hover:bg-[#eef7ef] ${
        highContrast ? 'border-white bg-black text-white hover:bg-[#121212]' : ''
      }`;

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack, highContrast, onToggleHighContrast }) => {
  const { t } = useTranslation();
  const [gridN, setGridN] = useState(2);
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [easyMode, setEasyMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
      <header className={`sticky top-0 z-10 shadow-sm ${highContrast ? 'border-b border-white/40 bg-black' : 'bg-[#fbf9f8]'}`}>
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
        <section
          className={`rounded-[30px] p-5 shadow-[0_10px_28px_rgba(49,99,66,0.08)] min-[390px]:p-6 ${
            highContrast ? 'border-2 border-white bg-black' : 'bg-white'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className={`text-base font-bold min-[390px]:text-lg ${highContrast ? 'text-white' : 'text-[#2f4f35]'}`}>
              {t('gameSettings')}
            </h2>
            <button
              className={buttonClass(highContrast, 'secondary')}
              onClick={() => setShowSettings((value) => !value)}
              aria-expanded={showSettings}
              aria-controls="memory-game-settings"
            >
              {showSettings ? t('hide') : t('show')}
            </button>
          </div>

          {showSettings && (
            <div id="memory-game-settings" className="mb-5 grid gap-3 rounded-3xl border p-4 min-[390px]:gap-4 min-[390px]:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className={`text-sm font-semibold ${highContrast ? 'text-white' : 'text-[#4a6b4b]'}`}>
                  {t('easyMode')}
                </span>
                <button
                  id="easy"
                  className={buttonClass(highContrast, 'secondary')}
                  onClick={() => setEasyMode((value) => !value)}
                  aria-pressed={easyMode}
                >
                  {easyMode ? t('on') : t('off')}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className={`text-sm font-semibold ${highContrast ? 'text-white' : 'text-[#4a6b4b]'}`}>
                  {t('highContrast')}
                </span>
                <button
                  className={buttonClass(highContrast, 'secondary')}
                  onClick={onToggleHighContrast}
                  aria-label={`${highContrast ? t('disable') : t('enable')} ${t('highContrast')}`}
                  aria-pressed={highContrast}
                >
                  {highContrast ? t('on') : t('off')}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="size" className={`text-sm font-semibold ${highContrast ? 'text-white' : 'text-[#4a6b4b]'}`}>
                {t('gridSize')}:
              </label>
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

            <button className={buttonClass(highContrast, 'primary')} onClick={startGame} aria-label={t('startNewGame')}>
              {t('startNewGame')}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr]">
            <div
              className={`flex min-h-[90px] flex-col justify-center gap-2 rounded-[28px] bg-white p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] ${
                highContrast ? 'border border-white bg-black' : ''
              }`}
            >
              <span className={`text-sm font-semibold uppercase tracking-[0.08em] ${highContrast ? 'text-white/70' : 'text-[#5d655d]'}`}>
                {t('moves')}
              </span>
              <span className={`text-3xl font-black ${highContrast ? 'text-white' : 'text-[#316342]'}`}>{moves}</span>
            </div>
            <div
              className={`flex min-h-[90px] flex-col justify-center gap-2 rounded-[28px] bg-white p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] ${
                highContrast ? 'border border-white bg-black' : ''
              }`}
            >
              <span className={`text-sm font-semibold uppercase tracking-[0.08em] ${highContrast ? 'text-white/70' : 'text-[#5d655d]'}`}>
                {t('time')}
              </span>
              <span className={`text-3xl font-black ${highContrast ? 'text-white' : 'text-[#316342]'}`}>{seconds}s</span>
            </div>
          </div>
        </section>

        <section
          className={`rounded-[30px] bg-white p-5 shadow-[0_10px_28px_rgba(49,99,66,0.08)] min-[390px]:p-6 ${
            highContrast ? 'border-2 border-white bg-black' : ''
          }`}
        >
          <div
            className={`mx-auto grid w-full max-w-[420px] gap-3 rounded-3xl p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] max-[430px]:p-3 ${
              highContrast ? 'border border-white bg-black' : 'bg-[#f8fafc]'
            }`}
            style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
          >
            {cards.map((card) => (
              <button
                key={card.id}
                className={`aspect-square rounded-[18px] border-2 text-5xl leading-none transition hover:-translate-y-px ${
                  highContrast
                    ? card.flipped || card.matched
                      ? 'border-black bg-[#ffe452] text-black'
                      : 'border-white bg-black text-white hover:bg-[#111]'
                    : card.flipped || card.matched
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

          <div
            className={`mt-4 min-h-[52px] rounded-[24px] p-4 text-lg leading-6 shadow-sm ${
              highContrast ? 'border border-white bg-black text-white' : 'bg-[#effaf0] text-[#314f33]'
            }`}
          >
            {message}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MemoryGame;
