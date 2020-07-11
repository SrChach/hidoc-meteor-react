/** React */
import React, { useState } from 'react'

/** Data */
import { addTask } from '../api/tasks.js'


export default TaskForm = () => {
  const [text, setText] = useState("")

  const saveTask = () => {
    if (!text) return;

    addTask.call(
      { text: text },
      (err, res) => {
        if (err) {
          alert(`Ha ocurrido un error: ${err}`)
        } else {
          console.log(`Nueva tarea insertada con el ID: "${res}"`)
          setText("")
        }
      }
    )
  }

  const pressEnter = (e) => {
    if(e.keyCode == 13)
      saveTask()
  }

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={ text }
        onChange={(e) => setText(e.target.value)}
        onKeyUp={pressEnter}
      />
      <button type="button" onClick={saveTask}>Add Task</button>
    </div>
  );
}
