import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"

export default function Allorders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  async function getUserOrders() {

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("userToken")

    if (!userId || !token) {
      setLoading(false)
      return
    }

    try {

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        {
          headers: {
            token: token
          }
        }
      )

      setOrders(data)

    } catch (error) {
      console.log("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">

        <span className="eyebrow d-block mb-2">History</span>

        <h2 className="fw-bold">
          My Orders
        </h2>

        <p style={{ color: 'var(--ink-soft)' }}>
          Track all your purchases
        </p>

      </div>

      {/* ORDERS */}
      <div className="row g-4">

        {orders.length === 0 ? (

          <div className="text-center">
            <h5 style={{ color: 'var(--ink-soft)' }} className="fw-semibold">
              No orders found yet
            </h5>
          </div>

        ) : (

          orders.map((order) => (

            <div key={order._id} className="col-12">

              <div className="order-card p-4">

                {/* ORDER HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

                  <div>

                    <h5 className="fw-bold mb-1">
                      Order #{order.id}
                    </h5>

                    <small style={{ color: 'var(--ink-soft)' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>

                  </div>

                  <span className="tag">
                    {order.paymentMethodType || "Paid"}
                  </span>

                </div>

                {/* ITEMS */}
                <div className="row g-3">

                  {order.cartItems?.map((item) => (

                    <div key={item._id} className="col-12 col-md-6 col-lg-4">

                      <div className="order-item-box p-3 h-100">

                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-100 mb-3"
                          style={{
                            height: "170px",
                            objectFit: "contain",
                            background: 'var(--paper)',
                            borderRadius: 'var(--r-sm)',
                            padding: '8px'
                          }}
                        />

                        <h6 className="fw-semibold">
                          {item.product.title
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </h6>

                        <p className="fw-bold m-0">
                          {item.price} EGP
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                {/* TOTAL */}
                <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap" style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>

                  <h5 className="fw-bold m-0">
                    Total:{" "}
                    <span>
                      {order.totalOrderPrice} EGP
                    </span>
                  </h5>

                  <span className="small" style={{ color: 'var(--ink-soft)' }}>
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}
