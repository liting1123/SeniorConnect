import { Globe, Home as HomeIcon, Heart, Gift, User, Mic } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: 'home' | 'rewards' | 'profile') => void;
  onSOSClick: () => void;
  currentTab: string;
}

export function Home({ onNavigate, onSOSClick, currentTab }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-8 pt-6 pb-32">
        <div className="flex items-center justify-between mb-8">
          <Globe className="w-11 h-11 text-gray-700" />
          <h1 className="text-2xl text-[#3d6b4f]">Hello, Friend!</h1>
          <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
            <img
              src="/src/imports/image-2.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-4xl mb-3">Daily Check-in</h2>
          <p className="text-xl text-gray-600">How are you today?</p>
        </div>

        <div className="space-y-6 px-4">
          <button
            onClick={() => onNavigate('rewards')}
            className="w-full bg-[#4a7359] hover:bg-[#3d6b4f] text-white rounded-[32px] py-10 flex flex-col items-center justify-center gap-3 transition-colors"
          >
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
            </svg>
            <span className="text-4xl tracking-[0.2em]">I AM OK</span>
          </button>

          <div className="relative pt-6 pb-4 flex justify-center">
            <button
              onClick={onSOSClick}
              className="w-80 h-80 bg-[#c93838] hover:bg-[#b83030] text-white rounded-full flex flex-col items-center justify-center gap-3 transition-colors shadow-lg"
            >
              <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9 8h6l-3-6z"/>
                <rect x="10" y="9" width="4" height="10" rx="1"/>
                <circle cx="12" cy="21" r="1.5"/>
              </svg>
              <span className="text-7xl tracking-[0.15em]">SOS</span>
            </button>
            <button className="absolute bottom-8 right-8 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
              <Mic className="w-7 h-7 text-[#f5a962]" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-colors min-w-[80px] ${
              currentTab === 'home' ? 'bg-[#f5a962]' : ''
            }`}
          >
            <HomeIcon className={`w-7 h-7 ${currentTab === 'home' ? 'text-white' : 'text-gray-900'}`} />
            <span className={`text-sm ${currentTab === 'home' ? 'text-white' : 'text-gray-900'}`}>Home</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-colors min-w-[80px]"
          >
            <Heart className="w-7 h-7 text-gray-900" />
            <span className="text-sm text-gray-900">Wellness</span>
          </button>

          <button
            onClick={() => onNavigate('rewards')}
            className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-colors min-w-[80px]"
          >
            <Gift className="w-7 h-7 text-gray-900" />
            <span className="text-sm text-gray-900">Rewards</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-colors min-w-[80px]"
          >
            <User className="w-7 h-7 text-gray-900" />
            <span className="text-sm text-gray-900">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
