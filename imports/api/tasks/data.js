import { Mongo } from 'meteor/mongo'

class Task {
  constructor () {
    this.collection = new Mongo.Collection('tasks')
  }

  /** Base model for finding and filtering tasks */
  find (ignoreCompleted = false) {
    const filterObject = (ignoreCompleted) ? { isChecked: { $ne: true } } : {}
    return this.collection.find(filterObject, { sort: { createdAt: -1 } })
  }

  list (ignoreCompleted = false) {
    return this.find(ignoreCompleted).fetch()
  }

  count (ignoreCompleted = false) {
    return this.find(ignoreCompleted).count()
  }

  /** NOTE: Error management should be passed as second argument */
  add (text, ownerId) {
    /** Returns insertId */
    return this.collection.insert({
      task: text.trim(),
      createdAt: new Date(),
      ownerId: ownerId
    })
  }

  delete (id) {
    /** Returns if deleted or not */
    return this.collection.remove(id)
  }

  changeStatus (id, isChecked) {
    return this.collection.update(id, {
      $set: {
        isChecked: !isChecked
      }
    })
  }

}

export default Task
