/** Meteor */
import Meteor from 'meteor/meteor'
import { Random } from 'meteor/random';

/** Testing dependencies */
import { assert } from 'chai'

/** Data */
import TaskManager from '../../imports/api/tasks/data'

describe("Tasks API", () => {

  describe("Data module (No mockups)", () => {
    const taskManager = new TaskManager()
    const userId = Random.id()
    let taskId

    beforeEach(() => {
      taskManager.deleteAll();
      taskId = taskManager.add('Sample-text', userId)
    });

    it("Can delete own task", () => {
      taskManager.delete(taskId)
      let count = taskManager.count()
      assert.equal(count, 0)
    })
  })

})


