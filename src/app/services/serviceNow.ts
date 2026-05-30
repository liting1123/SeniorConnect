export type SosAlertPayload = {
  location: string;
  message: string;
  seniorName: string;
  seniorPhone: string;
  status?: string;
};

async function getServiceNowError(response: Response, fallback: string) {
  const errorText = await response.text();
  let message = fallback;

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

  return message;
}

export async function createSosAlert(payload: SosAlertPayload) {
  const response = await fetch('/api/servicenow/sos-alert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getServiceNowError(response, 'Unable to create ServiceNow SOS alert'));
  }

  return response.json();
}

export async function updateSosAlertStatus(alertId: string, status: 'New' | 'Acknowledged' | 'Resolved') {
  const response = await fetch('/api/servicenow/sos-alert', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ alertId, status }),
  });

  if (!response.ok) {
    throw new Error(await getServiceNowError(response, 'Unable to update ServiceNow SOS alert'));
  }

  return response.json();
}
