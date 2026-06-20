import axios from "axios"
import React, { useEffect, useState, useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import { cartContext } from "../Context/cartContext"
import { wishlistContext } from "../Context/wishlistContext"
import toast from "react-hot-toast"
import Loader from "../Loader/Loader"
import { flyToCart } from "../Utils/flyToCart"
import { getReviews, addReview, getLocalAverage } from "../Utils/reviewsStore"


export default function ProductDetails() {

  let { id } = useParams()

  const [details, setDetails] = useState(null)
  const imgRef = useRef(null)

  let { addProductToCart } = useContext(cartContext)
  let { isInWishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext)

  // ---- NEW: client-side reviews state ----
  const [reviews, setReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" })

  // ADD TO CART
  async function handleAddToCart() {

    let res = await addProductToCart(id)
    console.log("response", res)

    if (res?.data?.status === "success") {

      toast.success(res.data.message)
      if (imgRef.current) flyToCart(imgRef.current)

    } else {

      toast.error("Failed to add product")

    }

  }

  async function handleToggleWishlist() {

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

  // GET DETAILS
  function getProductDetails() {

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data.data)
        setDetails(data.data)

      })
      .catch((err) => {

        console.log(err)

      })

  }

  useEffect(() => {

    getProductDetails()
    setReviews(getReviews(id))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  function handleReviewSubmit(e) {

    e.preventDefault()

    if (!reviewForm.comment.trim()) {
      toast.error("Write a few words first")
      return
    }

    const updated = addReview(id, reviewForm)

    setReviews(updated)
    setReviewForm({ name: "", rating: 5, comment: "" })
    toast.success("Review added")

  }

  const localAvg = getLocalAverage(id)

  // LOADER
  if (!details) return <Loader />

  return (

    <div className="container py-5">

      <div className="row align-items-center g-5">

        {/* IMAGE */}

        <div className="col-12 col-lg-5">

          <div className="simple-product-img bg-white p-4 text-center position-relative">

            <button
              className={`btn-ghost-icon position-absolute ${isInWishlist(id) ? "is-active" : ""}`}
              style={{ top: "16px", right: "16px", zIndex: 2 }}
              onClick={handleToggleWishlist}
              aria-label="Toggle wishlist"
            >
              <i className={isInWishlist(id) ? "fas fa-heart" : "far fa-heart"}></i>
            </button>

            <img
              ref={imgRef}
              src={details?.imageCover}
              alt={details?.title}
              className="img-fluid"
              style={{
                maxHeight: "420px",
                objectFit: "contain"
              }}
            />

          </div>

        </div>

        {/* DETAILS */}

        <div className="col-12 col-lg-7">

          <div className="simple-product-content">

            {/* CATEGORY */}

            <span className="tag">

              {details?.category?.name}

            </span>

            {/* TITLE */}

            <h1 className="fw-bold my-3">

              {details?.title}

            </h1>

            {/* DESCRIPTION */}

            <p
              className="mb-4"
              style={{
                lineHeight: "1.9",
                fontSize: "17px",
                color: "var(--ink-soft)"
              }}
            >

              {details?.description}

            </p>

            {/* PRICE + RATING */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

              <h2 className="fw-bold m-0">

                {details?.price} EGP

              </h2>

              <div className="d-flex align-items-center gap-2 fw-semibold" style={{ color: "var(--gold)" }}>

                <i className="fas fa-star"></i>

                <span>
                  {details?.ratingsAverage}
                </span>

                <span style={{ color: "var(--ink-soft)" }} className="small fw-normal">
                  ({details?.ratingsQuantity} ratings)
                </span>

              </div>

            </div>

            {/* FEATURES */}

            <div className="d-flex flex-wrap gap-4 mb-5" style={{ color: "var(--ink-soft)" }}>

              <div className="d-flex align-items-center gap-2">

                <i className="fas fa-truck" style={{ color: "var(--pine)" }}></i>

                <span>Fast Delivery</span>

              </div>

              <div className="d-flex align-items-center gap-2">

                <i className="fas fa-shield-alt" style={{ color: "var(--pine)" }}></i>

                <span>Secure Payment</span>

              </div>

              <div className="d-flex align-items-center gap-2">

                <i className="fas fa-rotate-left" style={{ color: "var(--pine)" }}></i>

                <span>Easy Return</span>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={handleAddToCart}
              disabled={!details}
              className="btn-primary simple-cart-btn py-3 px-5"
            >

              <i className="fas fa-cart-plus"></i>

              Add To Cart

            </button>

          </div>

        </div>

      </div>

      {/* ============ REVIEWS ============ */}
      <div className="row mt-5 pt-4">

        <div className="col-12" style={{ borderTop: "1px solid var(--line)" }}>

          <div className="row g-5 mt-4">

            <div className="col-12 col-lg-5">

              <span className="eyebrow d-block mb-2">Customer Reviews</span>

              <h3 className="fw-bold mb-3">
                {localAvg ? localAvg.toFixed(1) : "—"}
                <span style={{ fontSize: "16px", color: "var(--ink-soft)", fontWeight: 500 }}>
                  {" "}/ 5 from {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </h3>

              <p style={{ color: "var(--ink-soft)", fontSize: "13.5px" }} className="mb-4">
                This product's overall rating ({details?.ratingsAverage} / {details?.ratingsQuantity} ratings)
                comes from the store. Reviews below are saved on this device.
              </p>

              <form onSubmit={handleReviewSubmit} className="review-card">

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Your rating</label>
                  <div className="star-picker">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        className={n <= reviewForm.rating ? "active" : ""}
                        onClick={() => setReviewForm((f) => ({ ...f, rating: n }))}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Your name (optional)"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="filter-input"
                    rows="3"
                    placeholder="Share your thoughts about this product..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-100">
                  Submit Review
                </button>

              </form>

            </div>

            <div className="col-12 col-lg-7">

              {reviews.length === 0 ? (

                <div className="text-center py-5" style={{ color: "var(--ink-soft)" }}>
                  <i className="fas fa-comment-dots mb-3 d-block" style={{ fontSize: "32px" }}></i>
                  No reviews yet. Be the first to share your thoughts.
                </div>

              ) : (

                <div className="d-flex flex-column gap-3">

                  {reviews.map((r) => (

                    <div key={r.id} className="review-card">

                      <div className="d-flex justify-content-between align-items-start mb-2">

                        <span className="fw-semibold">{r.name}</span>

                        <span className="review-stars">
                          {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                        </span>

                      </div>

                      <p className="mb-1" style={{ color: "var(--ink-soft)" }}>
                        {r.comment}
                      </p>

                      <span className="small" style={{ color: "var(--ink-faint)" }}>
                        {new Date(r.date).toLocaleDateString()}
                      </span>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}
