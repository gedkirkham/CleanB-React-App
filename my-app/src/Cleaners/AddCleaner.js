import React, { Component } from 'react'

class CleanerClass extends Component {
    state = {
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            name : e.target.value
        })
        
        this.props.addCleaner(this.state);
        
        this.setState({
            name : ''
        })
    }

    render() {
        return(
            <div>
                <h3>Enter a cleaners name:</h3>
                <form id="add-cleaner-form" onSubmit={this.handleSubmit}>
                    <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
                    <button>Add cleaner</button>
                </form>
            </div>
        )
    }
}

export default CleanerClass