# Recon Dev Website Engineering Design Review

**Review baseline:** commit `0436161`, reviewed 2026-07-18.
**Scope:** application source, route handlers, server actions, data and content models, shared components, security controls, documentation, deployment scripts, configuration, package manifests, and relevant Git history. Installed dependencies, generated framework files, local build output, and local configuration values were excluded.

## Evidence and confidence convention

- **Confirmed** means the behavior or constraint is directly visible in source, configuration, documentation, or committed history.
- **Likely** means the conclusion is a bounded inference from multiple repository artifacts, and the inference is stated explicitly.
- **Speculative** means the repository does not establish the conclusion. Speculative items are kept separate and are not treated as planned work.

Paths in this document link to repository evidence. No runtime credentials, configuration values, private infrastructure, or submitted inquiry data are reproduced.

## 1. Executive Summary

**Confirmed.** This repository implements the public website for Recon Dev LLC. It presents services, project areas, packages, process, company information, legal policies, contact intake, and a public Labs area for research, prototypes, internal tools, and engineering records. The stated audience is small businesses, startups, inventors, and hands-on operators seeking practical technical support, software, research, documentation, systems review, or prototype planning ([README.md](../README.md), [data/site.ts](../data/site.ts), [data/home.ts](../data/home.ts)).

The application is a Next.js App Router site built with TypeScript, React, Tailwind CSS, and reusable content components. Most pages are statically renderable. Dynamic server behavior is intentionally narrow: a contact server action sends inquiry email and can forward a signed payload to an external CRM, while two token-protected utility endpoints report health and build metadata ([package.json](../package.json), [app/contact/actions.ts](../app/contact/actions.ts), [app/api/health/route.ts](../app/api/health/route.ts), [app/api/version/route.ts](../app/api/version/route.ts)).

The website has no database or local durable business-record store. Public content is held in TypeScript data modules; contact inquiries leave the application through email and, when separately configured, an external CRM intake boundary. Labs detail pages are generated from a typed in-repository content model and are not an administrative content-management system ([data](../data), [data/labs.ts](../data/labs.ts), [lib/email.ts](../lib/email.ts), [lib/crm.ts](../lib/crm.ts)).

The repository has a clear small-system architecture and several recent hardening improvements, including privacy-safe inquiry metadata logs, accessible page headings and mobile navigation controls, authenticated utility endpoints, and reusable Engineering Record components. The principal engineering risks are the absence of automated tests and continuous integration, process-local rate limiting, best-effort CRM delivery without durable retry, incomplete runtime validation, inconsistent page-shell semantics, content-model maintenance concentrated in one large data file, and deployment knowledge that remains partly manual ([lib/security.ts](../lib/security.ts), [components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx), [docs/hostinger-deployment.md](./hostinger-deployment.md)).

## 2. Project Purpose

**Confirmed.** The site has three primary purposes:

1. Explain Recon Dev’s service areas, operating process, project fit, and pricing models to prospective clients ([app/page.tsx](../app/page.tsx), [app/services/page.tsx](../app/services/page.tsx), [app/packages/page.tsx](../app/packages/page.tsx), [app/process/page.tsx](../app/process/page.tsx)).
2. Convert an interested visitor into a structured project inquiry delivered to Recon Dev and optionally copied into an external CRM ([components/home/ContactSection.tsx](../components/home/ContactSection.tsx), [app/contact/actions.ts](../app/contact/actions.ts)).
3. Publish Recon Dev Labs and Engineering Records without presenting unfinished work as completed case studies or products ([app/labs/page.tsx](../app/labs/page.tsx), [data/lab-statuses.ts](../data/lab-statuses.ts), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx)).

**Confirmed.** The application is not a client portal, CRM, payment system, e-commerce platform, or general-purpose CMS. The CRM is an external integration target, and Labs content is maintained in source-controlled TypeScript data ([lib/crm.ts](../lib/crm.ts), [data/labs.ts](../data/labs.ts)).

**Likely.** The repository is optimized for a small owner-operated organization that values direct control, static public content, and a limited operational surface. This inference is supported by the absence of user accounts, administrative routes, database dependencies, or editorial tooling, together with the direct inquiry workflow and Git-based deployment documentation ([package.json](../package.json), [app](../app), [docs/hostinger-deployment.md](./hostinger-deployment.md)).

## 3. Intended Users

### Public visitors

**Confirmed.** Primary visitors are small-business operators, startups, inventors, independent builders, and teams with unclear technical problems. Public content is written to help them identify relevant support and submit a project inquiry even when they cannot classify the needed service ([data/site.ts](../data/site.ts), [data/home.ts](../data/home.ts), [app/about/page.tsx](../app/about/page.tsx)).

### Prospective clients

**Confirmed.** Prospective clients use the contact form to provide identity and contact information, the project type and goal, and optional blocker, timing, budget, and contextual details. The form explains that submission does not create a service agreement and instructs users not to include secrets ([components/home/ContactSection.tsx](../components/home/ContactSection.tsx), [app/terms/page.tsx](../app/terms/page.tsx), [app/privacy/page.tsx](../app/privacy/page.tsx)).

