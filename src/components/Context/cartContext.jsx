import axios from "axios"
import { createContext, useState, useEffect } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export let cartContext = createContext()

export default function CartContextProvider({ children }) {

  const [cartCount, setCartCount] = useState(0)

  let headers = {
    token: localStorage.getItem("userToken")
  }

  // GET CART COUNT
  async function getCartCount() {

    let res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers }
    )

    setCartCount(res?.data?.numOfCartItems)

  }

  useEffect(() => {
     
    getCartCount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ADD PRODUCT
  async function addProductToCart(productId) {

    let response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers }
    )

    setCartCount(response?.data?.numOfCartItems)

    return response
  }

  // GET CART
  function getProductToCart() {

    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers }
    )

  }

  // REMOVE PRODUCT
  async function removeProduct(productId) {

    let response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers }
    )

    setCartCount(response?.data?.numOfCartItems)

    return response
  }

  // UPDATE COUNT
  function updateProductCount(productId, count) {

    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    )

  }

  // CLEAR CART
  async function clearCart() {

    let response = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers }
    )

    setCartCount(0)

    return response
  }

  return (

    <cartContext.Provider
      value={{
        addProductToCart,
        getProductToCart,
        removeProduct,
        updateProductCount,
        clearCart,
        cartCount
      }}
    >

      {children}

    </cartContext.Provider>

  )

}