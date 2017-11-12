import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PlayList_Container from './components/PlayList_Container';
import Viewer_Container from './components/Viewer_Container';
import Player_Container from './components/Player_Container';
import BeSocial_Container from './components/BeSocial_Container';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      norm: 'place',
      name: 'Somebody',
      playlist: [
        'P1',
        'P2'
      ],
      friends: ['F1','F2'],
      queue: [
        'S1',
        'S2'
      ],
      curSong: ['S3']
    };
  }

  componentWillMount() {
    axios.get('http://localhost:4567/test')
    .then(function (response) {
      const message = response.data;
      this.setState(
        {norm: message}
      );
      console.log(message);
    }.bind(this))
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    return (
      <div className="App">
        <h2>Hello {this.state.name}</h2>
        <PlayList_Container data={this.state.playlist}/>
        <Viewer_Container data={this.state.queue}/>
        <Player_Container data={this.state.curSong}/>
        <BeSocial_Container data={this.state.friends}/>

      </div>
    );
  }
}



export default App;
