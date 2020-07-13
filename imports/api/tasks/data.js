/** Meteor */
import { Mongo } from 'meteor/mongo'

class Task {
  constructor () {
    this.collection = new Mongo.Collection('tasks')
  }

  /** Base model for finding and filtering tasks */
  find (ignoreCompleted = false, userId = null) {
    let filtersObject = {
      $or: [
        { isPrivate: { $ne: true } },
        { ownerId: userId }
      ]
    }
    if (ignoreCompleted)
      filtersObject['isChecked'] = { $ne: true }

    return this.collection.find(filtersObject, { sort: { createdAt: -1 } })
  }

  list (ignoreCompleted = false, userId = null) {
    return this.find(ignoreCompleted, userId).fetch()
  }

  count (ignoreCompleted = false, userId = null) {
    return this.find(ignoreCompleted, userId).count()
  }

  findOne (id) {
    return this.collection.findOne(id)
  }

  /** NOTE: Error management should be passed as second argument */
  add (text, ownerId) {
    /** Returns insertId */
    return this.collection.insert({
      task: text.trim(),
      createdAt: new Date(),
      ownerId: ownerId,
      isChecked: false,
      isPrivate: false
    })
  }

  delete (id) {
    /** Returns if deleted or not */
    return this.collection.remove(id)
  }

  deleteAll () {
    return this.collection.remove({})
  }

  setChecked (id, isChecked) {
    return this.collection.update(id, {
      $set: { isChecked }
    })
  }

  setPrivate (id, isPrivate) {
    return this.collection.update(id, {
      $set: { isPrivate }
    })
  }

}

export default Task
