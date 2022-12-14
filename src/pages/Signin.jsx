import React, { useState, useRef, useContext } from "react"
import axios from "axios"
import { AppContext } from "../data/AppContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Signin() {
  const { setIsLoggedIn, setToken } = useContext(AppContext)
  const emailInput = useRef(null)
  const pwInput = useRef(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email && password) {
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
        <Title>SignIn</Title>
        <div>
          <form action="submit" onSubmit={(e) => handleSubmit(e)}>
            <Line>
              <Label htmlFor="">email</Label>
              <Input
                type="text"
                placeholder="email"
                ref={emailInput}
                onChange={(e) => setEmail(e.currentTarget.value)}
                onKeyUp={checkEnter}
              />
            </Line>

            <Line>
              <Label htmlFor="">password</Label>
              <Input
                type="password"
                placeholder="password"
                ref={pwInput}
                onChange={(e) => setPassword(e.currentTarget.value)}
                onKeyUp={checkEnter}
              />
            </Line>
            <Warning>{errMsg}</Warning>
            <button onClick={(e) => handleSubmit(e)}>확인</button>
          </form>
          <SignUp onClick={() => navigate("/signup")}>회원가입</SignUp>
        </div>
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
  margin-top: 10px;
`
const Input = styled.input`
  font-size: 14px;
  width: 100%;
`

const SignUp = styled.div`
  padding-top: 20px;
  color: #091e6a;
  font-size: 12px;
  margin: 0 auto;
  cursor: pointer;
`
const Warning = styled.p`
  font-size: 12px;
  color: #dd0c52;
`