### Recon Dev operator

**Confirmed.** Recon Dev receives inquiry email, may receive the same structured inquiry in an external CRM, maintains Labs records in source, and uses deployment scripts and checklists for operational verification ([components/emails/ContactInquiryEmail.tsx](../components/emails/ContactInquiryEmail.tsx), [lib/crm.ts](../lib/crm.ts), [data/labs.ts](../data/labs.ts), [scripts/check-deployment.ps1](../scripts/check-deployment.ps1)).

### Search engines and link-preview clients

**Confirmed.** Metadata, Open Graph output, structured business/FAQ data, a sitemap, robots directives, a manifest, and a generated social image support machine consumption and discovery ([app/layout.tsx](../app/layout.tsx), [components/site/StructuredData.tsx](../components/site/StructuredData.tsx), [app/sitemap.ts](../app/sitemap.ts), [app/robots.ts](../app/robots.ts), [app/manifest.ts](../app/manifest.ts)).

**Speculative.** There is no repository evidence of authenticated customers, editors, employees, or third-party partners using the application directly. Those audiences should not drive architecture decisions until requirements exist.

## 4. Business Workflow

### Confirmed visitor-to-inquiry workflow

```text
Public content / Labs
        |
        v
Project inquiry form
        |
        v
Next.js server action
  -> parse and length-limit fields
  -> honeypot decision
  -> required-field and email validation
  -> process-local submission cooldown
  -> create inquiry identifier and timestamp
        |
        v
Send inquiry email (required for success)
        |
        +----> Return success and reference identifier
        |
        +----> Optional signed CRM delivery (best effort)
```

The implementation order is explicit in the server action and contact-pipeline documentation. A honeypot hit returns a success-shaped response without delivery; a validation, cooldown, or email failure returns a user-visible failure; CRM failure is caught and logged after email succeeds and does not change the successful user response ([app/contact/actions.ts](../app/contact/actions.ts), [docs/contact-intake-pipeline.md](./contact-intake-pipeline.md)).

The inquiry object is assembled once and used for email rendering and CRM mapping. The email contains the human-readable fields and a structured JSON representation. The CRM adapter adds fixed initial status/priority values, signs the exact serialized payload with a timestamp, and sends it only when the full server-side integration configuration is present ([lib/build-contact-inquiry.ts](../lib/build-contact-inquiry.ts), [components/emails/ContactInquiryEmail.tsx](../components/emails/ContactInquiryEmail.tsx), [lib/intake.ts](../lib/intake.ts), [lib/crm.ts](../lib/crm.ts)).

### Confirmed Labs publishing workflow

```text
Typed Lab record in data/labs.ts
        |
        +----> /labs card index
        |
        +----> static slug generation and metadata
        |
        +----> reusable Engineering Record sections
                     |
                     +----> empty optional sections render nothing
```

Each Lab record supplies status, category, lifecycle, narrative sections, logs, decisions, tradeoffs, limitations, future improvements, and optional link collections. Dynamic detail routes are statically enumerated from slugs at build time. Reusable section components return `null` for empty arrays, allowing records to grow without placeholder headings ([data/labs.ts](../data/labs.ts), [app/labs/[slug]/page.tsx](../app/labs/[slug]/page.tsx), [components/labs/LabDownloads.tsx](../components/labs/LabDownloads.tsx), [components/labs/LabReferences.tsx](../components/labs/LabReferences.tsx)).

### Workflow boundary

**Confirmed.** The website stops at inquiry delivery. It does not implement client qualification, project creation, quoting, invoicing, or delivery tracking. Those concepts may be described in a Lab Engineering Record, but they are not website workflows ([app/contact/actions.ts](../app/contact/actions.ts), [data/labs.ts](../data/labs.ts)).

## 5. System Architecture

### Confirmed high-level architecture

```text
Browser / crawler
      |
      v
Next.js App Router application
  |-- static and server-rendered public pages
  |-- client islands: navigation and inquiry form
  |-- contact server action
  |-- protected utility route handlers
  |-- metadata / sitemap / robots / manifest
      |
      +----> email delivery provider
      |
      +----> optional external CRM intake API

Source-controlled TypeScript data
  |-- business/site content
  |-- project and service catalogs
  |-- Lab Engineering Records
```

The application is a single deployable Next.js process. There is no repository evidence of microservices, message queues, worker processes, database connections, object storage, or an internal service layer beyond TypeScript modules ([package.json](../package.json), [app](../app), [lib](../lib)).

### Rendering model

**Confirmed.** Most pages and components are server components by default. `SiteHeader` is a client component for pathname-aware navigation and mobile menu state; `ContactSection` is a client component for server-action state, conditional fields, and form reset behavior. Lab layouts and content sections remain server components because their content is build-time data ([components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx), [components/home/ContactSection.tsx](../components/home/ContactSection.tsx), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx)).

