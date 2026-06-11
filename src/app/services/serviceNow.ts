type SosAlertInput = {
  location: string;
  message: string;
  seniorName: string;
  seniorPhone: string;
  status: string;
};

export async function createSosAlert(input: SosAlertInput) {
  const response = await fetch('/api/servicenow/sos-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return data?.alert;
}
