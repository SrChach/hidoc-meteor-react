/** React */
import React from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'

/** Data */
import TasksCollection from '/imports/api/tasks';

/** Components */
import { Task } from './Task.jsx'
import Message from './Message'
import Counter from './Counter.jsx'
import ClassClick from './ClassClick'


export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      { tasks.map(task => <Task key={ task._id } task={ task.task } text='Example'/>) }


      {/* Not using this */}
      <Message/>
      <Counter/>
      <ClassClick></ClassClick>
    </div>
  )
}
