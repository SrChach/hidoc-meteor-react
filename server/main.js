/** Meteor */
import { Meteor } from 'meteor/meteor'

/** Data management */
import { countTasks, addTask } from '/imports/api/tasks'


/** This function will run as soon as the server process is finished starting. */
Meteor.startup(() => {
  if (!Accounts.findUserByUsername('hidoc')) {
    Accounts.createUser({
      username: 'hidoc',
      password: 'hidoc-password'
    });
  }

  if (countTasks() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(taskTitle => addTask(taskTitle))
  }
});
