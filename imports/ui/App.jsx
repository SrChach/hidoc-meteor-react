/** React */
import React from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'

/** Data */
import { TasksCollection } from '/imports/api/tasks'

/** Components */
import { Task } from './Task'
import TaskForm from './TaskForm'


export const App = () => {
  const tasks = useTracker(
    () => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  }

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  return (
    <div className="simple-todos-react">
      <h1>Welcome to Meteor!</h1>

      <ul className="tasks">
        {
          tasks.map(
            task => <Task
                      key={task._id}
                      task={task}
                      onCheckboxClick={toggleChecked}
                      onDeleteClick={deleteTask}
                    />
          )
        }
      </ul>

      <TaskForm/>
    </div>
  )
}
