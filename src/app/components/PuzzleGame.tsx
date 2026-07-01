/**
 * Puzzle Game Component
 * Pick-and-drop puzzle game with image tiles
 */

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shuffle } from './shared/utils';

interface PuzzleGameProps {
  onBack?: () => void;
}

const IMAGE_LABEL: Record<number, string> = {
  2: 'small mosaic',
  3: 'color swirl',
  5: 'abstract squares',
  9: 'graphic mosaic',
};

function generatePuzzleImage(gridN: number, seed: number): string {
  const colors = ['#ff9800', '#8b4513', '#228b22', '#0088cc', '#c2185b', '#7b1fa2'];
  const base = colors[seed % colors.length];
  const accent = colors[(seed + gridN) % colors.length];
  const pattern = seed % 4;
  const shapes = [
    `<circle cx="150" cy="150" r="90" fill="${accent}" opacity="0.55" />`,
    `<path d="M0 75 L300 75 L300 225 L0 225 Z" fill="${accent}" opacity="0.35" />`,
    `<path d="M75 0 L225 0 L225 300 L75 300 Z" fill="${accent}" opacity="0.35" />`,
    `<polygon points="150,30 270,150 150,270 30,150" fill="${accent}" opacity="0.45" />`,
  ];
  const lines = Array.from({ length: gridN + 1 }, (_, index) => {
    const offset = (300 / gridN) * index;
    return `
      <line x1="${offset}" y1="0" x2="${offset}" y2="300" stroke="rgba(255,255,255,0.5)" stroke-width="4" />
      <line x1="0" y1="${offset}" x2="300" y2="${offset}" stroke="rgba(255,255,255,0.5)" stroke-width="4" />`;
  }).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
      <rect width="300" height="300" fill="${base}" />
      ${shapes[pattern]}
      ${lines}
    </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const buttonClass = (highContrast: boolean, variant: 'primary' | 'secondary' = 'secondary') =>
  variant === 'primary'
    ? `min-h-10 rounded-full border border-transparent bg-[#416642] px-4 py-2 font-semibold text-white shadow-sm transition active:scale-95`
    : `min-h-10 rounded-full border border-[#d1d5db] bg-white px-4 py-2 text-[#1f2937] shadow-sm transition hover:bg-[#eef7ef] ${
        highContrast ? 'border-white bg-[#111] text-white hover:bg-[#111]' : ''
      }`;

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [gridN, setGridN] = useState(2);
  const [boardTiles, setBoardTiles] = useState<string[]>([]);
  const [trayTiles, setTrayTiles] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [selectedImage, setSelectedImage] = useState(() => generatePuzzleImage(3, Date.now()));
  const [easyMode, setEasyMode] = useState(true);
  const [dragSource, setDragSource] = useState<{ zone: 'board' | 'tray'; index: number } | null>(null);

  const timerRef = useRef<number | undefined>(undefined);
  const movesRef = useRef(0);
  const secondsRef = useRef(0);

  const buildPieces = (size: number, easy = false): { board: string[]; tray: string[] } => {
    const total = size * size;
    const values = Array.from({ length: total }, (_, index) => String(index + 1));
    const board = Array.from({ length: total }, () => '');
    let tray = shuffle(values);

    if (easy) {
      const prefillCount = Math.max(1, Math.floor(total / 4));
      const targets = shuffle(Array.from({ length: total }, (_, index) => index)).slice(0, prefillCount);

      targets.forEach((target) => {
        const piece = String(target + 1);
        board[target] = piece;
        tray = tray.filter((value) => value !== piece);
      });
    }

    return { board, tray };
  };

  const isBoardSolved = (tiles: string[]) =>
    tiles.every((tile, index) => tile === String(index + 1));

  const movePiece = (
    source: { zone: 'board' | 'tray'; index: number },
    target: { zone: 'board' | 'tray'; index: number },
  ) => {
    const nextBoard = [...boardTiles];
    const nextTray = [...trayTiles];

    const sourceValue = source.zone === 'board' ? nextBoard[source.index] : nextTray[source.index];
    const targetValue = target.zone === 'board' ? nextBoard[target.index] : nextTray[target.index];

    if (!sourceValue) {
      return;
    }

    if (source.zone === 'board') {
      nextBoard[source.index] = targetValue;
    } else {
      nextTray[source.index] = targetValue;
    }

    if (target.zone === 'board') {
      nextBoard[target.index] = sourceValue;
    } else {
      nextTray[target.index] = sourceValue;
    }

    setBoardTiles(nextBoard);
    setTrayTiles(nextTray);

    const nextMoves = movesRef.current + 1;
    movesRef.current = nextMoves;
    setMoves(nextMoves);

    if (isBoardSolved(nextBoard)) {
      endGame(nextMoves);
      return;
    }

    setMessage(t('puzzleDropHint'));
  };

  const handleDrop = (target: { zone: 'board' | 'tray'; index: number }) => {
    if (!dragSource) {
      return;
    }

    if (dragSource.zone === target.zone && dragSource.index === target.index) {
      setDragSource(null);
      return;
    }

    movePiece(dragSource, target);
    setDragSource(null);
  };

  const handlePickFromBoard = (index: number) => {
    const firstEmptyTray = trayTiles.findIndex((tile) => tile === '');

    if (firstEmptyTray < 0 || !boardTiles[index]) {
      return;
    }

    movePiece(
      { zone: 'board', index },
      { zone: 'tray', index: firstEmptyTray },
    );
  };

  const handlePlaceFromTray = (index: number) => {
    const firstEmptyBoard = boardTiles.findIndex((tile) => tile === '');

    if (firstEmptyBoard < 0 || !trayTiles[index]) {
      return;
    }

    movePiece(
      { zone: 'tray', index },
      { zone: 'board', index: firstEmptyBoard },
    );
  };

  const onDragStart = (source: { zone: 'board' | 'tray'; index: number }) => {
    const sourceValue = source.zone === 'board' ? boardTiles[source.index] : trayTiles[source.index];

    if (!sourceValue) {
      return;
      }

    setDragSource(source);
  };

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
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

  const regenerateImage = () => {
    const image = generatePuzzleImage(gridN, Date.now());
    setSelectedImage(image);
    setMessage(t('newPuzzleImageGenerated'));
  };

  const startGame = () => {
    const { board, tray } = buildPieces(gridN, easyMode);
    const seed = Date.now();
    const image = generatePuzzleImage(gridN, seed);
    const label = IMAGE_LABEL[gridN] || 'image';

    clearTimers();
    setBoardTiles(board);
    setTrayTiles(tray);
    setMoves(0);
    setSeconds(0);
    movesRef.current = 0;
    secondsRef.current = 0;
    setDragSource(null);
    setSelectedImage(image);
    setMessage(t('puzzleGameStarted', { label }));

    startTimer();
  };

  const endGame = (finalMoves: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMessage(t('puzzleSolvedIn', { moves: finalMoves, seconds: secondsRef.current }));
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
            {t('puzzleGameTitle')}
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
                {easyMode ? t('on') : t('off')}
              </button>
            </div>

            <button className={buttonClass(highContrast, 'primary')} onClick={startGame} aria-label={t('startNewGame')}>
              {t('startNewGame')}
            </button>

            <button className={buttonClass(highContrast, 'secondary')} onClick={regenerateImage} aria-label={t('regeneratePuzzleImage')}>
              {t('newImage')}
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
          <h2 className={`mb-3 text-base font-semibold min-[390px]:text-lg ${highContrast ? 'text-white/90' : 'text-[#314f33]'}`}>
            {t('puzzleBoard')}
          </h2>
          <div
            className={`mx-auto grid w-full max-w-[420px] gap-1.5 rounded-3xl p-3 shadow-[0_8px_20px_rgba(49,99,66,0.08)] max-[430px]:p-2.5 ${
              highContrast ? 'bg-[#111]' : 'bg-white'
            }`}
            style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
          >
            {boardTiles.map((tile, index) => (
              <button
                key={index}
                className={`aspect-square rounded-[18px] border-2 bg-white text-2xl font-bold text-[#1b1c1c] transition hover:-translate-y-px ${
                  tile === ''
                    ? 'cursor-default border-dashed border-[#d1d5db] bg-[#f8fafc]'
                    : 'cursor-pointer border-[#d1d5db] shadow-sm'
                } ${tile !== '' ? 'overflow-hidden' : ''}`}
                onClick={() => handlePickFromBoard(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop({ zone: 'board', index })}
                onDragStart={() => onDragStart({ zone: 'board', index })}
                draggable={tile !== ''}
                aria-label={tile === '' ? t('emptySpace') : t('puzzleTileLabel', { tile })}
                role="gridcell"
                tabIndex={0}
                style={
                  tile !== ''
                    ? {
                        backgroundColor: 'transparent',
                        backgroundImage: `url("${selectedImage}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${((Number(tile) - 1) % gridN) * (100 / (gridN - 1))}% ${Math.floor((Number(tile) - 1) / gridN) * (100 / (gridN - 1))}%`,
                        backgroundSize: `${gridN * 100}% ${gridN * 100}%`,
                      }
                    : {}
                }
              >
                {tile}
              </button>
            ))}
          </div>

          <h2 className={`mb-3 mt-5 text-base font-semibold min-[390px]:text-lg ${highContrast ? 'text-white/90' : 'text-[#314f33]'}`}>
            {t('puzzlePieces')}
          </h2>
          <div
            className={`mx-auto grid w-full max-w-[420px] gap-1.5 rounded-3xl p-3 shadow-[0_8px_20px_rgba(49,99,66,0.08)] max-[430px]:p-2.5 ${
              highContrast ? 'bg-[#111]' : 'bg-white'
            }`}
            style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
          >
            {trayTiles.map((tile, index) => (
              <button
                key={`tray-${index}`}
                className={`aspect-square rounded-[18px] border-2 bg-white text-2xl font-bold text-[#1b1c1c] transition hover:-translate-y-px ${
                  tile === ''
                    ? 'cursor-default border-dashed border-[#d1d5db] bg-[#f8fafc]'
                    : 'cursor-grab border-[#d1d5db] shadow-sm active:cursor-grabbing'
                } ${tile !== '' ? 'overflow-hidden' : ''}`}
                onClick={() => handlePlaceFromTray(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop({ zone: 'tray', index })}
                onDragStart={() => onDragStart({ zone: 'tray', index })}
                draggable={tile !== ''}
                aria-label={tile === '' ? t('dropPieceHere') : t('puzzleTileLabel', { tile })}
                role="gridcell"
                tabIndex={0}
                style={
                  tile !== ''
                    ? {
                        backgroundColor: 'transparent',
                        backgroundImage: `url("${selectedImage}")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${((Number(tile) - 1) % gridN) * (100 / (gridN - 1))}% ${Math.floor((Number(tile) - 1) / gridN) * (100 / (gridN - 1))}%`,
                        backgroundSize: `${gridN * 100}% ${gridN * 100}%`,
                      }
                    : {}
                }
              >
                {tile}
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

export default PuzzleGame;
