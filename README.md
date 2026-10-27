# KING CRAFT ARTS

Portfolio and custom-inquiry website for KING CRAFT ARTS and artist Ronald
Takunda Chaparadza.

The site is a static Astro project. It has no checkout, payment gateway,
database, authentication system, or e-commerce platform.

## Stack

- Astro `6.4.8`
- Tailwind CSS `4.1.18` through `@tailwindcss/vite`
- Strict TypeScript
- npm with the committed `package-lock.json`
- Astro Content Layer collections with the `glob()` loader

## Requirements

- Node.js compatible with Astro 6. The current Astro 6 dependency supports
  Node `^20.19.1` or `>=22.12.0`.
- npm `>=9.6.5`

## Local development

```bash
npm ci
npm run dev
```

The development server is normally available at
`http://localhost:4321/`.

Useful commands:

```bash
npm run check      # Astro type and template diagnostics
npm run typecheck  # Alias for npm run check
npm run build      # Production static build to dist/
npm run preview    # Preview the built site locally
```

## Deployment

The site is prepared for Netlify's static hosting and Netlify Forms.

The provider-neutral deployment settings are:

```text
Build command: npm run build
Publish/output directory: dist
Install command: npm ci
```

The project uses Astro's static output by default and does not require an
adapter. A selected host must support static files and client-side fallback
handling for `404.html`. The generated [404 page](./src/pages/404.astro)
contains working links to Home, Gallery, and Contact.

Before deploying, configure the host's fallback behaviour so a missing URL
serves `dist/404.html`. Do not add a provider-specific configuration file
unless the hosting setup requires one.

### Netlify Forms

Set this environment variable in Netlify before deploying:

```text
PUBLIC_INQUIRY_PROVIDER=netlify
```

Leave `PUBLIC_INQUIRY_ENDPOINT` empty. In this mode, the contact form is
rendered with Netlify's `data-netlify` attribute, a named form, a hidden
`form-name` field, and a honeypot field. Netlify detects it during the build
and exposes submissions in the site's Forms area after deployment.

After the first successful deployment:

1. Open the site in Netlify and confirm that `king-craft-arts-inquiry` appears
   under **Forms**.
2. Submit a real test enquiry from the deployed Contact page.
3. Confirm the submission appears in **Forms > king-craft-arts-inquiry**.
4. Configure email notifications in Netlify if notification delivery is
   wanted. The repository does not hardcode a receiving email address.

## Environment variables

Copy [.env.example](./.env.example) to `.env` for local configuration. Never
commit `.env` or real contact credentials.

| Variable | Required | Purpose |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Before launch | Production site URL used for canonical and social metadata, for example `https://example.com`. |
| `PUBLIC_WHATSAPP_PHONE` | Only after owner confirmation | WhatsApp input number. A South African local number such as `061 434 3088` is normalised to `27614343088` for `wa.me`. |
| `PUBLIC_WHATSAPP_PHONE_VERIFIED` | Only after owner confirmation | Must be `true` before any WhatsApp link is rendered. |
| `PUBLIC_BUSINESS_EMAIL` | Only after owner confirmation | Reserved for a future confirmed business email; it is not currently published by the site. |
| `PUBLIC_BUSINESS_EMAIL_VERIFIED` | Only after owner confirmation | Verification flag for the reserved email value. |
| `PUBLIC_INQUIRY_ENDPOINT` | Only for non-Netlify providers | Real form receiver URL. Leave empty when using Netlify Forms. |
| `PUBLIC_INQUIRY_PROVIDER` | For a working form | Set to `netlify` when deploying on Netlify Forms. The form remains disconnected for an empty or unsupported provider without an endpoint. |

The supplied phone number and email remain unverified and are not stored in
the repository or emitted by the default build. Do not set verification flags
until the owner confirms the values.

The contact form does not claim success without a configured receiving
service. Netlify Forms is considered configured only when
`PUBLIC_INQUIRY_PROVIDER=netlify`; the Netlify dashboard still needs to be
configured and verified after deployment.

## Content management

### Adding a bag

1. Create a URL-safe Markdown file in `src/content/bags/`.
2. Add the required frontmatter:

   ```yaml
   title: "Example Bag"
   description: "A confirmed, accurate description."
   category: "side-bag"
   availability: "unconfirmed"
   imageStatus: "pending"
   publicationStatus: "published"
   standardPrice: 0
   madeToOrderPrice: 0
   featured: false
   ```

3. Add a real, approved product photograph under `src/assets/`.
4. Reference that local image from the entry's `image` field using Astro's
   collection image schema. Add meaningful `imageAlt` text.
