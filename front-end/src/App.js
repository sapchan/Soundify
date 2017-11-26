import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PlayList_Container from './components/PlayList_Container';
import Viewer_Container from './components/Viewer_Container';
import Player_Container from './components/Player_Container';
import BeSocial_Container from './components/BeSocial_Container';
import './assets/main.css'

import { Grid, Button, Row, Col, Panel } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'test',
      playlist: [{
            "playlistName": "playlist 1",
            "playlist_id": 123
        },
        {
            "playlistName": "playlist 2",
            "playlist_id": 132
        }],
      friends: [{
            "friend_name": "friend 1",
            "friend_id": 1
        },
        {
            "friend_name": "friend 2",
            "friend_id": 2
        }],
      queue: [
        {
          "title": "Song 1",
          "artist": "Creator 1",
          "duration": 132,
          "song_key": 1
        },
        {
          "title": "Song 2",
          "artist": "Creator 2",
          "duration": 273,
          "song_key": 2,
        }
      ],
      queueView: true,
      friendView: false,
      curSong: 1
    };
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.update_player_with_song = this.update_player_with_song.bind(this);
  }

  componentWillMount(){
    let location = 'http://localhost:4567/initialize';
    axios.get(location).then(function (response) {
      let information = [response.data];
      let name = information[0]['name'];
      let playlist = information[0]['playlist'];
      let friends = information[0]['friends'];
      let queue = information[0]['queue'];
      this.setState({
        name: name,
        playlist: playlist,
        friends: friends,
        queue: queue,
      });
    }.bind(this));
  }

  getPlaylist(playList_id) {
    let location = 'http://localhost:4567/playlist/' + playList_id;
    axios.get(location).then(function (response) {
      let queue = response.data;
      this.setState({
        queue: queue
      });
    }.bind(this));
  }

  changeViewerState(){
    this.setState({
      queueView: !this.state.queueView
    });
  }

  getQueue(){
    let location = 'http://localhost:4567/queue';
    axios.get(location).then(function (response) {
      let queue = response.data.queue;
      this.setState({
        queue: queue
      });
    }.bind(this));
  }

  update_player_with_song(song_id){
    this.setState({
      curSong: song_id
    })
  }

  render() {
    return (
      <div className="App">
        <Grid fluid={true}>
          <Row>
            <Col md={2}>
              <PlayList_Container
              data={this.state.playlist}
              name={this.state.name}
              callback={this.getPlaylist}
              getQueue={this.getQueue}
              />
            </Col>
            <Col md={9}>
                <Viewer_Container
                  playerView = {this.state.queueView}
                  friendView = {this.state.friendView}
                  data={this.state.queue}
                  update={this.update_player_with_song}
                />
            </Col>
            <Col md={1}>
              <BeSocial_Container data={this.state.friends}/>
            </Col>
          </Row>
          <Row>
            <Player_Container songId={this.state.curSong}/>
          </Row>
        </Grid>
      </div>
    );
  }
}



export default App;
