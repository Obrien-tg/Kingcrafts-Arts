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