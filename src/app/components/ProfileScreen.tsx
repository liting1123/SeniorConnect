import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-green-400 to-green-600 px-8 pt-16 pb-10 text-white">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-6xl">
            👤
          </div>
          <div>
            <h2 className="text-4xl font-bold">John Tan</h2>
            <p className="text-green-100 text-xl mt-1">john.tan@email.com</p>
          </div>
        </div>
        <button className="mt-6 bg-white/20 backdrop-blur px-8 py-4 rounded-full text-xl font-bold active:bg-white/30 transition-colors">
          {t('editProfile')}
        </button>
      </div>

      {/* Settings List */}
      <div className="p-8 space-y-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <SettingsItem icon={<User className="w-8 h-8" />} title={t('personalInfo')} />
          <SettingsItem icon={<Bell className="w-8 h-8" />} title={t('notifications')} />
          <SettingsItem icon={<Shield className="w-8 h-8" />} title={t('privacySecurity')} />
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <SettingsItem icon={<HelpCircle className="w-8 h-8" />} title={t('helpSupport')} />
          <SettingsItem
            icon={<LogOut className="w-8 h-8" />}
            title={t('logOut')}
            textColor="text-red-500"
            onClick={onLogout}
          />
        </div>
      </div>
    </div>
  );
}

function SettingsItem({
  icon,
  title,
  textColor = "text-gray-900",
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  textColor?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-8 py-6 flex items-center gap-6 active:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
    >
      <div className="text-gray-600">{icon}</div>
      <span className={`flex-1 text-left text-2xl font-bold ${textColor}`}>{title}</span>
      <ChevronRight className="w-8 h-8 text-gray-400" />
    </button>
  );
}
