import axios from "axios"
import { useState, useEffect, useContext, useMemo, useRef } from "react"
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom"
import { cartContext } from "../Context/cartContext"
import { wishlistContext } from "../Context/wishlistContext"
import toast from "react-hot-toast"
import CategorySlider from "../CategorySlider/CategorySlider"
import { flyToCart } from "../Utils/flyToCart"

export default function Products() {

  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // ---- NEW: search / filter / sort state (purely client-side, additive) ----
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [maxPrice, setMaxPrice] = useState(20000)
  const [sortBy, setSortBy] = useState("default")

  let { addProductToCart } = useContext(cartContext)
  let { isInWishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext)

  async function handleAddToCart(id, imgEl) {

    let res = await addProductToCart(id)

    if (res?.data?.status === "success") {

      toast.success(res.data.message)
      if (imgEl) flyToCart(imgEl)

    } else {

      toast.error("Failed to add product")

    }

  }

  async function handleToggleWishlist(id) {

    try {

      if (isInWishlist(id)) {

        await removeFromWishlist(id)
        toast.success("Removed from wishlist")

      } else {

        await addToWishlist(id)
        toast.success("Added to wishlist")

      }

    } catch {

      toast.error("Please login to use the wishlist")

    }

  }

  async function getProducts() {

    setIsLoading(true)

    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {

        setProduct(data.data)

        setIsLoading(false)

      })
      .catch(() => {

        setError("Failed to load products")

        setIsLoading(false)

      })

  }

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts()

  }, [])

  // ---- NEW: derived category list + filtered/sorted product list ----
  const categories = useMemo(() => {

    const map = new Map()

    product.forEach((p) => {
      if (p.category?._id) map.set(p.category._id, p.category.name)
    })

    return Array.from(map, ([id, name]) => ({ id, name }))

  }, [product])

  const visibleProducts = useMemo(() => {

    let list = [...product]

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase()
      list = list.filter((p) => p.title?.toLowerCase().includes(term))
    }

    if (categoryFilter !== "all") {
      list = list.filter((p) => p.category?._id === categoryFilter)
    }

    list = list.filter((p) => p.price <= maxPrice)

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price)
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price)
    if (sortBy === "rating") list.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0))

    return list

  }, [product, searchTerm, categoryFilter, maxPrice, sortBy])

  if (isLoading) return <Loader />

  if (error) {

    return (

      <div className="container py-5 text-center" style={{ color: "var(--danger)" }}>

        {error}

      </div>

    )

  }

  return (


    <div className="container py-5">
      <div className="text-center py-4">
        <span className="eyebrow d-block mb-2">Browse</span>
        <h2 className="fw-bold">
          Shop Popular Categories
        </h2>

        <p style={{ color: "var(--ink-soft)" }} className="mb-0">
          Explore top categories and find your favorite products
        </p>
      </div>
      <CategorySlider />
      {/* TITLE */}

      <div className="text-center mb-4">
        <h1 className="fw-bold display-5">

          Discover Amazing Products

        </h1>

        <p style={{ color: "var(--ink-soft)" }} className="fs-5">

          Best quality products with a modern shopping experience

        </p>

      </div>

      {/* FILTER BAR */}
      <div className="filter-bar mb-5">

        <div className="row g-3 align-items-center">

          <div className="col-12 col-lg-4">
            <input
              type="text"
              className="filter-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-6 col-lg-3">
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-lg-3">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="col-12 col-lg-2 d-flex align-items-center gap-2">
            <span className="eyebrow" style={{ whiteSpace: "nowrap" }}>Up to {maxPrice} EGP</span>
          </div>

          <div className="col-12">
            <input
              type="range"
              min="0"
              max="20000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-100"
              style={{ accentColor: "var(--ink)" }}
            />
          </div>

        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: "1px solid var(--line)" }}>

          <span className="result-count">
            <span key={visibleProducts.length}>{visibleProducts.length}</span> products
          </span>

          {(searchTerm || categoryFilter !== "all" || sortBy !== "default" || maxPrice < 20000) && (
            <button
              className="filter-chip"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setSortBy("default")
                setMaxPrice(20000)
              }}
            >
              Clear filters
            </button>
          )}

        </div>

      </div>

      {/* PRODUCTS */}

      {visibleProducts.length === 0 ? (

        <div className="text-center py-5">
          <i className="fas fa-box-open mb-3 d-block" style={{ fontSize: "40px", color: "var(--line-strong)" }}></i>
          <h5 className="fw-bold">No products match your filters</h5>
        </div>

      ) : (

        <div className="row g-4">

          {visibleProducts.map((productInfo) => (

            <ProductCard
              key={productInfo._id}
              productInfo={productInfo}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              inWishlist={isInWishlist(productInfo._id)}
            />

          ))}

        </div>

      )}

    </div>

  )

}

function ProductCard({ productInfo, onAddToCart, onToggleWishlist, inWishlist }) {

  const imgRef = useRef(null)

  return (

    <div className="col-6 col-md-4 col-lg-3">

      {/* PRODUCT CARD */}

      <div className="product-card">

        {/* WISHLIST */}
        <button
          className={`btn-ghost-icon wishlist-heart ${inWishlist ? "is-active" : ""}`}
          onClick={() => onToggleWishlist(productInfo._id)}
          aria-label="Toggle wishlist"
        >
          <i className={inWishlist ? "fas fa-heart" : "far fa-heart"} style={{ fontSize: "14px" }}></i>
        </button>

        {/* IMAGE */}

        <Link
          to={`/productDetails/${productInfo._id}`}
          className="text-decoration-none text-dark"
        >

          <div className="product-image-wrapper position-relative overflow-hidden">

            <img
              ref={imgRef}
              src={productInfo.imageCover}
              className="card-img-top product-img"
              alt={productInfo.title}
              loading="lazy"
            />

            {/* OVERLAY */}

            <div className="product-overlay"></div>

            <span className="view-details">
              View Details
            </span>

          </div>

        </Link>

        {/* BODY */}

        <div className="card-body d-flex flex-column p-3">

          {/* CATEGORY */}

          <span className="tag mb-3">
            {productInfo.category?.name}
          </span>

          {/* TITLE */}

          <h6 className="product-title mb-3">

            {productInfo.title
              ?.split(" ")
              .slice(0, 4)
              .join(" ")}

          </h6>

          {/* PRICE + RATING */}

          <div className="mt-auto d-flex justify-content-between align-items-center">

            <div>

              <span className="fw-bold fs-5">

                {productInfo.price}

              </span>

              <span style={{ color: "var(--ink-soft)" }} className="ms-1">
                EGP
              </span>

            </div>

            <div className="rating-box">

              <i className="fas fa-star"></i>

              {productInfo.ratingsQuantity}

            </div>

          </div>

        </div>

        {/* BUTTON */}

        <div className="px-3 pb-3">

          <button
            onClick={() => onAddToCart(productInfo._id, imgRef.current)}
            className="btn add-cart-btn w-100 py-2"
          >

            <i className="fas fa-cart-plus me-2"></i>

            Add To Cart

          </button>

        </div>

      </div>

    </div>

  )

}
