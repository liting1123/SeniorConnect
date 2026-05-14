import { Check, Shield } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'nok' | 'caregiver') => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-8">
      <div className="w-full max-w-md pt-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="text-center text-xl mb-8">CareConnect</h2>

        <h1 className="text-3xl text-center mb-2">Select Your Role</h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          Pick how you'll use<br />CareConnect.
        </p>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => onRoleSelect('nok')}
            className="w-full bg-white hover:bg-gray-50 border-2 border-[#3d6b4f] rounded-2xl p-4 flex items-start gap-4 transition-colors"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/src/imports/image.png"
                alt="Next of Kin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-5 h-5 text-[#3d6b4f]" />
                <span className="text-lg">Next-of-Kin (NOK)</span>
              </div>
              <p className="text-gray-600 text-sm leading-snug">
                Family or friend<br />
                supporting a loved<br />
                one.
              </p>
            </div>
          </button>

          <button
            onClick={() => onRoleSelect('caregiver')}
            className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-2xl p-4 flex items-start gap-4 transition-colors"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="/src/imports/image-1.png"
                alt="Caregiver"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left pt-2">
              <div className="text-lg mb-1">Caregiver</div>
              <p className="text-gray-600 text-sm leading-snug">
                Professional<br />
                providing care and<br />
                support.
              </p>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm bg-white rounded-lg p-3">
          <Shield className="w-5 h-5 flex-shrink-0" />
          <span>Your privacy is our priority.<br />Your info is secure.</span>
        </div>
      </div>

      <button
        onClick={() => onRoleSelect('nok')}
        className="w-full max-w-md bg-gray-900 hover:bg-gray-800 text-white rounded-full py-4 text-lg transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
