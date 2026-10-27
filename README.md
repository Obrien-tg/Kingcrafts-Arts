# Kingcrafts-Arts

## Adding a bag

1. Create a URL-safe Markdown file in `src/content/bags/`.
2. Add the required frontmatter fields: `title`, `description`, `category`,
   `status`, `standardPrice`, `madeToOrderPrice`, and `featured`.
3. Add a verified local product image under `src/assets/`, then reference it
   with the collection's `image` field when the image is available. Until then,
   use `status: "image-pending"` and omit `image`.
4. Only add `materials` or `customisationOptions` after they are confirmed.
5. Keep `standardPrice` and `madeToOrderPrice` as separate prices. The
   made-to-order price is not a sale or promotional discount.
6. Run `npm run check` and `npm run build`.