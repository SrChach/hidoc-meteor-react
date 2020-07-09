import React, { Component } from 'react'

export class Counter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count: 0
        }
    }
    
    increment () {
        /** setState can pass receive props as second argument  */
        this.setState((prevState, props) => ({
            count: prevState.count + 1
        }),
        () => {
            console.log(this.state.count)
        })
    }
    
    incrementFive () {
        this.increment()
        this.increment()
        this.increment()
        this.increment()
        this.increment()
    }

    render() {
        /** Props unpacking on Render method example
         * const {val_1, val_2} = this.props
         */
        return (
            <div>
                <h1>Counter - { this.state.count }</h1>
                <button onClick={() => { this.incrementFive() }}>Aumenta</button>
            </div>
        )
    }
}

export default Counter
