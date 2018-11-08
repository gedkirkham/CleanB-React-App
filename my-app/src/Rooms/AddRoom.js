import React, { Component } from 'react'

class AddRoom extends Component {
    state = {
        name: '',
        frequency: 'weekly'
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.name  !== ''){
            this.setState({
                [event.target.name] : event.target.value
            })

            this.props.addRoom(this.state);
            
            this.setState({
                name: ''
            })
        }
        else if(this.state.name === ''){
            setTimeout(this.warningMessage("Please provide a room name."),0)
        }
    }

    warningMessage(errorText){
        alert(errorText);
    }
    
    render() {
        return (
            <div className="add-room">
                <h3>Add a room:</h3>
                <form id="add-room-form" onSubmit={this.handleSubmit}>
                    {/* //TODO: Add a smart autofill feature */}
                    {/* //TODO: Add a 'edit' feature */}
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
                    <h3>Cleaning frequency:</h3>
                    <select className="browser-default" name="frequency" onChange={this.handleChange} value={this.state.frequency}>
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