import React, { Component } from 'react';
import AddCleaner from './Cleaners/AddCleaner';
import Cleaners from './Cleaners/Cleaners';
import LoginOrCreateAccount from './LoginOrCreateAccount';
<<<<<<< HEAD
import RoomsClass from './rooms/RoomClass';
=======
import RoomsClass from './Rooms/RoomsClass.js';
>>>>>>> 8a4f5cee1e2573706d7f0373f1ae9796f49170ff

class App extends Component {
    state = {
        cleaners : []
    }
      
    componentDidMount(){
    console.log("component mounted");
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

  render() {
    return (
      <div className="cleanb-app container">
        <LoginOrCreateAccount/>
<<<<<<< HEAD
        <h1>CleanB</h1>
        <CleanerClass/>
        <RoomsClass/>
        {/* //TODO: Make data flow better by re-using other classes */}
=======
        <h1 className="blue-text">CleanB</h1>
        <AddCleaner addCleaner={this.addCleaner} /> 
        <Cleaners cleaners={this.state.cleaners} deleteCleaner={this.deleteCleaner} />
        <RoomsClass/>
>>>>>>> 8a4f5cee1e2573706d7f0373f1ae9796f49170ff

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

export default App;