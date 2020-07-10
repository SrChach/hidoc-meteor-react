import React, { useState } from 'react'
import TasksCollection from '/imports/api/tasks'

export default TaskForm = () => {
    const [text, setText] = useState("")

    const saveTask = () => {
        if (!text) return;

        TasksCollection.insert(
            {
                task: text.trim(),
                createdAt: new Date()
            },
            function(err, record_id){
                console.log("Record_id " + record_id)
            }
        )

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