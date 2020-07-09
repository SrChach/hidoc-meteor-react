import React from 'react'

export const Task = (props) => {
    const {task, text} = props
    return <li>{ task } - {text}</li>
}