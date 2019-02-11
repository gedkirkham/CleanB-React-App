import React, { Component } from 'react'
import {ENTER_CLEANERS_NAME_CONST, ADD_CLEANER_CONST, PROVIDE_CLEANERS_NAME_CONST} from '../Constants'

class AddCleaner extends Component {
    state = {
        name: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.name !== '') {
            this.setState({
                [event.target.name] : event.target.value
            })
            
            this.props.addCleaner(this.state);
            
            this.setState({
                name : ''
            })
        }
        else if (this.state.name === '') {
            setTimeout(this.warningMessage({PROVIDE_CLEANERS_NAME_CONST}),0);       
        }
    }

    warningMessage(errorText){
        alert(errorText);
    }

    render() {
        return(
            <div className="row">
                <h3>{ENTER_CLEANERS_NAME_CONST}</h3>
                <form className="input-field" id="add-cleaner-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                    <button className="btn grey">{ADD_CLEANER_CONST}</button>
                </form>
            </div>
        )
    }
}

export default AddCleaner