import React, { Component } from 'react'
import AddCleaner from '../Cleaners/AddCleaner'
import AddRoom from '../Rooms/AddRoom'
import ListItems from '../Cleaners/ListItems'
import Calendar from '../Calendar/Calendar'
import { connect } from 'react-redux'
import { addCleaner } from '../Actions/cleanerActions'
import { deleteCleaner } from '../Actions/cleanerActions'
import { addRoom } from '../Actions/roomActions'
import { deleteRoom } from '../Actions/roomActions'
import { CLEANER_ALREADY_EXISTS_CONST, CLEANERS_CONST, ROOM_ALREADY_EXISTS, ROOMS_CONST } from '../Constants'

class Home extends Component {
    componentDidMount(){
        console.log("component mounted");
    }

    componentDidUpdate(prevProps,prevState){
        console.log("component updated");
    }

    warningMessage(errorText){
        alert(errorText);
    }

    addCleaner = (cleaner) => {
        //check to see if cleaner currently exists
        var found = false;
        for(var i = 0; i < this.props.cleaners.length; i++) {
            if (this.props.cleaners[i].name.toLowerCase() === cleaner["name"].toLowerCase()) {
                found = true;
                break;
            }
        }

        //determine if cleaner already exists
        if (!this.props.cleaners.includes(cleaner) && !found)
        {
            //TODO: provide a better id assignment.
            cleaner.id = Math.random();
            this.props.addCleaner(cleaner);
        }
        else {
            //TODO: build a better warning message
            setTimeout(this.warningMessage({CLEANER_ALREADY_EXISTS_CONST}),0)
        }
    }
    
    deleteCleaner = (id) => {
        this.props.deleteCleaner(id);
    }

    addRoom = (room) => {
        //check to see if room currently exists
        var found = false;
        for(var i = 0; i < this.props.rooms.length; i++) {
            if (this.props.rooms[i].name.toLowerCase() === room["name"].toLowerCase()) {
                found = true;
                break;
            }
        }

        //determine if room already exists
        if (!this.props.rooms.includes(room) && !found)
        {
            //TODO: provide a better id assignment.
            room.id = Math.random();
            this.props.addRoom(room);
        }
        else {
            //TODO: build a better warning message
            setTimeout(this.warningMessage({ROOM_ALREADY_EXISTS}),0)
        }   
    }
    
    deleteRoom = (id) => {
        this.props.deleteRoom(id);
    }

  render() {
    return (
            <main className="cleanb-app container">
                <AddCleaner addCleaner={this.addCleaner} />
                <ListItems itemsToList={CLEANERS_CONST} items={this.props.cleaners} deleteItem={this.deleteCleaner} />
                <AddRoom addRoom={this.addRoom} />    
                <ListItems itemsToList={ROOMS_CONST} items={this.props.rooms} deleteItem={this.deleteRoom} />
                <Calendar cleaners={this.props.cleaners} deleteCleaner={this.deleteCleaner} rooms={this.props.rooms} deleteRoom={this.deleteRoom} />

                <form className="hide">
                    Save calendar:
                    <input type="submit"/>
                </form>
            </main>
    ); 
  }
}

const mapStateToProps = (state) => {
    return {
        cleaners : state.cleaners,
        rooms : state.rooms 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //cleaners
        addCleaner: (name) => { dispatch(addCleaner(name))},
        deleteCleaner: (id) => { dispatch(deleteCleaner(id))},

        //rooms
        addRoom: (name) => { dispatch(addRoom(name))},
        deleteRoom: (id) => { dispatch(deleteRoom(id))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);