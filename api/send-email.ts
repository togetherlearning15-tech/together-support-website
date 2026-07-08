type FieldValue = string | number | boolean | null | undefined;

type WebsiteEnquiryPayload = {
  type?: 'contact' | 'referral' | 'landlord' | 'careers';
  source?: string;
  fields?: Record<string, FieldValue>;
};

const recipientByType: Record<string, string> = {
  contact: process.env.CONTACT_TO_EMAIL || 'admin@togsupport.co.uk',
  referral: process.env.REFERRAL_TO_EMAIL || 'admin@togsupport.co.uk',
  landlord: process.env.LANDLORD_TO_EMAIL || 'admin@togsupport.co.uk',
  careers: process.env.CAREERS_TO_EMAIL || 'admin@togsupport.co.uk'
};

function escapeHtml(value: FieldValue): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function labelise(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildEmailHtml(payload: Required<WebsiteEnquiryPayload>) {
  const rows = Object.entries(payload.fields || {})
    .filter(([key]) => key !== 'website')
    .map(([key, value]) => {
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#0f2d45;width:190px;vertical-align:top;">${escapeHtml(labelise(key))}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#334155;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`;
    })
    .join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f6fbfb;padding:24px;color:#0f172a;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #dbe7ee;border-radius:18px;overflow:hidden;">
        <div style="background:#0f2d45;color:#ffffff;padding:22px 26px;">
          <h1 style="margin:0;font-size:22px;">New ${escapeHtml(labelise(payload.type))} enquiry</h1>
          <p style="margin:8px 0 0;color:#d8f6f2;">Submitted through ${escapeHtml(payload.source || 'Together Support website')}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          ${rows}
        </table>
        <div style="padding:18px 26px;background:#f8fafc;color:#64748b;font-size:13px;line-height:1.6;">
          <strong>Together Support website enquiry</strong><br />
          Submitted at ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
        </div>
      </div>
    </div>`;
}

function buildText(payload: Required<WebsiteEnquiryPayload>) {
  const lines = Object.entries(payload.fields || {})
    .filter(([key]) => key !== 'website')
    .map(([key, value]) => `${labelise(key)}: ${String(value ?? '')}`);
  return [`New ${labelise(payload.type)} enquiry`, `Source: ${payload.source}`, '', ...lines].join('\n');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const payload = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as WebsiteEnquiryPayload;

    // Honeypot: real users won't fill this hidden field.
    if (payload.fields?.website) {
      return res.status(200).json({ ok: true });
    }

    const type = payload.type || 'contact';
    const fields = payload.fields || {};

    if (!fields.name && !fields.referrer_name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!fields.email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const fullPayload: Required<WebsiteEnquiryPayload> = {
      type,
      source: payload.source || 'Together Support website',
      fields
    };

    const to = recipientByType[type] || recipientByType.contact;
    const from = process.env.RESEND_FROM_EMAIL || 'Together Support Website <onboarding@resend.dev>';
    const replyTo = String(fields.email || '');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: replyTo,
        subject: `New ${labelise(type)} enquiry - Together Support`,
        html: buildEmailHtml(fullPayload),
        text: buildText(fullPayload)
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        error: result?.message || 'Email could not be sent.'
      });
    }

    // Optional acknowledgement email to the person submitting the form.
    if (replyTo && process.env.SEND_ACKNOWLEDGEMENT !== 'false') {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from,
          to: replyTo,
          subject: 'We have received your enquiry - Together Support',
          html: `
            <div style="font-family:Arial,Helvetica,sans-serif;background:#f6fbfb;padding:24px;color:#0f172a;">
              <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe7ee;border-radius:18px;padding:26px;">
                <h1 style="margin-top:0;color:#0f2d45;font-size:22px;">Thank you for contacting Together Support</h1>
                <p>We have received your enquiry and a member of our team will review it shortly.</p>
                <p>If your matter is urgent, please call us on <strong>0330 221 0527</strong>.</p>
                <p style="color:#64748b;font-size:13px;">Together Support Ltd<br />27–31 Church Road, Bristol, BS5 9JJ</p>
              </div>
            </div>`,
          text: 'Thank you for contacting Together Support. We have received your enquiry and a member of our team will review it shortly. If urgent, call 0330 221 0527.'
        })
      }).catch(() => undefined);
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Unexpected server error.' });
  }
}
