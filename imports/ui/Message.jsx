import React from 'react'

class Message extends React.Component {
    constructor () {
        super()
        this.state = {
            message: 'Welcome visitor'
        }    
    }

    /** setState is asynchronous, and can receive a callback */
    changeMessage () {
        this.setState(
            { message: 'Welcome subscriber' },
            () => console.log(this.state.message)
        )
    }

    render () {
        return (
            <div>
                <h1>{ this.state.message }</h1>
                <button onClick={() => { this.changeMessage() }}>Subscribe</button>
            </div>
        )
    }
}

export default Message