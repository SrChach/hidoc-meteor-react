/** React */
import React from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'

/** Data */
import TasksCollection from '/imports/api/tasks'

/** Components */
import { Task } from './Task'
import Message from './Message'
import Counter from './Counter'
import ClassClick from './ClassClick'
import TaskForm from './TaskForm'


export const App = () => {
  const tasks = useTracker(
    () => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      { tasks.map(task => <Task key={ task._id } task={ task.task }/>) }

      <TaskForm/>

      {/* Not using this */}
      <Message/>
      <Counter/>
      <ClassClick></ClassClick>
    </div>
  )
}
