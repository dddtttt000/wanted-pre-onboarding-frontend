import React, { createContext, useReducer } from "react"
import useLocalStorage from "./useLocalStorage"

export const AppContext = createContext({
  username: "",
  isLoggedIn: false,
  setUsername: () => {},
  setIsLoggedIn: () => {},
  token: null,
  setToken: () => {},
})

export const AppContextProvider = (props) => {
  const [username, setUsername] = useLocalStorage("username", null)
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false)
  const [token, setToken] = useLocalStorage("token", null)

  return (
    <AppContext.Provider
      value={{
        username,
        isLoggedIn,
        setUsername,
        setIsLoggedIn,
        token,
        setToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
