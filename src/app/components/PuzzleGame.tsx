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

type PuzzleTheme = {
  label: string;
  imageUrl: string;
};

const PUZZLE_THEMES: PuzzleTheme[] = [
  {
    label: 'Marina Bay Sands',
    imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Merlion Park',
    imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Gardens by the Bay',
    imageUrl: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Singapore Flyer',
    imageUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=1200&q=80',
  },
];

function buildThemeImage(theme: PuzzleTheme): string {
  return theme.imageUrl;
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
  const [selectedImage, setSelectedImage] = useState(() => buildThemeImage(PUZZLE_THEMES[0]));
  const [easyMode, setEasyMode] = useState(true);
  const [dragSource, setDragSource] = useState<{ zone: 'board' | 'tray'; index: number } | null>(null);
  const [isSolved, setIsSolved] = useState(false);

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
    const randomTheme = PUZZLE_THEMES[Math.floor(Math.random() * PUZZLE_THEMES.length)];
    const image = buildThemeImage(randomTheme);
    setSelectedImage(image);
    setMessage(`${t('newPuzzleImageGenerated')}: ${randomTheme.label}`);
  };

  const startGame = () => {
    const { board, tray } = buildPieces(gridN, easyMode);
    const randomTheme = PUZZLE_THEMES[Math.floor(Math.random() * PUZZLE_THEMES.length)];
    const image = buildThemeImage(randomTheme);

    clearTimers();
    setBoardTiles(board);
    setTrayTiles(tray);
    setMoves(0);
    setSeconds(0);
    movesRef.current = 0;
    secondsRef.current = 0;
    setDragSource(null);
    setIsSolved(false);
    setSelectedImage(image);
    setMessage(t('puzzleGameStarted', { label: randomTheme.label }));

    startTimer();
  };

  const endGame = (finalMoves: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSolved(true);
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
            } ${isSolved ? 'puzzle-board-solved' : ''}`}
            style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
          >
            {boardTiles.map((tile, index) => (
              <button
                key={index}
                className={`aspect-square rounded-[18px] border-2 bg-white text-2xl font-bold text-[#1b1c1c] transition hover:-translate-y-px ${
                  tile === ''
                    ? 'cursor-default border-dashed border-[#d1d5db] bg-[#f8fafc]'
                    : 'cursor-pointer border-[#d1d5db] shadow-sm'
                } ${tile !== '' ? 'overflow-hidden puzzle-tile' : ''}`}
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
                {tile && <span className="sr-only">{tile}</span>}
              </button>
            ))}

            {isSolved && (
              <img
                src={selectedImage}
                alt={t('puzzleBoard')}
                className="puzzle-board-full-image"
              />
            )}
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
                {tile && <span className="sr-only">{tile}</span>}
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
