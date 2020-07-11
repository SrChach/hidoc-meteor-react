/** React */
import React, { useState } from 'react'


export default TaskForm = ({ ownerId }) => {
  const [text, setText] = useState("")

  const saveTask = () => {
    if (!text) return;

    Meteor.call(
      'tasks.addTask',
      { text: text, ownerId: ownerId },
      (err, res) => {
        if (err)
          alert(err)
        else {
          console.log(`Added by user ${res}`)
          setText("")
        }
      }
    )
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
