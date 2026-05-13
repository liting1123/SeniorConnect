import { Trophy, Gift, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PointsScreen() {
  const { t } = useTranslation();
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Points Header */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-600 px-8 pt-16 pb-12 text-white">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
            <Trophy className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-7xl font-bold mb-4">120 {t('points')}</h1>
          <p className="text-orange-100 text-2xl">{t('healthRewardsBalance')}</p>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="p-8">
        <h3 className="text-3xl font-bold mb-6">{t('redeemPoints')}</h3>
        <div className="space-y-5">
          <RewardCard
            title={t('healthStoreVoucher')}
            points={50}
            icon="🏪"
          />
          <RewardCard
            title={t('freeCheckup')}
            points={100}
            icon="🩺"
          />
          <RewardCard
            title={t('pharmacyDiscount')}
            points={80}
            icon="💊"
          />
        </div>

        {/* How to Earn Points */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6">{t('howToEarn')}</h3>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
            <EarnPointsItem
              title={t('earnCheckIn')}
              points={5}
            />
            <EarnPointsItem
              title={t('earnAssessment')}
              points={10}
            />
            <EarnPointsItem
              title={t('earnAdherence')}
              points={15}
            />
            <EarnPointsItem
              title={t('earnReferral')}
              points={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardCard({ title, points, icon }: { title: string; points: number; icon: string }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm">
      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-xl text-orange-500 font-bold mt-1">{points} {t('points')}</p>
      </div>
      <button className="bg-orange-500 text-white px-6 py-4 rounded-full text-xl font-bold active:scale-95 transition-transform">
        {t('redeem')}
      </button>
    </div>
  );
}

function EarnPointsItem({ title, points }: { title: string; points: number }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700 text-xl">{title}</span>
      <span className="text-green-600 text-2xl font-bold">+{points} {t('pts')}</span>
    </div>
  );
}
