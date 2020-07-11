/** React */
import React, { useState } from 'react'

/** Data management */
import { addTask } from '/imports/api/tasks'


export default TaskForm = ({ ownerId }) => {
  const [text, setText] = useState("")

  const saveTask = () => {
    if (!text) return;

    addTask(text, ownerId)
    setText("")
  }

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={ text }
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" onClick={saveTask}>Add Task</button>
    </div>
  );
}
