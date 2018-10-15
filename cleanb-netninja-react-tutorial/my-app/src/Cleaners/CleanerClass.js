import React, { Component } from 'react'
import CleanerUI from './CleanerUI';

class CleanerClass extends Component {
    state = {
        cleaners : [
        ]
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.addCleaner(this.state);
        document.getElementById("add-cleaner-form").reset();
    }
    
    warningMessage(){
        alert("Cleaner already exists.");
    }
    
    addCleaner = (cleaner) => {
        //check to see if cleaner currently exists
        var found = false;
        for(var i = 0; i < this.state.cleaners.length; i++) {
            if (this.state.cleaners[i].name === cleaner["name"].toLowerCase()) {
                found = true;
                break;
            }
        }

        //determine if cleaner already exists
        if (!this.state.cleaners.includes(cleaner) && !found)
        {
            //TODO: provide a better id assignment.
            cleaner.id = Math.random();
            
            //copy current state and add new cleaner
            let cleaners = [...this.state.cleaners, cleaner]
            this.setState({
                cleaners: cleaners
            })
        }
        else {
            //TODO: build a better warning message
            setTimeout(this.warningMessage,0)
        }
    }
    
    deleteCleaner = (id) => {
        console.log(id);
        let cleaners = this.state.cleaners.filter(cleaner => {
            return cleaner.id !== id
        });
        this.setState({
            cleaners: cleaners
        })
    }

    render() {
        return (
            <div>
                <h3>Enter a cleaners name:</h3>
                <form id="add-cleaner-form" onSubmit={this.handleSubmit}>
                    <input type="text" id="name" onChange={this.handleChange}/>
                    <button>Add cleaner</button>
                </form>
                <CleanerUI deleteCleaner={this.deleteCleaner} cleaners={this.state.cleaners}/> 
            </div>
        )
    }
}

export default CleanerClass