import axios from 'axios'
import img from '../../assets/images/login.jfif'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useContext, useState } from 'react'
import { userContext } from '../Context/userContext'

export default function Login() {

  let [apiError, setError] = useState('')
  let [isLoading, setLoading] = useState(false)

  let navigate = useNavigate()
  let { setLogin } = useContext(userContext)

  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]))
  }

  async function handleLogin(formData) {

    setLoading(true)

    await axios
      .post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        formData
      )
      .then((response) => {

        console.log("response", response.data)

        setLoading(false)

        if (response.data.message === 'success') {

          localStorage.setItem(
            'userToken',
            response.data.token
          )

          
          const decoded = parseJwt(response.data.token)

          console.log("decoded", decoded)

          localStorage.setItem('userId', decoded.id)

          setLogin(response.data.token)

          navigate('/')

        }

      })
      .catch((error) => {

        setLoading(false)

        setError(error.response?.data?.message)

      })

  }

  let validationSchema = Yup.object({

    email: Yup.string().required().email(),
    password: Yup.string().required().matches(/^[A-Z][a-z0-9]{6,8}$/),

  })

  let formik = useFormik({

    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,
    onSubmit: handleLogin,

  })

  return (
    <section className="min-vh-100 d-flex align-items-center py-5" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">

            <div className="auth-card">

              <div className="text-center bg-white p-4" style={{ borderBottom: '1px solid var(--line)' }}>
                <img src={img} width="200" alt="logo" className="mb-2" style={{ borderRadius: 'var(--r-md)' }} />
                <h4 className="fw-bold mb-1">Login Now</h4>
                <p className="small mb-0" style={{ color: 'var(--ink-soft)' }}>Welcome back to Volt Market</p>
              </div>

              {apiError && (
                <div className="mx-5 mt-3 px-3 py-2 text-center small" style={{ background: 'var(--danger-soft)', color: 'var(--danger)', borderRadius: 'var(--r-sm)' }}>
                  {apiError}
                </div>
              )}

              <div className="card-body p-4 p-md-5">

                <form onSubmit={formik.handleSubmit} className="row g-3">

                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      className="btn-primary w-100 py-2"
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty) || isLoading}
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>

                </form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
