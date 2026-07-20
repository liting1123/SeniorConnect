import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { getStoredUser } from '../services/backend';

const CaregiverSettingsScreen: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const { t } = useTranslation();
  const [telegramId, setTelegramId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = getStoredUser();
    setUserData(user);
    
    // Load existing Telegram ID
    if (user?.id) {
      loadTelegramId(user.id);
    }
  }, []);

  const loadTelegramId = async (caregiverId: string) => {
    try {
      const response = await fetch(`/api/caregiver/telegram-id?caregiverId=${caregiverId}`);
      const data = await response.json();
      if (data.telegramId) {
        setTelegramId(data.telegramId);
      }
    } catch (err) {
      console.error('Error loading Telegram ID:', err);
    }
  };

  const handleSave = async () => {
    if (!telegramId.trim()) {
      setMessage({ type: 'error', text: 'Please enter a Telegram Chat ID' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/caregiver/telegram-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caregiverId: userData?.id,
          telegramId: telegramId.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save Telegram ID');
      }

      setMessage({ type: 'success', text: 'Telegram Chat ID saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save Telegram ID' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-indigo-600" />
        </button>
        <h1 className="text-2xl font-bold text-indigo-900">Settings</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Telegram ID Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              📱 Telegram Chat ID
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your Telegram Chat ID to receive missed check-in alerts and notifications.
            </p>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900 font-medium mb-2">How to get your Chat ID:</p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Open Telegram and search for <strong>@userinfobot</strong></li>
                <li>Start the bot with /start</li>
                <li>Copy your <strong>User ID</strong> from the message</li>
                <li>Paste it below</li>
              </ol>
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              placeholder="e.g., 1234567890"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none mb-4"
            />

            {/* Messages */}
            {message && (
              <div
                className={`flex items-start gap-3 p-3 rounded-lg mb-4 ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={
                    message.type === 'success'
                      ? 'text-sm text-green-800'
                      : 'text-sm text-red-800'
                  }
                >
                  {message.text}
                </p>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading || !telegramId.trim()}
              className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                loading || !telegramId.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Telegram ID'}
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-900">
              <strong>📌 Note:</strong> Once saved, you'll receive Telegram notifications
              when a senior under your care misses a check-in window. The system will wait
              5 minutes for you to acknowledge before alerting the AIC team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverSettingsScreen;
