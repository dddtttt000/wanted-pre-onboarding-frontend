import React, { useContext, useEffect, useState, useRef } from "react"

export default function TodoItme({ el, deleteTodo, updateTodo, getList }) {
  const [checkdeItem, setCheckedItem] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [checked, setChecked] = useState(false)
  const [chagedeInput, setChangedInput] = useState(el.todo)
  const [content, setContet] = useState("")
  const [selectedId, setSelectedId] = useState(false)

  console.log("chagedeInput", chagedeInput)
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
    <div>
      <input
        id={el.id}
        type="checkbox"
        checked={el.isCompleted}
        onChange={(e) => {
          handleChangeCheckbox(e)
          // setChecked(checked ? false : true)
        }}
      />
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
        {isEditMode ? (el.id === selectedId ? "complete" : "edit") : "edit"}
      </span>
    </div>
  )
}
