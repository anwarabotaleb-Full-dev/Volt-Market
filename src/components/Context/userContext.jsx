import { createContext, useState } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export let userContext = createContext()

export default function UserContextProvider(props) {
  let [isLogin, setLogin] = useState(() => {
    return localStorage.getItem('userToken')
  })

  return (
    <userContext.Provider value={{ isLogin, setLogin }}>
      {props.children}
    </userContext.Provider>
  )
}