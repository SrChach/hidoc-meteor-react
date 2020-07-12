/** Meteor */
import { Meteor } from 'meteor/meteor'

/** Data management */
import { countTasks, addTask } from '/imports/api/tasks/expose'


/** This function will run as soon as the server process is finished starting. */
Meteor.startup(() => {
  if (!Accounts.findUserByUsername('hidoc')) {
    Accounts.createUser({
      username: 'hidoc',
      password: 'hidoc-password'
    })
  }
})