5. Set `imageStatus: "confirmed"` only when the image is an approved product
   photograph. Never use stock, generated, or placeholder imagery as a real
   product image.
6. Keep `availability`, `imageStatus`, and `publicationStatus` independent.
   Image readiness must not imply product availability.
7. Add `materials` and `customisationOptions` only after they are confirmed.
8. Run `npm run check` and `npm run build`.

The collection is defined in
[src/content.config.ts](./src/content.config.ts) and is the single source of
truth for the gallery, bag detail pages, homepage selections, and contact-form
bag options.

### Pricing rules

Every catalogue item must have both required non-negative integer fields:

- `standardPrice`
- `madeToOrderPrice`

They must remain separate everywhere they are displayed. Made-to-order pricing
is a separate order price, not a sale, saving, or discount. Do not calculate or
display a discount percentage.

### Current catalogue

The eight approved entries are:

| Slug | Title | Standard Price | Made-to-Order Price |
| --- | --- | ---: | ---: |
| `small-side-bag` | Small Side Bag | R250 | R175 |
| `standard-side-bag` | Standard Side Bag | R300 | R210 |
| `double-side-bag` | Double Side Bag | R400 | R280 |
| `medium-satchel` | Medium Satchel | R700 | R490 |
| `big-satchel` | Big Satchel | R900 | R630 |
| `cooler-bag` | Cooler Bag | R1,500 | R1,050 |
| `picnic-bag` | Picnic Bag | R1,500 | R1,050 |
| `picnic-bag-medium` | Picnic Bag — Medium | R700 | R490 |

Both Picnic Bag entries must keep distinct titles, descriptions, filenames,
and generated detail routes.

## SEO, social metadata, and sitemap

Each route uses the shared [SEO component](./src/components/SEO.astro) through
[Layout.astro](./src/layouts/Layout.astro). Page-specific titles and
descriptions are supplied by each page.

Set `PUBLIC_SITE_URL` in the production environment to enable canonical URLs,
Open Graph URLs, and absolute social-image URLs. Do not invent a production
domain.

Social sharing imagery is optional. When an approved social image exists, pass
its path through the page layout's `image` prop. Do not use product
placeholders or unapproved imagery for social previews.

No sitemap integration is currently configured. Once a production host and
canonical site URL are selected, add and configure a sitemap integration only
if it is required by that deployment. Re-run the build and inspect the
generated metadata after changing SEO settings.

## Contact and WhatsApp verification

WhatsApp links are generated centrally in
[src/data/site.ts](./src/data/site.ts), with contextual messages for:

- General enquiries
- A specific bag
- Made-to-order enquiries

Links are omitted unless the number exists and
`PUBLIC_WHATSAPP_PHONE_VERIFIED=true`.

The contact form is in [src/pages/contact.astro](./src/pages/contact.astro)
and [src/components/InquiryForm.astro](./src/components/InquiryForm.astro).
It includes native required-field validation and a honeypot. Configure a real
endpoint before launch and verify both successful and failed submissions.

## Final handover audit

Run the following from a clean checkout:

```bash
npm ci
npm run check
npm run build
git status --short --branch
```

Then verify:

1. All required routes load:
   - `/`
   - `/gallery/`
   - all eight `/gallery/<slug>/` pages
   - `/artist/`
   - `/custom/`
   - `/contact/`
   - `/404.html`
2. Navigation links work on desktop and mobile.
3. Both prices and their exact labels appear on every product card and detail
   page.
4. No unverified phone number or email appears in source or build output.
5. WhatsApp links are absent before verification and use the correct
   international number after verification.
6. The contact form has a real endpoint and returns genuine success/failure
   responses after deployment.
7. Approved product photographs are present and optimized, or explicit
   placeholders remain visible.
8. Materials, availability, customization, delivery, lead-time, payment,
   returns, deposit, and cancellation policies are confirmed before being
   published.

## Known pre-launch issues

- The site still needs to be deployed to Netlify and the form verified in the
  Netlify Forms dashboard.
- The WhatsApp number is unverified.
- The supplied business email is unverified and not published.
- `PUBLIC_INQUIRY_PROVIDER=netlify` must be set in Netlify before deployment
  for the contact form to be active.
- All eight catalogue entries currently need approved product photography.
- Availability, materials, customisation options, lead times, delivery,
  payment, care, returns, exchanges, deposits, and other order policies remain
  unconfirmed.
- No sitemap is configured until a production URL and hosting decision are
  made.
- `npm ci` and `npm audit --omit=dev --audit-level=high` report three
  transitive vulnerabilities in the Astro 6 dependency tree. The available
  forced fix upgrades Astro across a major version, so it has not been applied
  without a planned runtime/framework upgrade.
