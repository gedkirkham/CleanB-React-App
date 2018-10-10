import React, { Component } from 'react'

class AddCleaner extends Component {
    state = {
        name: null,
        id: null
    }
    handle_change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handle_submit = (e) => {
        e.preventDefault();
        this.props.addCleaner(this.state);
        document.getElementById("add-cleaner-form").reset();
    }
    render() {
        return (
            <div>
                <h3>Enter a cleaners name:</h3>
                <form id="add-cleaner-form" onSubmit={this.handle_submit}>
                    <input type="text" id="name" onChange={this.handle_change}></input>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddCleaner