import { Calendar, Car, CheckCircle2, Lock, ShoppingCart, Star, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCachedUserPoints, getPoints, getStoredUser } from '../services/backend';

export default function PointsScreen() {
  const { t } = useTranslation();
  const [points, setPoints] = useState(() => {
    const user = getStoredUser();
    return user ? getCachedUserPoints(user) : 0;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPoints = async () => {
    const user = getStoredUser();

    if (!user) {
      setPoints(0);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setPoints(await getPoints(user));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to load points.');
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
            Great job! Keep staying active to earn more.
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
          <h2 className="mb-4 text-[24px] font-black leading-8 text-[#151515]">
            {t('redeemRewards')}
          </h2>
          <div className="flex flex-col gap-5">
            <RewardCard
              icon={<ShoppingCart className="h-8 w-8" />}
              title="$5 NTUC Voucher"
              cost={50}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
            />
            <RewardCard
              icon={<Car className="h-8 w-8" />}
              title="$10 Grab Voucher"
              cost={100}
              pointsLabel={t('points')}
              redeemLabel={t('redeem')}
              userPoints={points}
            />
          </div>
        </section>
      </main>
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
}: {
  icon: React.ReactNode;
  title: string;
  cost: number;
  userPoints: number;
  pointsLabel: string;
  redeemLabel: string;
}) {
  const canRedeem = userPoints >= cost;

  return (
    <div
      className={`flex items-center rounded-[28px] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] transition-colors ${
        canRedeem ? 'bg-[#f4f2f2]' : 'bg-[#f4f2f2] opacity-70'
      }`}
    >
      <div
        className={`mr-4 flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-2xl ${
          canRedeem ? 'bg-white text-[#4a6b4b]' : 'bg-white text-gray-400'
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`text-xl font-black leading-6 ${canRedeem ? 'text-[#151515]' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`mt-1 text-base font-black leading-5 ${canRedeem ? 'text-[#4a6b4b]' : 'text-gray-400'}`}>
          {cost} {pointsLabel}
        </p>
      </div>
      <button
        disabled={!canRedeem}
        className={`flex min-w-[92px] items-center justify-center rounded-full px-5 py-3 text-sm font-black uppercase leading-5 shadow-sm transition-transform ${
          canRedeem
            ? 'bg-[#416642] text-white active:scale-95'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        <span className="sr-only">{canRedeem ? 'Available' : 'Locked'}</span>
        {canRedeem ? <CheckCircle2 className="hidden h-4 w-4" /> : <Lock className="hidden h-4 w-4" />}
        {redeemLabel}
      </button>
    </div>
  );
}
