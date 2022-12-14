import "./App.css"
import React, { Redirect, useState, useContext } from "react"
import { AppContext } from "../src/data/AppContext"
import { Routes, Route, Router } from "react-router-dom"
import Main from "./pages/Main"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

function App() {
  const { isLoggedIn, token } = useContext(AppContext)

  return (
    <>
      <div className="App">
        <header className="App-header">🖇 TODO</header>
      </div>

      <Routes>
        <Route
          path="/signin"
          render={() => (token ? <Redirect to="/" /> : <Signin />)}
          // element={token ? <Main /> : <Signin />}
        />
        <Route path="/" element={<Signin />} />
        <Route
          path="/todo"
          // render={() => (!token ? <Redirect to="/" /> : <Main />)}
          element={<Main />}
        />
        {/* <Route path="/signin" element={<Signin />} /> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
