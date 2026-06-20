import axios from 'axios'
import img from '../../assets/images/images.png'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useContext, useState } from 'react'
import { userContext } from '../Context/userContext';

export default function Register() {

  let { setLogin } = useContext(userContext)
  let [apiError, setError] = useState('')
  let [isLoading, setLoading] = useState(false)
  let navigate = useNavigate()

  async function handleRegister(formData) {
    setLoading(true)

    console.log('register', formData)

    await axios
      .post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        formData
      )
      .then((response) => {
        console.log('success', response)
        setLoading(false)

        if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token)
          setLogin(response.data.token)
          navigate('/login') // programmatic routing
        }
      })
      .catch((error) => {
        console.log('error', error.response.data.message)
        setLoading(false)
        setError(error.response.data.message)
      })
  }

  let validationSchema = Yup.object({
    name: Yup.string().required().min(3).max(10),
    email: Yup.string().required().email(),
    phone: Yup.string().required().matches(/^01[1250][0-9]{8}$/),
    password: Yup.string().required().matches(/^[A-Z][a-z0-9]{6,8}$/),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')]),
    iAgree: Yup.boolean().oneOf([true], 'You must accept terms'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      iAgree: false,
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  })

  return (
    <section className="min-vh-100 d-flex align-items-center py-5" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">

            <div className="auth-card">

              {/* Header */}
              <div className="text-center bg-white p-4" style={{ borderBottom: '1px solid var(--line)' }}>
                <img src={img} width="300" alt="logo" className="mb-2" style={{ borderRadius: 'var(--r-md)' }} />
                <h4 className="fw-bold mb-1">Create Account</h4>
                <p className="small mb-0" style={{ color: 'var(--ink-soft)' }}>
                  Join us and start shopping smarter
                </p>
              </div>

              {/* API ERROR */}
              {apiError ? (
                <div className="w-100 ">
                  <div className="mx-5 mt-5 mb-0 text-center px-3 py-2 small" style={{ background: 'var(--danger-soft)', color: 'var(--danger)', borderRadius: 'var(--r-sm)' }}>
                    {apiError}
                  </div>
                </div>
              ) : null}

              {/* Form */}
              <div className="card-body p-4 p-md-5">

                <form onSubmit={formik.handleSubmit} className="row g-3">

                  {/* Name */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${formik.touched.name && formik.errors.name
                          ? 'is-invalid'
                          : ''
                          }`}
                        placeholder="Full Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>Full Name</label>
                    </div>

                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger mt-1 small">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${formik.touched.email && formik.errors.email
                          ? 'is-invalid'
                          : ''
                          }`}
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>Email Address</label>
                    </div>

                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger mt-1 small">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        name="password"
                        className={`form-control ${formik.touched.password && formik.errors.password
                          ? 'is-invalid'
                          : ''
                          }`}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>Password</label>
                    </div>

                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger mt-1 small">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  {/* RePassword */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        name="rePassword"
                        className={`form-control ${formik.touched.rePassword &&
                          formik.errors.rePassword
                          ? 'is-invalid'
                          : ''
                          }`}
                        placeholder="Confirm Password"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>Confirm Password</label>
                    </div>

                    {formik.touched.rePassword &&
                      formik.errors.rePassword && (
                        <div className="text-danger mt-1 small">
                          {formik.errors.rePassword}
                        </div>
                      )}
                  </div>

                  {/* Phone */}
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="phone"
                        className={`form-control ${formik.touched.phone && formik.errors.phone
                          ? 'is-invalid'
                          : ''
                          }`}
                        placeholder="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label>Phone Number</label>
                    </div>

                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-danger mt-1 small">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Checkbox (NOT in validation UI) */}
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="iAgree"
                        id="iAgree"
                        checked={formik.values.iAgree}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="iAgree"
                      >
                        I agree to the terms and conditions
                      </label>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="col-12">
                    <div className="d-grid my-3">
                      <button
                        className="btn-primary py-3"
                        type="submit"
                        disabled={

                          !(formik.isValid && formik.dirty) || isLoading
                        }
                      >
                        {isLoading ? (
                          <i className="fa fa-spinner fa-spin text-white"></i>
                        ) : (
                          'Register Now'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="col-12 text-center mt-2">
                    <small style={{ color: 'var(--ink-soft)' }}>
                      Already have an account?{' '}
                      <a
                        href="/login"
                        className="text-decoration-none fw-semibold"
                        style={{ color: 'var(--pine)' }}
                      >
                        Login
                      </a>
                    </small>
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