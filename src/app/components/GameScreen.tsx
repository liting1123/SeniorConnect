import { Bell, CheckCircle2, Gamepad2, HeartHandshake, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { addGamePoint, getStoredUser } from '../services/backend';

type CardData = {
  id: number;
  title: string;
  message: string;
};

const requiredReveals = 3;

const cards: CardData[] = [
  { id: 1, title: 'Hello', message: 'You are doing great today!' },
  { id: 2, title: 'Smile', message: 'A gentle smile makes the day brighter.' },
  { id: 3, title: 'Friend', message: 'A kind thought is waiting for you.' },
  { id: 4, title: 'Strong', message: 'You are capable and calm.' },
  { id: 5, title: 'Sunny', message: 'Little moments can feel warm and nice.' },
  { id: 6, title: 'Easy', message: 'Tap each card to reveal a friendly note.' },
];

export default function GameScreen() {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [isSavingPoint, setIsSavingPoint] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const revealedCount = revealedIds.length;
  const canConfirm = revealedCount >= requiredReveals;

  const status = useMemo(() => {
    if (confirmed) {
      return 'Thank you for checking in. Take a moment to breathe.';
    }

    if (revealedCount === 0) {
      return 'Choose any card to begin.';
    }

    if (revealedCount < requiredReveals) {
      return `Nice! You have revealed ${revealedCount} of ${requiredReveals} cards.`;
    }

    return "Great! You can now press I'm OK.";
  }, [confirmed, revealedCount]);

  const revealCard = (id: number) => {
    setConfirmed(false);
    setRevealedIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds;
      }

      return [...currentIds, id];
    });
  };

  const resetGame = () => {
    setConfirmed(false);
    setRewardClaimed(false);
    setRevealedIds([]);
  };

  const handleConfirm = async () => {
    if (!canConfirm || rewardClaimed || isSavingPoint) {
      return;
    }

    const user = getStoredUser();

    if (!user) {
      alert('Please log in again before playing.');
      return;
    }

    setIsSavingPoint(true);

    try {
      const nextPoints = await addGamePoint(user);
      localStorage.setItem(`careconnect.points.${user.uid}`, String(nextPoints));
      window.dispatchEvent(
        new CustomEvent('careconnect-points-updated', {
          detail: { uid: user.uid, points: nextPoints },
        }),
      );
      setRewardClaimed(true);
      setConfirmed(true);
    } catch (error) {
      console.error('Game reward failed:', error);
      alert(error instanceof Error ? error.message : 'Unable to add your game point right now. Please try again.');
    } finally {
      setIsSavingPoint(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]">
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-5 min-[390px]:h-16 min-[390px]:px-6">
          <div className="flex items-center gap-2 text-[#316342]">
            <Gamepad2 className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
            <span className="text-xl font-bold min-[390px]:text-2xl">Friendly Game</span>
          </div>
          <button
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#414942] transition-colors active:scale-95 active:bg-[#e4e2e1] min-[390px]:h-12 min-[390px]:w-12"
          >
            <Bell className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 py-5 min-[390px]:gap-6 min-[390px]:px-6 min-[390px]:py-7">
        <section className="rounded-[28px] bg-[#eef7ef] p-5 shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#316342] text-white min-[390px]:h-16 min-[390px]:w-16">
            <HeartHandshake className="h-8 w-8 min-[390px]:h-9 min-[390px]:w-9" />
          </div>
          <h1 className="text-3xl font-bold leading-10 text-[#316342] min-[390px]:text-4xl min-[390px]:leading-[48px]">
            Tap a Friendly Note
          </h1>
          <p className="mt-2 text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            Reveal 3 messages, then press <span className="font-bold">I'm OK</span>.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 min-[390px]:gap-4">
          {cards.map((card) => {
            const isRevealed = revealedIds.includes(card.id);

            return (
              <button
                key={card.id}
                type="button"
                aria-label={`${card.title} card`}
                onClick={() => revealCard(card.id)}
                className={`min-h-[136px] rounded-[24px] border-2 p-4 text-left shadow-sm transition active:scale-[0.98] min-[390px]:min-h-[152px] ${
                  isRevealed
                    ? 'border-[#4a7c59] bg-[#e1ffe5]'
                    : 'border-[#e3dfdd] bg-white'
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold leading-6 text-[#1b1c1c] min-[390px]:text-xl">
                    {card.title}
                  </h2>
                  {isRevealed && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#316342]" />}
                </div>
                <p className="text-sm leading-5 text-[#414942] min-[390px]:text-base min-[390px]:leading-6">
                  {isRevealed ? card.message : 'Tap to reveal'}
                </p>
              </button>
            );
          })}
        </section>

        <section className="flex flex-col gap-3">
          <button
            type="button"
            disabled={!canConfirm || isSavingPoint || rewardClaimed}
            onClick={handleConfirm}
            className={`w-full rounded-full px-5 py-4 text-xl font-bold text-white shadow-sm transition active:scale-95 disabled:active:scale-100 min-[390px]:py-5 min-[390px]:text-2xl ${
              confirmed
                ? 'bg-[#2e8b57]'
                : canConfirm
                  ? 'bg-[#316342]'
                  : 'cursor-not-allowed bg-gray-300'
            }`}
          >
            {isSavingPoint ? 'Saving...' : rewardClaimed ? '+1 Point Earned' : "I'm OK"}
          </button>

          <button
            type="button"
            onClick={resetGame}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d8d3d0] bg-white px-5 py-3 text-base font-bold text-[#414942] transition active:scale-95 min-[390px]:text-lg"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>

          <p className="text-center text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            {status}
          </p>
        </section>
      </main>
    </div>
  );
}
