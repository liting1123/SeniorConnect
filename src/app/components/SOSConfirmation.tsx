import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/* Action Buttons (SOS) */
const svgPaths = {
  p256e1340:
    'M10 1.667a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666Zm.833 4.166a.833.833 0 0 0-1.666 0V10c0 .221.088.433.244.589l2.5 2.5a.833.833 0 1 0 1.178-1.178l-2.256-2.255V5.833Z',
  p8d35f80:
    'M1.333 0 19 8 1.333 16V9.778L12.333 8 1.333 6.222V0Z',
  p28843fc0:
    'M10 8.586 14.95 3.636a1 1 0 1 1 1.414 1.414L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 0 1 5.05 3.636L10 8.586Z',
};

type SOSConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function SOSConfirmationScreen({ onConfirm, onCancel }: SOSConfirmationProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    onCancel();
  }, [countdown, onCancel]);

  return (
    <div
      className="content-stretch flex flex-col items-start pb-[80px] pt-[56px] relative size-full overflow-y-auto"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgb(251, 249, 248) 0%, rgb(251, 249, 248) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
      }}
    >
      <div className="relative shrink-0 w-full">
        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[32px] relative size-full">
            <div className="absolute bg-[#ffdad6] inset-0 opacity-20" />

            <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0">
              <div className="content-stretch flex items-center justify-center relative shrink-0">
                <div className="absolute bg-[#ba1a1a] left-[-16px] rounded-[9999px] size-[192px] top-[-16px] animate-ping" />
                <div className="absolute bg-[#ba1a1a] left-[-16px] rounded-[9999px] size-[192px] top-[-16px]" />

                <div className="bg-[#ba1a1a] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[160px]">
                  <div aria-hidden="true" className="absolute border-4 border-[#fbf9f8] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[160px] top-1/2" />
                  <div className="bg-white min-w-[88px] px-5 py-2 relative rounded-[12px] shrink-0">
                    <span className="block font-['Lexend:SemiBold',sans-serif] font-semibold text-[#ba1a1a] text-[34px] leading-[40px] tracking-[6px] text-center">
                      SOS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0">
              <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
                <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                  <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[32px] text-center">
                    <p className="leading-[42px] mb-0">{t('didYouMeanToSendSOS1')}</p>
                    <p className="leading-[42px]">{t('didYouMeanToSendSOS2')}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center max-w-[300px] relative shrink-0 w-[300px]">
                  <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#414942] text-[20px] text-center">
                    <p className="leading-[30px] mb-0">{t('alertContactsLine1')}</p>
                    <p className="leading-[30px]">{t('alertContactsLine2')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-stretch flex flex-col items-start max-w-[384px] pb-[32px] relative shrink-0 w-full">
              <div className="bg-[#f0eded] max-w-[384px] relative rounded-[32px] shrink-0 w-full">
                <div className="flex flex-row items-center justify-center max-w-[inherit] size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center max-w-[inherit] p-[8px] relative size-full">
                    <div className="relative shrink-0 size-[20px]">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g id="Container">
                          <path d={svgPaths.p256e1340} fill="#414942" id="Icon" />
                        </g>
                      </svg>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[20px] tracking-[0.4px] whitespace-nowrap">
                        <p className="leading-[24px]">
                          {t('autoCancelIn')} {countdown} {t('seconds')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-stretch flex flex-col h-[203px] items-start justify-center max-w-[384px] min-h-[128px] pt-[75px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[384px] relative shrink-0 w-full">
                <button
                  onClick={onConfirm}
                  className="bg-[#ba1a1a] content-stretch drop-shadow-[0px_8px_10px_rgba(186,26,26,0.15)] flex gap-[7.99px] items-center justify-center min-h-[56px] pb-[16px] pt-[15.5px] relative rounded-[9999px] shrink-0 w-full active:scale-95 transition-transform"
                >
                  <div className="h-[16px] relative shrink-0 w-[19px]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 16">
                      <g id="Container">
                        <path d={svgPaths.p8d35f80} fill="white" id="Icon" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white tracking-[0.4px] whitespace-nowrap">
                    <p className="leading-[24px]">{t('yesSendSOS')}</p>
                  </div>
                </button>

                <button
                  onClick={onCancel}
                  className="bg-[#fbf9f8] content-stretch flex gap-[8px] items-center justify-center min-h-[56px] pb-[16px] pt-[15.5px] px-[2px] relative rounded-[9999px] shrink-0 w-full active:scale-95 transition-transform"
                >
                  <div aria-hidden="true" className="absolute border-2 border-[#c1c9bf] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                  <div className="relative shrink-0 size-[20px]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g id="Container">
                        <path d={svgPaths.p28843fc0} fill="#1B1C1C" id="Icon" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[20px] text-center tracking-[0.4px] whitespace-nowrap">
                    <p className="leading-[24px]">{t('cancelSOS')}</p>
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

export function SOSConfirmation(props: SOSConfirmationProps) {
  return <SOSConfirmationScreen {...props} />;
}
