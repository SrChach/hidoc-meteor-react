/** Mongo */
import { Mongo } from 'meteor/mongo'


const TasksCollection = new Mongo.Collection('tasks')

const listTasks = () => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()

const isTaskListEmpty = () => TasksCollection.find().count() === 0

const addTask = (text) => TasksCollection.insert(
  {
      task: text.trim(),
      createdAt: new Date()
  },
  function(err, record_id){
      console.log(`Added with the ID: '${record_id}'`)
  }
)

const changeTaskStatus = (_id, isChecked) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

const deleteTask = (_id) => TasksCollection.remove(_id)

module.exports = { TasksCollection, listTasks, deleteTask, changeTaskStatus, addTask, isTaskListEmpty }