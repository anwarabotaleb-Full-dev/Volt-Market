import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../Loader/Loader"

export default function BrandProducts() {

  const { id } = useParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  async function getBrandProducts() {

    setLoading(true)

    try {

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      )

      const filtered = data.data.filter(
        (p) => p.brand?._id === id
      )

      setProducts(filtered)
      setLoading(false)

    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBrandProducts()
  }, [id])

  if (loading) return <Loader />

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">

        <span className="eyebrow d-block mb-2">Brand</span>

        <h2 className="fw-bold display-6 mb-2">
          Brand Products
        </h2>

        <p style={{ color: "var(--ink-soft)" }}>
          Discover products from this brand
        </p>

      </div>

      {/* GRID */}
      <div className="row g-4">

        {products.length === 0 ? (

          <div className="text-center py-5" style={{ color: "var(--ink-soft)" }}>
            <i className="fas fa-box-open fs-1 mb-3 d-block"></i>
            No products found for this brand
          </div>

        ) : (

          products.map((p) => (

            <div key={p._id} className="col-6 col-md-4 col-lg-3">

              <div className="brand-product-card h-100">

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={p.imageCover}
                    alt={p.title}
                    className="w-100"
                    style={{
                      height: "210px",
                      objectFit: "contain",
                      background: "var(--paper)",
                      padding: "12px",
                      transition: "0.4s"
                    }}
                  />

                </div>

                {/* BODY */}
                <div className="p-3 d-flex flex-column">

                  <h6 className="fw-semibold mb-2">
                    {p.title.split(" ").slice(0, 4).join(" ")}
                  </h6>

                  <div className="d-flex justify-content-between align-items-center mt-auto">

                    <span className="fw-bold fs-5">
                      {p.price} EGP
                    </span>

                    <span className="rating-box">
                      <i className="fas fa-star"></i>
                      {p.ratingsAverage || 4.5}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}
