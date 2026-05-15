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
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 text-[#316342]">
            <User className="h-7 w-7 fill-current" />
            <span className="text-2xl font-bold">CareConnect</span>
          </div>
          <button
            aria-label="Notifications"
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#414942] transition-colors active:scale-95 active:bg-[#e4e2e1]"
          >
            <Bell className="h-7 w-7" />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-8 px-6 py-8">
        <section className="flex flex-col items-center rounded-[32px] bg-[#f6f3f2] p-6 text-center shadow-[0_8px_20px_rgba(49,99,66,0.08)]">
          <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-[#ff9742] text-[#6c3400]">
            <User className="h-16 w-16 fill-current" />
          </div>

          <div className="mb-2 flex items-center justify-center gap-2">
            <Star className="h-10 w-10 fill-[#ff9742] text-[#ff9742]" />
            <h1 className="text-[40px] font-bold leading-[52px] text-[#316342]">
              120 Points
            </h1>
          </div>

          <p className="text-lg leading-7 text-[#414942]">
            Great job! Keep staying active to earn more.
          </p>
        </section>

        <section className="flex items-center justify-between rounded-[32px] bg-[#4a7c59] p-6 shadow-[0_8px_20px_rgba(49,99,66,0.08)]">
          <div className="flex items-center gap-4 text-[#e1ffe5]">
            <CalendarCheck className="h-9 w-9 fill-current" />
            <div>
              <h2 className="text-xl font-semibold leading-6">Daily Check-in</h2>
              <p className="text-lg leading-7 opacity-90">Log in today</p>
            </div>
          </div>
          <div className="rounded-full bg-[#e1ffe5] px-4 py-2 text-xl font-semibold text-[#4a7c59] shadow-sm">
            +10
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold leading-8 text-[#1b1c1c]">
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
      <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fbf9f8] text-[#316342]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-semibold leading-6 text-[#1b1c1c]">
          {title}
        </h3>
        <p className="mt-1 text-base font-bold leading-5 text-[#316342]">
          {points}
        </p>
      </div>
      <button className="rounded-full bg-[#316342] px-5 py-3 text-base font-semibold leading-5 text-white shadow-sm transition-transform active:scale-95">
        REDEEM
      </button>
    </div>
  );
}