**Confirmed.** Lab detail pages use static parameter generation. Utility APIs explicitly force dynamic handling. Contact processing uses a server action rather than an API route ([app/labs/[slug]/page.tsx](../app/labs/[slug]/page.tsx), [app/api/health/route.ts](../app/api/health/route.ts), [app/contact/actions.ts](../app/contact/actions.ts)).

### Module boundaries

**Confirmed.** The repository separates route composition (`app`), presentation (`components`), public content and record data (`data`), server/integration utilities (`lib`), shared types (`types`), operational documentation (`docs`), and deployment checks (`scripts`). Import aliases resolve from the repository root and TypeScript strict mode is enabled ([tsconfig.json](../tsconfig.json)).

**Likely.** This structure is appropriate for the current site size because it keeps the dynamic surface small and makes content changes reviewable. The primary scaling pressure is not service decomposition; it is the maintainability and validation of increasingly rich source-controlled content, especially the single Labs data module ([data/labs.ts](../data/labs.ts)).

## 6. Data Architecture

### Static content

**Confirmed.** Site identity, navigation, services, project areas, packages, process descriptions, FAQs, intake options, trust content, and Lab records are TypeScript exports. They are compiled with the application and changed through source control rather than at runtime ([data](../data)).

Advantages:

- Content and its TypeScript shape are reviewed together.
- Lab slugs, metadata, cards, and detail pages share one record source.
- No database or CMS is needed for the evidenced publishing workflow.

Tradeoffs:

- Content updates require a build and deployment.
- Type checking enforces shape but not factual accuracy, chronological ordering, safe external-link policy, or semantic consistency.
- `data/labs.ts` combines types and all records in one large module, increasing conflict and review surface as records grow ([data/labs.ts](../data/labs.ts)).

### Inquiry data

**Confirmed.** The `ContactInquiry` type contains a generated reference, source, contact fields, project description fields, and submission time. Parsing trims values and applies maximum lengths before validation. Required validation checks name, email, project type, and goal; email validation uses a simple regular expression ([types/intake.ts](../types/intake.ts), [lib/parse-contact-form.ts](../lib/parse-contact-form.ts), [lib/validate-contact-form.ts](../lib/validate-contact-form.ts)).

**Confirmed.** The website does not persist inquiry data locally. The durable copies evidenced are the delivered email and, when configured and successful, the external CRM payload. A process-local map stores only the last submission time keyed by the submitted email string ([lib/email.ts](../lib/email.ts), [lib/crm.ts](../lib/crm.ts), [lib/security.ts](../lib/security.ts)).

**Known data limitations.** Runtime validation is hand-written and narrower than the TypeScript type; option values such as budget, timeline, contact preference, and source are not server-side allowlisted. The generated reference uses time plus non-cryptographic randomness and is suitable as a user-facing correlation identifier, not a security token or guaranteed database key ([lib/build-contact-inquiry.ts](../lib/build-contact-inquiry.ts), [lib/validate-contact-form.ts](../lib/validate-contact-form.ts)).

### Lab Engineering Record model

**Confirmed.** `LabProject` requires core narrative and status fields and includes arrays for decisions, tradeoffs, limitations, improvements, downloads, references, resources, milestones, and development logs. Lifecycle is a complete record across discovery, research, planning, prototype, validation, documentation, release, and maintenance ([data/labs.ts](../data/labs.ts), [data/engineering-lifecycle.ts](../data/engineering-lifecycle.ts)).

**Confirmed limitation.** Milestones are always rendered under a heading by `EngineeringRecordLayout`, even when the array is empty; the `LabMilestones` child handles its own empty presentation. This differs from the fully hidden empty-state behavior used by decisions, downloads, references, and similar optional sections ([components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx), [components/labs/LabMilestones.tsx](../components/labs/LabMilestones.tsx)).

## 7. API Architecture

### Contact server action

**Confirmed.** The project’s main mutation interface is `submitContactForm`, a Next.js server action receiving browser `FormData` and returning a small typed state object. Parsing, validation, throttling, inquiry construction, email delivery, and optional CRM forwarding are delegated to focused library functions ([app/contact/actions.ts](../app/contact/actions.ts), [lib](../lib)).

The separation is generally clear: parsing performs normalization and length limiting, validation decides acceptance, the email module owns provider interaction, and the CRM module owns serialization/signing/transport. However, there is no shared executable schema that could be reused by the form, server action, email, and CRM adapter ([lib/parse-contact-form.ts](../lib/parse-contact-form.ts), [lib/validate-contact-form.ts](../lib/validate-contact-form.ts), [lib/intake.ts](../lib/intake.ts)).

### Utility route handlers

**Confirmed.** The only HTTP API routes are health and version endpoints. Both require the same header token before environment validation. Unauthorized calls return a generic 401 payload and do not trigger validation logs. Authorized health reports only an overall status; authorized version additionally returns public build/version fields and runtime mode ([lib/protected-endpoint.ts](../lib/protected-endpoint.ts), [app/api/health/route.ts](../app/api/health/route.ts), [app/api/version/route.ts](../app/api/version/route.ts)).

