/** Meteor */
import { Random } from 'meteor/random';

/** Testing dependencies */
import { assert } from 'chai'

/** Data */
import TaskManager from '../../../imports/api/tasks/data'

describe("API/Tasks Data (No mockups)", () => {

  const taskManager = new TaskManager()
  const taskName = 'Sample-text'
  const userId = Random.id()
  let taskId

  beforeEach(() => {
    taskManager.deleteAll();
    taskId = taskManager.add(taskName, userId)
  })

  it("Count tasks correctly", () => {
    const count = taskManager.count()
    assert.equal(count, 1)
  })

  it('Get correctly one element', () => {
    const found = taskManager.findOne(taskId)
    assert.equal(found.task, taskName)
  })

  it("Can delete a task", () => {
    taskManager.delete(taskId)
    const count = taskManager.count()
    assert.equal(count, 0)
  })

  it("List returns an array", () => {
    const list = taskManager.list()
    assert(Array.isArray(list))
  })

  it("Correctly setting a property", () => {
    taskManager.setChecked(taskId, true)
    const modified = taskManager.findOne(taskId)
    assert.equal(modified.isChecked, true)
  })

})


