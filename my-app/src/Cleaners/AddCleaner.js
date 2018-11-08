import React, { Component } from 'react'

class AddCleaner extends Component {
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

        if(this.state.name !== '') {
            this.setState({
                name : e.target.value
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

export default AddCleaner