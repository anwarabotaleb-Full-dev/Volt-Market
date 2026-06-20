import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/userContext'
import { cartContext } from '../Context/cartContext'
import { wishlistContext } from '../Context/wishlistContext'

export default function Navbar() {

  let navigate = useNavigate()

  let { isLogin, setLogin } = useContext(userContext) // distruct data
  let { cartCount } = useContext(cartContext) // distruct data
  let { wishlistCount } = useContext(wishlistContext)

  function logOut() {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `nav-link-minimal ${isActive ? 'is-active' : ''}`

  return (

    <nav className="navbar navbar-expand-lg app-navbar sticky-top py-3">

      <div className="container-fluid px-3 px-lg-5">

        {/* LOGO */}
        <NavLink
          to="/"
          className="navbar-brand brand-mark d-flex align-items-center gap-2"
        >
          Volt Market<span className="brand-dot">.</span>
        </NavLink>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarMenu">

          {isLogin ? (

            <ul className="navbar-nav mx-auto text-center mt-3 mt-lg-0">

              <li className="nav-item">
                <NavLink to="/" end className={linkClass}>
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/brands" className={linkClass}>
                  Brands
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/wishlist" className={linkClass}>
                  Wishlist
                  {wishlistCount > 0 && (
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--clay)',
                      fontWeight: 700
                    }}>
                      ({wishlistCount})
                    </span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/allorders" className={linkClass}>
                  Orders
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/carts" className={({isActive}) => `${linkClass({isActive})} cart-icon-anchor`}>
                  <span id="cart-icon-anchor" className="d-inline-flex">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  Cart

                  <span className="cart-count-badge">
                    {cartCount}
                  </span>

                </NavLink>

              </li>
            </ul>

          ) : (

            <div className="mx-auto"></div>

          )}

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center justify-content-center gap-2 mt-3 mt-lg-0 flex-wrap">

            {/* SOCIAL */}
            <div className="d-flex gap-1 fs-6">

              <a href="#" className="social-icon-minimal">
                <i className="fab fa-facebook"></i>
              </a>

              <a href="#" className="social-icon-minimal">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#" className="social-icon-minimal">
                <i className="fab fa-youtube"></i>
              </a>

              <a href="#" className="social-icon-minimal">
                <i className="fab fa-tiktok"></i>
              </a>

            </div>

            <div className="vr d-none d-lg-block opacity-25 mx-2" style={{ height: '24px' }} />

            {/* AUTH */}
            {!isLogin ? (

              <>
                <NavLink
                  to="/login"
                  className="btn-outline"
                  style={{ padding: '9px 18px' }}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="btn-primary"
                  style={{ padding: '9px 18px' }}
                >
                  Register
                </NavLink>
              </>

            ) : (

              <button
                onClick={logOut}
                className="btn-outline"
                style={{ padding: '9px 18px' }}
              >
                Logout
              </button>

            )}

          </div>

        </div>

      </div>

    </nav>

  )
}
