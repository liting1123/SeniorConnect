import { Bell, CheckCircle2, Gamepad2, HeartHandshake } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  addGamePoint,
  getStoredUser,
  getUserStorageIdentity,
  setCachedUserPoints,
  type AppUser,
} from '../services/backend';

type CardData = {
  id: number;
  title: string;
  message: string;
  revealed: boolean;
};

const requiredReveals = 3;
const GAME_TIME_ZONE = 'Asia/Singapore';

const initialCards: CardData[] = [
  { id: 1, title: 'Hello', message: 'You are doing great today!', revealed: false },
  { id: 2, title: 'Smile', message: 'A gentle smile makes the day brighter.', revealed: false },
  { id: 3, title: 'Friend', message: 'A kind thought is waiting for you.', revealed: false },
  { id: 4, title: 'Strong', message: 'You are capable and calm.', revealed: false },
  { id: 5, title: 'Sunny', message: 'Little moments can feel warm and nice.', revealed: false },
  { id: 6, title: 'Easy', message: 'Tap each card to reveal a friendly note.', revealed: false },
];

type StoredGameState = {
  dateKey: string;
  revealedIds: number[];
  rewardClaimed: boolean;
};

function getSingaporeDateKey(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: GAME_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${partMap.year}-${partMap.month}-${partMap.day}`;
}

function getGameStateKey(user: AppUser) {
  return `game_${getUserStorageIdentity(user)}`;
}

function applyRevealedIds(revealedIds: number[]) {
  return initialCards.map((card) => ({
    ...card,
    revealed: revealedIds.includes(card.id),
  }));
}

function readStoredGameState(user: AppUser): StoredGameState | null {
  const rawState = localStorage.getItem(getGameStateKey(user));

  if (!rawState) {
    return null;
  }

  try {
    return JSON.parse(rawState) as StoredGameState;
  } catch {
    localStorage.removeItem(getGameStateKey(user));
    return null;
  }
}

function saveGameState(user: AppUser, cards: CardData[], rewardClaimed: boolean) {
  const revealedIds = cards.filter((card) => card.revealed).map((card) => card.id);
  const state: StoredGameState = {
    dateKey: getSingaporeDateKey(),
    revealedIds,
    rewardClaimed,
  };

  localStorage.setItem(getGameStateKey(user), JSON.stringify(state));
}

export default function GameScreen() {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [confirmed, setConfirmed] = useState(false);
  const [isSavingPoint, setIsSavingPoint] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const rewardStartedRef = useRef(false);
  const revealedCount = cards.filter((card) => card.revealed).length;
  const canConfirm = revealedCount >= requiredReveals;

  const status = useMemo(() => {
    if (isSavingPoint) {
      return 'Saving your game point...';
    }

    if (confirmed) {
      return '+1 point earned. Thank you for playing.';
    }

    if (revealedCount === 0) {
      return 'Choose any card to begin.';
    }

    if (revealedCount < requiredReveals) {
      return `Nice! You have revealed ${revealedCount} of ${requiredReveals} cards.`;
    }

    return "Great! You can now press I'm OK.";
  }, [confirmed, isSavingPoint, revealedCount]);

  useEffect(() => {
    const user = getStoredUser();

    if (!user) {
      return;
    }

    const storedState = readStoredGameState(user);

    if (!storedState || storedState.dateKey !== getSingaporeDateKey()) {
      localStorage.removeItem(getGameStateKey(user));
      setCards(initialCards);
      setRewardClaimed(false);
      setConfirmed(false);
      rewardStartedRef.current = false;
      return;
    }

    setCards(applyRevealedIds(storedState.revealedIds));
    setRewardClaimed(storedState.rewardClaimed);
    setConfirmed(storedState.rewardClaimed);
    rewardStartedRef.current = storedState.rewardClaimed;
  }, []);

  const updateRewardCount = async () => {
    if (rewardStartedRef.current) {
      return;
    }

    const user = getStoredUser();

    if (!user) {
      alert('Please log in again before playing.');
      return;
    }

    rewardStartedRef.current = true;
    setIsSavingPoint(true);

    try {
      const nextPoints = await addGamePoint(user);
      setCachedUserPoints(user, nextPoints);
      window.dispatchEvent(
        new CustomEvent('careconnect-points-updated', {
          detail: { uid: user.uid, points: nextPoints },
        }),
      );
      setRewardClaimed(true);
      setConfirmed(true);
      saveGameState(user, cards, true);
    } catch (error) {
      console.error('Game reward failed:', error);
      rewardStartedRef.current = false;
      alert(error instanceof Error ? error.message : 'Unable to add your game point right now. Please try again.');
    } finally {
      setIsSavingPoint(false);
    }
  };

  const handleCardClick = (cardId: number) => {
    if (rewardClaimed || isSavingPoint) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? { ...card, revealed: !card.revealed }
        : card,
    );

    setCards(updatedCards);

    const user = getStoredUser();

    if (user) {
      saveGameState(user, updatedCards, false);
    }
  };

  const handleConfirm = () => {
    if (!canConfirm || rewardClaimed || isSavingPoint) {
      return;
    }

    updateRewardCount();
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
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              aria-label={`${card.title} card`}
              onClick={() => handleCardClick(card.id)}
              disabled={rewardClaimed || isSavingPoint}
              className={`min-h-[136px] rounded-[24px] border-2 p-4 text-left shadow-sm transition active:scale-[0.98] min-[390px]:min-h-[152px] ${
                card.revealed
                  ? 'border-[#4a7c59] bg-[#e1ffe5]'
                  : rewardClaimed || isSavingPoint
                    ? 'cursor-not-allowed border-[#e3dfdd] bg-gray-100'
                    : 'border-[#e3dfdd] bg-white'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold leading-6 text-[#1b1c1c] min-[390px]:text-xl">
                  {card.title}
                </h2>
                {card.revealed && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#316342]" />}
              </div>
              <p className="text-sm leading-5 text-[#414942] min-[390px]:text-base min-[390px]:leading-6">
                {card.revealed ? card.message : 'Tap to reveal'}
              </p>
            </button>
          ))}
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
            {isSavingPoint
              ? 'Saving...'
              : rewardClaimed
                ? '+1 Point Earned'
                : "I'm OK"}
          </button>

          <p className="text-center text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            {status}
          </p>
        </section>
      </main>
    </div>
  );
}
