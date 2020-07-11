/** Mongo */
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';


const TasksCollection = new Mongo.Collection('tasks')

/** Base model for finding and filtering tasks */
const findTasks = (ignoreCompleted = false) => {
  const filterObject = (ignoreCompleted) ? { isChecked: { $ne: true } } : {}
  return TasksCollection.find(filterObject, { sort: { createdAt: -1 } })
}

/** Functions for getting tasks info */
const listTasks = new ValidatedMethod({
  name: 'tasks.listTasks',
  validate: new SimpleSchema({
    ignoreCompleted: { type: Boolean, defaultValue: false }
  }).validator(),

  run({ ignoreCompleted }) {
    return findTasks(ignoreCompleted).fetch()
  }
})
const countTasks = new ValidatedMethod({
  name: 'tasks.countTasks',
  validate: new SimpleSchema({
    ignoreCompleted: { type: Boolean, defaultValue: false }
  }).validator(),

  run({ ignoreCompleted }) {
    return findTasks(ignoreCompleted).count()
  }
})

/** Functions for adding and deleting Tasks */
const addTask = new ValidatedMethod({
  name: 'tasks.addTask',
  validate: new SimpleSchema({
    text: { type: String }
  }).validator(),

  run({ text }) {
    const ownerId = Meteor.userId()

    if (!ownerId) {
      throw new Meteor.Error('tasks.addTask.unauthorized',
        'Forbidden. You need to be logged for adding tasks');
    }

    /** Returns insertId
     * NOTE:  Error management should be passed as second argument
     */
    return TasksCollection.insert({
      task: text.trim(),
      createdAt: new Date(),
      ownerId: ownerId
    })
  }
})

const deleteTask = new ValidatedMethod({
  name: 'tasks.deleteTask',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),

  run({ id }) {
    const ownerId = Meteor.userId()

    if (!ownerId) {
      throw new Meteor.Error('tasks.addTask.unauthorized',
        'Forbidden. You need to be logged for adding tasks');
    }

    const removedStatus = TasksCollection.remove(id)
    return `added task with ID ${removedStatus}`
  }
})

/** Functions for edit task info */
const changeTaskStatus = new ValidatedMethod({
  name: 'tasks.changeTaskStatus',
  validate: new SimpleSchema({
    id: String,
    isChecked: Boolean
  }).validator(),

  run({ id, isChecked }) {
    return TasksCollection.update(id, {
      $set: {
        isChecked: !isChecked
      }
    })
  }
})

module.exports = { listTasks, deleteTask, changeTaskStatus, addTask, countTasks }