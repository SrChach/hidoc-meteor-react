/** Meteor */
import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

/** Data Manager */
import TaskManager from './data'


const taskManager = new TaskManager()

/** Validations */
function validateOwner (id, methodName = 'anonymous') {
  const userId = Meteor.userId()
  const task = taskManager.findOne(id);

  if (!userId || task.ownerId !== userId)
    throw new Meteor.Error(
      `tasks.addTask.${methodName}`,
      'Not authorized.'
    )
}

const listTasks = new ValidatedMethod({
  name: 'tasks.listTasks',
  validate: new SimpleSchema({
    ignoreCompleted: { type: Boolean, defaultValue: false }
  }).validator(),

  run({ ignoreCompleted }) {
    return taskManager.list(ignoreCompleted)
  }
})

const countTasks = new ValidatedMethod({
  name: 'tasks.countTasks',
  validate: new SimpleSchema({
    ignoreCompleted: { type: Boolean, defaultValue: false }
  }).validator(),

  run({ ignoreCompleted }) {
    return taskManager.count(ignoreCompleted)
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
    validateOwner(id, 'deleteTask')
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
    validateOwner(id, 'changeTaskStatus')
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
    validateOwner(id, 'changeTaskPrivate')
    return taskManager.setPrivate(id, !isPrivate)
  }
})

module.exports = { listTasks, deleteTask, changeTaskStatus, addTask, countTasks, changeTaskPrivate }
