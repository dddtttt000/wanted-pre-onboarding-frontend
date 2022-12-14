import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import { AppContext } from "../data/AppContext"
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const { setUsername, setIsLoggedIn, setToken } = useContext(AppContext)
  const emailInput = useRef(null)
  const pwInput = useRef(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()

  // email : de@ddd.com
  // password : aaa1111111

  const checkEnter = (e) => {
    if (e.key === "Enter") {
      if (e.target === emailInput.current) {
        pwInput.current.focus()
      } else if (e.target === pwInput.current) {
        pwInput.current.blur()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email && password) {
      // 여기에서 signin 요청 보내는 함수 실행
      try {
        const result = await axios.post(
          `https://pre-onboarding-selection-task.shop/auth/signup`,
          {
            email: email,
            password: password,
          },
          {
            "content-type": "application/json",
          }
        )
        console.log("result ==>", result)
        if (result) {
          setToken(result.data.access_token)
          setIsLoggedIn(true)
          navigate("/todo")
        }
      } catch (e) {
        setErrMsg(e.response.data.message)
      }
    }
  }
  return (
    <>
      <div className="font-bold underline">SignIn</div>
      <div>
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <label htmlFor="">email</label>
            <input
              type="text"
              placeholder="email"
              ref={emailInput}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onKeyUp={checkEnter}
            />
          </div>
          <div className="">
            <label htmlFor="">password</label>
            <input
              type="password"
              placeholder="password"
              ref={pwInput}
              onChange={(e) => setPassword(e.currentTarget.value)}
              onKeyUp={checkEnter}
            />
          </div>
          <button onClick={() => console.log("click!")}>확인</button>
        </form>
        {errMsg}

        <button onClick={() => navigate("/signup")}>회원가입</button>
      </div>
    </>
  )
}