**Confirmed limitation.** Authentication uses direct string comparison and has no route-level throttling. The endpoints are operational utilities rather than a user identity system; the practical exposure depends on hosting-layer controls, which are not represented in source ([lib/protected-endpoint.ts](../lib/protected-endpoint.ts)).

### External CRM contract

**Confirmed.** CRM forwarding is server-to-server, uses bearer authorization plus an HMAC over timestamp and exact JSON body, and is skipped unless all required integration configuration is present. Non-success responses are logged, but the adapter does not throw on an HTTP error, retry, persist an outbox, or return delivery status to the server action ([lib/crm.ts](../lib/crm.ts), [lib/signature.ts](../lib/signature.ts)).

**Likely.** Email is the current authoritative delivery path because the server action fails when email delivery fails but reports success when CRM delivery fails. This is an inference from control flow, not an explicit product policy ([app/contact/actions.ts](../app/contact/actions.ts)).

## 8. UI Architecture

### Page composition

**Confirmed.** The homepage composes domain sections directly. Interior pages generally combine `PageShell`, `SiteHeader`, `PageHero`, one or more content sections, and a call to action. Shared primitives standardize containers, headings, cards, buttons, fields, alerts, and section backgrounds ([app/page.tsx](../app/page.tsx), [components/home](../components/home), [components/site](../components/site)).

**Confirmed.** `PageHero` renders its title as the page `h1` through configurable `SectionHeading`; the default heading level remains `h2` for ordinary sections. The mobile navigation trigger has a meaningful label, expansion state, and stable controlled-navigation identifier, and the revealed menu uses a `nav` landmark ([components/site/PageHero.tsx](../components/site/PageHero.tsx), [components/site/SectionHeading.tsx](../components/site/SectionHeading.tsx), [components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx)).

### Engineering Record UI

**Confirmed.** The Labs route owns project lookup, static metadata, hero, and call to action. `EngineeringRecordLayout` owns record presentation and composes typed server components for lifecycle, decisions, tradeoffs, limitations, history, lessons, downloads, references, resources, improvements, and related entries ([app/labs/[slug]/page.tsx](../app/labs/[slug]/page.tsx), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx)).

This is a strong reuse boundary: section components accept only their required data, use semantic elements, and suppress empty optional collections. Status/category definitions and lifecycle calculations are centralized ([components/labs](../components/labs), [data/lab-statuses.ts](../data/lab-statuses.ts), [data/engineering-lifecycle.ts](../data/engineering-lifecycle.ts)).

### Accessibility and semantic findings

**Confirmed strengths.** The root document declares English; forms use wrapping labels, native controls, required attributes, hints, and pending disabled state; responsive navigation exposes state to assistive technology; lifecycle progress uses ARIA progress semantics; and `next/image` supplies explicit logo dimensions and alt text ([app/layout.tsx](../app/layout.tsx), [components/site/FormField.tsx](../components/site/FormField.tsx), [components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx), [components/labs/LabEngineeringLifecycle.tsx](../components/labs/LabEngineeringLifecycle.tsx), [components/site/BrandLogo.tsx](../components/site/BrandLogo.tsx)).

**Confirmed limitations.** `PageShell` renders a `main` element, but many pages place `SiteHeader` inside it; the contact page also places `SiteFooter` inside it. Other pages omit the shared header or footer entirely, including Labs and legal pages. This produces inconsistent landmarks and navigation rather than one global shell ([components/site/PageShell.tsx](../components/site/PageShell.tsx), [app/contact/page.tsx](../app/contact/page.tsx), [app/labs/page.tsx](../app/labs/page.tsx), [app/privacy/page.tsx](../app/privacy/page.tsx)).

`FormAlert` does not declare live-region or alert semantics, so asynchronous submission feedback may not be announced reliably. The decorative active-link underline and menu icons do not explicitly declare themselves hidden, although the button has an accessible name. No automated accessibility tests or manual assistive-technology results are committed ([components/site/FormAlert.tsx](../components/site/FormAlert.tsx), [components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx), [package.json](../package.json)).

## 9. Security Review

### Confirmed controls

- Contact processing executes on the server; provider and CRM integration material is not imported into client components ([app/contact/actions.ts](../app/contact/actions.ts), [lib/email.ts](../lib/email.ts), [lib/crm.ts](../lib/crm.ts)).
- Form input is trimmed and length-limited before use, required values and email shape are checked, a honeypot handles simple bots, and repeated submissions have a short cooldown ([lib/parse-contact-form.ts](../lib/parse-contact-form.ts), [lib/validate-contact-form.ts](../lib/validate-contact-form.ts), [lib/security.ts](../lib/security.ts)).
- Normal inquiry logging uses an allowlisted metadata object rather than names, addresses, phone values, company names, or message bodies ([app/contact/actions.ts](../app/contact/actions.ts)).
- CRM transport signs timestamp plus body and keeps authorization server-side ([lib/crm.ts](../lib/crm.ts), [lib/signature.ts](../lib/signature.ts)).
- Utility endpoints authenticate before environment validation and return generic unauthorized responses ([app/api/health/route.ts](../app/api/health/route.ts), [app/api/version/route.ts](../app/api/version/route.ts)).
- Global response headers disable framework identification, prevent MIME sniffing, constrain framing, apply a referrer policy, and disable selected browser capabilities ([next.config.ts](../next.config.ts)).
- Public privacy and terms pages describe inquiry processing and clarify that submission does not establish a contract ([app/privacy/page.tsx](../app/privacy/page.tsx), [app/terms/page.tsx](../app/terms/page.tsx)).

