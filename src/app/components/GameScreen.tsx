import { CheckCircle2, Gamepad2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addGamePoint,
  getStoredUser,
  getUserStorageIdentity,
  setCachedUserPoints,
  type AppUser,
} from '../services/backend';
import MemoryGame from './MemoryGame';
import PuzzleGame from './PuzzleGame';
import PointsScreen from './PointsScreen';

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
}: {
  highContrast: boolean;
  onToggleHighContrast: () => void;
  onGamePlayCheckIn?: () => Promise<void> | void;
}) {
  const { t } = useTranslation();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [confirmed, setConfirmed] = useState(false);
  const [isSavingPoint, setIsSavingPoint] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('menu');
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
      window.dispatchEvent(new CustomEvent('careconnect-points-earned', { detail: { amount: 1 } }));
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

  const launchSelectedGame = (mode: PlayableGameMode) => {
    setGameMode(mode);
  };

  const handleSelectGame = (mode: PlayableGameMode) => {
    launchSelectedGame(mode);
  };

  const handleGameComplete = () => {
    onGamePlayCheckIn?.();
  };

  if (gameMode === 'menu') {
    return <PointsScreen highContrast={highContrast} onSelectGame={handleSelectGame} />;
  }

  if (gameMode === 'memory') {
    return <MemoryGame onBack={() => setGameMode('menu')} highContrast={highContrast} onToggleHighContrast={onToggleHighContrast} onGameComplete={handleGameComplete} />;
  }

  return <PuzzleGame onBack={() => setGameMode('menu')} onGameComplete={handleGameComplete} />;
}
