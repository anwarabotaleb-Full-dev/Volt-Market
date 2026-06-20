import React from "react"

export default function Footer() {

  return (

    <footer
      className="app-footer text-light mt-5"
    >

      <div className="container py-5">

        <div className="row gy-5 align-items-start">

          {/* LEFT SIDE */}

          <div className="col-12 col-lg-4 text-center text-lg-start">

            <h3 className="fw-bold m-0 text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Volt Market<span style={{ color: 'var(--clay)' }}>.</span>
            </h3>

            <p
              className="mb-4"
              style={{
                lineHeight: "1.8",
                color: "#9aa39d"
              }}
            >

              A modern shopping experience built with React —
              fast browsing, a clear cart, and checkout that gets out of your way.

            </p>

            <div className="d-flex gap-2 justify-content-center justify-content-lg-start flex-wrap">

              <span className="eyebrow" style={{ color: "#9aa39d" }}>React</span>
              <span className="eyebrow" style={{ color: "#9aa39d" }}>·</span>
              <span className="eyebrow" style={{ color: "#9aa39d" }}>Bootstrap</span>
              <span className="eyebrow" style={{ color: "#9aa39d" }}>·</span>
              <span className="eyebrow" style={{ color: "#9aa39d" }}>E-Commerce</span>

            </div>

          </div>

          {/* MIDDLE LINKS */}

          <div className="col-12 col-md-6 col-lg-4 text-center">

            <span className="eyebrow d-block mb-4" style={{ color: "#9aa39d" }}>
              Quick Links
            </span>

            <div className="d-flex flex-column gap-3">

              <a href="#" className="footer-link text-decoration-none">
                Home
              </a>

              <a href="#" className="footer-link text-decoration-none">
                Products
              </a>

              <a href="#" className="footer-link text-decoration-none">
                Cart
              </a>

              <a href="#" className="footer-link text-decoration-none">
                Brands
              </a>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="col-12 col-md-6 col-lg-4 text-center text-lg-end">

            <span className="eyebrow d-block mb-4" style={{ color: "#9aa39d" }}>
              Follow Us
            </span>

            <div className="d-flex justify-content-center justify-content-lg-end gap-2 mb-4">

              <a href="#" className="footer-social">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="#" className="footer-social">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#" className="footer-social">
                <i className="fab fa-twitter"></i>
              </a>

              <a href="#" className="footer-social">
                <i className="fab fa-youtube"></i>
              </a>

              <a href="#" className="footer-social">
                <i className="fab fa-tiktok"></i>
              </a>

            </div>

            <p className="mb-1" style={{ color: "#9aa39d" }}>
              support@Volt Market.com
            </p>

            <p style={{ color: "#9aa39d" }}>
              +20 114 808 4532
            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

          <p className="m-0 small" style={{ color: "#9aa39d" }}>
            © 2026 Volt Market. All Rights Reserved.
          </p>

          <span className="small" style={{ color: "#9aa39d" }}>
            Made using React and Bootstrap
          </span>

        </div>

      </div>

    </footer>

  )

}
