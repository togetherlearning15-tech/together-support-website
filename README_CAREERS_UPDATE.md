# Together Support Website — Careers Update

This release adds:

- Careers link in desktop and mobile navigation
- Dedicated Careers page
- "Join Our Team" homepage call-to-action
- Recruitment application form
- Applications routed through the existing email API using form type `careers`
- Default recipient: `recruitment@togsupport.co.uk`
- Automatic acknowledgement to applicants
- Corrected careers email API configuration

## Required Vercel environment variable

`CAREERS_TO_EMAIL=recruitment@togsupport.co.uk`

The existing `RESEND_API_KEY` and `RESEND_FROM_EMAIL` variables are also required.

## Test

1. Run `npm install`
2. Run `npm run dev`
3. Open `/careers`
4. Submit a test application
5. Confirm delivery to `recruitment@togsupport.co.uk`
