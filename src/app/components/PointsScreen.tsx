import { Car, CheckCircle2, ChevronRight, Clock3, Coffee, Gamepad2, Gift, Lock, ShoppingCart, Star, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getCachedUserPoints,
  getPoints,
  getRewardHistory,
  getStoredUser,
  getUserStorageIdentity,
  redeemPoints,
  setCachedUserPoints,
  type AppUser,
  type RewardHistoryItem,
} from '../services/backend';

function getRewardHistoryKey(user: AppUser) {
  return `careconnect.rewardHistory.${getUserStorageIdentity(user)}`;
}

function getStoredRewardHistory(user: AppUser): RewardHistoryItem[] {
  const storedHistory = localStorage.getItem(getRewardHistoryKey(user));

  if (!storedHistory) {
    return [];
  }

  try {
    const parsedHistory = JSON.parse(storedHistory);
    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch {
    return [];
  }
}

function storeRewardHistory(user: AppUser, history: RewardHistoryItem[]) {
  localStorage.setItem(getRewardHistoryKey(user), JSON.stringify(history));
}

function mergeRewardHistory(...historyGroups: RewardHistoryItem[][]) {
  const uniqueHistory = new Map<string, RewardHistoryItem>();

  historyGroups.flat().forEach((item) => {
    if (item?.id && item?.title && item?.redeemedAt) {
      uniqueHistory.set(item.id, item);
    }
  });

  return [...uniqueHistory.values()].sort(
    (first, second) => new Date(second.redeemedAt).getTime() - new Date(first.redeemedAt).getTime(),
  );
}

function formatRedeemedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString([], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function PointsScreen({
  highContrast = false,
  onSelectGame,
}: {
  highContrast?: boolean;
  onSelectGame?: (mode: 'memory' | 'puzzle') => void;
}) {
  const { t } = useTranslation();
  const [rewardHistory, setRewardHistory] = useState<RewardHistoryItem[]>(() => {
    const user = getStoredUser();
    return user ? getStoredRewardHistory(user) : [];
  });
  const [points, setPoints] = useState(() => {
    const user = getStoredUser();
    return user ? getCachedUserPoints(user) : 0;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [redeemingReward, setRedeemingReward] = useState('');
  const [successReward, setSuccessReward] = useState('');
  const [showRewardHistory, setShowRewardHistory] = useState(false);
  const [error, setError] = useState('');

  const handleRedeem = async (title: string, cost: number) => {
    const user = getStoredUser();

    if (!user) {
      setError(t('loginAgainRedeemRewards'));
      return;
    }

    setError('');
    setRedeemingReward(title);

    try {
      const { points: nextPoints, redemption } = await redeemPoints(user, cost, title);
      setPoints(nextPoints);
      setCachedUserPoints(user, nextPoints);
      window.dispatchEvent(
        new CustomEvent('careconnect-points-updated', {
          detail: { uid: user.uid, points: nextPoints },
        }),
      );
      if (redemption) {
        setRewardHistory((currentHistory) => {
          const nextHistory = mergeRewardHistory([redemption], currentHistory, getStoredRewardHistory(user));
          storeRewardHistory(user, nextHistory);
          return nextHistory;
        });
      } else {
        const nextHistory = mergeRewardHistory(await getRewardHistory(user), getStoredRewardHistory(user));
        storeRewardHistory(user, nextHistory);
        setRewardHistory(nextHistory);
      }
      setSuccessReward(title);
    } catch (error) {
      setError(error instanceof Error ? error.message : t('unableRedeemReward'));
    } finally {
      setRedeemingReward('');
    }
  };

  const loadPoints = async () => {
    const user = getStoredUser();

    if (!user) {
      setPoints(0);
      setRewardHistory([]);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const [nextPoints, nextRewardHistory] = await Promise.all([
        getPoints(user),
        getRewardHistory(user),
      ]);
      const mergedRewardHistory = mergeRewardHistory(nextRewardHistory, getStoredRewardHistory(user));
      setPoints(nextPoints);
      storeRewardHistory(user, mergedRewardHistory);
      setRewardHistory(mergedRewardHistory);
    } catch (error) {
      setError(error instanceof Error ? error.message : t('unableLoadPoints'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPoints();

    const handlePointsUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ points?: number }>).detail;

      if (typeof detail?.points === 'number') {
        setPoints(detail.points);
      }
    };

    window.addEventListener('careconnect-points-updated', handlePointsUpdate);

    return () => {
      window.removeEventListener('careconnect-points-updated', handlePointsUpdate);
    };
  }, []);

  return (
    <div className={`h-full overflow-y-auto ${highContrast ? 'bg-black text-white' : 'bg-[#fcfcfa] text-[#1b1c1c]'}`}>
      <main className="flex flex-col gap-4 px-4 pb-7 pt-5 min-[390px]:px-5">
        <header className="flex items-start gap-4 px-1 pb-1">
          <Gift className={`mt-1 h-10 w-10 stroke-[2.3] ${highContrast ? 'text-white' : 'text-[#34733b]'}`} />
          <div>
            <h1 className={`text-[30px] font-black leading-9 ${highContrast ? 'text-white' : 'text-[#0b4f24]'}`}>{t('Play & Earn')}</h1>
            <p className={`mt-1 text-base leading-6 ${highContrast ? 'text-white/85' : 'text-[#515151]'}`}>{t('rewardsSubtitle')}</p>
          </div>
        </header>

        <section className={`relative flex items-center gap-4 overflow-hidden rounded-[24px] border px-5 py-6 shadow-sm ${highContrast ? 'border-white bg-black' : 'border-[#e1e9dc] bg-[#f9fbf5]'}`}>
          <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${highContrast ? 'border border-white' : 'bg-[#e5efdc] text-[#005521]'}`}>
            <User className="h-12 w-12 fill-current stroke-[1.5]" />
          </div>
          <div className="min-w-0 flex-1 pr-10">
            <p className={`text-base font-semibold ${highContrast ? 'text-white' : 'text-[#505050]'}`}>{t('youHave')}</p>
            <p className={`mt-1 flex items-end gap-2 font-black leading-none ${highContrast ? 'text-white' : 'text-[#005522]'}`}>
              <span className="text-[48px]">{points}</span><span className="pb-1 text-2xl">{t('points')}</span>
            </p>
            <p className={`mt-2 text-sm ${highContrast ? 'text-white/85' : 'text-[#555]'}`}>{t('pointsSummaryShort')}</p>
          </div>
          <Star className="absolute right-4 top-1/2 h-14 w-14 -translate-y-1/2 fill-[#ffc33d] text-[#eea817]" />
          {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        </section>

        <section className={`rounded-[24px] border p-3 shadow-sm ${highContrast ? 'border-white' : 'border-[#eceeeb] bg-white'}`}>
          <h2 className="flex items-center gap-3 px-2 py-2 text-xl font-black"><Gamepad2 className="h-6 w-6 text-[#34733b]" />{t("Let's Play Game")}</h2>
          <div className={`mt-1 overflow-hidden rounded-[20px] border ${highContrast ? 'border-white' : 'border-[#e8e8e5]'}`}>
            <GameRow emoji="🧠" title={t('memoryGame')} description={t('memoryGameDescriptionShort')} onPlay={() => onSelectGame?.('memory')} highContrast={highContrast} playLabel={t('play')} />
            <GameRow emoji="🧩" title={t('puzzleGame')} description={t('puzzleGameDescriptionShort')} onPlay={() => onSelectGame?.('puzzle')} highContrast={highContrast} playLabel={t('play')} />
          </div>
        </section>

        <section className={`rounded-[24px] border p-3 shadow-sm ${highContrast ? 'border-white' : 'border-[#eceeeb] bg-white'}`}>
          <div className="flex items-center justify-between gap-3 px-2 py-2">
            <h2 className={`flex items-center gap-3 text-xl font-black ${highContrast ? 'text-white' : 'text-[#151515]'}`}><Gift className="h-6 w-6 text-[#34733b]" />
              {t('redeemRewards')}
            </h2>
            <button
              type="button"
              onClick={() => setShowRewardHistory(true)}
              className={`flex shrink-0 items-center gap-1 text-base font-semibold active:scale-95 ${highContrast ? 'text-white' : 'text-[#17602b]'}`}
              aria-label={t('viewRewardHistory')}
            >
              {t('history')}
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className={`mt-1 overflow-hidden rounded-[20px] border ${highContrast ? 'border-white' : 'border-[#e8e8e5]'}`}>
            <RewardCard
              icon={<ShoppingCart className="h-8 w-8" />}
              title="$5 NTUC Voucher"
              cost={50}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
              isRedeeming={redeemingReward === '$5 NTUC Voucher'}
              highContrast={highContrast}
              onRedeem={handleRedeem}
            />
            <RewardCard
              icon={<Car className="h-8 w-8" />}
              title="$10 Grab Voucher"
              cost={100}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
              isRedeeming={redeemingReward === '$10 Grab Voucher'}
              highContrast={highContrast}
              onRedeem={handleRedeem}
            />
            <RewardCard
              icon={<Coffee className="h-8 w-8" />}
              title="1-for-1 Kaya Butter Toast Set (Fun Toast)"
              cost={150}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
              isRedeeming={redeemingReward === '1-for-1 Kaya Butter Toast Set (Fun Toast)'}
              highContrast={highContrast}
              onRedeem={handleRedeem}
            />
          </div>
        </section>
      </main>
      {successReward === '$5 NTUC Voucher' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[340px] rounded-[28px] bg-white p-6 text-center">
            <button
              type="button"
              onClick={() => setSuccessReward('')}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ee] text-[#416642] active:scale-95"
              aria-label={t('closeRewardPopup')}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f3e8] text-[#416642]">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="mt-5 text-3xl font-black leading-9 text-[#151515]">{t('congrats')}</h2>
            <p className="mt-3 text-xl font-bold leading-7 text-[#416642]">
              {t('ntucVoucherMessage')}
            </p>
            <button
              type="button"
              onClick={() => setSuccessReward('')}
              className="mt-6 h-12 w-full rounded-full bg-[#416642] text-lg font-black text-white active:scale-95"
            >
              {t('done')}
            </button>
          </div>
        </div>
      )}
      {showRewardHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[360px] rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7f3e8] text-[#416642]">
                  <Gift className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-black leading-7 text-[#151515]">{t('rewardHistory')}</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowRewardHistory(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ee] text-[#416642] active:scale-95"
                aria-label={t('closeRewardHistory')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {rewardHistory.length > 0 ? (
              <div className="mt-5 max-h-[360px] space-y-3 overflow-y-auto pr-1">
                {rewardHistory.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-[#f4f2f2] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-base font-black leading-6 text-[#151515]">{item.title}</p>
                        <p className="mt-1 text-sm font-bold leading-5 text-[#5d655d]">
                          {t('pointsRedeemed', { points: item.cost })}
                        </p>
                      </div>
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-[#416642]" />
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold leading-5 text-[#6d746d]">
                      <Clock3 className="h-4 w-4" />
                      {formatRedeemedAt(item.redeemedAt)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-[#f4f2f2] p-5 text-center">
                <p className="text-base font-bold leading-6 text-[#5d655d]">
                  {t('noRedeemedRewardsYet')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GameRow({ emoji, title, description, playLabel, highContrast, onPlay }: {
  emoji: string;
  title: string;
  description: string;
  playLabel: string;
  highContrast: boolean;
  onPlay: () => void;
}) {
  return (
    <div className={`flex items-center gap-3 border-b px-4 py-4 last:border-b-0 ${highContrast ? 'border-white' : 'border-[#e8e8e5]'}`}>
      <span className="text-4xl" aria-hidden="true">{emoji}</span>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-black">{title}</h3>
        <p className={`mt-1 text-sm ${highContrast ? 'text-white/80' : 'text-[#555]'}`}>{description}</p>
      </div>
      <button type="button" onClick={onPlay} className={`min-w-[82px] rounded-[16px] border-2 px-4 py-2.5 text-base font-black active:scale-95 ${highContrast ? 'border-white text-white' : 'border-[#cfe0c6] bg-[#f3f8ee] text-[#075524]'}`}>
        {playLabel}
      </button>
    </div>
  );
}

function RewardCard({
  icon,
  title,
  cost,
  userPoints,
  pointsLabel,
  redeemLabel,
  isRedeeming,
  highContrast,
  onRedeem,
}: {
  icon: React.ReactNode;
  title: string;
  cost: number;
  userPoints: number;
  pointsLabel: string;
  redeemLabel: string;
  isRedeeming: boolean;
  highContrast: boolean;
  onRedeem: (title: string, cost: number) => void;
}) {
  const canRedeem = userPoints >= cost;

  return (
    <div
      className={`flex items-center gap-3 border-b px-4 py-4 transition-colors last:border-b-0 ${
        highContrast ? 'border-white bg-black' : 'border-[#e8e8e5] bg-white'
      }`}
    >
      <div
        className={`flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-2xl ${
          highContrast ? 'border border-white bg-black text-white' : 'bg-[#f2efff] text-[#7654c7]'
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`text-base font-black leading-6 ${highContrast ? 'text-white' : 'text-[#151515]'}`}>
          {title}
        </h3>
        <p className={`mt-0.5 text-sm font-semibold leading-5 ${highContrast ? 'text-white/90' : 'text-[#17602b]'}`}>
          {cost} {pointsLabel}
        </p>
      </div>
      <button
        type="button"
        disabled={!canRedeem || isRedeeming}
        onClick={() => onRedeem(title, cost)}
        className={`flex min-w-[82px] items-center justify-center rounded-full px-4 py-2.5 text-sm font-black uppercase leading-5 transition-transform ${
          highContrast
            ? canRedeem
              ? 'bg-[#ffe452] text-black active:scale-95'
              : 'cursor-not-allowed border border-white bg-black text-white/45'
            : canRedeem
            ? 'border-2 border-[#bad4b2] bg-white text-[#075524] active:scale-95'
            : 'cursor-not-allowed border-2 border-gray-200 bg-gray-100 text-gray-400'
        }`}
      >
        <span className="sr-only">{canRedeem ? 'Available' : 'Locked'}</span>
        {canRedeem ? <CheckCircle2 className="hidden h-4 w-4" /> : <Lock className="hidden h-4 w-4" />}
        {isRedeeming ? '...' : redeemLabel}
      </button>
    </div>
  );
}
