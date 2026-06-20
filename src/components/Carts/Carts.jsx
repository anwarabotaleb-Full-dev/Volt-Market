import React, { useContext, useEffect, useState } from "react"
import { cartContext } from "../Context/cartContext"
import Loader from "../Loader/Loader"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export default function Carts() {

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  let {
    getProductToCart,
    removeProduct,
    updateProductCount,
    clearCart
  } = useContext(cartContext)

  // GET CART
  async function getCart() {

    let res = await getProductToCart()

    setCart(res?.data?.data)

    setLoading(false)

  }

  // REMOVE PRODUCT
  async function handleRemove(id) {

    let res = await removeProduct(id)

    if (res?.data?.status === "success") {

      toast.success("Product Removed")

      setCart(res?.data?.data)

    }

  }

  // UPDATE COUNT
  async function updateCount(id, count) {

    if (count < 1) return

    let res = await updateProductCount(id, count)

    if (res?.data?.status === "success") {

      setCart(res?.data?.data)

    }

  }

  // CLEAR CART
  async function handleClearCart() {

    let res = await clearCart()

    if (res?.data?.message === "success") {

      toast.success("Cart Cleared")

      setCart(null)

    }

  }

  // PAY NOW GO TO CHECKOUT PAGE
function handlePay() {

  if (!cart?._id) {
    toast.error("Cart not ready")
    return
  }

  navigate(`/checkout/${cart._id}`)
}

  useEffect(() => {

    getCart()

  }, [])

  if (loading) return <Loader />

  return (

    <div className="container py-5">

      {/* HEADER */}
      <div className="cart-header p-4 mb-5">

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">

          {/* LEFT */}
          <div>

            <span className="eyebrow d-block mb-2">Your selections</span>

            <h2 className="fw-bold mb-2">
              Shopping Cart
            </h2>

            <p style={{ color: "var(--ink-soft)" }} className="m-0">

              You have{" "}
              <span className="fw-bold" style={{ color: "var(--ink)" }}>
                {cart?.products?.length || 0}
              </span>{" "}
              items in your cart

            </p>

          </div>

          {/* RIGHT */}
          <div className="d-flex align-items-center gap-3 flex-wrap">

            <div className="total-box px-4 py-3">
              <span className="small d-block" style={{ color: "var(--ink-soft)" }}>
                Total Price
              </span>

              <h4 className="fw-bold m-0">
                {cart?.totalCartPrice} EGP
              </h4>
            </div>

            {/* PAY NOW → NAVIGATE */}
            <button
              className="btn-primary px-4 py-3"
              disabled={!cart?.products?.length}
              onClick={handlePay}
            >

              <i className="fas fa-credit-card"></i>

              Checkout

            </button>

            {/* CLEAR */}
            <button
              onClick={handleClearCart}
              className="btn-outline-danger px-4 py-3"
            >

              <i className="fas fa-trash"></i>

              Clear

            </button>

          </div>

        </div>

      </div>

      {/* EMPTY CART */}
      {cart?.products?.length === 0 && (

        <div className="text-center py-5">

          <i className="fas fa-cart-shopping mb-3"
            style={{ fontSize: "60px", color: "var(--line-strong)" }}
          ></i>

          <h3 className="fw-bold" style={{ color: "var(--ink-soft)" }}>
            Your Cart Is Empty
          </h3>

          <Link to="/" className="btn-primary mt-3 d-inline-flex">
            Continue shopping
          </Link>

        </div>

      )}

      {/* PRODUCTS */}
      {cart?.products?.map((item) => (

        <div
          key={item._id}
          className="cart-item mb-4"
        >

          <div className="card-body p-4">

            <div className="row align-items-center g-4">

              {/* IMAGE */}
              <div className="col-12 col-md-2 text-center">

                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="img-fluid"
                  style={{
                    maxHeight: "110px",
                    objectFit: "contain"
                  }}
                />

              </div>

              {/* INFO */}
              <div className="col-12 col-md-4">

                <span className="tag mb-2">
                  {item.product.category?.name}
                </span>

                <h5 className="fw-bold mb-2 mt-1">
                  {item.product.title}
                </h5>

                <h4 className="fw-bold m-0">
                  {item.price} EGP
                </h4>

              </div>

              {/* COUNT */}
              <div className="col-12 col-md-3">

                <div className="d-flex align-items-center justify-content-center gap-3">

                  <button
                    onClick={() =>
                      updateCount(item.product._id, item.count - 1)
                    }
                    className="count-btn"
                  >
                    <i className="fas fa-minus" style={{ fontSize: "12px" }}></i>
                  </button>

                  <span className="fw-bold fs-5" style={{ minWidth: "20px", textAlign: "center" }}>
                    {item.count}
                  </span>

                  <button
                    onClick={() =>
                      updateCount(item.product._id, item.count + 1)
                    }
                    className="count-btn-fill"
                  >
                    <i className="fas fa-plus" style={{ fontSize: "12px" }}></i>
                  </button>

                </div>

              </div>

              {/* REMOVE */}
              <div className="col-12 col-md-3 text-center text-md-end">

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="btn-outline-danger px-4 py-2"
                >
                  <i className="fas fa-trash"></i>
                  Remove
                </button>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  )

}
