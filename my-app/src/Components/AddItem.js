import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addCleaner, deleteCleaner } from '../Actions/cleanerActions'
import { addRoom, deleteRoom } from '../Actions/roomActions'
import { CLEANER_ALREADY_EXISTS_CONST, ENTER_CLEANERS_NAME_CONST, ADD_CLEANER_CONST, PROVIDE_CLEANERS_NAME_CONST, CLEANERS_CONST, 
            ROOM_ALREADY_EXISTS, ROOMS_CONST, ADD_ROOM_CONST, ADD_A_ROOM_CONST, CLEANING_FREQUENCY_CONST, WEEKLY_CONST, 
            FORTNIGHTLY_CONST, THRICE_MONTHLY_CONST, MONTHLY_CONST, PROVIDE_ROOM_NAME_CONST 
        } from '../Constants'

class AddItem extends Component {
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
        let errorMessage

        if(this.state.name !== '') {
            this.setState({
                [event.target.name] : event.target.value
            })
            
            if (this.props.itemToAdd === CLEANERS_CONST) { 
                this.addItem({ itemToAdd : CLEANERS_CONST, item : this.state });
            } else if (this.props.itemToAdd === ROOMS_CONST) {
                this.addItem({ itemToAdd : ROOMS_CONST, item : this.state });
            }
            
            this.setState({
                name : ''
            })
        }
        else if (this.state.name === '') {
            if (this.props.itemToAdd === CLEANERS_CONST) errorMessage = PROVIDE_CLEANERS_NAME_CONST
            else if (this.props.itemToAdd === ROOMS_CONST) errorMessage = PROVIDE_ROOM_NAME_CONST
            
            alert(errorMessage)
        }
    }

    addItem = (itemGroup) => {
        var found = false;
        let arrayOfItemsToLoopThrough
        let alertMessage

        //Check to see if item currently exists
        if (itemGroup.itemToAdd === CLEANERS_CONST) {
            arrayOfItemsToLoopThrough = this.props.cleaners
            alertMessage = CLEANER_ALREADY_EXISTS_CONST
        } else if (itemGroup.itemToAdd === ROOMS_CONST) {
            arrayOfItemsToLoopThrough = this.props.rooms
            alertMessage = ROOM_ALREADY_EXISTS
        }

        for(var i = 0; i < arrayOfItemsToLoopThrough.length; i++) {
            if (arrayOfItemsToLoopThrough[i].name.toLowerCase() === itemGroup.item.name.toLowerCase()) {
                found = true;
                break;
            }
        }
        
        if (!found) {
            //TODO: Provide a better, unique, id assignment.
            itemGroup.item.id = Math.random();

            if (itemGroup.itemToAdd === CLEANERS_CONST) {
                delete itemGroup.item.frequency
                this.props.addCleaner(itemGroup.item);
            } else if (itemGroup.itemToAdd === ROOMS_CONST) {
                this.props.addRoom(itemGroup.item);
            }
        } else {
            //TODO: Build a better warning message
            alert(alertMessage)
        }
    }

    render() {
        return (
            this.props.itemToAdd === CLEANERS_CONST ? (
                <section className="row">
                    <h3>{ENTER_CLEANERS_NAME_CONST}</h3>
                    <form className="input-field" id="add-cleaner-form" onSubmit={this.handleSubmit}>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                        <button className="btn grey">{ADD_CLEANER_CONST}</button>
                    </form>
                </section>
            )
            :
            (
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleaners : state.cleanerReducer.cleaners,
        rooms : state.roomReducer.rooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //Cleaner
        addCleaner : (cleaner) => { dispatch(addCleaner(cleaner)) },
        deleteCleaner : (id) => { dispatch(deleteCleaner(id)) },

        //Room
        addRoom : (room) => { dispatch(addRoom(room)) },
        deleteRoom : (id) => { dispatch(deleteRoom(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)