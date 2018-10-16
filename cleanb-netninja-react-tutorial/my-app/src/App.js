import React, { Component } from 'react';
import Cleaners from './Cleaners';
import LoginOrCreateAccount from './LoginOrCreateAccount';
import AddCleaner from './AddCleaner';
import Rooms from './rooms/Rooms.js';

class App extends Component {
    state = {
      cleaners : [
      ]
    }
    
  componentDidMount(){
    console.log("component mounted");
  }
  componentDidUpdate(prevProps,prevState){
    console.log("component updated");
    console.log(prevProps,prevState);
  }

  returnedCleanerState = (dataFromChild) => {
    //receive props from child and assign to state
    this.setState({
      cleaners: dataFromChild
    })
  }

  render() {
    return (
      <div className="App">
        <LoginOrCreateAccount/>
        <h1>CleanB</h1>
        <AddCleaner addCleaner={this.addCleaner} returnCleanerState={this.returnedCleanerState}/>
        <Cleaners deleteCleaner={this.deleteCleaner} cleaners={this.state.cleaners}/>
        <Rooms/>
        {/* //TODO: Make data flow better by re-using other classes */}

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