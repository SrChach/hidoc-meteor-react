/** React */
import React from 'react';

/** Components */
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Task } from './Task.jsx'
import Message from './Message'

const tasks = [
  {_id: 1, text: 'First Task'},
  {_id: 2, text: 'Second Task'},
  {_id: 3, text: 'Third Task'},
]

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    { tasks.map(task => <Task key={ task._id } task={ task.text } text='Example'/>) }
    <Message/>
  </div>
);
