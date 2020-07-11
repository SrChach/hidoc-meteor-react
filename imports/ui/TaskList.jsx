/** React */
import React, { useState } from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'

/** Data */
import { listTasks, deleteTask, changeTaskStatus, countTasks } from '/imports/api/tasks'

/** Components */
import { Task } from './Task'
import TaskForm from './TaskForm'

export const TaskList = ({ ownerId }) => {
  const isIgnoringCompleted = true
  const [hidingCompleted, setHidingCompleted] = useState(false)

  const {tasks, incompleteTasksCount} = useTracker(() => (
    {
      tasks: listTasks(hidingCompleted),
      incompleteTasksCount: countTasks(isIgnoringCompleted)
    }
  ));

  return (
    <div className="simple-todos-react">
      <h1>Your to-do amazing list! Pending: { incompleteTasksCount }</h1>

      <div className="filters">
        <label>
          <input
            type="checkbox"
            readOnly
            checked={ Boolean(hidingCompleted) }
            onClick={() => setHidingCompleted(!hidingCompleted)}
          />
          Hide Completed
        </label>
      </div>

      <ul className="tasks">
        {
          tasks.map(
            task => <Task
                      key={task._id}
                      task={task}
                      onCheckboxClick={changeTaskStatus}
                      onDeleteClick={deleteTask}
                    />
          )
        }
      </ul>

      <TaskForm ownerId={ ownerId }/>
    </div>
  )
}
