import React, { Component } from 'react'

class ClassClick extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: 'Hello!'
        }

        /** The bind handler that we'll use */
        // this.bindedClickHandler = this.bindedClickHandler.bind(this)
    }

    simpleClickHandler () {
        alert('Clicked!')
    }

    /** The bind handler that we'll use */
    // bindedClickHandler () {
    //     this.setState((prevState) => ({
    //         message: prevState.message == 'Hello!' ? 'Goodbye' : 'Hello!'
    //     }), () => console.log(this.state.message))
    // }

    bindedClickHandler = () => {
        this.setState((prevState) => ({
            message: prevState.message == 'Hello!' ? 'Goodbye' : 'Hello!'
        }), () => console.log(this.state.message))
    }

    render() {
        return (
            <div>
                <h3>{ this.state.message }</h3>
                {/* Approach to use binding event handling on react that we won't use
                    <button onClick={this.bindedClickHandler.bind(this)}>Binded event handler</button>
                    <button onClick={this.bindedClickHandler}>Binded event handler</button>
                */}
                <button onClick={this.simpleClickHandler}>Simple event handler</button>
                <button onClick={this.bindedClickHandler}>Binded event handler</button>
            </div>
        )
    }
}

export default ClassClick
