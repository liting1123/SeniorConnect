import { Bell, CheckCircle2, Gamepad2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addGamePoint,
  getStoredUser,
  getUserStorageIdentity,
  setCachedUserPoints,
  type AppUser,
} from '../services/backend';
import GameLauncher from './GameLauncher';
import MemoryGame from './MemoryGame';
import PuzzleGame from './PuzzleGame';

type CardData = {
  id: number;
  titleKey: string;
  messageKey: string;
  revealed: boolean;
};

const requiredReveals = 3;
const GAME_TIME_ZONE = 'Asia/Singapore';

const initialCards: CardData[] = [
  { id: 1, titleKey: 'cardHelloTitle', messageKey: 'cardHelloMessage', revealed: false },
  { id: 2, titleKey: 'cardSmileTitle', messageKey: 'cardSmileMessage', revealed: false },
  { id: 3, titleKey: 'cardFriendTitle', messageKey: 'cardFriendMessage', revealed: false },
  { id: 4, titleKey: 'cardStrongTitle', messageKey: 'cardStrongMessage', revealed: false },
  { id: 5, titleKey: 'cardSunnyTitle', messageKey: 'cardSunnyMessage', revealed: false },
  { id: 6, titleKey: 'cardEasyTitle', messageKey: 'cardEasyMessage', revealed: false },
];

type StoredGameState = {
  dateKey: string;
  revealedIds: number[];
  rewardClaimed: boolean;
};

type GameMode = 'menu' | 'memory' | 'puzzle';

type PlayableGameMode = Exclude<GameMode, 'menu'>;

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

export default function GameScreen({
  highContrast,
  onToggleHighContrast,
  onGamePlayCheckIn,
  shouldPromptCheckIn = false,
}: {
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onGamePlayCheckIn?: () => Promise<void> | void;
  shouldPromptCheckIn?: boolean;
}) {
  const { t } = useTranslation();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [confirmed, setConfirmed] = useState(false);
  const [isSavingPoint, setIsSavingPoint] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [showCheckInPrompt, setShowCheckInPrompt] = useState(false);
  const [pendingGameMode, setPendingGameMode] = useState<PlayableGameMode | null>(null);
  const [isPreparingGame, setIsPreparingGame] = useState(false);
  const rewardStartedRef = useRef(false);
  const revealedCount = cards.filter((card) => card.revealed).length;
  const canConfirm = revealedCount >= requiredReveals;

  const status = useMemo(() => {
    if (isSavingPoint) {
      return t('savingGamePoint');
    }

    if (confirmed) {
      return t('gamePointEarned');
    }

    if (revealedCount === 0) {
      return t('chooseAnyCard');
    }

    if (revealedCount < requiredReveals) {
      return t('revealedCards', { count: revealedCount, required: requiredReveals });
    }

    return t('pressImOk');
  }, [confirmed, isSavingPoint, revealedCount, t]);

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
      alert(t('loginAgainPlay'));
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
      alert(error instanceof Error && error.message ? error.message : t('unableGamePoint'));
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

  const launchSelectedGame = async (mode: PlayableGameMode, checkInBeforePlay: boolean) => {
    if (isPreparingGame) {
      return;
    }

    setIsPreparingGame(true);

    try {
      if (checkInBeforePlay) {
        await onGamePlayCheckIn?.();
      }

      setGameMode(mode);
      setShowCheckInPrompt(false);
      setPendingGameMode(null);
    } finally {
      setIsPreparingGame(false);
    }
  };

  const handleSelectGame = async (mode: PlayableGameMode) => {
    if (shouldPromptCheckIn) {
      setPendingGameMode(mode);
      setShowCheckInPrompt(true);
      return;
    }

    await launchSelectedGame(mode, true);
  };

  const handlePromptCheckInNow = async () => {
    if (!pendingGameMode) {
      return;
    }

    await launchSelectedGame(pendingGameMode, true);
  };

  const handlePromptContinue = async () => {
    if (!pendingGameMode) {
      return;
    }

    await launchSelectedGame(pendingGameMode, false);
  };

  if (gameMode === 'menu') {
    return (
      <div className="relative h-full">
        <GameLauncher onSelect={handleSelectGame} highContrast={highContrast} />
        {showCheckInPrompt && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
            <div className="w-full rounded-[28px] bg-white p-6 text-center shadow-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f3e8] text-[#416642]">
                <Bell className="h-9 w-9" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-[#07122e]">{t('checkInReminder')}</h2>
              <p className="mt-3 text-xl leading-7 text-gray-600">{t('pleaseCompleteCheckIn')}</p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handlePromptCheckInNow}
                  disabled={isPreparingGame}
                  className="flex h-14 items-center justify-center rounded-full bg-[#18833b] text-xl font-bold text-white active:scale-95 disabled:cursor-wait disabled:opacity-70"
                >
                  {isPreparingGame ? t('checking') : t('checkInNow')}
                </button>
                <button
                  onClick={handlePromptContinue}
                  disabled={isPreparingGame}
                  className="flex h-14 items-center justify-center rounded-full border-2 border-[#416642] bg-white text-xl font-bold text-[#416642] active:scale-95 disabled:cursor-wait disabled:opacity-70"
                >
                  {t('continue')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameMode === 'memory') {
    return <MemoryGame onBack={() => setGameMode('menu')} highContrast={highContrast} onToggleHighContrast={onToggleHighContrast} />;
  }

  return <PuzzleGame onBack={() => setGameMode('menu')} />;
}
