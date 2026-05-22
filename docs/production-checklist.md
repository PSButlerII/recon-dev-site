# Production Checklist

## Build

- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm run start`
- [ ] Verify homepage loads locally
- [ ] Verify all pages load locally:
  - [ ] `/`
  - [ ] `/services`
  - [ ] `/projects`
  - [ ] `/packages`
  - [ ] `/process`
  - [ ] `/about`
  - [ ] `/contact`
  - [ ] `/privacy`
  - [ ] `/terms`
  - [ ] `/accessibility`
- [ ] Verify `/sitemap.xml`
- [ ] Verify `/robots.txt`
- [ ] Verify `/opengraph-image`

## Contact Form

- [ ] Confirm `RESEND_API_KEY`
- [ ] Confirm `CONTACT_TO_EMAIL`
- [ ] Confirm `CONTACT_FROM_EMAIL`
- [ ] Submit test inquiry locally
- [ ] Confirm email arrives
- [ ] Confirm reference ID appears
- [ ] Confirm server logs show structured inquiry
- [ ] Confirm honeypot field does not affect normal users

## CRM Prep

- [ ] Leave `CRM_INTAKE_URL` blank until CRM endpoint is ready
- [ ] Leave `CRM_INTAKE_API_KEY` blank until CRM endpoint is ready
- [ ] Leave `CRM_SIGNING_SECRET` blank until CRM endpoint is ready
- [ ] Confirm form still works with CRM disabled

## Hostinger

- [ ] Output directory set to `.next`
- [ ] Build command set to `npm run build`
- [ ] Start command set to `npm run start`
- [ ] Environment variables configured
- [ ] Redeploy from GitHub
- [ ] Clear Hostinger cache if available
- [ ] Hard refresh browser
- [ ] Check browser console for missing `/_next/static/chunks` errors

## Security

- [ ] Do not expose secrets to client-side code
- [ ] Keep CRM sync server-to-server only
- [ ] Verify security headers
- [ ] Review `npm audit`
- [ ] Do not run `npm audit fix --force` without reviewing breaking changes

## Final Review

- [ ] Mobile layout check
- [ ] Desktop layout check
- [ ] Contact form check
- [ ] SEO metadata check
- [ ] Footer/legal links check
- [ ] Logo/favicon check