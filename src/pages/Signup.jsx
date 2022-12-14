import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import { AppContext } from "../data/AppContext"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const { setIsLoggedIn, setToken } = useContext(AppContext)
  const emailInput = useRef(null)
  const pwInput = useRef(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [emailError, setEmailError] = useState("")
  const [pwError, setPwError] = useState("")
  const navigate = useNavigate()

  const checkEnter = (e) => {
    if (e.key === "Enter") {
      if (e.target === emailInput.current) {
        pwInput.current.focus()
      } else if (e.target === pwInput.current) {
        pwInput.current.blur()
      }
    }
  }

  const emailValidation = (e) => {
    const regExp = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
    if (!e.target.value) {
      setEmailError("이메일을 입력해주세요.")
    } else if (!regExp.test(e.target.value)) {
      setEmailError("이메일 형식이 맞지 않습니다.")
    } else {
      setEmailError("")
    }
  }

  const passwordValidation = (e) => {
    if (e.target.value.length > 7) {
      setPwError("")
    } else {
      setPwError("비밀번호는 8자 이상이어야 합니다.")
    }
  }

  const passwordCheckValidation = (e) => {
    if (e.target.value.length === password) {
      setPasswordCheck("")
    } else {
      setPasswordCheck("비밀번호가 일치하지 않습니다.")
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
      <div>Signup</div>
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <div className="">
          <label htmlFor="">email</label>
          <input
            type="text"
            placeholder="email"
            ref={emailInput}
            onBlur={(e) => emailValidation(e)}
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
            onBlur={(e) => passwordValidation(e)}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onKeyUp={checkEnter}
          />
        </div>
        <div className="">
          <label htmlFor="">password check</label>
          <input
            type="password"
            placeholder="password"
            // ref={pwInput}
            onBlur={(e) => passwordCheckValidation(e)}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onKeyUp={checkEnter}
          />
        </div>
        {errMsg}
        {emailError}
        {pwError}
        {passwordCheck}
        <div>
          <button onClick={(e) => handleSubmit(e)}>확인</button>
        </div>
      </form>
    </>
  )
}
