import { useTranslation } from 'react-i18next';
import imgUserProfile from '../../imports/image-2.png';

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
}: {
  onSOSClick?: () => void;
  onCheckIn?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full overflow-y-auto">
      <div className="bg-[#fbf9f8] relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[40px]">
              <div className="relative shrink-0 size-[24.375px]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.375 24.375">
                  <g id="Container">
                    <path d={svgPaths.pad21740} fill="var(--fill-0, #316342)" id="Symbol" />
                  </g>
                </svg>
              </div>
            </div>

            <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px relative">
              <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#316342] text-[50px] text-center whitespace-nowrap">
                <p className="leading-[50px]">{t('home')}</p>
              </div>
            </div>

            <div className="bg-[#dcd9d9] relative rounded-[9999px] shrink-0 size-[48px]">
              <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
                <div className="flex-[1_0_0] min-h-px relative w-full">
                  <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgUserProfile} />
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-2 border-[#f0eded] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1 w-full">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center px-[24px] pb-[16px] relative size-full">
            <div className="content-stretch flex flex-col items-start pb-[18px] pt-[12px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                  <div className="flex flex-col font-['Lexend:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#1b1c1c] text-[32px] text-center tracking-[-0.8px] whitespace-nowrap">
                    <p className="leading-[42px]">{t('dailyCheckIn')}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
                  <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#414942] text-[20px] text-center whitespace-nowrap">
                    <p className="leading-[30px]">{t('howAreYouToday')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full">
              <button
                onClick={onCheckIn}
                className="bg-[#4a7c59] content-stretch flex flex-col items-center justify-center py-[32px] relative rounded-[32px] shrink-0 w-full active:scale-95 transition-transform"
              >
                <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_-0.25px_0] rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0">
                  <div className="relative shrink-0 size-[48.75px]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.75 48.75">
                      <g id="Container" opacity="0.9">
                        <path d={svgPaths.p22515f80} fill="var(--fill-0, #E1FFE5)" id="Symbol" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0">
                  <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#e1ffe5] text-[40px] text-center tracking-[1px] whitespace-nowrap">
                    <p className="leading-[60px]">{t('iAmOk')}</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                <button
                  onClick={onSOSClick}
                  className="bg-[#ba1a1a] content-stretch flex flex-col items-center justify-center relative rounded-[9999px] shrink-0 size-[min(72vw,292px)] active:scale-95 transition-transform"
                >
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full top-1/2" />

                  <div className="content-stretch flex flex-col h-[120px] items-start pb-[8px] relative shrink-0 w-[112px]">
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

                  <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0">
                    <div className="content-stretch drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)] flex flex-col items-center relative shrink-0">
                      <div className="flex flex-col font-['Lexend:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[52px] text-center text-white tracking-[5.2px] whitespace-nowrap">
                        <p className="leading-[78px]">{t('sosButton')}</p>
                      </div>
                    </div>
                  </div>
                </button>

                <button className="absolute bg-white bottom-0 content-stretch flex items-center justify-center p-px right-[-8px] rounded-[9999px] size-[56px] active:scale-95 transition-transform">
                  <div aria-hidden="true" className="absolute border border-[#f0eded] border-solid inset-0 pointer-events-none rounded-[9999px]" />
                  <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[56px]" />
                  <div className="h-[21.75px] relative shrink-0 w-[15px]">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 21.75">
                      <g id="Container">
                        <path d={svgPaths.p1eb81b40} fill="var(--fill-0, #944A00)" id="Symbol" />
                      </g>
                    </svg>
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
