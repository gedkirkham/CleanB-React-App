import React, { Component } from 'react'

class AddCleaner extends Component {
    state = {
        name: null
    }
    handle_change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handle_submit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <h3>Enter a cleaners name:</h3>
                <form onSubmit={this.handle_submit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onChange={this.handle_change}></input>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddCleaner