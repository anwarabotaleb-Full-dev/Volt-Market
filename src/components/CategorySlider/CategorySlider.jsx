import React, { useEffect, useState } from "react"
import axios from "axios"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

export default function CategorySlider() {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getCategories() {
      try {

        const res = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        )

        setCategories(res?.data?.data || [])

      } catch (err) {
        console.log(err)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    getCategories()

  }, [])

  return (
    <div className="container my-5">
      {loading ? (

        <p className="text-center eyebrow">
          Loading categories...
        </p>

      ) : (

        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 1600,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 5 },
          }}
          modules={[Autoplay]}
        >

          {categories.map((cat) => (

            <SwiperSlide key={cat._id}>

              <div className="category-card text-center p-3">

                {/* IMAGE WRAPPER */}
                <div className="image-box">

                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-img"
                  />

                </div>

                {/* NAME */}
                <p className="mt-3 fw-semibold mb-0">
                  {cat.name}
                </p>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      )}

    </div>
  )
}
