# Hostinger Deployment Notes

## Current Working Setup

Hostinger is connected to the GitHub repository and builds the site from the repo.

Current working output directory:

```txt
.next

Even though many Next.js deployments use the project root or blank output directory, this Hostinger setup has behaved more reliably with .next.
```

## Commands
``` bash
Build command:

npm run build

Start command:

npm run start
```
## Important Notes
```txt
If the site shows missing chunk errors such as:

/_next/static/chunks/... 404

or strange root errors such as:

GET / 403

the issue is likely deployment output path, stale cache, or Hostinger serving the wrong build layer.

Known recovery process:

1. Confirm output directory is .next
2. Trigger redeploy
3. Clear Hostinger cache/CDN if available
4. Hard refresh browser
Do Not Use Static Export

Do not use:

output: "export"

The contact form uses Next.js server actions and Resend. Static export would break server-side form handling.

Dependency Audit Notes

If npm audit reports PostCSS through Next.js internals, do not run:

npm audit fix --force

because it may downgrade Next.js and break the app. Wait for a patched Next.js release unless the vulnerability affects application code directly.


This becomes your deployment memory for the site.