import React from 'react'

class Message extends React.Component {
    constructor () {
        super()
        this.state = {
            message: 'Welcome visitor'
        }    
    }

    render () {
        return (
            <div>
                <h1>{ this.state.message }</h1>
                <button onClick={() => { this.setState({ message: 'Welcome subscriber' }) }}>Subscribe</button>
            </div>
        )
    }
}

export default Message