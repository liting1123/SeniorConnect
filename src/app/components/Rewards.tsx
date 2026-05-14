import { Home as HomeIcon, Heart, Gift, User, Star, CheckCircle, ShoppingCart, Car } from 'lucide-react';

interface RewardsProps {
  onNavigate: (screen: 'home' | 'rewards' | 'profile') => void;
  currentTab: string;
}

export function Rewards({ onNavigate, currentTab }: RewardsProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#3d6b4f] rounded-full"></div>
            <span className="text-lg">CareConnect</span>
          </div>
          <button className="p-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-[#f5a962] rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Star className="w-6 h-6 text-[#f5a962]" />
            <span className="text-4xl text-[#3d6b4f]">120 Points</span>
          </div>

          <p className="text-gray-600 text-center text-sm">
            Great job! Keep staying active to<br />earn more.
          </p>
        </div>

        <div className="bg-[#4a7359] hover:bg-[#3d6b4f] rounded-2xl p-6 flex items-center justify-between mb-8 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div className="text-white">
              <div className="text-xl mb-1">Daily Check-in</div>
              <div className="text-sm opacity-90">Log in today</div>
            </div>
          </div>
          <div className="bg-white text-[#3d6b4f] rounded-full px-4 py-2 text-lg">
            +10
          </div>
        </div>

        <h2 className="text-2xl mb-4">Redeem Rewards</h2>

        <div className="space-y-3">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-[#3d6b4f]" />
              </div>
              <div>
                <div className="text-xl mb-1">$5 NTUC</div>
                <div className="text-lg mb-1">Voucher</div>
                <div className="text-sm text-gray-500">50 Points</div>
              </div>
            </div>
            <button className="bg-[#3d6b4f] hover:bg-[#2d5a3f] text-white rounded-full px-6 py-2 text-lg transition-colors">
              REDEEM
            </button>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Car className="w-7 h-7 text-[#3d6b4f]" />
              </div>
              <div>
                <div className="text-xl mb-1">$10 Grab</div>
                <div className="text-lg mb-1">Voucher</div>
                <div className="text-sm text-gray-500">100 Points</div>
              </div>
            </div>
            <button className="bg-[#3d6b4f] hover:bg-[#2d5a3f] text-white rounded-full px-6 py-2 text-lg transition-colors">
              REDEEM
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-4">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-colors ${
              currentTab === 'home' ? 'bg-[#f5a962] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HomeIcon className="w-8 h-8" />
            <span className="text-lg">Home</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Heart className="w-8 h-8" />
            <span className="text-lg">Wellness</span>
          </button>

          <button
            onClick={() => onNavigate('rewards')}
            className={`flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-colors ${
              currentTab === 'rewards' ? 'bg-[#f5a962] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Gift className="w-8 h-8" />
            <span className="text-lg">Rewards</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-colors ${
              currentTab === 'profile' ? 'bg-[#f5a962] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-8 h-8" />
            <span className="text-lg">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
