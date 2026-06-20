# What changed

## Design (modern minimal)
- New global design system in `src/index.css`: CSS variables for color/type/spacing, Space Grotesk + Inter fonts, hairline borders instead of heavy shadows/gradients/pill badges.
- Every component restyled to use the new tokens (Navbar, Footer, Products, ProductDetails, Carts, Brands, BrandProducts, CategorySlider, Login, Register, Checkout, Allorders, Notfound, Loader).
- No JSX structure, state, or API logic was changed during the redesign — only `className`/inline style swaps.

## New features

**Wishlist / favorites** — `src/components/Context/wishlistContext.jsx`, `src/components/Wishlist/Wishlist.jsx`.
Uses the real `routemisr` wishlist endpoints (`GET/POST/DELETE /api/v1/wishlist`), the same pattern as the existing cart context. Heart toggle added to product cards and the product details page; a "Wishlist" link with a live count was added to the navbar; a new protected `/wishlist` route was added in `App.jsx`.

**Advanced search & filters** — added directly inside `Products.jsx`.
Text search, category dropdown, price range slider, and sort (price/rating) — all computed client-side over the products array that was already being fetched. The original `getProducts()` fetch logic is untouched; filtering is a `useMemo` layered on top.

**Reviews & ratings** — `src/components/Utils/reviewsStore.js`, wired into `ProductDetails.jsx`.
Important: the routemisr practice API has no reviews endpoint, only aggregate `ratingsAverage`/`ratingsQuantity` per product. Rather than fake a network call, reviews are stored per-product in `localStorage` and shown alongside (not instead of) the real API rating fields. This is called out in the UI copy itself so it's not misleading.

**Cart animations & micro-interactions** — `src/components/Utils/flyToCart.js`.
A small DOM-position based "fly to cart" ghost animation runs whenever `addProductToCart` succeeds (Products grid + Product details), plus a bump animation on the navbar cart badge when the count changes. This is a separate, additive utility — it only reads element positions and never touches cart state or API calls.

## Verified
The full project was scaffolded and run through `npm install` + `npm run build` (Vite) here to confirm everything compiles cleanly with no errors.

## To run it
```
npm install
npm run dev
```
