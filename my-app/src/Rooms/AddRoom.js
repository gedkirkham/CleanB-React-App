import React, { Component } from 'react'

class AddRoom extends Component {
    state = {
        name: '',
        frequency: 'weekly'
    }
    
    handleChange = (e) => {
        this.setState({
            name : e.target.value,
            frequency : e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
        
        this.props.addRoom(this.state);
        
        this.setState({
            name: ''
        })
    }
    
    render() {
        return (
            <div className="add-room">
                <h3>Add a room:</h3>
                <form id="add-room-form" onSubmit={this.handleSubmit}>
                    {/* //TODO: Add a smart autofill feature */}
                    {/* //TODO: Add a 'edit' feature */}
                    <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>
                    <h3>Cleaning frequency:</h3>
                    <select class="browser-default" value={this.state.frequency} onChange={this.handleChange}>
                        <option value="weekly">Once a week</option>
                        <option value="fortnightly">Once every two weeks</option>
                        <option value="thrice-monthly">Once every three weeks</option>
                        <option value="monthly">Once a month</option>
                    </select>
                    <button>Submit</button>
                </form> 
            </div>
        )
    }
}

export default AddRoom