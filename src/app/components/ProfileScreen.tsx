import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalUser, type LocalUser } from '../services/localUser';

export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const { t } = useTranslation();
  const [user] = useState<LocalUser>(() => getLocalUser());
  const email = user.email;
  const displayName = useMemo(() => {
    return user.name || user.email.split('@')[0] || 'My Profile';
  }, [user]);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="bg-gradient-to-br from-green-400 to-green-600 px-5 pb-5 pt-6 text-white min-[390px]:px-7 min-[390px]:pb-7 min-[390px]:pt-8">
        <div className="mb-4 flex items-center gap-4 min-[390px]:gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#316342] min-[390px]:h-20 min-[390px]:w-20">
            <User className="h-8 w-8 min-[390px]:h-10 min-[390px]:w-10" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold min-[390px]:text-3xl">{displayName}</h2>
            <p className="mt-1 truncate text-sm text-green-100 min-[390px]:text-base">{email}</p>
          </div>
        </div>
        <button className="rounded-full bg-white/20 px-5 py-2.5 text-base font-bold backdrop-blur transition-colors active:bg-white/30 min-[390px]:px-6 min-[390px]:py-3 min-[390px]:text-lg">
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
