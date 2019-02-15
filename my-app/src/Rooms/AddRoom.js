import React, { Component } from 'react'
import {ADD_ROOM_CONST, ADD_A_ROOM_CONST, PROVIDE_ROOM_NAME_CONST, CLEANING_FREQUENCY_CONST, WEEKLY_CONST, FORTNIGHTLY_CONST, THRICE_MONTHLY_CONST, MONTHLY_CONST} from '../Constants'

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
            setTimeout(this.warningMessage({PROVIDE_ROOM_NAME_CONST}),0)
        }
    }

    warningMessage(errorText){
        alert(errorText);
    }
    
    render() {
        return (
            <section className="add-room row">
                <h3>{ADD_A_ROOM_CONST}</h3>
                <form className="input-field" id="add-room-form" onSubmit={this.handleSubmit}>
                    {/* //TODO: Add a smart autofill feature */}
                    {/* //TODO: Add a 'edit' feature */}
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
                    <h5>{CLEANING_FREQUENCY_CONST}</h5>
                    <select className="browser-default" name="frequency" onChange={this.handleChange} value={this.state.frequency}>
                        <option value="weekly">{WEEKLY_CONST}</option>
                        <option value="fortnightly">{FORTNIGHTLY_CONST}</option>
                        <option value="thrice-monthly">{THRICE_MONTHLY_CONST}</option>
                        <option value="monthly">{MONTHLY_CONST}</option>
                    </select>
                    <button className="btn grey">{ADD_ROOM_CONST}</button>
                </form> 
            </section>
        )
    }
}

export default AddRoom