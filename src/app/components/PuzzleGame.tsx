import { useEffect, useRef, useState } from 'react';

type PuzzleGameProps = {
  onBack: () => void;
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function countInversions(values: number[]): number {
  let count = 0;
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] > values[j]) count++;
    }
  }
  return count;
}

function isSolvable(array: string[], size: number): boolean {
  const numbers = array.filter((item) => item !== '').map((item) => Number(item));
  const inversions = countInversions(numbers);
  if (size % 2 === 1) {
    return inversions % 2 === 0;
  }

  const blankRowFromBottom = size - Math.floor(array.indexOf('') / size);
  return (blankRowFromBottom % 2 === 0) !== (inversions % 2 === 0);
}

function isSolved(array: string[], size: number): boolean {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] !== String(i + 1)) return false;
  }
  return array[array.length - 1] === '';
}

function speak(text: string, soundOn: boolean) {
  if (!soundOn) return;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

export default function PuzzleGame({ onBack }: PuzzleGameProps) {
  const [size, setSize] = useState(4);
  const [tiles, setTiles] = useState<string[]>([]);
  const [blankIndex, setBlankIndex] = useState(0);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const timerRef = useRef<number | undefined>(undefined);

  const buildTiles = (boardSize: number): string[] => {
    const total = boardSize * boardSize;
    const values = Array.from({ length: total - 1 }, (_, index) => String(index + 1));
    const board = [...values, ''];

    do {
      shuffle(board);
    } while (!isSolvable(board, boardSize) || isSolved(board, boardSize));

    return board;
  };

  const startGame = () => {
    const newTiles = buildTiles(size);
    setTiles(newTiles);
    setBlankIndex(newTiles.indexOf(''));
    setMoves(0);
    setSeconds(0);
    setMessage('Slide the tiles to solve the puzzle.');
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
  };

  const swapTiles = (index: number) => {
    const newTiles = [...tiles];
    [newTiles[index], newTiles[blankIndex]] = [newTiles[blankIndex], newTiles[index]];
    setTiles(newTiles);
    setBlankIndex(index);
    setMoves((value) => value + 1);
    return newTiles;
  };

  const isAdjacent = (a: number, b: number): boolean => {
    const rowA = Math.floor(a / size);
    const colA = a % size;
    const rowB = Math.floor(b / size);
    const colB = b % size;
    return Math.abs(rowA - rowB) + Math.abs(colA - colB) === 1;
  };

  const clickTile = (index: number) => {
    if (!isAdjacent(index, blankIndex)) return;
    const tileValue = tiles[index];
    const newTiles = swapTiles(index);
    setMessage(`Moved tile ${tileValue}`);
    speak(`Moved tile ${tileValue}`, soundOn);
    if (isSolved(newTiles, size)) {
      endGame();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!tiles.length) return;
    let target = -1;
    const row = Math.floor(blankIndex / size);
    const col = blankIndex % size;

    switch (event.key) {
      case 'ArrowUp':
        if (row < size - 1) target = blankIndex + size;
        break;
      case 'ArrowDown':
        if (row > 0) target = blankIndex - size;
        break;
      case 'ArrowLeft':
        if (col < size - 1) target = blankIndex + 1;
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

  const endGame = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setMessage(`Solved in ${moves} moves and ${seconds} seconds!`);
    speak('Puzzle solved', soundOn);
  };

  useEffect(() => {
    startGame();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [size, tiles, blankIndex]);

  return (
    <div className={`h-full overflow-y-auto ${highContrast ? 'bg-black text-white' : 'bg-[#fbf9f8] text-[#1b1c1c]'}`}>
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-5 py-3 min-[390px]:h-16 min-[390px]:px-6">
          <div>
            <h1 className="text-xl font-bold text-[#316342]">Puzzle Game</h1>
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#1b1c1c]">Board size:</span>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="rounded-xl border border-[#d1d5db] bg-white px-3 py-2"
                >
                  <option value={3}>3x3</option>
                  <option value={4}>4x4</option>
                  <option value={5}>5x5</option>
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
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-[#316342]">Moves</span>
            <div className="mt-2 text-3xl font-bold">{moves}</div>
          </div>
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <span className="text-sm font-semibold text-[#316342]">Time</span>
            <div className="mt-2 text-3xl font-bold">{seconds}s</div>
          </div>
        </section>

        <section className="grid gap-2 rounded-[28px] bg-white p-4 shadow-sm" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
          {tiles.map((tile, index) => (
            <button
              key={index}
              type="button"
              onClick={() => clickTile(index)}
              disabled={tile === ''}
              className={`aspect-square rounded-[20px] border-2 p-0 text-2xl font-bold transition ${
                tile === '' ? 'border-dashed border-[#9ca3af] bg-[#f3f4f6]' : 'border-[#d1d5db] bg-[#f8fafc] hover:border-[#316342] hover:bg-[#e1ffe5]'
              }`}
            >
              {tile}
            </button>
          ))}
        </section>

        <section className="rounded-[28px] bg-white p-4 shadow-sm">
          <p className="text-base text-[#414942]">{message}</p>
        </section>
      </main>
    </div>
  );
}
