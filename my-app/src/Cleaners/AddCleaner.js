import React, { Component } from 'react'

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
            setTimeout(this.warningMessage("Please provide a cleaners name."),0);       
        }
    }

    warningMessage(errorText){
        alert(errorText);
    }

    render() {
        return(
            <div className="row">
                <h3>Enter a cleaners name:</h3>
                <form id="add-cleaner-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                    <button>Add cleaner</button>
                </form>
            </div>
        )
    }
}

export default AddCleaner