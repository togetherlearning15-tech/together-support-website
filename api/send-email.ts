type FieldValue = string | number | boolean | null | undefined;

type EnquiryType = 'contact' | 'referral' | 'landlord' | 'Recuitment';

type WebsiteEnquiryPayload = {
  type?: EnquiryType;
  source?: string;
  fields?: Record<string, FieldValue>;
};

/**
 * Keeps TypeScript happy even if "node" has not been added
 * to the types section of tsconfig.json.
 */
declare const process: {
  env: Record<string, string | undefined>;
};

const recipientByType: Record<EnquiryType, string> = {
  contact:
    process.env.CONTACT_TO_EMAIL?.trim() ||
    'info@togsupport.co.uk',

  referral:
    process.env.REFERRAL_TO_EMAIL?.trim() ||
    'referrals@togsupport.co.uk',

  landlord:
    process.env.LANDLORD_TO_EMAIL?.trim() ||
    'landlords@togsupport.co.uk',

  careers:
    process.env. Recuitment_TO_EMAIL?.trim() ||
    'recruitment@togsupport.co.uk',
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

function buildEmailHtml(
  type: EnquiryType,
  source: string,
  fields: Record<string, FieldValue>,
): string {
  const rows = Object.entries(fields)
    .filter(([key]) => key !== 'website')
    .map(
      ([key, value]) => `
        <tr>
          <td style="
            padding:10px 12px;
            border-bottom:1px solid #e5e7eb;
            font-weight:700;
            color:#0f2d45;
            width:190px;
            vertical-align:top;
          ">
            ${escapeHtml(labelise(key))}
          </td>

          <td style="
            padding:10px 12px;
            border-bottom:1px solid #e5e7eb;
            color:#334155;
            white-space:pre-wrap;
          ">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join('');

  const submittedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/London',
  });

  return `
    <div style="
      font-family:Arial,Helvetica,sans-serif;
      background:#f6fbfb;
      padding:24px;
      color:#0f172a;
    ">
      <div style="
        max-width:760px;
        margin:0 auto;
        background:#ffffff;
        border:1px solid #dbe7ee;
        border-radius:18px;
        overflow:hidden;
      ">
        <div style="
          background:#0f2d45;
          color:#ffffff;
          padding:22px 26px;
        ">
          <h1 style="margin:0;font-size:22px;">
            New ${escapeHtml(labelise(type))} enquiry
          </h1>

          <p style="margin:8px 0 0;color:#d8f6f2;">
            Submitted through ${escapeHtml(source)}
          </p>
        </div>

        <table style="
          width:100%;
          border-collapse:collapse;
          font-size:15px;
        ">
          ${rows}
        </table>

        <div style="
          padding:18px 26px;
          background:#f8fafc;
          color:#64748b;
          font-size:13px;
          line-height:1.6;
        ">
          <strong>Together Support website enquiry</strong><br />
          Submitted at ${escapeHtml(submittedAt)}
        </div>
      </div>
    </div>
  `;
}

function buildText(
  type: EnquiryType,
  source: string,
  fields: Record<string, FieldValue>,
): string {
  const lines = Object.entries(fields)
    .filter(([key]) => key !== 'website')
    .map(([key, value]) => {
      return `${labelise(key)}: ${String(value ?? '')}`;
    });

  return [
    `New ${labelise(type)} enquiry`,
    `Source: ${source}`,
    '',
    ...lines,
  ].join('\n');
}

async function sendEmail(
  apiKey: string,
  email: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; result: any }> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

  const result = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    result,
  };
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json(
        { error: 'Method not allowed.' },
        {
          status: 405,
          headers: {
            Allow: 'POST',
          },
        },
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();

    if (!apiKey) {
      console.error('RESEND_API_KEY is missing.');

      return Response.json(
        { error: 'Email service is not configured.' },
        { status: 500 },
      );
    }

    try {
      const payload =
        (await request.json()) as WebsiteEnquiryPayload;

      const type: EnquiryType = payload.type || 'contact';
      const source =
        payload.source?.trim() || 'Together Support website';
      const fields = payload.fields || {};

      // Spam honeypot. Real visitors should never complete this field.
      if (fields.website) {
        return Response.json({ ok: true });
      }

      const name =
        String(fields.name ?? fields.referrer_name ?? '').trim();

      const replyTo = String(fields.email ?? '').trim();

      if (!name) {
        return Response.json(
          { error: 'Name is required.' },
          { status: 400 },
        );
      }

      if (!replyTo || !replyTo.includes('@')) {
        return Response.json(
          { error: 'A valid email address is required.' },
          { status: 400 },
        );
      }

      const recipient =
        recipientByType[type] || recipientByType.contact;

      const from =
        process.env.RESEND_FROM_EMAIL?.trim() ||
        'Together Support Website <website@togsupport.co.uk>';

      const enquiryResult = await sendEmail(apiKey, {
        from,
        to: [recipient],
        reply_to: replyTo,
        subject: `New ${labelise(type)} enquiry - Together Support`,
        html: buildEmailHtml(type, source, fields),
        text: buildText(type, source, fields),
      });

      if (!enquiryResult.ok) {
        console.error('Resend enquiry error:', enquiryResult.result);

        return Response.json(
          {
            error:
              enquiryResult.result?.message ||
              'The enquiry email could not be sent.',
          },
          { status: enquiryResult.status },
        );
      }

      // Send acknowledgement to the person who submitted the form.
      if (process.env.SEND_ACKNOWLEDGEMENT !== 'false') {
        const acknowledgementResult = await sendEmail(apiKey, {
          from,
          to: [replyTo],
          subject:
            'We have received your enquiry - Together Support',
          html: `
            <div style="
              font-family:Arial,Helvetica,sans-serif;
              background:#f6fbfb;
              padding:24px;
              color:#0f172a;
            ">
              <div style="
                max-width:640px;
                margin:0 auto;
                background:#ffffff;
                border:1px solid #dbe7ee;
                border-radius:18px;
                padding:26px;
              ">
                <h1 style="
                  margin-top:0;
                  color:#0f2d45;
                  font-size:22px;
                ">
                  Thank you for contacting Together Support
                </h1>

                <p>
                  We have received your enquiry and a member of
                  our team will review it shortly.
                </p>

                <p>
                  If your matter is urgent, please call us on
                  <strong>0330 221 0527</strong>.
                </p>

                <p style="color:#64748b;font-size:13px;">
                  Together Support Ltd<br />
                  27–31 Church Road<br />
                  Bristol, BS5 9JJ
                </p>
              </div>
            </div>
          `,
          text:
            'Thank you for contacting Together Support. ' +
            'We have received your enquiry and a member of our ' +
            'team will review it shortly. If your matter is urgent, ' +
            'please call 0330 221 0527.',
        });

        if (!acknowledgementResult.ok) {
          console.error(
            'Resend acknowledgement error:',
            acknowledgementResult.result,
          );
        }
      }

      return Response.json({
        ok: true,
        message: 'Your enquiry has been sent successfully.',
      });
    } catch (error) {
      console.error('Email function error:', error);

      return Response.json(
        {
          error:
            error instanceof Error
              ? error.message
              : 'Unexpected server error.',
        },
        { status: 500 },
      );
    }
  },
};