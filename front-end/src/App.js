import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PlayList_Container from './components/PlayList_Container';
import Viewer_Container from './components/Viewer_Container';
import Player_Container from './components/Player_Container';
import BeSocial_Container from './components/BeSocial_Container';

import { Grid, Button, Row, Col, Panel } from 'react-bootstrap';


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
        <Grid>
          <Row>
            <Col md={3}>
              <PlayList_Container data={this.state.playlist} name={this.state.name}/>
            </Col>
            <Col md={6}>
              <Row>
                <Viewer_Container data={this.state.queue}/>
              </Row>
              <Row>
                <Player_Container data={this.state.curSong}/>
              </Row>
            </Col>
            <Col md={3}>
              <BeSocial_Container data={this.state.friends}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}



export default App;
