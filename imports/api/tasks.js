/** Mongo */
import { Mongo } from 'meteor/mongo'

const TasksCollection = new Mongo.Collection('tasks')

module.exports = { TasksCollection }