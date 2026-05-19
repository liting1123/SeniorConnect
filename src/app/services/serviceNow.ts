export type SosAlertPayload = {
  location: string;
  message: string;
  seniorName: string;
  seniorPhone: string;
  status?: string;
};

export async function createSosAlert(payload: SosAlertPayload) {
  const response = await fetch('/api/servicenow/sos-alert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = 'Unable to create ServiceNow SOS alert';

    try {
      const errorBody = JSON.parse(errorText) as { error?: string | { message?: string } };

      if (typeof errorBody.error === 'string') {
        message = errorBody.error;
      } else if (errorBody.error?.message) {
        message = errorBody.error.message;
      }
    } catch (error) {
      if (errorText) {
        message = errorText;
      }
    }

    throw new Error(message);
  }

  return response.json();
}
