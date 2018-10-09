import React, { Component } from 'react';
import Cleaners from './Cleaners';
import LoginOrCreateAccount from './LoginOrCreateAccount';
import AddCleaner from './AddCleaner';

class App extends Component {
  state = {
    cleaners : [
    ]
    }

    warningMessage(){
      alert("Hello Ged!");
    }
    addCleaner = (cleaner) => {
      console.log(cleaner);
      //add check to ensure cleaners with the same name are not added.
      // var y = this.state.cleaners.includes("Ged");
      // console.log(y);
      if(cleaner.name === "Ged"){
        setTimeout(this.warningMessage,0)
      }

      cleaner.id = Math.random();
      let cleaners = [...this.state.cleaners, cleaner]
      this.setState({
        cleaners: cleaners
      })
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
    componentDidMount(){
      console.log("component mounted");
    }
    componentDidUpdate(prevProps,prevState){
      console.log("component updated");
      console.log(prevProps,prevState);
    }
  render() {
    return (
      <div className="App">
        <LoginOrCreateAccount/>
        <h1>CleanB</h1>
        <p>Welcome</p>
        <Cleaners deleteCleaner={this.deleteCleaner} cleaners={this.state.cleaners}/>
        <AddCleaner addCleaner={this.addCleaner}/>

        <form>
            <br />
            Enter some rooms:
            <input name="Room" type="text"/>
            <input type="submit"/>
    
            Frequency of room:
            <input name="Frequency" type="text"/>
            <input type="submit"/>
        </form>

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
