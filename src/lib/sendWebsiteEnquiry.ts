export type EnquiryType = 'contact' | 'referral' | 'landlord' | 'careers';

type EnquiryPayload = {
  type: EnquiryType;
  source: string;
  fields: Record<string, FormDataEntryValue | null>;
};

export async function sendWebsiteEnquiry(payload: EnquiryPayload) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.error || 'Your enquiry could not be sent. Please try again or call us.');
  }

  return result;
}
