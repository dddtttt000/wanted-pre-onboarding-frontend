import "./App.css"
import React, { useState, useContext } from "react"
import { AppContext } from "../src/data/AppContext"
import { Routes, Route, Router, Navigate } from "react-router-dom"
import Main from "./pages/Main"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

function App() {
  const { isLoggedIn, token } = useContext(AppContext)
  console.log(token)
  return (
    <>
      <div className="App">
        <header className="App-header">🖇 TODO</header>
      </div>

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={token ? <Navigate to="/todo" /> : <Signin />}
        />
        <Route path="/todo" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
