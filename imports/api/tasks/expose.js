/** Meteor */
import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

/** Data Manager */
import TaskManager from './data'


const taskManager = new TaskManager()

/** Validations */
function validateOwner (id) {
  const userId = Meteor.userId()
  const task = taskManager.findOne(id);

  if (!userId || task.ownerId !== userId)
    return false
  return true
}

const listTasks = new ValidatedMethod({
  name: 'tasks.listTasks',
  validate: new SimpleSchema({
    ignoreCompleted: { type: Boolean, defaultValue: false }
  }).validator(),

  run({ ignoreCompleted }) {
    return taskManager.list(ignoreCompleted, Meteor.userId())
  }
})

const countTasks = new ValidatedMethod({
  name: 'tasks.countTasks',
  validate: new SimpleSchema({
    ignoreCompleted: { type: Boolean, defaultValue: false }
  }).validator(),

  run({ ignoreCompleted }) {
    return taskManager.count(ignoreCompleted, Meteor.userId())
  }
})

const addTask = new ValidatedMethod({
  name: 'tasks.addTask',
  validate: new SimpleSchema({
    text: { type: String }
  }).validator(),

  run({ text }) {
    const ownerId = Meteor.userId()

    if (!ownerId)
      throw new Meteor.Error(
        'tasks.addTask.unauthorized',
        'Forbidden. You need to be logged for adding tasks'
      )

    return taskManager.add(text, ownerId)
  }
})

const deleteTask = new ValidatedMethod({
  name: 'tasks.deleteTask',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),

  run({ id }) {
    if (!validateOwner(id))
      throw new Meteor.Error(`tasks.addTask.deleteTask`,'Not authorized.')

    return taskManager.delete(id)
  }
})

const changeTaskStatus = new ValidatedMethod({
  name: 'tasks.changeTaskStatus',
  validate: new SimpleSchema({
    id: String,
    isChecked: Boolean
  }).validator(),

  run({ id, isChecked }) {
    if (!validateOwner(id))
      throw new Meteor.Error(`tasks.addTask.changeTaskStatus`, 'Not authorized.')

    return taskManager.setChecked(id, !isChecked)
  }
})

const changeTaskPrivate = new ValidatedMethod({
  name: 'tasks.changeTaskPrivate',
  validate: new SimpleSchema({
    id: String,
    isPrivate: Boolean
  }).validator(),

  run({ id, isPrivate }) {
    if (!validateOwner(id))
      throw new Meteor.Error(`tasks.addTask.changeTaskPrivate`, 'Not authorized.')
    return taskManager.setPrivate(id, !isPrivate)
  }
})

module.exports = { validateOwner, listTasks, deleteTask, changeTaskStatus, addTask, countTasks, changeTaskPrivate }
