import React, { Component } from 'react';
import Ninjas from './Ninjas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>CleanB</h1>
        <p>Welcome</p>
        <Ninjas name="Ged" age="26" />
      </div>
    );
  }
}

export default App;
