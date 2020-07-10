/** Meteor */
import { Meteor } from 'meteor/meteor'

/** Data management */
import { isTaskListEmpty, addTask } from '/imports/api/tasks'


/** This function will run as soon as the server process is finished starting. */
Meteor.startup(() => {
  if (isTaskListEmpty()) {
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
