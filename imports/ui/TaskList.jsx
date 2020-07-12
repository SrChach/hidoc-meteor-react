/** React */
import React, { useState } from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'

/** Data */
import { listTasks, countTasks } from '/imports/api/tasks/expose'

/** Components */
import { Task } from './Task'
import TaskForm from './TaskForm'

export const TaskList = () => {
  const isIgnoringCompleted = true
  const [hidingCompleted, setHidingCompleted] = useState(false)

  const {tasks, incompleteTasksCount} = useTracker(() => (
    {
      tasks: listTasks.call({ ignoreCompleted: hidingCompleted}),
      incompleteTasksCount: countTasks.call({ ignoreCompleted: isIgnoringCompleted})
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
                    />
          )
        }
      </ul>

      <TaskForm/>
    </div>
  )
}
