import React from 'react'
import classnames from 'classnames'


export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const classes = classnames('task', {
    'checked': Boolean(task.isChecked)
  });

  return (
    <li className={classes}>
      <button onClick={ () => onDeleteClick(task._id) }>&times;</button>
      <span>{ task.task }</span>
      <input
        type="checkbox"
        checked={ Boolean(task.isChecked) }
        onClick={ () => onCheckboxClick(task._id, task.isChecked) }
        readOnly
      />
    </li>
  )
}
