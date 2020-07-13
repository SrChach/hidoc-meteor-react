/** React */
import React from 'react'
import classnames from 'classnames'

/** Data */
import { deleteTask, changeTaskStatus, changeTaskPrivate } from '/imports/api/tasks/expose'

export const Task = ({ task }) => {
  const classes = classnames('task', {
    'checked': Boolean(task.isChecked)
  });

  const isMine = Meteor.userId() === task.ownerId

  return (
    <li className={classes}>
      { isMine ? (
          <div>
            <button onClick={ () => deleteTask.call({ id: task._id }) }>&times;</button>
            <button onClick={() => changeTaskPrivate.call({ id: task._id, isPrivate: Boolean(task.isPrivate) }) }>
              { Boolean(task.isPrivate) ? 'Private' : 'Public' }
            </button>
          </div>
        ) : <button>&#8728;</button>
      }

      <span>{ task.task }</span>
      
      { isMine ? (
          <input
            type="checkbox"
            checked={ Boolean(task.isChecked) }
            onClick={() => changeTaskStatus.call({ id: task._id, isChecked: Boolean(task.isChecked) }) }
            readOnly
          />
        ) : <input type="checkbox" checked={ false } readOnly/>
      }
    </li>
  )
}
