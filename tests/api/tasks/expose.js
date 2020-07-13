/** Meteor */
import { Random } from 'meteor/random';

/** Testing dependencies */
import { assert } from 'chai'
import { MeteorStubs } from "meteor/velocity:meteor-stubs"

/** Data and components */
import TaskManager from '../../../imports/api/tasks/data'
import { 
  validateOwner, listTasks, deleteTask, changeTaskStatus,
    addTask, countTasks, changeTaskPrivate 
} from '../../../imports/api/tasks/expose'

const taskManager = new TaskManager()

describe("API/Tasks exposed functions", () => {

    const userId = Random.id()
    const taskName = 'Sample-text'
    let other_taskId
    let my_taskId

    beforeEach(() => {
      MeteorStubs.install()
      taskManager.deleteAll();
      other_taskId = taskManager.add(taskName, userId)
      my_taskId = taskManager.add(taskName, Meteor.userId)
    })

    afterEach(() => {
        MeteorStubs.uninstall()
    })
  
    /**
     * Listing only owned tasks status
     * Listing only private tasks
     * Validate that is proprietor
     */
    it("Validates that a user is not owner of a task", () => {
      let status = validateOwner(other_taskId)
      assert.equal(status, false)
    })
  
  })


