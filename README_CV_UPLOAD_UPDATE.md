# Careers CV Upload Update

This release replaces the careers CV-link field with a real CV upload.

## What changed

- Applicants can upload PDF, DOC or DOCX files.
- Maximum CV size is 5 MB.
- The CV is attached to the recruitment email sent through Resend.
- Careers applications continue to route to `CAREERS_TO_EMAIL` (currently `recruitment@togsupport.co.uk`).
- Applicants receive the existing acknowledgement email.
- Contact, referral and landlord forms continue to use JSON and are unchanged.

## Install and test

```powershell
npm install
npm run dev
```

Test the Careers page with a small PDF CV.

## Deploy

```powershell
npm run build
git add .
git commit -m "Add secure careers CV upload"
git push
```

Vercel will deploy automatically.

## Vercel variables

No new environment variables are required. Keep the existing variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CAREERS_TO_EMAIL`
- `CONTACT_TO_EMAIL`
- `REFERRAL_TO_EMAIL`
- `LANDLORD_TO_EMAIL`

## Important

CVs are attached directly to the email and are not stored in Supabase in this release.
