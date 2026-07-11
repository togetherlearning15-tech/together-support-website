type FieldValue = string | number | boolean | null | undefined;
type EnquiryType = 'contact' | 'referral' | 'landlord' | 'careers';
type WebsiteEnquiryPayload = {
  type?: EnquiryType;
  source?: string;
  fields?: Record<string, FieldValue>;
};

declare const process: { env: Record<string, string | undefined> };

const recipientByType: Record<EnquiryType, string> = {
  contact: process.env.CONTACT_TO_EMAIL?.trim() || 'info@togsupport.co.uk',
  referral: process.env.REFERRAL_TO_EMAIL?.trim() || 'referrals@togsupport.co.uk',
  landlord: process.env.LANDLORD_TO_EMAIL?.trim() || 'landlords@togsupport.co.uk',
  careers: process.env.CAREERS_TO_EMAIL?.trim() || 'recruitment@togsupport.co.uk'
};

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

function escapeHtml(value: FieldValue): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function labelise(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildEmailHtml(type: EnquiryType, source: string, fields: Record<string, FieldValue>): string {
  const rows = Object.entries(fields)
    .filter(([key]) => key !== 'website')
    .map(([key, value]) => `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#0f2d45;width:190px;vertical-align:top;">${escapeHtml(labelise(key))}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#334155;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`)
    .join('');

  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#f6fbfb;padding:24px;color:#0f172a;"><div style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #dbe7ee;border-radius:18px;overflow:hidden;"><div style="background:#0f2d45;color:#fff;padding:22px 26px;"><h1 style="margin:0;font-size:22px;">New ${escapeHtml(labelise(type))} enquiry</h1><p style="margin:8px 0 0;color:#d8f6f2;">Submitted through ${escapeHtml(source)}</p></div><table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table><div style="padding:18px 26px;background:#f8fafc;color:#64748b;font-size:13px;line-height:1.6;"><strong>Together Support website enquiry</strong><br/>Submitted at ${escapeHtml(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))}</div></div></div>`;
}

function buildText(type: EnquiryType, source: string, fields: Record<string, FieldValue>): string {
  return [
    `New ${labelise(type)} enquiry`,
    `Source: ${source}`,
    '',
    ...Object.entries(fields)
      .filter(([key]) => key !== 'website')
      .map(([key, value]) => `${labelise(key)}: ${String(value ?? '')}`)
  ].join('\n');
}

async function sendEmail(apiKey: string, email: Record<string, unknown>) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  });

  const result = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, result };
}

async function readPayload(request: Request): Promise<{
  payload: WebsiteEnquiryPayload;
  attachment?: { filename: string; content: string };
}> {
  const contentType = request.headers.get('content-type') || '';

  if (!contentType.includes('multipart/form-data')) {
    return { payload: (await request.json()) as WebsiteEnquiryPayload };
  }

  const formData = await request.formData();
  const fieldsJson = String(formData.get('fields') || '{}');
  const file = formData.get('attachment');
  const payload: WebsiteEnquiryPayload = {
    type: (String(formData.get('type') || 'contact') as EnquiryType),
    source: String(formData.get('source') || 'Together Support website'),
    fields: JSON.parse(fieldsJson) as Record<string, FieldValue>
  };

  if (!(file instanceof File) || file.size === 0) {
    return { payload };
  }

  if (file.size > MAX_ATTACHMENT_BYTES) {
    throw new Error('Your CV is larger than 5 MB. Please upload a smaller file.');
  }

  if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
    throw new Error('Please upload your CV as a PDF, DOC or DOCX file.');
  }

  const content = Buffer.from(await file.arrayBuffer()).toString('base64');
  return { payload, attachment: { filename: file.name, content } };
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'POST' } });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing.');
      return Response.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    try {
      const { payload, attachment } = await readPayload(request);
      const type: EnquiryType = payload.type || 'contact';
      const source = payload.source?.trim() || 'Together Support website';
      const fields = payload.fields || {};

      if (fields.website) return Response.json({ ok: true });

      const name = String(fields.name ?? fields.full_name ?? fields.applicant_name ?? fields.referrer_name ?? fields.contact_name ?? '').trim();
      const replyTo = String(fields.email ?? fields.applicant_email ?? fields.contact_email ?? fields.referrer_email ?? '').trim();

      if (!name) return Response.json({ error: 'Name is required.' }, { status: 400 });
      if (!replyTo || !replyTo.includes('@')) return Response.json({ error: 'A valid email address is required.' }, { status: 400 });
      if (type === 'careers' && !attachment) return Response.json({ error: 'Please attach your CV before submitting.' }, { status: 400 });

      const from = process.env.RESEND_FROM_EMAIL?.trim() || 'Together Support Website <website@togsupport.co.uk>';
      const recipient = recipientByType[type] || recipientByType.contact;

      const email: Record<string, unknown> = {
        from,
        to: [recipient],
        reply_to: replyTo,
        subject: `New ${labelise(type)} enquiry - Together Support`,
        html: buildEmailHtml(type, source, fields),
        text: buildText(type, source, fields)
      };

      if (attachment) {
        email.attachments = [attachment];
      }

      const sent = await sendEmail(apiKey, email);
      if (!sent.ok) {
        console.error('Resend send failure:', { type, recipient, status: sent.status, result: sent.result });
        return Response.json({ error: sent.result?.message || 'The enquiry email could not be sent.' }, { status: sent.status });
      }

      if (process.env.SEND_ACKNOWLEDGEMENT !== 'false') {
        const acknowledgement = await sendEmail(apiKey, {
          from,
          to: [replyTo],
          subject: 'We have received your application - Together Support',
          html: `<div style="font-family:Arial,Helvetica,sans-serif;background:#f6fbfb;padding:24px;color:#0f172a;"><div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #dbe7ee;border-radius:18px;padding:26px;"><h1 style="margin-top:0;color:#0f2d45;font-size:22px;">Thank you for contacting Together Support</h1><p>We have received your ${type === 'careers' ? 'application and CV' : 'enquiry'} and a member of our team will review it shortly.</p><p>If your matter is urgent, please call us on <strong>0330 221 0527</strong>.</p><p style="color:#64748b;font-size:13px;">Together Support Ltd<br/>27–31 Church Road<br/>Bristol, BS5 9JJ</p></div></div>`,
          text: `Thank you for contacting Together Support. We have received your ${type === 'careers' ? 'application and CV' : 'enquiry'} and a member of our team will review it shortly.`
        });
        if (!acknowledgement.ok) console.error('Acknowledgement email failure:', acknowledgement);
      }

      return Response.json({ ok: true, message: 'Your application has been sent successfully.' });
    } catch (error) {
      console.error('Email function error:', error);
      return Response.json({ error: error instanceof Error ? error.message : 'Unexpected server error.' }, { status: 500 });
    }
  }
};
