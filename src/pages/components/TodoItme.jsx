import React, { useContext, useEffect, useState, useRef } from "react"

export default function TodoItme({ el, deleteTodo, updateTodo }) {
  const [checkdeItem, setCheckedItem] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [checked, setChecked] = useState(false)
  const [chagedeInput, setChangedInput] = useState("")
  const [content, setContet] = useState("")
  const [selectedId, setSelectedId] = useState(false)

  const handleEditMode = (e) => {
    setSelectedId(e.target.id)
    if (isEditMode) {
      setIsEditMode(false)
    } else {
      setIsEditMode(true)
    }
  }
  const handleChangeCheckbox = (e) => {
    const id = Number(e.target.id)
    const isCompleted = e.target.checked
    updateTodo(id, isCompleted)
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
        {isEditMode ? (el.id === selectedId ? "edit" : "complete") : "edit"}
      </span>
    </div>
  )
}