### Confirmed risks and limitations

1. **Process-local rate limiting.** The cooldown map is per Node.js process, resets on restart, does not coordinate across replicas, keys directly on a case-sensitive visitor-supplied address, and has no eviction. It is abuse friction, not a durable rate limiter ([lib/security.ts](../lib/security.ts)).
2. **Limited bot defense.** The hidden honeypot is useful against unsophisticated automation but there is no evidence of origin checks, challenge verification, IP/device throttling, or provider-level abuse controls ([components/home/ContactSection.tsx](../components/home/ContactSection.tsx), [app/contact/actions.ts](../app/contact/actions.ts)).
3. **Incomplete server allowlisting.** Free-form fields are length-limited, but values expected to come from fixed UI options are not server-side allowlisted. A direct server-action request can supply values not present in the form ([data/intake.ts](../data/intake.ts), [lib/validate-contact-form.ts](../lib/validate-contact-form.ts)).
4. **CRM delivery has no durable recovery.** Network exceptions are caught by the action, HTTP failures are logged, and no retry queue or outbox exists. Email and CRM can therefore diverge ([app/contact/actions.ts](../app/contact/actions.ts), [lib/crm.ts](../lib/crm.ts)).
5. **Error logs may contain more detail than public logs.** The generic logger serializes stack traces for `Error` objects, and CRM HTTP failure logs include the remote response body. This is server-side only, but retention and redaction policy are not defined in the repository ([lib/logger.ts](../lib/logger.ts), [lib/crm.ts](../lib/crm.ts)).
6. **Header policy is partial.** The repository configures several valuable headers but not a Content Security Policy or strict transport policy. A hosting proxy may add them, but the repository contains no evidence either way ([next.config.ts](../next.config.ts)).
7. **No security regression tests.** Authentication order, metadata-only logs, input limits, and CRM signing are not covered by a committed automated test suite ([package.json](../package.json)).

### Likely and speculative security conclusions

**Likely.** The low number of dynamic endpoints and lack of a website database reduce the site’s attack surface relative to a stateful portal, but external email/CRM delivery and hosting configuration remain trust boundaries.

**Speculative.** The repository cannot establish production firewall, CDN, TLS, secret-manager, log-retention, backup, or provider-account controls. No claims about those controls should be made without operational evidence.

## 10. Deployment Review

**Confirmed.** The documented production target is a Hostinger deployment connected to the GitHub repository. The recorded build and start commands use the standard Next.js production lifecycle, and the deployment notes identify the framework build directory as the working output setting for that environment. Static export is explicitly unsupported because the contact flow requires server execution ([docs/hostinger-deployment.md](./hostinger-deployment.md), [README.md](../README.md)).

**Confirmed.** Production requires server-side email configuration; CRM forwarding is optional; health checks require a separate token; public build metadata is optional. This document intentionally does not enumerate configuration variable names or values. The source locations defining these requirements are [lib/env.ts](../lib/env.ts), [lib/crm.ts](../lib/crm.ts), [lib/protected-endpoint.ts](../lib/protected-endpoint.ts), and [app/api/version/route.ts](../app/api/version/route.ts).

The full deployment script checks protected health/version responses, public pages, and public assets. The light script checks health and the homepage. Both are manual PowerShell tools parameterized by deployment address and token; they do not deploy or mutate hosting configuration ([scripts/check-deployment.ps1](../scripts/check-deployment.ps1), [scripts/check-deployment-light.ps1](../scripts/check-deployment-light.ps1)).

**Confirmed limitations.** There is no committed CI workflow, infrastructure definition, container image, automated deployment test, rollback script, runtime monitoring integration, or alert configuration. The production checklist is useful but includes manual actions and has drift: its route checklist does not include Labs, while the current sitemap and application do ([docs/production-checklist.md](./production-checklist.md), [app/sitemap.ts](../app/sitemap.ts)).

**Likely.** Because deployment is Git-connected and content is compiled into the application, every content correction can trigger a full production build. This follows from the documented deployment model and source-controlled content, but exact trigger settings are external and therefore unconfirmed.

## 11. Engineering Decisions

