import { Home as HomeIcon, Heart, Gift, User, Settings, Phone, Mail, ChevronRight, UserCircle, Users, Smartphone, Bell, HelpCircle, Info, LogOut } from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: 'home' | 'rewards' | 'profile') => void;
  currentTab: string;
}

export function Profile({ onNavigate, currentTab }: ProfileProps) {
  const menuItems = [
    {
      icon: UserCircle,
      label: 'Personal Information',
      onClick: () => console.log('Personal Information')
    },
    {
      icon: Users,
      label: 'Emergency Contacts',
      onClick: () => console.log('Emergency Contacts')
    },
    {
      icon: Smartphone,
      label: 'Devices & Sensors',
      onClick: () => console.log('Devices & Sensors')
    },
    {
      icon: Bell,
      label: 'Notification Settings',
      onClick: () => console.log('Notification Settings')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      onClick: () => console.log('Help & Support')
    },
    {
      icon: Info,
      label: 'About Us',
      onClick: () => console.log('About Us')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-gray-800 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            <span className="text-lg">CareConnect</span>
          </div>
          <button className="p-2">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 bg-[#a8d5ba] rounded-full flex items-center justify-center mb-4">
            <User className="w-14 h-14 text-[#3d6b4f]" />
          </div>

          <h1 className="text-3xl mb-3">John Tan</h1>

          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Phone className="w-4 h-4" />
            <span className="text-base">+65 9123 4567</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-base">johntan@gmail.com</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e8f5ed] rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#3d6b4f]" />
                  </div>
                  <span className="text-lg">{item.label}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>
            );
          })}
        </div>

        <button className="w-full bg-white hover:bg-red-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-center gap-3 text-[#d64545] transition-colors">
          <LogOut className="w-6 h-6" />
          <span className="text-lg">Sign Out</span>
        </button>
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
