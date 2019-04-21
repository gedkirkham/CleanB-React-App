import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddCleaner from '../Cleaners/AddCleaner'
import AddRoom from '../Rooms/AddRoom'
import ListItems from './ListItems'
import Calendar from '../Calendar/Calendar'
import { addCleaner, deleteCleaner } from '../Actions/cleanerActions'
import { addRoom, deleteRoom } from '../Actions/roomActions'
import { CLEANER_ALREADY_EXISTS_CONST, CLEANERS_CONST, ROOM_ALREADY_EXISTS, ROOMS_CONST } from '../Constants'

class Home extends Component {

    addItem = (itemGroup) => {
        var found = false;
        let arrayOfItemsToLoopThrough
        let alertMessage

        //Check to see if item currently exists
        if (itemGroup.itemType === CLEANERS_CONST) {
            arrayOfItemsToLoopThrough = this.props.cleaners
            alertMessage = CLEANER_ALREADY_EXISTS_CONST
        } else if (itemGroup.itemType === ROOMS_CONST) {
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

            if (itemGroup.itemType === CLEANERS_CONST) {
                this.props.addCleaner(itemGroup.item);
            } else if (itemGroup.itemType === ROOMS_CONST) {
                this.props.addRoom(itemGroup.item);
            }
        } else {
            //TODO: Build a better warning message
            alert(alertMessage)
        }
    }

    deleteItem = (itemGrouped) => {
        if (itemGrouped.itemType === CLEANERS_CONST) this.props.deleteCleaner(itemGrouped.itemId)
        else if (itemGrouped.itemType === ROOMS_CONST) this.props.deleteRoom(itemGrouped.itemId);
    }

  render() {
    return (
            <main dataTest="component-home" className="cleanb-app container">
                <AddCleaner dataTest="component-addCleaner" addItem={this.addItem} />
                <ListItems dataTest="component-cleaner-list" itemsToList={CLEANERS_CONST} items={this.props.cleaners} deleteItem={this.deleteItem} />
                <AddRoom dataTest="component-addRoom" addItem={this.addItem} />    
                <ListItems dataTest="component-room-list" itemsToList={ROOMS_CONST} items={this.props.rooms} deleteItem={this.deleteItem} />
                <Calendar dataTest="component-calendar" cleaners={this.props.cleaners} deleteCleaner={this.deleteCleaner} rooms={this.props.rooms} deleteRoom={this.deleteRoom} />
            </main>
    ); 
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
        addCleaner: (cleaner) => { dispatch(addCleaner(cleaner))},
        deleteCleaner: (id) => { dispatch(deleteCleaner(id))},

        //Room
        addRoom: (room) => { dispatch(addRoom(room))},
        deleteRoom: (id) => { dispatch(deleteRoom(id))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);