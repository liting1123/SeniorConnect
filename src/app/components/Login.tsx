import { Fingerprint, Users, HelpCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
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
          onClick={onLogin}
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
    </div>
  );
}
