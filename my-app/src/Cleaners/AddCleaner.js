import React, { Component } from 'react'
import { ENTER_CLEANERS_NAME_CONST, ADD_CLEANER_CONST, PROVIDE_CLEANERS_NAME_CONST, CLEANERS_CONST } from '../Constants'

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
            
            this.props.addItem({ itemType : CLEANERS_CONST, item : this.state,  });
            
            this.setState({
                name : ''
            })
        }
        else if (this.state.name === '') {
            alert(PROVIDE_CLEANERS_NAME_CONST)
        }
    }

    render() {
        return(
            <section className="row">
                <h3>{ENTER_CLEANERS_NAME_CONST}</h3>
                <form className="input-field" id="add-cleaner-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                    <button className="btn grey">{ADD_CLEANER_CONST}</button>
                </form>
            </section>
        )
    }
}

export default AddCleaner