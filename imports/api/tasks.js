/** Mongo */
import { Mongo } from 'meteor/mongo'


const TasksCollection = new Mongo.Collection('tasks')

/** Base model for finding and filtering tasks */
const findTasks = (ignoreCompleted = false) => {
  const filterObject = (ignoreCompleted) ? { isChecked: { $ne: true } } : {}
  return TasksCollection.find(filterObject, { sort: { createdAt: -1 } })
}

/** Getting tasks info */
const listTasks = (ignoreCompleted = false) => findTasks(ignoreCompleted).fetch()
const countTasks = (ignoreCompleted = false) => findTasks(ignoreCompleted).count()

/** Functions for adding and deleting Tasks */
const addTask = (text) => TasksCollection.insert(
  { task: text.trim(), createdAt: new Date() },
  function(err, record_id){
      console.log(`Added with the ID: '${record_id}'`)
  }
)
const deleteTask = (_id) => TasksCollection.remove(_id)

/** Editing task info */
const changeTaskStatus = (_id, isChecked) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

module.exports = { listTasks, deleteTask, changeTaskStatus, addTask, countTasks }