1. **Use Next.js App Router as a single public-site runtime.** Pages, metadata, server actions, and utility APIs share one deployment. Evidence: [app](../app), [package.json](../package.json).
2. **Keep most content in typed source modules.** Services, packages, projects, navigation, and Labs records are versioned with code. Evidence: [data](../data), [types](../types).
3. **Use a server action for inquiry intake.** The form submits directly to typed server logic without adding a public JSON contact endpoint. Evidence: [components/home/ContactSection.tsx](../components/home/ContactSection.tsx), [app/contact/actions.ts](../app/contact/actions.ts).
4. **Make email delivery the success gate and CRM sync best effort.** The user receives success after email succeeds even if CRM sync fails. Evidence: [app/contact/actions.ts](../app/contact/actions.ts).
5. **Keep CRM integration server-to-server and optional.** The adapter requires complete configuration and signs each request. Evidence: [lib/crm.ts](../lib/crm.ts), [lib/signature.ts](../lib/signature.ts).
6. **Protect operational endpoints with a header token.** Authentication precedes configuration validation. Evidence: [lib/protected-endpoint.ts](../lib/protected-endpoint.ts), [app/api/health/route.ts](../app/api/health/route.ts).
7. **Represent Labs as Engineering Records.** Typed lifecycle and evidence-oriented sections distinguish active technical work from polished case studies. Evidence: [data/labs.ts](../data/labs.ts), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx).
8. **Hide empty optional record sections.** Optional engineering detail appears only when data exists. Evidence: [components/labs/LabDesignDecisions.tsx](../components/labs/LabDesignDecisions.tsx), [components/labs/LabDownloads.tsx](../components/labs/LabDownloads.tsx).
9. **Centralize public metadata.** Root metadata, per-page helpers, structured data, sitemap, robots, manifest, and social image are implemented in the framework metadata surface. Evidence: [app/layout.tsx](../app/layout.tsx), [lib/metadata.ts](../lib/metadata.ts), [app/sitemap.ts](../app/sitemap.ts).

Where the repository does not record rationale, the list above states observable decisions rather than assigning intent.

## 12. Design Tradeoffs

| Choice | Benefit | Cost | Evidence |
| --- | --- | --- | --- |
| Source-controlled content instead of CMS | Typed, reviewable, no CMS runtime | Requires code review/build; limited editor workflow | [data](../data) |
| Server action instead of public contact API | Small public API surface and direct React state integration | Harder to reuse outside the form; contract is not independently documented as HTTP | [app/contact/actions.ts](../app/contact/actions.ts) |
| Email-first delivery | Simple operator workflow and clear success condition | CRM may diverge; email contains a full inquiry copy | [lib/email.ts](../lib/email.ts), [app/contact/actions.ts](../app/contact/actions.ts) |
| Optional synchronous CRM forwarding | Immediate integration with no worker infrastructure | Adds request latency and has no durable retry | [lib/crm.ts](../lib/crm.ts) |
| In-memory cooldown | Minimal dependencies and implementation cost | Not distributed, durable, normalized, or bounded | [lib/security.ts](../lib/security.ts) |
| Static Lab generation | Fast public pages and build-time slug validation | Every record update requires deployment | [app/labs/[slug]/page.tsx](../app/labs/[slug]/page.tsx) |
| One `data/labs.ts` module | Simple lookup and shared typing | Large review surface and merge-conflict risk | [data/labs.ts](../data/labs.ts) |
| Reusable record sections | Consistent semantics and empty-state behavior | Layout ordering is centralized and less customizable per record | [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx) |
| Manual Hostinger checks | Transparent and easy to run locally | No automatic gate, historical record, or alerting | [scripts](../scripts), [docs/production-checklist.md](./production-checklist.md) |

## 13. Technical Debt

### High priority

1. **No automated test suite or CI gate.** Contact privacy, validation, email/CRM branching, signing, utility authentication, metadata, sitemap generation, and Labs rendering can regress without executable coverage. Add focused unit/integration tests and a CI workflow before expanding dynamic behavior ([package.json](../package.json)).
2. **Contact abuse controls are process-local.** A distributed or edge-aware limiter is needed if abuse volume or multi-instance deployment becomes material. The current map should at minimum normalize keys and evict stale entries ([lib/security.ts](../lib/security.ts)).
3. **No durable CRM delivery semantics.** If CRM intake becomes operationally important, introduce an idempotent outbox/queue or explicit delivery reconciliation rather than relying on one synchronous best-effort request ([lib/crm.ts](../lib/crm.ts)).

### Medium priority

1. **Runtime validation is fragmented.** Consolidate parsing and validation into an executable schema shared by intake mapping and tests; server-allowlist all enumerated form options ([lib/parse-contact-form.ts](../lib/parse-contact-form.ts), [lib/validate-contact-form.ts](../lib/validate-contact-form.ts)).
2. **Page-shell semantics and chrome are inconsistent.** Move shared header/footer outside one canonical `main` landmark and apply the shell consistently to public, Labs, and legal pages ([components/site/PageShell.tsx](../components/site/PageShell.tsx), [app](../app)).
3. **Labs content is monolithic.** Preserve the current public model but split records into typed per-project modules or add a build-time validation layer for dates, slug uniqueness, ordering, and link policy ([data/labs.ts](../data/labs.ts)).
4. **Logging policy is implicit.** Define redaction, response-body handling, retention, and stack-trace policy for production logs ([lib/logger.ts](../lib/logger.ts), [lib/crm.ts](../lib/crm.ts)).
5. **Deployment documentation drifts.** Align README, route checklists, scripts, and current application routes; distinguish historical recovery notes from verified current configuration ([README.md](../README.md), [docs](../docs), [scripts](../scripts)).

