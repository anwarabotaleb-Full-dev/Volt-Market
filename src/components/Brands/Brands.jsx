import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import { Link } from "react-router-dom"

export default function Brands() {

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")

  async function getBrands() {

    setLoading(true)

    try {

      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      )

      setBrands(data.data)
      setLoading(false)

    } catch (err) {

      setError("Failed to load brands")
      setLoading(false)

    }
  }

  useEffect(() => {
    getBrands()
  }, [])

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <Loader />

  if (error) {
    return (
      <div className="container py-5 text-center" style={{ color: "var(--danger)" }}>
        {error}
      </div>
    )
  }

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">

        <span className="eyebrow d-block mb-2">Directory</span>

        <h2 className="fw-bold">
          Our Brands
        </h2>

        <p style={{ color: "var(--ink-soft)" }}>
          Explore top global brands
        </p>

        {/* SEARCH */}
        <div className="d-flex justify-content-center mt-4">

          <input
            type="text"
            className="filter-input"
            style={{ maxWidth: "420px" }}
            placeholder="Search brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* GRID */}
      <div className="row g-4">

        {filteredBrands.map((brand) => (

          <div key={brand._id} className="col-6 col-md-4 col-lg-3">

            <Link
              to={`/brand/${brand._id}`}
              className="text-decoration-none"
            >

              <div className="brand-card text-center p-3 h-100">

                <img
                  src={brand.image}
                  alt={brand.name}
                  className="mx-auto"
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "contain"
                  }}
                />

                <h6 className="mt-3 fw-semibold">
                  {brand.name}
                </h6>

              </div>

            </Link>

          </div>

        ))}

      </div>

    </div>
  )
}
