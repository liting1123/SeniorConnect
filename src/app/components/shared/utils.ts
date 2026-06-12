/**
 * Shared utility functions for games
 */

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function speak(text: string, soundOn: boolean = true): void {
  if (!soundOn) return;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

export function countInversions(values: number[]): number {
  let count = 0;
  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      if (values[i] > values[j]) count += 1;
    }
  }
  return count;
}

export function isSolvable(array: string[], size: number): boolean {
  const numbers = array
    .filter((item) => item !== '')
    .map((item) => Number(item));
  const inversions = countInversions(numbers);

  if (size % 2 === 1) {
    return inversions % 2 === 0;
  }

  const blankRowFromBottom = size - Math.floor(array.indexOf('') / size);
  return (blankRowFromBottom % 2 === 0) !== (inversions % 2 === 0);
}

export function isSolved(array: string[], size: number): boolean {
  for (let i = 0; i < array.length - 1; i += 1) {
    if (array[i] !== String(i + 1)) return false;
  }
  return array[array.length - 1] === '';
}

export function isAdjacent(indexA: number, indexB: number, gridN: number): boolean {
  const rowA = Math.floor(indexA / gridN);
  const colA = indexA % gridN;
  const rowB = Math.floor(indexB / gridN);
  const colB = indexB % gridN;
  return Math.abs(rowA - rowB) + Math.abs(colA - colB) === 1;
}
