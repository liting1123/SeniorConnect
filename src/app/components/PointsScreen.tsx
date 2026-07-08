import { Calendar, Car, CheckCircle2, Clock3, Coffee, Gift, Lock, ShoppingCart, Star, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getCachedUserPoints,
  getUserStorageIdentity,
  getPoints,
  getStoredUser,
  redeemPoints,
  setCachedUserPoints,
  type AppUser,
} from '../services/backend';

type RedemptionHistoryItem = {
  id: string;
  title: string;
  cost: number;
  redeemedAt: string;
};

function getRewardHistoryKey(user: AppUser) {
  return `careconnect.rewardHistory.${getUserStorageIdentity(user)}`;
}

function getRewardHistory(user: AppUser): RedemptionHistoryItem[] {
  const rawHistory = localStorage.getItem(getRewardHistoryKey(user));

  if (!rawHistory) {
    return [];
  }

  try {
    const parsedHistory = JSON.parse(rawHistory);
    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch {
    localStorage.removeItem(getRewardHistoryKey(user));
    return [];
  }
}

function saveRewardHistory(user: AppUser, history: RedemptionHistoryItem[]) {
  localStorage.setItem(getRewardHistoryKey(user), JSON.stringify(history));
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

export default function PointsScreen() {
  const { t } = useTranslation();
  const [rewardHistory, setRewardHistory] = useState(() => {
    const user = getStoredUser();
    return user ? getRewardHistory(user) : [];
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
      const nextPoints = await redeemPoints(user, cost);
      setPoints(nextPoints);
      setCachedUserPoints(user, nextPoints);
      window.dispatchEvent(
        new CustomEvent('careconnect-points-updated', {
          detail: { uid: user.uid, points: nextPoints },
        }),
      );
      const nextHistory = [
        {
          id: `${Date.now()}-${title}`,
          title,
          cost,
          redeemedAt: new Date().toISOString(),
        },
        ...getRewardHistory(user),
      ];
      saveRewardHistory(user, nextHistory);
      setRewardHistory(nextHistory);
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
      setPoints(await getPoints(user));
    } catch (error) {
      setError(error instanceof Error ? error.message : t('unableLoadPoints'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPoints();
    const user = getStoredUser();

    if (user) {
      setRewardHistory(getRewardHistory(user));
    }

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
    <div className="h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]">
      <main className="flex flex-col gap-7 px-5 pb-8 pt-5 min-[390px]:gap-8 min-[390px]:px-6">
        <section className="rounded-[30px] bg-white px-5 py-7 text-center shadow-[0_10px_28px_rgba(49,99,66,0.08)] min-[390px]:rounded-[34px] min-[390px]:py-8">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#eda256] text-[#6b3a12] min-[390px]:h-32 min-[390px]:w-32">
            <User className="h-16 w-16 fill-current stroke-[1.5] min-[390px]:h-20 min-[390px]:w-20" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Star className="h-9 w-9 fill-[#eda256] text-[#eda256] min-[390px]:h-10 min-[390px]:w-10" />
            <p className="text-[38px] font-black leading-none text-[#4a6b4b] min-[390px]:text-[42px]">
              {points} {t('points')}
            </p>
          </div>
          <p className="mx-auto mt-4 max-w-[260px] text-center text-lg font-medium leading-7 text-[#5d655d]">
            {t('pointsSummaryMessage')}
          </p>
          {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
        </section>

        <section className="flex items-center justify-between rounded-[26px] bg-[#5d7f61] px-5 py-5 shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[30px]">
          <div className="flex items-center gap-4 text-white">
            <Calendar className="h-9 w-9 fill-current stroke-[1.5]" />
            <div>
              <h2 className="text-xl font-bold leading-7">{t('dailyCheckIn')}</h2>
              <p className="text-lg font-semibold leading-6 opacity-80">{t('logInToday')}</p>
            </div>
          </div>
          <div className="rounded-full bg-[#e1ffe5] px-5 py-3 text-lg font-black text-[#5d7f61] shadow-sm">
            +5
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-[24px] font-black leading-8 text-[#151515]">
              {t('redeemRewards')}
            </h2>
            <button
              type="button"
              onClick={() => setShowRewardHistory(true)}
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#e7f3e8] px-4 text-base font-black text-[#416642] active:scale-95"
              aria-label={t('viewRewardHistory')}
            >
              <Gift className="h-5 w-5" />
              {t('history')}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <RewardCard
              icon={<ShoppingCart className="h-8 w-8" />}
              title="$5 NTUC Voucher"
              cost={50}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
              isRedeeming={redeemingReward === '$5 NTUC Voucher'}
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
              onRedeem={handleRedeem}
            />
            <RewardCard
              icon={<Coffee className="h-8 w-8" />}
              title="1-for-1 Kaya Butter Toast Set (Fun Toast)"
              cost={200}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
              isRedeeming={redeemingReward === '1-for-1 Kaya Butter Toast Set (Fun Toast)'}
              onRedeem={handleRedeem}
            />
          </div>
        </section>
      </main>
      {successReward === '$5 NTUC Voucher' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-[340px] rounded-[28px] bg-white p-6 text-center]">
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

function RewardCard({
  icon,
  title,
  cost,
  userPoints,
  pointsLabel,
  redeemLabel,
  isRedeeming,
  onRedeem,
}: {
  icon: React.ReactNode;
  title: string;
  cost: number;
  userPoints: number;
  pointsLabel: string;
  redeemLabel: string;
  isRedeeming: boolean;
  onRedeem: (title: string, cost: number) => void;
}) {
  const canRedeem = userPoints >= cost;

  return (
    <div
      className={`flex items-center gap-3 rounded-[22px] px-4 py-3 transition-colors ${
        canRedeem ? 'bg-[#f4f2f2]' : 'bg-[#f4f2f2] opacity-70'
      }`}
    >
      <div
        className={`flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-2xl ${
          canRedeem ? 'bg-white text-[#4a6b4b]' : 'bg-white text-gray-400'
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`text-lg font-black leading-6 ${canRedeem ? 'text-[#151515]' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`mt-0.5 text-sm font-black leading-5 ${canRedeem ? 'text-[#4a6b4b]' : 'text-gray-400'}`}>
          {cost} {pointsLabel}
        </p>
      </div>
      <button
        type="button"
        disabled={!canRedeem || isRedeeming}
        onClick={() => onRedeem(title, cost)}
        className={`flex min-w-[82px] items-center justify-center rounded-full px-4 py-2.5 text-sm font-black uppercase leading-5 transition-transform ${
          canRedeem
            ? 'bg-[#416642] text-white active:scale-95'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        <span className="sr-only">{canRedeem ? 'Available' : 'Locked'}</span>
        {canRedeem ? <CheckCircle2 className="hidden h-4 w-4" /> : <Lock className="hidden h-4 w-4" />}
        {isRedeeming ? '...' : redeemLabel}
      </button>
    </div>
  );
}
