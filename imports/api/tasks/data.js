/** Meteor */
import { Mongo } from 'meteor/mongo'

class Task {
  constructor () {
    this.collection = new Mongo.Collection('tasks')
  }

  /** Base model for finding and filtering tasks */
  find (ignoreCompleted = false) {
    let filtersObject = {
      $or: [
        { isPrivate: { $ne: true } },
        { ownerId: Meteor.userId() }
      ]
    }
    if (ignoreCompleted)
      filtersObject['isChecked'] = { $ne: true }

    return this.collection.find(filtersObject, { sort: { createdAt: -1 } })
  }

  findOne (id) {
    return this.collection.findOne(id)
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
