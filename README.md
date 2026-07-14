# SeniorConnect

This is a code bundle for SeniorConnect. The original project is available at https://www.figma.com/design/5UB41t6EiN21YAH95j2nUQ/Untitled.

## ✨ Care Assistant — your AI co-pilot for caregiving

SeniorConnect now ships with a built-in **AI Care Assistant** for caregiver
and family accounts. Tap the chat bubble on the dashboard and ask, in plain
language, the questions you'd otherwise dig through screens for:

- *"Has Mum checked in today?"* — daily **check-in status** for every linked senior
- *"What medicine is due tonight?"* — **medicine labels & prescriptions**
  (name, dose, frequency, timing, label notes)
- *"How were her vitals overnight?"* — **past vitals history** (15-minute
  heart-rate and breathing averages from the in-home sensors)
- *"What's on next week?"* — the **HealthBuddy appointment schedule**

**Privacy first.** Medical records (prescriptions, conditions, vitals) are
shared with the assistant **only after you flip the explicit opt-in toggle**
in the chat panel — off by default, per caregiver, revocable any time.
Check-ins and appointments work without it.

**Fast and resilient.** All care data the assistant uses is **cached locally
on the device**, so answers stay quick and the assistant keeps working from
the last good snapshot even when the backend is slow or offline. The OpenAI
API key lives only on the local API server (`.env`, never committed, never
sent to the browser). Configure it with:

```
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
```

The assistant is informational only — it never diagnoses or changes care
plans, and points anything clinical back to the care team.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Running on iPhone with Expo Go

Install Expo Go from the iOS App Store.

Run `npm run dev` in one terminal. This starts the API server and exposes the Vite app on your local network.

Run `npm run dev:expo` in a second terminal, then scan the QR code with the iPhone camera or Expo Go. Keep the iPhone and computer on the same Wi-Fi.

If Vite starts on a different port, run Expo with an explicit URL:

```powershell
$env:EXPO_PUBLIC_WEB_APP_URL="http://YOUR_COMPUTER_IP:5174"; npm run dev:expo
```

Run 'git push origin main' to push ur updates 
