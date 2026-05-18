import {
  Bell,
  CalendarCheck,
  Car,
  ShoppingCart,
  Star,
  User,
} from 'lucide-react';

export default function PointsScreen() {
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
              120 Points
            </h1>
          </div>

          <p className="text-base leading-6 text-[#414942] min-[390px]:text-lg min-[390px]:leading-7">
            Great job! Keep staying active to earn more.
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
            +10
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
              points="50 Points"
            />
            <RewardCard
              icon={<Car className="h-8 w-8" />}
              title="$10 Grab Voucher"
              points="100 Points"
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
  points,
}: {
  icon: React.ReactNode;
  title: string;
  points: string;
}) {
  return (
    <div className="flex items-center rounded-[32px] bg-[#f0eded] p-4 shadow-[0_8px_20px_rgba(49,99,66,0.08)]">
      <div className="mr-3 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fbf9f8] text-[#316342] min-[390px]:mr-4 min-[390px]:h-16 min-[390px]:w-16">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold leading-6 text-[#1b1c1c] min-[390px]:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-base font-bold leading-5 text-[#316342]">
          {points}
        </p>
      </div>
      <button className="rounded-full bg-[#316342] px-4 py-2.5 text-sm font-semibold leading-5 text-white shadow-sm transition-transform active:scale-95 min-[390px]:px-5 min-[390px]:py-3 min-[390px]:text-base">
        REDEEM
      </button>
    </div>
  );
}
