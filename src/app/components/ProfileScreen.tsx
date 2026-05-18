import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="bg-gradient-to-br from-green-400 to-green-600 px-5 pb-6 pt-8 text-white min-[390px]:px-8 min-[390px]:pb-10 min-[390px]:pt-16">
        <div className="mb-5 flex items-center gap-4 min-[390px]:mb-6 min-[390px]:gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#316342] min-[390px]:h-28 min-[390px]:w-28">
            <User className="h-10 w-10 min-[390px]:h-14 min-[390px]:w-14" />
          </div>
          <div className="min-w-0">
            <h2 className="text-3xl font-bold min-[390px]:text-4xl">John Tan</h2>
            <p className="mt-1 truncate text-base text-green-100 min-[390px]:text-xl">john.tan@email.com</p>
          </div>
        </div>
        <button className="mt-3 rounded-full bg-white/20 px-6 py-3 text-lg font-bold backdrop-blur transition-colors active:bg-white/30 min-[390px]:mt-6 min-[390px]:px-8 min-[390px]:py-4 min-[390px]:text-xl">
          {t('editProfile')}
        </button>
      </div>

      <div className="space-y-5 p-5 min-[390px]:space-y-6 min-[390px]:p-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem icon={<User className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />} title={t('personalInfo')} />
          <SettingsItem icon={<Bell className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />} title={t('notifications')} />
          <SettingsItem icon={<Shield className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />} title={t('privacySecurity')} />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <SettingsItem icon={<HelpCircle className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />} title={t('helpSupport')} />
          <SettingsItem
            icon={<LogOut className="h-7 w-7 min-[390px]:h-8 min-[390px]:w-8" />}
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
  textColor = 'text-gray-900',
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  textColor?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 transition-colors last:border-b-0 active:bg-gray-50 min-[390px]:gap-6 min-[390px]:px-8 min-[390px]:py-6"
    >
      <div className="text-gray-600">{icon}</div>
      <span className={`flex-1 text-left text-xl font-bold min-[390px]:text-2xl ${textColor}`}>
        {title}
      </span>
      <ChevronRight className="h-7 w-7 text-gray-400 min-[390px]:h-8 min-[390px]:w-8" />
    </button>
  );
}
