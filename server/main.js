/** Meteor */
import { Meteor } from 'meteor/meteor'

/** Database management */
import { TasksCollection } from '/imports/api/tasks'

function insertTask(taskTitle) {
  Tasks.insert({ task: taskTitle })
}

/** This function will run as soon as the server process is finished starting. */
Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});
