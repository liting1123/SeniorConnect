import { useState } from 'react';
import { CheckCircle2, Fingerprint, HelpCircle, ShieldCheck, Users, X } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [showSingpassMock, setShowSingpassMock] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSingpassLogin = () => {
    setShowSingpassMock(true);
  };

  const handleApproveSingpass = () => {
    setIsVerifying(true);
    window.setTimeout(() => {
      setIsVerifying(false);
      setShowSingpassMock(false);
      onLogin();
    }, 900);
  };

  const handleCloseSingpass = () => {
    if (isVerifying) {
      return;
    }

    setShowSingpassMock(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-6xl text-[#3d6b4f] mb-6 text-center">
          Welcome Back!
        </h1>

        <p className="text-2xl text-gray-700 text-center mb-16 leading-relaxed">
          We're glad to see you again.<br />
          Please log in to continue your<br />
          care journey.
        </p>

        <button
          onClick={handleSingpassLogin}
          className="w-full bg-[#d64545] hover:bg-[#c23838] text-white rounded-full py-8 px-8 mb-8 flex items-center justify-center gap-4 transition-colors"
        >
          <Fingerprint className="w-10 h-10" />
          <span className="text-3xl">Log in with Singpass</span>
        </button>

        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-2xl text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-3xl py-8 px-8 flex items-center gap-6 transition-colors"
        >
          <div className="w-20 h-20 bg-[#3d6b4f] rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-3xl text-gray-900 mb-1">Caregiver Login</div>
            <div className="text-xl text-gray-600">
              For next-of-kin &<br />proxies
            </div>
          </div>
          <svg className="w-8 h-8 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full mt-16 flex items-center justify-center gap-3 text-[#3d6b4f] text-2xl hover:opacity-80 transition-opacity">
          <HelpCircle className="w-8 h-8" />
          <span>Need help logging in?</span>
        </button>
      </div>

      {showSingpassMock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d64545] text-white">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-950">Singpass Mock</h2>
                  <p className="text-lg text-gray-600">Senior Connect</p>
                </div>
              </div>
              <button
                onClick={handleCloseSingpass}
                disabled={isVerifying}
                aria-label="Close Singpass mock"
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-4 flex items-center gap-3 text-[#3d6b4f]">
                <CheckCircle2 className="h-7 w-7" />
                <span className="text-xl">Mock identity ready</span>
              </div>
              <dl className="space-y-3 text-lg">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Name</dt>
                  <dd className="text-right text-gray-900">Tan Mei Ling</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">NRIC</dt>
                  <dd className="text-right text-gray-900">S****567A</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Status</dt>
                  <dd className="text-right text-gray-900">Verified</dd>
                </div>
              </dl>
            </div>

            <button
              onClick={handleApproveSingpass}
              disabled={isVerifying}
              className="mb-3 flex w-full items-center justify-center gap-3 rounded-full bg-[#d64545] px-6 py-5 text-xl text-white transition-colors hover:bg-[#c23838] disabled:cursor-wait disabled:opacity-80"
            >
              <Fingerprint className="h-7 w-7" />
              <span>{isVerifying ? 'Verifying...' : 'Approve Login'}</span>
            </button>

            <button
              onClick={handleCloseSingpass}
              disabled={isVerifying}
              className="w-full rounded-full border-2 border-gray-200 px-6 py-4 text-xl text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
