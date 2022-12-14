import React, { useContext, useEffect, useState, useRef } from "react"
import { AppContext } from "../data/AppContext"
import axios from "axios"
import TodoItme from "./components/TodoItme"
import styled from "styled-components"

export default function Main() {
  const { token } = useContext(AppContext)
  const [getList, setGetList] = useState([])
  const [todoItmes, setTodoItmes] = useState([]) // get 요청을 받아서 담는 곳
  const [item, setItme] = useState([]) // post 요청으로 만들어진 아이템
  const [todoInput, setTodoInput] = useState("")

  useEffect(() => {
    getTodoList()
  }, [todoItmes])

  const getTodoList = async () => {
    try {
      const result = await axios.get(
        "https://pre-onboarding-selection-task.shop/todos",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      if (result && result.data.length > 0) {
        setGetList(result.data)
      }
    } catch (e) {
      console.log("err", e.response)
    }
  }

  const createTodo = async (e) => {
    e.preventDefault()
    setTodoInput("")
    try {
      const result = await axios.post(
        "https://pre-onboarding-selection-task.shop/todos",
        {
          todo: todoInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )

      if (result) {
        setItme(result.data)
        setTodoItmes([...getList, result.data])
        // getTodoList()
      }
    } catch (e) {
      console.log("err", e.response.data.message)
    }
  }

  const updateTodo = async (id, isCompleted, todo) => {
    try {
      const result = await axios.put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: todo,
          isCompleted: isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )

      if (result) {
        setItme(result.data)
        setTodoItmes([...getList, result.data])
        setTodoInput("")
        getTodoList()
      }
    } catch (e) {
      console.log("err", e.response)
    }
  }

  const deleteTodo = async (e) => {
    e.preventDefault()
    const id = Number(e.target.id)

    try {
      const result = await axios.delete(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )

      if (result.status === 204) {
        getTodoList()
      }
    } catch (e) {
      console.log("err", e.response.data.message)
    }
  }

  const createTodoInput = (e) => {
    setTodoInput(e.currentTarget.value)
  }

  return (
    <>
      <div>
        <Container>
          <p>LIST</p>
          {getList.map((el) => {
            return (
              <React.Fragment key={el.id}>
                <TodoItme
                  el={el}
                  getList={getList}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              </React.Fragment>
            )
          })}
          <div>
            <AddBox>
              <form action="submit" onSubmit={(e) => createTodo(e)}>
                <input
                  value={todoInput}
                  type="text"
                  onChange={(e) => createTodoInput(e)}
                />
                <button onClick={(e) => createTodo(e)}>ADD</button>
              </form>
            </AddBox>
          </div>
        </Container>
      </div>
    </>
  )
}

const Container = styled.div`
  width: 400px;
  margin: 10px auto;
`
const AddBox = styled.div`
  margin: 20px;
`
