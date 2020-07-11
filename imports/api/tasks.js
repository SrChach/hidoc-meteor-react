/** Mongo */
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema';


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
const addTask = (text, ownerId) => TasksCollection.insert(
  { task: text.trim(), createdAt: new Date(), ownerId: ownerId },
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


Meteor.methods({
  'tasks.listTasks'({ ignoreCompleted }) {
    new SimpleSchema({
      ignoreCompleted: { type: Boolean, defaultValue: false }
    }).validate({ ignoreCompleted })

    const myTasks = listTasks(ignoreCompleted)
    return myTasks
  },

  'tasks.countTasks' ({ ignoreCompleted }) {
    new SimpleSchema({
      ignoreCompleted: { type: Boolean, defaultValue: false }
    }).validate({ ignoreCompleted })

    const tasksNumber = countTasks(ignoreCompleted)
    return tasksNumber
  },

  'tasks.addTask' ({ text, ownerId }) {
    new SimpleSchema({
      text: { type: String },
      ownerId: { type: String }
    }).validate({ text, ownerId })

    const userId = Meteor.userId()

    if (!userId) {
      throw new Meteor.Error('tasks.addTask.unauthorized',
        'Forbidden. You need to be logged for adding tasks');
    }

    const savedStatus = addTask(text, userId)
    return savedStatus
  },

  // 'tasks.deleteTask' ({ ignoreCompleted }) {
  //   new SimpleSchema({
  //     ignoreCompleted: { type: Boolean, defaultValue: false }
  //   }).validate({ ignoreCompleted })

  //   const tasksNumber = countTasks(ignoreCompleted)
  //   return tasksNumber
  // },

  // 'tasks.changeTaskStatus' ({ ignoreCompleted }) {
  //   new SimpleSchema({
  //     ignoreCompleted: { type: Boolean, defaultValue: false }
  //   }).validate({ ignoreCompleted })

  //   const tasksNumber = countTasks(ignoreCompleted)
  //   return tasksNumber
  // }

});


module.exports = { listTasks, deleteTask, changeTaskStatus, addTask, countTasks }