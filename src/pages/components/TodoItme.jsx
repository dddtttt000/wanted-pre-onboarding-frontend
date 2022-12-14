import React, { useState, useRef } from "react"
import styled from "styled-components"

export default function TodoItme({ el, deleteTodo, updateTodo, getList }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [chagedeInput, setChangedInput] = useState(el.todo)
  const [selectedId, setSelectedId] = useState(false)

  const handleEditMode = (e) => {
    const id = Number(e.target.id)
    const findeItem = getList.find((el) => el.id === id)
    const isCompleted = findeItem.isCompleted

    setSelectedId(id)
    if (isEditMode) {
      setIsEditMode(false)
      updateTodo(id, isCompleted, chagedeInput)
    } else {
      setIsEditMode(true)
    }
  }
  const handleChangeCheckbox = (e) => {
    const id = Number(e.target.id)
    const findeItem = getList.find((el) => el.id === id)
    const isCompleted = e.target.checked
    updateTodo(id, isCompleted, findeItem.todo)
  }
  const handleChagedeInput = (e) => {
    setChangedInput(e.target.value)
  }

  const editInputRef = useRef(null)

  return (
    <Container>
      <div>
        <input
          id={el.id}
          type="checkbox"
          checked={el.isCompleted}
          onChange={(e) => handleChangeCheckbox(e)}
        />
        <TextStyle>
          {isEditMode ? (
            el.id === selectedId ? (
              <input
                ref={editInputRef}
                onChange={(e) => {
                  handleChagedeInput(e)
                }}
                value={chagedeInput}
                type="text"
              />
            ) : (
              el.todo
            )
          ) : (
            el.todo
          )}
          {el.isCompleted ? (
            <Done>Done</Done>
          ) : (
            <Inprogress>Inprogress</Inprogress>
          )}
          <span id={el.id} onClick={(e) => handleEditMode(e)}>
            {isEditMode ? (
              el.id === selectedId ? (
                <Completed id={el.id}>✅ Complete</Completed>
              ) : (
                <Edit id={el.id}>Edit 📇</Edit>
              )
            ) : (
              <Edit id={el.id}>Edit 📇</Edit>
            )}
          </span>
          <Button
            id={el.id}
            onClick={(e) => {
              deleteTodo(e)
            }}
          >
            x
          </Button>
        </TextStyle>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
`

const TextStyle = styled.span`
  font-size: 14px;
  margin-left: 4px;
`
const Button = styled.button`
  font-size: 8px;
  color: palevioletred;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`

const Inprogress = styled.span`
  background: #152892;
  font-size: 8px;
  line-height: 14px;
  color: white;
  border-radius: 8px;
  margin-left: 10px;
  padding: 2px 6px;
`
const Done = styled.span`
  background: #6c6c6e;
  font-size: 8px;
  line-height: 14px;
  color: white;
  border-radius: 8px;
  margin-left: 10px;
  padding: 2px 6px;
`
const Edit = styled.span`
  font-size: 12px;
  cursor: pointer;
  color: gray;
  margin-left: 10px;
`
const Completed = styled.span`
  font-size: 12px;
  cursor: pointer;
  color: navy;
  margin-left: 10px;
`
