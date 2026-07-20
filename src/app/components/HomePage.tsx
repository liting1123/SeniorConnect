import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const svgPaths = {
  pad21740:
    'M12.188 2.031C6.579 2.031 2.031 6.579 2.031 12.188c0 5.608 4.548 10.156 10.157 10.156 5.608 0 10.156-4.548 10.156-10.156C22.344 6.579 17.796 2.031 12.188 2.031Zm0 2.032a8.105 8.105 0 0 1 8.125 8.125 8.105 8.105 0 0 1-8.125 8.125 8.105 8.105 0 0 1-8.126-8.125 8.105 8.105 0 0 1 8.126-8.126Zm3.53 4.198-4.546 4.545-2.03-2.03-1.438 1.437 3.468 3.468 5.983-5.983-1.437-1.437Z',
  p22515f80:
    'M24.375 4.063c-11.22 0-20.313 9.093-20.313 20.312s9.094 20.313 20.313 20.313 20.313-9.094 20.313-20.313S35.594 4.062 24.375 4.062Zm9.698 16.445L22.202 32.379l-6.617-6.617 2.872-2.872 3.745 3.745 8.999-8.999 2.872 2.872Z',
  p1eb81b40:
    'M7.5 0C5.843 0 4.5 1.343 4.5 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3V3c0-1.657-1.343-3-3-3Zm-6 8.25a.75.75 0 0 1 1.5 0V9c0 2.486 2.014 4.5 4.5 4.5S12 11.486 12 9v-.75a.75.75 0 0 1 1.5 0V9a6.001 6.001 0 0 1-5.25 5.953V18h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-3.047A6.001 6.001 0 0 1 1.5 9v-.75Z',
};

