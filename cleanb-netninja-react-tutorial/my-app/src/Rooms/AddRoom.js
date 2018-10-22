import React, { Component } from 'react'

class AddRoom extends Component {
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
            name: e.target.value
        })
        
        this.props.addRoom(this.state);
        
        this.setState({
            name: ''
        })
    }
    
    render() {
        return (
            <div>
                <h3>Add a room:</h3>
                <form id="add-room-form" onSubmit={this.handleSubmit}>
                    {/* //TODO: Add a smart autofill feature */}
                    {/* //TODO: Add a 'edit' feature */}
                    <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>
                    <button>Submit</button>
                </form>

                <h3>Frequency of room:</h3>
                <input name="Frequency" type="text"/>
                <button>Submit</button>
            </div>
        )
    }
}

export default AddRoom