### Low priority

1. **Formatting consistency is uneven.** Several source files have inconsistent indentation, spacing, or legacy commented markup, increasing review noise without changing behavior ([components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx), [app/contact/page.tsx](../app/contact/page.tsx), [app/sitemap.ts](../app/sitemap.ts)).
2. **Starter assets remain.** Generic framework SVG assets and multiple historical logo variants remain under `public`; their runtime use is not established by the repository ([public](../public), [data/site.ts](../data/site.ts)).
3. **Small abstractions contain redundant options.** `BrandLogo` accepts a visual variant but currently selects the same asset for both values ([components/site/BrandLogo.tsx](../components/site/BrandLogo.tsx)).

## 14. Known Limitations

- The website does not persist inquiries, projects, users, or content in a local database ([package.json](../package.json), [lib/email.ts](../lib/email.ts), [lib/crm.ts](../lib/crm.ts)).
- Successful email delivery does not guarantee successful CRM delivery, and CRM delivery has no durable retry ([app/contact/actions.ts](../app/contact/actions.ts), [lib/crm.ts](../lib/crm.ts)).
- Rate limiting and honeypot behavior provide limited abuse resistance and do not coordinate across processes ([lib/security.ts](../lib/security.ts)).
- Contact validation checks only a subset of the implied form contract ([lib/validate-contact-form.ts](../lib/validate-contact-form.ts), [data/intake.ts](../data/intake.ts)).
- Utility endpoints report application/configuration status only; they do not test provider delivery or external CRM reachability ([app/api/health/route.ts](../app/api/health/route.ts)).
- Lab records have no editorial workflow, factual-evidence validator, or automated chronology check ([data/labs.ts](../data/labs.ts)).
- There is no automated browser, accessibility, performance, security, or deployment regression suite ([package.json](../package.json)).
- Production infrastructure state cannot be verified from repository source alone ([docs/hostinger-deployment.md](./hostinger-deployment.md)).

## 15. Lessons Learned

The following lessons are supported by implementation changes and current architecture rather than invented project history:

1. **Authenticate before diagnostics.** The protected utility endpoints now reject unauthorized requests before configuration validation, preventing unnecessary validation work and logs ([app/api/health/route.ts](../app/api/health/route.ts), Git commit `48bac96`).
2. **Operational logs need an explicit privacy boundary.** Contact submission logging was narrowed to allowlisted metadata while preserving delivery behavior ([app/contact/actions.ts](../app/contact/actions.ts), Git commit `36bf28f`).
3. **Accessibility works best as a component contract.** Heading-level support in `SectionHeading` and explicit mobile-navigation state in `SiteHeader` corrected multiple pages without page-specific redesign ([components/site/SectionHeading.tsx](../components/site/SectionHeading.tsx), [components/site/SiteHeader.tsx](../components/site/SiteHeader.tsx), Git commit `b65e94d`).
4. **Integration failure should not silently redefine primary success.** The current email-first flow keeps an optional CRM outage from losing the visitor’s successful email inquiry, but it also makes divergence visible as an architectural concern requiring reconciliation if CRM becomes authoritative ([app/contact/actions.ts](../app/contact/actions.ts)).
5. **Evidence-oriented content needs structured absence.** Labs components render nothing for empty optional arrays, allowing public records to omit unsupported facts instead of filling sections with placeholders ([components/labs/LabDownloads.tsx](../components/labs/LabDownloads.tsx), [components/labs/LabReferences.tsx](../components/labs/LabReferences.tsx)).
6. **Extracting layout from routing improves content reuse.** The Engineering Record refactor leaves project loading and metadata in the route while centralizing record presentation in one typed server component ([app/labs/[slug]/page.tsx](../app/labs/[slug]/page.tsx), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx), Git commit `6b0cab7`).
7. **Deployment recovery knowledge must be documented, but documentation is not an automated control.** The Hostinger notes capture output-path/cache failure modes, while scripts and checklists still require an operator to run and interpret them ([docs/hostinger-deployment.md](./hostinger-deployment.md), [scripts/check-deployment.ps1](../scripts/check-deployment.ps1)).

## 16. Future Roadmap

### Confirmed planned or documented work

- Keep CRM integration disabled unless its server-side endpoint and configuration are ready; the form must continue to work through email without it ([docs/production-checklist.md](./production-checklist.md), [lib/crm.ts](../lib/crm.ts)).
- Continue publishing Labs records as evidence becomes available and optional engineering sections can be populated safely ([app/labs/page.tsx](../app/labs/page.tsx), [components/labs/EngineeringRecordLayout.tsx](../components/labs/EngineeringRecordLayout.tsx)).
- Continue accessibility improvement as the site grows; the public accessibility statement explicitly describes it as ongoing work ([app/accessibility/page.tsx](../app/accessibility/page.tsx)).

