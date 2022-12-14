import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import { AppContext } from "../data/AppContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

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
  const [pwCheckError, setPwCheckError] = useState("")
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

  const passwordCheckValidation = () => {
    if (passwordCheck === password) {
      setPwCheckError("")
    } else {
      setPwCheckError("비밀번호가 일치하지 않습니다.")
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
      <Container>
        <Title>Signup</Title>
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          <Line className="">
            <Label htmlFor="">email</Label>
            <Input
              type="text"
              placeholder="email"
              ref={emailInput}
              onBlur={(e) => emailValidation(e)}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onKeyUp={checkEnter}
            />
          </Line>
          <Line className="">
            <Label htmlFor="">password</Label>
            <Input
              type="password"
              placeholder="password"
              ref={pwInput}
              onBlur={(e) => passwordValidation(e)}
              onChange={(e) => setPassword(e.currentTarget.value)}
              onKeyUp={checkEnter}
            />
          </Line>
          <Line className="">
            <Label htmlFor="">password check</Label>
            <Input
              type="password"
              placeholder="password"
              // ref={pwInput}
              onBlur={(e) => passwordCheckValidation(e)}
              onChange={(e) => setPasswordCheck(e.currentTarget.value)}
              onKeyUp={checkEnter}
            />
          </Line>
          <Warning>
            {errMsg}
            {emailError}
            {pwError}
            {pwCheckError}
          </Warning>
          <div>
            <Button onClick={(e) => handleSubmit(e)}>확인</Button>
          </div>
        </form>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 200px;
  margin: 10px auto;
`
const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin: 10px auto;
`
const Label = styled.label`
  font-size: 14px;
  margin-right: 10px;
`

const Line = styled.div`
  margin-bottom: 10px;
`
const Input = styled.input`
  font-size: 14px;
  width: 100%;
`
const Button = styled.button`
  font-size: 12px;
  color: palevioletred;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`
const Warning = styled.p`
  font-size: 12px;
  color: #dd0c52;
`
