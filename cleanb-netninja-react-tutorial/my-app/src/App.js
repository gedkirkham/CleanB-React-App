import React, { Component } from 'react';
import Ninjas from './Ninjas';

class App extends Component {
  state = {
    ninjas : [
        { name: 'Ryu', age: 26, id: 1 },
        { name: 'Ged', age: 26, id: 2 },
        { name: 'Razvan', age: 21, id: 3 }
    ]
    }
  render() {
    return (
      <div className="App">
        <h1>CleanB</h1>
        <p>Welcome</p>
        <Ninjas ninjas={this.state.ninjas}/>
      </div>
    );
  }
}

export default App;
