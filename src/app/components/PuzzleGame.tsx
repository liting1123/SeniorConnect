/**
 * Puzzle Game Component
 * Slide puzzle game with image tiles
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  isAdjacent,
  isSolvable,
  isSolved,
  shuffle,
  speak,
} from './shared/utils';

interface PuzzleGameProps {
  onBack?: () => void;
}

const IMAGE_MAP: Record<number, string> = {
  2: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 300%22%3E%3Crect fill=%22%23ff9800%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22150%22 r=%22100%22 fill=%22%23fff%22/%3E%3C/svg%3E',
  3: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 300%22%3E%3Crect fill=%22%23ff9800%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22150%22 r=%22100%22 fill=%22%23fff%22/%3E%3C/svg%3E',
  5: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 300%22%3E%3Crect fill=%22%238B4513%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22150%22 r=%22100%22 fill=%22%23D2B48C%22/%3E%3C/svg%3E',
  9: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 300%22%3E%3Crect fill=%22%23228B22%22 width=%22300%22 height=%22300%22/%3E%3Ccircle cx=%22150%22 cy=%22150%22 r=%22100%22 fill=%22%23FFFF99%22/%3E%3C/svg%3E',
};

const IMAGE_LABEL: Record<number, string> = {
  2: 'kitten (orange)',
  3: 'kitten (orange)',
  5: 'dog (brown)',
  9: 'owl (green)',
};

const buttonClass = (highContrast: boolean) =>
  `min-h-10 rounded-full border px-4 py-2 transition ${
    highContrast
      ? 'border-white bg-[#111] text-white'
      : 'border-[#cbd5e1] bg-white text-[#1f2937] hover:bg-[#eaf4ec]'
  }`;

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onBack }) => {
  const [gridN, setGridN] = useState(2);
  const [tiles, setTiles] = useState<string[]>([]);
  const [blankIndex, setBlankIndex] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [selectedImage, setSelectedImage] = useState(IMAGE_MAP[3]);
  const [easyMode, setEasyMode] = useState(true);

  const timerRef = useRef<number | undefined>(undefined);
  const movesRef = useRef(0);
  const secondsRef = useRef(0);

  const buildTiles = (size: number, easy = false): string[] => {
    const total = size * size;
    const values = Array.from({ length: total - 1 }, (_, index) => String(index + 1));
    let tilesArray = [...values, ''];

    if (easy) {
      for (let i = 0; i < 5; i += 1) {
        const blank = tilesArray.indexOf('');
        const row = Math.floor(blank / size);
        const col = blank % size;
        const neighbors: number[] = [];

        if (row > 0) neighbors.push(blank - size);
        if (row < size - 1) neighbors.push(blank + size);
        if (col > 0) neighbors.push(blank - 1);
        if (col < size - 1) neighbors.push(blank + 1);

        const target = neighbors[Math.floor(Math.random() * neighbors.length)];
        [tilesArray[blank], tilesArray[target]] = [tilesArray[target], tilesArray[blank]];
      }

      if (isSolved(tilesArray, size)) {
        return buildTiles(size, easy);
      }

      return tilesArray;
    }

    do {
      tilesArray = shuffle(tilesArray);
    } while (!isSolvable(tilesArray, size) || isSolved(tilesArray, size));

    return tilesArray;
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

  const startGame = () => {
    const newTiles = buildTiles(gridN, easyMode);
    const image = IMAGE_MAP[gridN] || IMAGE_MAP[5];
    const label = IMAGE_LABEL[gridN] || 'image';

    clearTimers();
    setTiles(newTiles);
    setBlankIndex(newTiles.indexOf(''));
    setMoves(0);
    setSeconds(0);
    movesRef.current = 0;
    secondsRef.current = 0;
    setSelectedImage(image);
    setMessage(`Game started with the ${label}. Use arrow keys or click adjacent tiles.`);
    speak('Game started', soundOn);

    startTimer();
  };

  const endGame = (finalMoves: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMessage(`Solved in ${finalMoves} moves and ${secondsRef.current} seconds!`);
    speak('Puzzle solved', soundOn);
  };

  const clickTile = (index: number) => {
    if (!isAdjacent(index, blankIndex, gridN)) return;

    const tileValue = tiles[index];
    const newTiles = [...tiles];
    [newTiles[index], newTiles[blankIndex]] = [
      newTiles[blankIndex],
      newTiles[index],
    ];

    const nextMoves = movesRef.current + 1;
    movesRef.current = nextMoves;
    setTiles(newTiles);
    setBlankIndex(index);
    setMoves(nextMoves);
    speak(`Moved tile ${tileValue}`, soundOn);

    if (isSolved(newTiles, gridN)) {
      endGame(nextMoves);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!tiles.length) return;

      let target = -1;
      const row = Math.floor(blankIndex / gridN);
      const col = blankIndex % gridN;

      switch (event.key) {
        case 'ArrowUp':
          if (row < gridN - 1) target = blankIndex + gridN;
          break;
        case 'ArrowDown':
          if (row > 0) target = blankIndex - gridN;
          break;
        case 'ArrowLeft':
          if (col < gridN - 1) target = blankIndex + 1;
          break;
        case 'ArrowRight':
          if (col > 0) target = blankIndex - 1;
          break;
        default:
          break;
      }

      if (target >= 0) {
        event.preventDefault();
        clickTile(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tiles, blankIndex, gridN]);

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
          Puzzle Game
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
          className={`mx-auto grid w-full max-w-[420px] gap-1.5 rounded-3xl p-3 shadow-[0_8px_20px_rgba(49,99,66,0.08)] max-[430px]:p-2.5 ${
            highContrast ? 'bg-[#111]' : 'bg-white'
          }`}
          style={{ gridTemplateColumns: `repeat(${gridN}, 1fr)` }}
        >
          {tiles.map((tile, index) => (
            <button
              key={index}
              className={`aspect-square rounded-[14px] border-2 bg-[#eef7ef] bg-no-repeat text-2xl font-bold text-[#1b1c1c] transition hover:-translate-y-px hover:border-[#316342] ${
                tile === ''
                  ? 'cursor-default border-dashed border-[#d1d5db] bg-[#f8fafc]'
                  : 'cursor-pointer border-[#d1d5db]'
              }`}
              onClick={() => clickTile(index)}
              disabled={tile === ''}
              aria-label={tile === '' ? 'Empty space' : `Puzzle tile ${tile}`}
              role="gridcell"
              tabIndex={tile === '' ? -1 : 0}
              style={
                tile !== ''
                  ? {
                      backgroundImage: `url(${selectedImage})`,
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

        <div className={`min-h-[52px] rounded-[18px] p-4 text-lg leading-6 shadow-sm ${highContrast ? 'bg-[#111] text-white' : 'bg-white text-[#414942]'}`}>
          {message}
        </div>
      </main>
    </div>
  );
};

export default PuzzleGame;
