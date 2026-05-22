# Recon Dev LLC Website

Official website for Recon Dev LLC.

This site is built with Next.js and supports:

- Business landing page
- Service pages
- Project area pages
- Packages
- Process overview
- Contact/project intake form
- Resend email delivery
- Structured intake payloads
- Optional future CRM sync
- SEO metadata
- Sitemap and robots.txt
- Legal/footer pages

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Resend
- React Email
- Lucide Icons

## Local Development

```bash
npm install
npm run dev

Visit:

http://localhost:3000
Production Build
npm run build
npm run start
Environment Variables

Copy:

.env.local.example

to:

.env.local

Required for contact email:

RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

Optional for future CRM sync:

CRM_INTAKE_URL=
CRM_INTAKE_API_KEY=
CRM_SIGNING_SECRET=
Important Notes

The contact form uses server actions. Do not use static export.

Do not add secrets to client components or public environment variables.