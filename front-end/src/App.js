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
      user_id: 0,
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
    this.getListOfPlaylists = this.getListOfPlaylists.bind(this);
  }

  // This initializes all of the information when a user logs in based on what their user id is.
  // Informaiton includes their playlists, previous queue, their friends, and what their current song is
  componentWillMount(){
    let location = 'http://localhost:4567/initialize/123';
    axios.get(location).then(function (response) {
      let information = [response.data];
      let name = information[0]['name'];
      let user_id = information[0]['usr_id'];
      let playlist = information[0]['playlist'];
      let friends = information[0]['friends'];
      let queue = information[0]['queue'];
      this.setState({
        name: name,
        user_id: user_id,
        playlist: playlist,
        friends: friends,
        queue: queue,
      });
    }.bind(this));
  }

  // This gets all of the playlists a person has based on their user_id
  getListOfPlaylists(user_id) {
    let location = 'http://localhost:4567/getListPlaylist/' + user_id;
    axios.get(location).then(function (response) {
      let playlist = response.data;
      this.setState({
        playlist: playlist
      });
    }.bind(this));
  }

  // This gets all of the songs in a specific playlist
  getPlaylist(playList_id) {
    let location = 'http://localhost:4567/playlist/' + playList_id;
    axios.get(location).then(function (response) {
      let queue = response.data;
      this.setState({
        queue: queue
      });
    }.bind(this));
  }

  // This gets the queue at the beginning. Will be useful when a song finishes, so we can play the next song in line
  getQueue(){
    let location = 'http://localhost:4567/queue';
    axios.get(location).then(function (response) {
      let queue = response.data.queue;
      this.setState({
        queue: queue
      });
    }.bind(this));
  }

  // When a song's play button is clicked, this method updates the song id that
  // the player window contains. We can use this to play the song or get
  // information about it in the player window
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