### Likely engineering next steps supported by current debt

- Establish test and CI coverage around the contact flow, protected endpoints, metadata, and Labs empty-state behavior.
- Replace or augment process-local throttling if deployment scales beyond one durable process or attracts material abuse.
- Add durable CRM delivery/reconciliation if the integration moves from optional convenience to required business workflow.
- Add build-time Labs content validation and split record modules when edit conflicts or record size justify it.
- Normalize the page shell so every public route has consistent landmarks, navigation, and footer behavior.
- Add an explicit production logging and security-header policy.

### Speculative

There is no repository evidence of a planned CMS, customer account system, payment flow, on-site CRM database, mobile application, multi-tenant product, or service decomposition. These should not be represented as roadmap commitments.

## 17. Repository Strengths

1. **Small and understandable runtime surface.** Public pages dominate; dynamic behavior is limited to one server action and two utility routes ([app](../app)).
2. **Clear contact-flow decomposition.** Parsing, validation, construction, email, CRM mapping, signing, and logging have focused modules ([lib](../lib), [app/contact/actions.ts](../app/contact/actions.ts)).
3. **Privacy-conscious recent hardening.** Inquiry logs now use allowlisted metadata, and the public form explicitly discourages secret submission ([app/contact/actions.ts](../app/contact/actions.ts), [components/home/ContactSection.tsx](../components/home/ContactSection.tsx)).
4. **Typed, reusable public content architecture.** Data modules and shared presentation components reduce duplication across services, packages, project areas, and Labs ([data](../data), [components](../components)).
5. **Strong Engineering Record composition.** Lifecycle, decisions, tradeoffs, limitations, logs, lessons, and future work are typed and rendered through semantic reusable server components ([data/labs.ts](../data/labs.ts), [components/labs](../components/labs)).
6. **SEO and discovery coverage.** Metadata, structured data, sitemap, robots, manifest, and social image are implemented using framework conventions ([app/layout.tsx](../app/layout.tsx), [app/sitemap.ts](../app/sitemap.ts), [components/site/StructuredData.tsx](../components/site/StructuredData.tsx)).
7. **Baseline response hardening.** The framework-identification header is disabled and several global security headers are configured ([next.config.ts](../next.config.ts)).
8. **Operational documentation exists.** Contact flow, deployment recovery, production checks, and protected smoke-test scripts provide a starting operational record ([docs](../docs), [scripts](../scripts)).
9. **Strict TypeScript and framework linting.** The project enables strict TypeScript and the framework’s core-vitals and TypeScript ESLint configurations ([tsconfig.json](../tsconfig.json), [eslint.config.mjs](../eslint.config.mjs)).

## 18. Recommendations

### Immediate

1. Add automated tests for parsing/length limits, option allowlisting, inquiry reference creation, honeypot behavior, cooldown behavior, email/CRM branching, signature inputs, protected endpoint ordering, and Labs empty sections.
2. Add a CI workflow that runs lint, tests, and production build on every change. Keep deployment separate from review verification.
3. Normalize and bound the submission-cooldown store now; define a distributed replacement criterion based on deployment topology and abuse volume.
4. Stop logging arbitrary remote response bodies by default. Introduce a structured redaction policy and correlation identifier for provider failures.
5. Correct the shared page shell so header and footer sit outside one `main` landmark, then apply it consistently to Labs, legal, and standard pages.

### Near-term

1. Replace hand-written intake validation with a shared executable schema and server-side allowlists for all enumerated fields.
2. Decide and document the delivery guarantee for CRM sync. If required, add an idempotent outbox/queue and reconciliation; if optional, expose operator-visible failure metrics without changing visitor success.
3. Add a build-time Labs validator for unique slugs, newest-first log dates, lifecycle consistency, safe public links, and required evidence metadata. Split records into per-project modules only when this improves reviewability.
4. Bring README, production checklist, route smoke tests, and deployment notes into alignment with the current Labs and protected-endpoint architecture.
5. Add live-region semantics for form feedback and run documented keyboard, screen-reader, responsive, and contrast checks.
6. Define the complete production response-header policy and determine which controls belong in Next.js versus the hosting edge.

### Long-term

1. Introduce a CMS only if non-developer publishing frequency and editorial workflow justify the operational cost. Preserve typed validation and source review for Engineering Records.
2. Add durable application persistence only when a website-owned workflow requires it. The current external-delivery model does not justify a database by itself.
3. Revisit service boundaries only if independent scaling, ownership, or reliability requirements emerge. The current single Next.js deployment is proportionate to the confirmed scope.
4. Establish production observability, alerting, retention, and recovery evidence before claiming full production readiness.

These recommendations favor incremental hardening and documentation consistency. The repository does not provide evidence that a framework rewrite, service split, or new platform is necessary.
