import { useEffect, useState } from 'react';
import { Clock, X } from 'lucide-react';

interface SOSConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function SOSConfirmation({ onCancel, onConfirm }: SOSConfirmationProps) {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown === 0) {
      onCancel();
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onCancel]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f9f4f0]">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-12">
          <div className="w-64 h-64 mb-8 relative">
            <div className="absolute inset-0 bg-[#d64545] rounded-full"></div>
            <div className="absolute inset-4 bg-white rounded-full"></div>
            <div className="absolute inset-8 bg-[#d64545] rounded-full flex items-center justify-center">
              <span className="text-white text-7xl tracking-wider">SOS</span>
            </div>
          </div>

          <h1 className="text-4xl text-center mb-4">
            Did you mean to<br />send SOS?
          </h1>

          <p className="text-2xl text-gray-600 text-center mb-8">
            We will alert your emergency<br />contacts once you confirm.
          </p>

          <div className="bg-gray-200 rounded-2xl px-6 py-4 flex items-center gap-3">
            <Clock className="w-7 h-7 text-gray-700" />
            <span className="text-xl text-gray-700">
              Auto-cancel in {countdown} seconds
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onConfirm}
            className="w-full bg-[#d64545] hover:bg-[#c23838] text-white rounded-full py-6 px-8 flex items-center justify-center gap-3 transition-colors text-2xl"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Yes, send SOS</span>
          </button>

          <button
            onClick={onCancel}
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-full py-6 px-8 flex items-center justify-center gap-3 transition-colors text-2xl"
          >
            <X className="w-8 h-8" />
            <span>Cancel SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
