import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { wishlistContext } from "../Context/wishlistContext"
import { cartContext } from "../Context/cartContext"
import axios from "axios"
import toast from "react-hot-toast"
import Loader from "../Loader/Loader"

export default function Wishlist() {

  const { wishlistIds, removeFromWishlist } = useContext(wishlistContext)
  const { addProductToCart } = useContext(cartContext)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // The wishlist endpoint already returns full product docs, but since the
  // context only keeps ids (kept generic so it can't drift from cart's
  // pattern), fetch full wishlist details for display here.
  async function loadWishlistProducts() {

    setLoading(true)

    try {

      const headers = { token: localStorage.getItem("userToken") }

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      )

      setProducts(data?.data || [])

    } catch {

      setProducts([])

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    loadWishlistProducts()

  }, [wishlistIds])

  async function handleRemove(id) {

    let res = await removeFromWishlist(id)

    if (res?.data?.status === "success") {

      toast.success("Removed from wishlist")
      setProducts((prev) => prev.filter((p) => p._id !== id))

    }

  }

  async function handleAddToCart(id) {

    let res = await addProductToCart(id)

    if (res?.data?.status === "success") {

      toast.success(res.data.message)

    } else {

      toast.error("Failed to add product")

    }

  }

  if (loading) return <Loader />

  return (

    <div className="container py-5">

      <div className="text-center mb-5">

        <span className="eyebrow d-block mb-2">Saved for later</span>

        <h2 className="fw-bold mb-2">My Wishlist</h2>

        <p style={{ color: "var(--ink-soft)" }}>
          {products.length} item{products.length !== 1 ? "s" : ""} saved
        </p>

      </div>

      {products.length === 0 ? (

        <div className="text-center py-5">

          <i className="fas fa-heart mb-3 d-block"
            style={{ fontSize: "48px", color: "var(--line-strong)" }}
          ></i>

          <h5 className="fw-bold mb-2">Your wishlist is empty</h5>

          <p style={{ color: "var(--ink-soft)" }} className="mb-4">
            Tap the heart on any product to save it here.
          </p>

          <Link to="/" className="btn-primary">
            Browse products
          </Link>

        </div>

      ) : (

        <div className="row g-4">

          {products.map((p) => (

            <div key={p._id} className="col-6 col-md-4 col-lg-3">

              <div className="product-card">

                <Link
                  to={`/productDetails/${p._id}`}
                  className="text-decoration-none text-dark"
                >

                  <div className="product-image-wrapper">

                    <img
                      src={p.imageCover}
                      className="product-img"
                      alt={p.title}
                      loading="lazy"
                    />

                  </div>

                </Link>

                <div className="card-body d-flex flex-column p-3">

                  <span className="tag mb-2">
                    {p.category?.name}
                  </span>

                  <h6 className="product-title mb-3">
                    {p.title?.split(" ").slice(0, 4).join(" ")}
                  </h6>

                  <div className="mt-auto d-flex justify-content-between align-items-center mb-3">

                    <span className="fw-bold fs-5">
                      {p.price} <span style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: "14px" }}>EGP</span>
                    </span>

                  </div>

                  <div className="d-flex gap-2">

                    <button
                      onClick={() => handleAddToCart(p._id)}
                      className="btn-primary flex-grow-1"
                    >
                      <i className="fas fa-cart-plus"></i>
                      Add
                    </button>

                    <button
                      onClick={() => handleRemove(p._id)}
                      className="btn-ghost-icon"
                      aria-label="Remove from wishlist"
                    >
                      <i className="fas fa-trash" style={{ fontSize: "13px" }}></i>
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}