export default function HomePage({
  onSOSClick,
  onCheckIn,
  displayName = '',
  isCheckingIn = false,
  completedCheckIn = null,
  isCurrentCheckInWindowCompleted = false,
}: {
  onSOSClick?: () => void;
  onCheckIn?: () => void;
  displayName?: string;
  isCheckingIn?: boolean;
  completedCheckIn?: {
    time: string;
    windowId: 'morning' | 'evening';
  } | null;
  isCurrentCheckInWindowCompleted?: boolean;
}) {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => new Date());
  const firstName = useMemo(() => {
    return displayName.trim().split(/\s+/)[0] || t('senior');
  }, [displayName, t]);
  const singaporeHour = Number(new Intl.DateTimeFormat('en-SG', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    hour12: false,
  }).format(now));
  const greetingKey = singaporeHour < 12
    ? 'goodMorning'
    : singaporeHour < 18
      ? 'goodAfternoon'
      : singaporeHour < 21
        ? 'goodEvening'
        : 'goodNight';
  const completedWindowLabel = completedCheckIn?.windowId === 'morning' ? t('morningCheckIn') : t('eveningCheckIn');
  const completedMessage = completedCheckIn
    ? t('checkInCompletedAt', {
        time: completedCheckIn.time,
        window: completedWindowLabel,
      })
    : '';
  const checkInButtonClass = isCurrentCheckInWindowCompleted
    ? 'bg-[#e3e5e8] text-[#4b5563]'
    : 'bg-[#4a7c59] text-[#e1ffe5]';
  const checkInIconFill = isCurrentCheckInWindowCompleted ? '#4b5563' : '#E1FFE5';
  const checkInTextClass = isCurrentCheckInWindowCompleted
    ? 'text-[28px] leading-9 min-[390px]:text-[34px] min-[390px]:leading-10'
    : 'text-[32px] leading-10 min-[390px]:text-[40px] min-[390px]:leading-[60px]';
  const checkInButtonPaddingClass = isCurrentCheckInWindowCompleted
    ? 'py-8 min-[390px]:py-10'
    : 'py-7 min-[390px]:py-9';
  const checkInButtonText = isCheckingIn
    ? t('checking')
    : isCurrentCheckInWindowCompleted
      ? t('checkInCompleted')
      : t('iAmOk');

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full overflow-y-auto">
      <div className="relative flex-1 w-full">
        <div className="flex min-h-full flex-col items-center">
          <div className="flex min-h-full w-full flex-col px-5 pb-2 min-[390px]:px-6">
            <div className="content-stretch flex flex-col items-center pb-4 pt-5 relative shrink-0 w-full min-[390px]:pb-5 min-[390px]:pt-6">
              <div className="flex w-full flex-col items-center text-center">
                <h1 className="font-['Lexend:SemiBold',sans-serif] text-[31px] font-semibold leading-9 text-[#243f2d] min-[390px]:text-[36px] min-[390px]:leading-10">
                  {t(greetingKey)}
                </h1>
                <div className="mt-1 flex max-w-full items-center justify-center gap-2">
                  <p className="break-words font-['Lexend:SemiBold',sans-serif] text-[29px] font-semibold leading-9 text-[#243f2d] min-[390px]:text-[34px] min-[390px]:leading-10">
                    {firstName}
                  </p>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[26px] min-[390px]:h-10 min-[390px]:w-10 min-[390px]:text-[28px]">
                    {'\u{1F44B}'}
                  </span>
                </div>
                <p className="mt-2 font-['Lexend:Regular',sans-serif] text-[17px] leading-6 text-[#5f6b62] min-[390px]:text-[19px]">
                  {t('howAreYouFeelingToday')}
                </p>
              </div>
            </div>

            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              {completedCheckIn && (
                <div className="mb-3 flex w-full items-center justify-center rounded-[16px] bg-[#eef0f2] px-4 py-3 text-center text-[#4b5563]">
                  <p className="text-sm font-bold leading-5 min-[390px]:text-base">
                    {completedMessage}
                  </p>
                </div>
              )}
              <button
                onClick={onCheckIn}
                disabled={isCheckingIn || isCurrentCheckInWindowCompleted}
                className={`${checkInButtonClass} content-stretch flex flex-col items-center justify-center ${checkInButtonPaddingClass} relative min-h-[156px] rounded-[24px] shrink-0 w-full active:scale-95 transition-transform disabled:cursor-default disabled:active:scale-100 min-[390px]:min-h-[176px] min-[390px]:rounded-[28px]`}
              >
                <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_-0.25px_0] rounded-[28px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                <div className="content-stretch flex flex-col items-start pb-2 relative shrink-0">
                  <div className="relative shrink-0 size-11 min-[390px]:size-[52px]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.75 48.75">
                      <g id="Container" opacity="0.9">
                        <path d={svgPaths.p22515f80} fill={checkInIconFill} id="Symbol" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0">
                  <div className={`flex max-w-full flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center relative shrink-0 text-center tracking-[1px] ${checkInTextClass}`}>
                    <p className="whitespace-normal break-words px-3">{checkInButtonText}</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col items-center justify-start pt-5 pb-1 w-full min-[390px]:pt-6">
              <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                <button
                  onClick={onSOSClick}
                  className="bg-[#ba1a1a] content-stretch flex flex-col items-center justify-center relative rounded-[9999px] shrink-0 size-[clamp(276px,78vw,324px)] active:scale-95 transition-transform min-[390px]:size-[clamp(306px,82vw,360px)]"
                >
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full top-1/2" />

                  <div className="content-stretch flex flex-col h-[120px] items-start pb-[8px] relative shrink-0 w-[112px] scale-95 min-[390px]:scale-115">
                    <div className="relative shrink-0 size-[112px]">
                      <div className="absolute bg-white bottom-0 h-[16px] left-0 right-0 rounded-[6px]" />
                      <div className="-translate-x-1/2 absolute bg-white bottom-[16px] h-[40px] left-1/2 rounded-tl-[9999px] rounded-tr-[9999px] w-[48px]" />
                      <div className="-translate-x-1/2 absolute bg-white h-[16px] left-1/2 rounded-[9999px] top-[8px] w-[8px]" />
                      <div className="absolute flex items-center justify-center left-[7.51px] size-[16.971px] top-[11.51px]">
                        <div className="flex-none rotate-45">
                          <div className="bg-white h-[8px] relative rounded-[9999px] w-[16px]" />
                        </div>
                      </div>
                      <div className="absolute flex items-center justify-center right-[7.52px] size-[16.971px] top-[11.52px]">
                        <div className="-rotate-45 flex-none">
                          <div className="bg-white h-[8px] relative rounded-[9999px] w-[16px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 min-[390px]:pt-[8px]">
                    <div className="content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)] flex flex-col items-center relative shrink-0">
                      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[52px] text-center text-white tracking-[5px] whitespace-nowrap min-[390px]:text-[60px] min-[390px]:tracking-[5.8px]">
                        <p className="leading-[64px] min-[390px]:leading-[76px]">{t('sosButton')}</p>
                      </div>
                    </div>
                  </div>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
