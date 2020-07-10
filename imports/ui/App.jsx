/** React */
import React from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'

/** Data */
import { listTasks, deleteTask, changeTaskStatus } from '/imports/api/tasks'

/** Components */
import { Task } from './Task'
import TaskForm from './TaskForm'


export const App = () => {
  const tasks = useTracker(
    () => listTasks()
  );

  return (
    <div className="simple-todos-react">
      <h1>Your to-do amazing list!</h1>

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

      <TaskForm/>
    </div>
  )
}
