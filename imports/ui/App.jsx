/** React */
import React, { useState } from 'react'

/** Meteor */
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

/** Data */

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
  return <TaskList ownerId={user._id}/>

}
