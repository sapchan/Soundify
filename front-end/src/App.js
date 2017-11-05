import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      norm: 'place'
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4567/test')
    .then(function (response) {
      const message = response.data;
      this.setState(
        {norm: message}
      );
      console.log(message);
    }.bind(this))
  }

  render() {
    return (
      <div className="App">
        {this.state.norm}
      </div>
    );
  }
}

export default App;
