/** React */
import React from 'react'
import classnames from 'classnames'

/** Data */
import { deleteTask, changeTaskStatus } from '/imports/api/tasks'

export const Task = ({ task }) => {
  const classes = classnames('task', {
    'checked': Boolean(task.isChecked)
  });

  return (
    <li className={classes}>
      <button onClick={ () => deleteTask.call({ id: task._id }) }>&times;</button>
      <span>{ task.task }</span>
      <input
        type="checkbox"
        checked={ Boolean(task.isChecked) }
        onClick={() => changeTaskStatus.call({ id: task._id, isChecked: Boolean(task.isChecked) }) }
        readOnly
      />
    </li>
  )
}
