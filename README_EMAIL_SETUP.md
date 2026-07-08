# Together Support Website — Email Setup

This release makes the public website forms send email through Resend using a Vercel serverless API route.

## Forms Included

- Contact form
- Referral form
- Landlord enquiry form

## Required Vercel Environment Variable

Add this in Vercel → Project → Settings → Environments / Environment Variables:

```text
RESEND_API_KEY
```

## Recommended Optional Variables

These allow you to control where messages go without changing the code:

```text
CONTACT_TO_EMAIL=admin@togsupport.co.uk
REFERRAL_TO_EMAIL=admin@togsupport.co.uk
LANDLORD_TO_EMAIL=admin@togsupport.co.uk
CAREERS_TO_EMAIL=admin@togsupport.co.uk
RESEND_FROM_EMAIL=Together Support Website <onboarding@resend.dev>
SEND_ACKNOWLEDGEMENT=true
```

After adding or changing environment variables, redeploy the website in Vercel.

## Important

If you verify `togsupport.co.uk` inside Resend, change `RESEND_FROM_EMAIL` to something like:

```text
RESEND_FROM_EMAIL=Together Support <website@togsupport.co.uk>
```

Until the domain is verified in Resend, use the default Resend sender.
