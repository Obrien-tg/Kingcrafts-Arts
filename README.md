# Kingcrafts-Arts

## Adding a bag

1. Create a URL-safe Markdown file in `src/content/bags/`.
2. Add the required frontmatter fields: `title`, `description`, `category`,
   `availability`, `imageStatus`, `publicationStatus`, `standardPrice`,
   `madeToOrderPrice`, and `featured`.
3. Add a verified local product image under `src/assets/`, then reference it
   with the collection's `image` field when the image is available. Until then,
   use `imageStatus: "pending"` and omit `image`.
4. Set `availability` and `publicationStatus` independently; do not use
   image readiness as a proxy for product availability or publication state.
5. Only add `materials` or `customisationOptions` after they are confirmed.
6. Keep `standardPrice` and `madeToOrderPrice` as separate prices. The
   made-to-order price is not a sale or promotional discount.
7. Run `npm run check` and `npm run build`.

## Contact configuration

The WhatsApp input is read from `PUBLIC_WHATSAPP_PHONE` and is intentionally
unverified and not rendered publicly until `whatsappPhoneVerified` is set to
`true` after owner confirmation. The supplied email is read from
`PUBLIC_BUSINESS_EMAIL`, remains unverified, and is not published. Set the
corresponding `*_VERIFIED=true` flags only after the owner confirms the values.

The contact form requires a real receiving service through
`PUBLIC_INQUIRY_ENDPOINT`. Set `PUBLIC_INQUIRY_PROVIDER=netlify` only when
deploying to Netlify Forms; otherwise configure a compatible endpoint supplied
by the chosen host. The site does not claim successful submission without that
endpoint.