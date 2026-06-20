import axios from "axios"
import { useFormik } from "formik"
import { useParams } from "react-router-dom"
import * as Yup from "yup"
import { useState } from "react"

export default function Checkout() {

  let { cartId } = useParams()

  const [isLoading, setIsLoading] = useState(false)

  let headers = {
    token: localStorage.getItem("userToken")
  }

  async function handleCheckout(formData) {

    setIsLoading(true)

    await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {shippingAddress: formData},
      { headers : headers,
        params: {url: "http://localhost:5173"}
      }
    )
      .then((res) => {
        window.location.href = res.data.session.url
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })

  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema: Yup.object({
      details: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      city: Yup.string().required("Required")
    }),
    onSubmit: handleCheckout
  })

  return (

    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ background: 'var(--paper)' }}>

      <div className="col-11 col-sm-9 col-md-6 col-lg-5">

        {/* CARD */}
        <div className="checkout-card p-4">

          {/* HEADER */}
          <div className="text-center mb-4">

            <span className="eyebrow d-block mb-2">Almost there</span>

            <h3 className="fw-bold mb-1">Checkout</h3>

            <p className="small mb-0" style={{ color: 'var(--ink-soft)' }}>
              Enter your shipping details to continue
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={formik.handleSubmit}>

            {/* DETAILS */}
            <div className="mb-3">
              <label className="form-label small" style={{ color: 'var(--ink-soft)' }}>Details</label>
              <input
                type="text"
                name="details"
                className="form-control py-2"
                placeholder="Apartment, street, etc..."
                onChange={formik.handleChange}
                value={formik.values.details}
              />
            </div>

            {/* PHONE */}
            <div className="mb-3">
              <label className="form-label small" style={{ color: 'var(--ink-soft)' }}>Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control py-2"
                placeholder="01xxxxxxxxx"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </div>

            {/* CITY */}
            <div className="mb-4">
              <label className="form-label small" style={{ color: 'var(--ink-soft)' }}>City</label>
              <input
                type="text"
                name="city"
                className="form-control py-2"
                placeholder="Cairo / Giza / ..."
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </div>

            {/* BUTTON (WITH LOADER) */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-100 py-2"
            >

              {isLoading ? (
                <i className="fa fa-spinner fa-spin text-white"></i>
              ) : (
                <>
                  <i className="fas fa-credit-card"></i>
                  Pay Now
                </>
              )}

            </button>

          </form>

        </div>

      </div>

    </div>
  )
}
