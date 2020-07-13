/** Mongo */
import { Mongo } from 'meteor/mongo'

const connection = new Mongo.Collection('tasks')

const getConnection = () => {
    return connection
}

export default getConnection