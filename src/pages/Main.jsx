import React, { useContext, useEffect, useState, useRef } from "react"
import { AppContext } from "../data/AppContext"
import axios from "axios"

export default function Main() {
  const { token } = useContext(AppContext)
  const [getList, setGetList] = useState([])
  const [todoItmes, setTodoItmes] = useState([]) // get 요청을 받아서 담는 곳
  const [item, setItme] = useState([]) // post 요청으로 만들어진 아이템
  const [todoInput, setTodoInput] = useState("")
  const [checkdeItem, setCheckedItem] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [checked, setChecked] = useState(false)
  const [chagedeInput, setChangedInput] = useState("")
  const [content, setContet] = useState("")
  const [selectedId, setSelectedId] = useState(false)

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

  const updateTodo = async (id, isCompleted) => {
    const findeItem = getList.find((el) => el.id === id)
    console.log(findeItem.todo)

    try {
      const result = await axios.put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: findeItem.todo,
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

  const handleChangeCheckbox = (e) => {
    const id = Number(e.target.id)
    const isCompleted = e.target.checked
    updateTodo(id, isCompleted)
  }

  const handleEditMode = (e) => {
    setSelectedId(e.target.id)
    if (isEditMode) {
      setIsEditMode(false)
    } else {
      setIsEditMode(true)
    }
  }

  const handleChagedeInput = (e) => {
    setChangedInput(e.target.value)
  }

  const createTodoInput = (e) => {
    setTodoInput(e.currentTarget.value)
  }

  const editInputRef = useRef(null)

  return (
    <>
      <p>LIST</p>
      {getList.map((el) => {
        return (
          <React.Fragment key={el.id}>
            <div key={el.id}>
              <input
                id={el.id}
                type="checkbox"
                checked={el.isCompleted}
                onChange={(e) => {
                  handleChangeCheckbox(e)
                  // setChecked(checked ? false : true)
                }}
              />
              {isEditMode && el.id === selectedId ? (
                <input ref={editInputRef} type="text" />
              ) : (
                el.todo
              )}
              {el.isCompleted ? "Done" : "In progress"}
              <button
                id={el.id}
                onClick={(e) => {
                  deleteTodo(e)
                }}
              >
                x
              </button>
              <span id={el.id} onClick={(e) => handleEditMode(e)}>
                {isEditMode
                  ? el.id === selectedId
                    ? "edit"
                    : "complete"
                  : "edit"}
              </span>
            </div>
          </React.Fragment>
        )
      })}
      <div>
        <form action="submit" onSubmit={(e) => createTodo(e)}>
          <input
            value={todoInput}
            type="text"
            onChange={(e) => createTodoInput(e)}
          />
          <button onClick={(e) => createTodo(e)}>ADD</button>
        </form>
      </div>
    </>
  )
}
