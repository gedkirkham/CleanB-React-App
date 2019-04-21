import React, { Component } from 'react'
import { connect } from 'react-redux'

import ListItems from './ListItems'
import Calendar from '../Calendar/Calendar'
import AddItem from './AddItem'
import { addCleaner, deleteCleaner } from '../Actions/cleanerActions'
import { addRoom, deleteRoom } from '../Actions/roomActions'
import { CLEANER_ALREADY_EXISTS_CONST, CLEANERS_CONST, ROOM_ALREADY_EXISTS, ROOMS_CONST } from '../Constants'

class Home extends Component {

    deleteItem = (itemGrouped) => {
        if (itemGrouped.itemType === CLEANERS_CONST) this.props.deleteCleaner(itemGrouped.itemId)
        else if (itemGrouped.itemType === ROOMS_CONST) this.props.deleteRoom(itemGrouped.itemId);
    }

    render() {
        return (
                <main dataTest="component-home" className="cleanb-app container">
                    //Cleaners
                    <AddItem dataTest="component-addCleaner" itemToAdd={CLEANERS_CONST} />
                    <ListItems dataTest="component-cleaner-list" itemsToList={CLEANERS_CONST} items={this.props.cleaners} deleteItem={this.deleteItem} />
                    
                    //Rooms
                    <AddItem dataTest="component-addRoom" itemToAdd={ROOMS_CONST} />
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