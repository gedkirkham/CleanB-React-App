import React, { Component } from 'react'
import RoomsUI from './RoomsUI.js';

class RoomClass extends Component {
    state = {
        rooms : [
        ]
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.addRoom(this.state);
        document.getElementById("add-room-form").reset();
    }
    
    warningMessage(){
        alert("Room already exists.");
    }
    
    addRoom = (room) => {
        //check to see if room currently exists
        var found = false;
        for(var i = 0; i < this.state.rooms.length; i++) {
            if (this.state.rooms[i].name === room["name"].toLowerCase()) {
                found = true;
                break;
            }
        }

        //determine if room already exists
        if (!this.state.rooms.includes(room) && !found)
        {
            //TODO: provide a better id assignment.
            room.id = Math.random();
            
            //copy current state and add new room
            let rooms = [...this.state.rooms, room]
            this.setState({
                rooms: rooms
            })
        }
        else {
            //TODO: build a better warning message
            setTimeout(this.warningMessage,0)
        }
    }
    
    deleteRoom = (id) => {
        console.log(id);
        let rooms = this.state.rooms.filter(room => {
            return room.id !== id
        });
        this.setState({
            rooms: rooms
        })
    }

    render() {
        return (
            <div>
                <h3>Add a room:</h3>
                <form id="add-room-form" onSubmit={this.handleSubmit}>
                    {/* //TODO: Add a smart autofill feature */}
                    {/* //TODO: Add a 'edit' feature */}
                    <input type="text" id="name" onChange={this.handleChange}></input>
                    <button>Submit</button>
                </form>

                <h3>Frequency of room:</h3>
                <input name="Frequency" type="text"/>
                <button>Submit</button>

                <RoomsUI rooms={this.state.rooms} deleteRoom={this.deleteRoom} />
            </div>
        )
    }
}

export default RoomClass