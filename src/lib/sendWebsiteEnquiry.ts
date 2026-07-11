export type EnquiryType = 'contact' | 'referral' | 'landlord' | 'careers';

type EnquiryPayload = {
  type: EnquiryType;
  source: string;
  fields: Record<string, FormDataEntryValue | null>;
  attachment?: File | null;
};

export async function sendWebsiteEnquiry(payload: EnquiryPayload) {
  let response: Response;

  if (payload.attachment) {
    const body = new FormData();
    body.append('type', payload.type);
    body.append('source', payload.source);
    body.append('fields', JSON.stringify(payload.fields));
    body.append('attachment', payload.attachment, payload.attachment.name);

    response = await fetch('/api/send-email', {
      method: 'POST',
      body
    });
  } else {
    response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.error || 'Your enquiry could not be sent. Please try again or call us.');
  }

  return result;
}
