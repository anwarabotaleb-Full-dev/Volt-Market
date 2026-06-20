import axios from "axios"
import { createContext, useState, useEffect } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export let wishlistContext = createContext()

export default function WishlistContextProvider({ children }) {

  const [wishlistIds, setWishlistIds] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)

  let headers = {
    token: localStorage.getItem("userToken")
  }

  // GET WISHLIST
  async function getWishlist() {

    if (!localStorage.getItem("userToken")) return

    try {

      let res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      )

      let ids = res?.data?.data?.map((item) => item._id) || []

      setWishlistIds(ids)
      setWishlistCount(res?.data?.count ?? ids.length)

      return res

    } catch (err) {

      return err?.response
    }

  }

  useEffect(() => {

    getWishlist()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ADD PRODUCT TO WISHLIST
  async function addToWishlist(productId) {

    let response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    )

    let ids = response?.data?.data || []

    setWishlistIds(ids)
    setWishlistCount(ids.length)

    return response
  }

  // REMOVE PRODUCT FROM WISHLIST
  async function removeFromWishlist(productId) {

    let response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers }
    )

    let ids = response?.data?.data || []

    setWishlistIds(ids)
    setWishlistCount(ids.length)

    return response
  }

  // TOGGLE HELPER (UI CONVENIENCE, USES THE SAME TWO CALLS ABOVE)
  function isInWishlist(productId) {
    return wishlistIds.includes(productId)
  }

  return (

    <wishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >

      {children}

    </wishlistContext.Provider>

  )

}
