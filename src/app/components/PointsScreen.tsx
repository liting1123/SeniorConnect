import {
  Bell,
  CalendarCheck,
  Car,
  CheckCircle2,
  Lock,
  ShoppingCart,
  Star,
  User,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { type AppUser, getPoints, getStoredUser } from '../services/backend';

const getLocalPointsKey = (uid: string) => `careconnect.points.${uid}`;

export default function PointsScreen() {
  const [user, setUser] = useState<AppUser | null>(() => getStoredUser());
  const [points, setPoints] = useState(0);
  const displayName = useMemo(() => {
    return user?.displayName?.trim() || user?.email?.split('@')[0] || 'User';
  }, [user]);

  useEffect(() => {
    const handleUserUpdate = () => setUser(getStoredUser());

    window.addEventListener('careconnect-user-updated', handleUserUpdate);

    return () => {
      window.removeEventListener('careconnect-user-updated', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setPoints(0);
      return;
    }

    const localPointsKey = getLocalPointsKey(user.uid);
    setPoints(Number(localStorage.getItem(localPointsKey)) || 0);

    const handleLocalPointsUpdate = (event: Event) => {
      const { uid, points: nextPoints } = (event as CustomEvent<{ uid: string; points: number }>).detail || {};

      if (uid === user.uid) {
        setPoints(Number(nextPoints) || 0);
      }
    };

    window.addEventListener('careconnect-points-updated', handleLocalPointsUpdate);

    getPoints(user)
      .then((databasePoints) => {
        setPoints(databasePoints);
        localStorage.setItem(localPointsKey, String(databasePoints));
      })
      .catch((error) => {
        console.error('Unable to load points:', error);
        setPoints(Number(localStorage.getItem(localPointsKey)) || 0);
      });

    return () => {
      window.removeEventListener('careconnect-points-updated', handleLocalPointsUpdate);
    };
  }, [user]);

  return (
    <div className="h-full overflow-y-auto bg-[#fbf9f8] text-[#1b1c1c]">
      <header className="sticky top-0 z-10 bg-[#fbf9f8] shadow-sm">
        <div className="flex h-14 items-center justify-between px-5 min-[390px]:h-16 min-[390px]:px-6">
          <div className="flex items-center gap-2 text-[#316342]">
            <User className="h-6 w-6 fill-current min-[390px]:h-7 min-[390px]:w-7" />
            <span className="text-xl font-bold min-[390px]:text-2xl">CareConnect</span>
          </div>
          <button
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#414942] transition-colors active:scale-95 active:bg-[#e4e2e1] min-[390px]:h-12 min-[390px]:w-12"
          >
            <Bell className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-5 px-5 py-5 min-[390px]:gap-8 min-[390px]:px-6 min-[390px]:py-8">
        <section className="flex flex-col items-center rounded-[28px] bg-[#f6f3f2] p-5 text-center shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6">
          <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-[#ff9742] text-[#6c3400] min-[390px]:mb-4 min-[390px]:h-32 min-[390px]:w-32">
            <User className="h-12 w-12 fill-current min-[390px]:h-16 min-[390px]:w-16" />
          </div>

          <div className="mb-2 flex items-center justify-center gap-2">
            <Star className="h-8 w-8 fill-[#ff9742] text-[#ff9742] min-[390px]:h-10 min-[390px]:w-10" />
            <h1 className="text-[32px] font-bold leading-10 text-[#316342] min-[390px]:text-[40px] min-[390px]:leading-[52px]">
              {points} Points
            </h1>
          </div>

          <p className="text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            Great job, {displayName}! Keep staying active to earn more.
          </p>
        </section>

        <section className="flex items-center justify-between rounded-[28px] bg-[#4a7c59] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] min-[390px]:rounded-[32px] min-[390px]:p-6">
          <div className="flex items-center gap-3 text-[#e1ffe5] min-[390px]:gap-4">
            <CalendarCheck className="h-8 w-8 fill-current min-[390px]:h-9 min-[390px]:w-9" />
            <div>
              <h2 className="text-lg font-semibold leading-6 min-[390px]:text-xl">Daily Check-in</h2>
              <p className="text-base leading-6 opacity-90 min-[390px]:text-lg min-[390px]:leading-7">Log in today</p>
            </div>
          </div>
          <div className="rounded-full bg-[#e1ffe5] px-3 py-2 text-lg font-semibold text-[#4a7c59] shadow-sm min-[390px]:px-4 min-[390px]:text-xl">
            +5
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold leading-7 text-[#1b1c1c] min-[390px]:mb-4 min-[390px]:text-2xl min-[390px]:leading-8">
            Redeem Rewards
          </h2>
          <div className="flex flex-col gap-4">
            <RewardCard
              icon={<ShoppingCart className="h-8 w-8" />}
              title="$5 NTUC Voucher"
              cost={50}
              userPoints={points}
            />
            <RewardCard
              icon={<Car className="h-8 w-8" />}
              title="$10 Grab Voucher"
              cost={100}
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
}: {
  icon: React.ReactNode;
  title: string;
  cost: number;
  userPoints: number;
}) {
  const canRedeem = userPoints >= cost;

  return (
    <div
      className={`flex items-center rounded-[32px] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)] transition-colors ${
        canRedeem ? 'bg-[#f0eded]' : 'bg-gray-100 opacity-70'
      }`}
    >
      <div
        className={`mr-3 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl min-[390px]:mr-4 min-[390px]:h-16 min-[390px]:w-16 ${
          canRedeem ? 'bg-[#fbf9f8] text-[#316342]' : 'bg-gray-200 text-gray-400'
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`text-lg font-semibold leading-6 min-[390px]:text-xl ${canRedeem ? 'text-[#1b1c1c]' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`mt-1 text-base font-bold leading-5 ${canRedeem ? 'text-[#316342]' : 'text-gray-400'}`}>
          {cost} Points
        </p>
      </div>
      <button
        disabled={!canRedeem}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold leading-5 shadow-sm transition-transform min-[390px]:px-5 min-[390px]:py-3 min-[390px]:text-base ${
          canRedeem
            ? 'bg-[#316342] text-white active:scale-95'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        {canRedeem ? <CheckCircle2 className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
        REDEEM
      </button>
    </div>
  );
}
