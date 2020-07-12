/** React */
import React from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

/** Components */
import { LoginForm } from './LoginForm';
import { TaskList } from './TaskList'


export const App = () => {

  const user = useTracker(
    () => Meteor.user(),
  );

  if (!user) {
    return <LoginForm/>
  }
  return <TaskList/>

}
