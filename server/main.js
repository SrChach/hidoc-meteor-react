/** Meteor */
import { Meteor } from 'meteor/meteor'

/** Registering data management */
import '/imports/api/tasks/expose';


/** This function will run as soon as the server process is finished starting. */
Meteor.startup(() => {
  if (!Accounts.findUserByUsername('hidoc')) {
    Accounts.createUser({
      username: 'hidoc',
      password: 'hidoc-password'
    })
  }
  if (!Accounts.findUserByUsername('dev')) {
    Accounts.createUser({
      username: 'dev',
      password: 'go-stackoverflow'
    })
  }
})