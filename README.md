# Volt Market

A modern, full-featured e-commerce storefront built with React. Volt Market lets customers browse products, search and filter the catalog, manage a cart and wishlist, check out securely, and get help from a built-in shopping assistant — all on a clean, responsive interface.

> Live data is powered by the [Route E-Commerce REST API](https://ecommerce.routemisr.com) (`ecommerce.routemisr.com`).

---

## ✨ Features

- **Authentication** — Register and log in with form validation (Formik + Yup), protected routes, and persisted sessions
- **Product Browsing** — Full catalog with categories and brands, plus a homepage category slider
- **Search & Filters** — Live text search, category filter, price range, and sorting (price / rating)
- **Shopping Cart** — Add, update quantity, remove items, and view running totals
- **Wishlist** — Save and remove favorite products, backed by real wishlist API endpoints
- **Product Reviews & Ratings** — Star-rated reviews per product, shown alongside the store's own rating
- **Checkout** — Shipping details form with a secure, hosted checkout-session redirect
- **Order History** — View all past orders and their items
- **AI Shopping Assistant** — A floating chat widget that answers product questions and recommends items from the live catalog
- **Cart Micro-interactions** — Fly-to-cart animation and a cart badge bump on every add
- **Responsive Design** — Consistent experience across desktop, tablet, and mobile
- **Online/Offline Detection** — Toast notifications when connectivity changes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Library | [React](https://react.dev/) |
| Routing | [React Router](https://reactrouter.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Forms & Validation | [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) |
| Styling | Custom CSS design system + [Bootstrap](https://getbootstrap.com/) |
| Icons | [Font Awesome](https://fontawesome.com/) |
| Carousel | [Swiper](https://swiperjs.com/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Loading States | [react-loader-spinner](https://github.com/mhnpd/react-loader-spinner) |
| Build Tool | [Vite](https://vitejs.dev/) |
| State Management | React Context API |
| Backend | [Route E-Commerce REST API](https://ecommerce.routemisr.com) |

---

## 📁 Project Structure

```
src/
├── App.jsx                      # Routes, providers, global ChatBot mount
├── main.jsx                     # App entry point
├── index.css                    # Global design system (tokens, components)
├── assets/                      # Images and static assets
└── components/
    ├── Allorders/                # Order history page
    ├── Brands/                   # Brand list + brand-filtered products
    ├── Carts/                    # Shopping cart page
    ├── CategorySlider/           # Homepage category carousel
    ├── ChatBot/                  # Floating AI shopping assistant
    ├── Checkout/                 # Shipping form + checkout-session redirect
    ├── Context/
    │   ├── cartContext.jsx       # Cart state + API calls
    │   ├── userContext.jsx       # Auth/session state
    │   └── wishlistContext.jsx   # Wishlist state + API calls
    ├── Footer/
    ├── Layout/                   # Page shell (Navbar + Outlet + Footer)
    ├── Loader/                   # Loading spinner
    ├── Login/ & Register/        # Auth forms
    ├── Navbar/
    ├── Notfound/                 # 404 page
    ├── ProductDetails/           # Single product + reviews
    ├── Products/                 # Catalog grid + search/filter/sort
    ├── ProtectedRoutes/          # Route guard for authenticated pages
    ├── Utils/
    │   ├── chatBotBrain.js       # Rule-based reply logic for the AI assistant
    │   ├── flyToCart.js          # Fly-to-cart animation utility
    │   └── reviewsStore.js       # Local per-device review storage
    └── Wishlist/                 # Wishlist page
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/volt-market.git
cd volt-market

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔌 API Integration

Volt Market communicates with the Route E-Commerce REST API over Axios. Key endpoints used:

| Resource | Endpoint |
|---|---|
| Products | `GET /api/v1/products` |
| Categories | `GET /api/v1/categories` |
| Brands | `GET /api/v1/brands` |
| Cart | `GET / POST / PUT / DELETE /api/v1/cart` |
| Wishlist | `GET / POST / DELETE /api/v1/wishlist` |
| Auth | `POST /api/v1/auth/signin`, `POST /api/v1/auth/signup` |
| Checkout | `POST /api/v1/orders/checkout-session/:cartId` |
| Orders | `GET /api/v1/orders/user/:userId` |

> **Note:** Product reviews are stored locally per device (`localStorage`), since the practice API only exposes an aggregate rating per product rather than a full reviews endpoint.

---

## 🎨 Design System

Volt Market uses a custom design system defined in `src/index.css` — a small set of reusable tokens for color, type, and spacing rather than default framework styling.

| Token | Color |
|---|---|
| Ink (text) | `#15191C` |
| Pine (brand / actions) | `#1F3D34` |
| Clay (accent) | `#B5482B` |
| Gold (ratings) | `#A9791F` |
| Paper (surface) | `#FAF9F6` |

**Typography:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) for headings, [Inter](https://fonts.google.com/specimen/Inter) for body text.

---

## 🗺️ Roadmap

- [ ] Online payment integration
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] AI-powered product recommendations
- [ ] Server-backed product reviews

---

## 📄 License

This project is open source and available for educational and personal use.
