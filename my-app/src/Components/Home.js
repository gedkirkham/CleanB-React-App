import React, { Component } from 'react'
import AddCleaner from '../Cleaners/AddCleaner'
import Cleaners from '../Cleaners/Cleaners'
import AddRoom from '../Rooms/AddRoom'
import Rooms from '../Rooms/Rooms'
import Calendar from '../Calendar/Calendar'
import { connect } from 'react-redux'
import { addCleaner } from '../Actions/cleanerActions'
import { deleteCleaner } from '../Actions/cleanerActions'
import { addRoom } from '../Actions/roomActions'
import { deleteRoom } from '../Actions/roomActions'

class Home extends Component {
    componentDidMount(){
        console.log("component mounted");
    }

    componentDidUpdate(prevProps,prevState){
        console.log("component updated");
        console.log(prevProps,prevState);
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
            setTimeout(this.warningMessage("Cleaner already exists."),0)
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
            setTimeout(this.warningMessage("Room already exists."),0)
        }   
    }
    
    deleteRoom = (id) => {
        this.props.deleteRoom(id);
    }

  render() {
    return (
            <div className="cleanb-app container">
                <AddCleaner addCleaner={this.addCleaner} /> 
                <Cleaners cleaners={this.props.cleaners} deleteCleaner={this.deleteCleaner} />
                <AddRoom addRoom={this.addRoom} />    
                <Rooms rooms={this.props.rooms} deleteRoom={this.deleteRoom} />
                <Calendar cleaners={this.props.cleaners} deleteCleaner={this.deleteCleaner} rooms={this.props.rooms} deleteRoom={this.deleteRoom} />
                
                <form>
                    Exclude cleaner from a room:
                    <select name="Exclusion room" size="4" multiple>
                        <option value="Room 1">Room 1</option>
                        <option value="Room 2">Room 2</option>
                        <option value="Room 3">Room 3</option>
                        <option value="Room 4">Room 4</option>
                        <option value="Room 5">Room 5</option>
                    </select>

                    <select name="Cleaner" size="4" multiple>
                        <option value="Cleaner 1">Cleaner 1</option>
                        <option value="Cleaner 2">Cleaner 2</option>
                        <option value="Cleaner 3">Cleaner 3</option>
                        <option value="Cleaner 4">Cleaner 4</option>
                        <option value="Cleaner 5">Cleaner 5</option>
                    </select>

                    <input type="submit"/>
                </form>

                <form>
                    Add a cleaner to a room:
                    <select name="Exclusion room" size="4" multiple>
                        <option value="Room 1">Room 1</option>
                        <option value="Room 2">Room 2</option>
                        <option value="Room 3">Room 3</option>
                        <option value="Room 4">Room 4</option>
                        <option value="Room 5">Room 5</option>
                    </select>

                    <select name="Cleaner" size="4" multiple>
                        <option value="Cleaner 1">Cleaner 1</option>
                        <option value="Cleaner 2">Cleaner 2</option>
                        <option value="Cleaner 3">Cleaner 3</option>
                        <option value="Cleaner 4">Cleaner 4</option>
                        <option value="Cleaner 5">Cleaner 5</option>
                    </select>

                    <input type="submit"/>
                </form>

                <form>
                    Save calendar:
                    <input type="submit"/>
                </form>
            </div>
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
        deleteRoom: (id) => { dispatch(deleteRoom(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);