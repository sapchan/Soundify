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
      norm: 'place'
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
    axios.get('http://localhost:4567/test')
    .then(function (response) {
      const message = response.data;
      console.log(message);
    }.bind(this))
  }

  render() {
    const data =[{
      "name":"Somebody",
       "playlist": "hello",
       "friends": "fuck 1",
       "queue": "shitty song 2"
    }];
    console.log(data);
    return (
      <div className="App">
        <h2>Hello {data.name}</h2>
        <PlayList_Container data={data}/>
        <Viewer_Container data={data}/>
        <Player_Container data={data}/>
        <BeSocial_Container data={data}/>

      </div>
    );
  }
}



export default App;
