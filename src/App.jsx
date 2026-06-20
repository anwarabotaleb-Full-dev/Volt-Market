import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Layout & Pages
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Carts from "./components/Carts/Carts";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";
import BrandProducts from "./components/Brands/BrandProducts";
import Notfound from "./components/Notfound/Notfound";
import Wishlist from "./components/Wishlist/Wishlist";

// Context
import UserContextProvider from "./components/Context/userContext";
import CartContextProvider from "./components/Context/cartContext";
import WishlistContextProvider from "./components/Context/wishlistContext";

// Guards
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

// UI
import { Toaster } from "react-hot-toast";

// 🤖 Chatbot
import ChatBot from "./components/ChatBot/ChatBot";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);

  // 🌐 online/offline status
  useEffect(() => {
    const online = () => toast.success("Back online 🟢");
    const offline = () => toast.error("You are offline 🔴");

    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  // 🧠 fetch products for chatbot
  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setAllProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 🚀 Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },

        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },

        {
          path: "carts",
          element: (
            <ProtectedRoutes>
              <Carts />
            </ProtectedRoutes>
          ),
        },

        {
          path: "checkout/:cartId",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },

        {
          path: "brand/:id",
          element: (
            <ProtectedRoutes>
              <BrandProducts />
            </ProtectedRoutes>
          ),
        },

        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },

        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>

          {/* 🌐 Router */}
          <RouterProvider router={router} />

          {/* 🤖 ChatBot (GLOBAL FLOATING) */}
          <ChatBot products={allProducts} />

          {/* 🔔 Toast */}
          <Toaster position="top-center" />

        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}