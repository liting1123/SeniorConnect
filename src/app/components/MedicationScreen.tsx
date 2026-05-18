import { Bell, CheckCircle2, Clock, Pill } from 'lucide-react';
import { useState } from 'react';

export default function MedicationScreen() {
  const [doseTaken, setDoseTaken] = useState(false);

  return (
    <div className="h-full overflow-y-auto bg-[#fafafa] px-5 pb-6 pt-5 text-gray-900 min-[390px]:px-6 min-[390px]:pb-8 min-[390px]:pt-8">
      <header className="mb-5 flex items-start justify-between min-[390px]:mb-8">
        <div>
          <h1 className="mb-1 text-2xl font-bold leading-tight tracking-tight min-[390px]:text-[26px]">
            Medication Reminder
          </h1>
          <p className="text-sm font-medium text-gray-500 min-[390px]:text-[15px]">
            Never miss a dose.
          </p>
        </div>
        <button
          aria-label="Notifications"
          className="relative mt-1 rounded-full p-2 text-[#ff4400] transition-colors active:scale-95 active:bg-[#fff0ea]"
        >
          <Bell className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff4400]" />
        </button>
      </header>

      <section className="mb-5 rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] min-[390px]:mb-8 min-[390px]:p-5">
        <div className="mb-4 flex items-center justify-between min-[390px]:mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Next dose</h2>
          <div className="flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#2e8b57]" />
            <span className="text-sm font-medium text-[#2e8b57]">
              {doseTaken ? 'Taken' : 'On time'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 min-[390px]:gap-5">
          <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50 min-[390px]:h-24 min-[390px]:w-24">
            <div className="relative flex h-14 w-10 flex-col rounded-b-md rounded-t-lg border border-gray-200 bg-white shadow-sm min-[390px]:h-16 min-[390px]:w-12">
              <div className="h-4 w-full rounded-t-lg bg-gray-200" />
              <div className="mt-1 flex flex-1 items-center justify-center bg-[#ff4400]">
                <Pill className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 h-6 w-6 rounded-full border border-gray-200 bg-white shadow" />
            <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full border border-gray-200 bg-white shadow" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-1 text-lg font-bold leading-tight text-gray-900 min-[390px]:text-[20px]">
              Atorvastatin 20mg
            </h3>
            <p className="mb-3 text-sm font-medium text-gray-500">
              1 tablet - Once daily
            </p>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#ff4400]" />
              <span className="text-base font-bold tracking-tight text-[#ff4400] min-[390px]:text-[18px]">
                5:45 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff4400] py-3.5 text-base font-semibold text-white shadow-sm transition-colors active:scale-95 active:bg-orange-600 min-[390px]:py-4 min-[390px]:text-[17px]">
          <Bell className="h-5 w-5" />
          <span>Snooze 15 minutes</span>
        </button>
        <button
          onClick={() => setDoseTaken(true)}
          className="w-full rounded-2xl border border-[#ff4400] bg-white py-3.5 text-base font-semibold text-[#ff4400] shadow-sm transition-colors active:scale-95 active:bg-orange-50 min-[390px]:py-4 min-[390px]:text-[17px]"
        >
          I've taken this dose
        </button>
      </section>
    </div>
  );
}
