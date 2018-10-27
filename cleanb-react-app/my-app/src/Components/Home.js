import React, { Component } from 'react';
import AddCleaner from '../Cleaners/AddCleaner';
import Cleaners from '../Cleaners/Cleaners';
import AddRoom from '../Rooms/AddRoom';
import Rooms from '../Rooms/Rooms';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {
        cleaners : [],
        rooms : [],
        posts : []
    }
      
    componentDidMount(){
        console.log("component mounted");
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({
                    posts : response.data.slice(0,5)
                })
            }) 
    }

    componentDidUpdate(prevProps,prevState){
        console.log("component updated");
        console.log(prevProps,prevState);
    }

    roomWarningMessage(){
        alert("Room already exists.");
    }

    cleanerWarningMessage(){
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
                cleaners
            })
        }
        else {
            //TODO: build a better warning message
            setTimeout(this.cleanerWarningMessage,0)
        }
    }
    
    deleteCleaner = (id) => {
        let cleaners = this.state.cleaners.filter(cleaner => {
            return cleaner.id !== id
        });
        this.setState({
            cleaners
        })
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
            setTimeout(this.roomWarningMessage,0)
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
      const { posts } = this.state;
      const postList = posts.length ? (
          posts.map(post => {
            return (
                <div className="post card" key={post.id}>
                    <div className="card-content">
                        <Link to={'/' + post.id}>
                            <span className="card-title">{post.title}</span>
                        </Link>
                        <p>{post.body}</p>
                    </div>
                </div>
            )
          })
      ) : (
            <div className="center">No data to show!</div>
        )
    return (
            <div className="cleanb-app container">
                <AddCleaner addCleaner={this.addCleaner} /> 
                <Cleaners cleaners={this.state.cleaners} deleteCleaner={this.deleteCleaner} />
                <AddRoom addRoom={this.addRoom} />    
                <Rooms rooms={this.state.rooms} deleteRoom={this.deleteRoom} />
                {postList}

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
                    Generate calendar:
                    <input type="submit"/>
                </form>

                <form>
                    Download calendar:
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

export default Home;