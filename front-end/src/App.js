import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PlayList_Container from './components/PlayList_Container';
import Viewer_Container from './components/Viewer_Container';
import Player_Container from './components/Player_Container';
import BeSocial_Container from './components/BeSocial_Container';
import './assets/main.css'

import { Grid, Button, Row, Col, Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: '',
      password: '',
      name: 'test',
      user_id: 0,
      playlist: [],
      friends: [],
      friends_playlist:[],
      queue: [],
      artist_info: [],
      queueView: true,
      friendView: false,
      artistView: false,
      curSong: 1,
      token1: '',
      token2: ''
    };
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.update_player_with_song = this.update_player_with_song.bind(this);
    this.getYourPlaylists = this.getYourPlaylists.bind(this);
    this.getListOfFriends = this.getListOfFriends.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.getFriendPlaylist = this.getFriendPlaylist.bind(this);
    this.viewFriendsSongsInPlaylist = this.viewFriendsSongsInPlaylist.bind(this);
    this.getArtistInformation = this.getArtistInformation.bind(this);
    this.handleChangeUsr = this.handleChangeUsr.bind(this);
    this.handleChangePswd = this.handleChangePswd.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.Initialize = this.Initialize.bind(this);
    this.logout = this.logout.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.signup = this.signup.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  // This initializes all of the information when a user logs in based on what their user id is.
  // Informaiton includes their playlists, previous queue, their friends, and what their current song is
  Initialize(user_id){
    let location = 'http://localhost:4567/initialize/' + user_id + '/' + this.state.token1 + '/' + this.state.token2;
    axios.get(location).then(function (response) {
      let information = response.data;
      let name = information['username'];
      let playlist = information['playlist'];
      let friends = information['friends'];
      let queue = information['queue']
      let token1 = information['token1']
      let token2 = information['token2']
      this.setState({
        name: name,
        user_id: user_id,
        playlist: playlist,
        friends: friends,
        queue: queue
      });
    }.bind(this));
  }

  // This gets all of a users's playlists names and ids
  getYourPlaylists() {
    let location = 'http://localhost:4567/getListPlaylist/' + this.state.user_id;
    axios.get(location).then(function (response) {
      let playlist = response.data;
      this.setState({
        playlist: playlist
      });
    }.bind(this));
  }

  // This gets all of the songs in a specific playlist
  getPlaylist(playList_id) {
    let location = 'http://localhost:4567/playlist/' + playList_id + '/' + this.state.token1 + '/' + this.state.token2;
    axios.get(location).then(function (response) {
      let queue = response.data;
      console.log(response.data);
      this.setState({
        queue: queue
      });
      if(this.state.queueView != true) {
        this.changeToPlaylist();
      }
    }.bind(this));
  }

  // This gets the queue at the beginning. Will be useful when a song finishes, so we can play the next song in line
  getQueue(){
    let location = 'http://localhost:4567/queue/' + this.state.user_id + '/' + this.state.token1 + '/' + this.state.token2;
    axios.get(location).then(function (response) {
      let queue = response.data.queue;
      this.setState({
        queue: queue
      });
      if(this.state.queueView != true) {
        this.changeToPlaylist();
      }
    }.bind(this));

  }

  // When an artist is clicked on, the artist view should be triggered
  getArtistInformation(artist_id){
    let location = 'http://localhost:4567/getArtistInformation/' + artist_id + '/' + this.state.token1 + '/' + this.state.token2;
    axios.get(location).then(function (response) {
      let artist_info = response.data.artistInfo;
      this.setState({
        artist_info: artist_info,
      });
      if(this.state.artistView !== true) {
        this.changeToArtist();
      }
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

  // this gets the list of friends for a specific user.
  getListOfFriends(user_id) {
    let location = 'http://localhost:4567/getListFriends/' + user_id;
    axios.get(location).then(function (response) {
      let friends = response.data;
      this.setState({
        friends: friends
      });
    }.bind(this));
  }

  // this gets all the playlists for a friends
  getFriendPlaylist(user_id){
    let location = 'http://localhost:4567/getListPlaylist/' + user_id + '/' + this.state.token1 + '/' + this.state.token2;
    axios.get(location).then(function (response) {
      let friends_playlist = response.data;
      this.setState({
        friends_playlist: friends_playlist
      });
      if(this.state.friendView != true) {
        this.changeToFriend();
      }
    }.bind(this));

  }

  // change all views to playlistView
  changeToPlaylist(){
    this.setState({
      queueView: true,
      friendView: false,
      artistView: false
    })
  }

  // change all views to friend views
  changeToFriend(){
    this.setState({
      queueView: false,
      friendView: true,
      artistView: false
    });
  }

  // change all views to artist view
  changeToArtist(){
    this.setState({
      queueView: false,
      friendView: false,
      artistView: true
    })
  }

  // function to add the friend given the friend's username
  addFriend(userName) {
    let location = 'http://localhost:4567/addFriend/' + this.state.user_id;
    axios.post(location, {
      friend:userName
    }).then(function(response){
      this.getListOfFriends(this.state.user_id);
    }).bind(this);
  }

  // displays the sogns depending on the playlist id
  viewFriendsSongsInPlaylist(playlist_id){
    this.getPlaylist(playlist_id)
  }

  handleChangeUsr(evt){
    let usr = evt.target.value;
    this.setState({
      username: usr
    })
  }

  handleChangePswd(evt) {
    let pswd = evt.target.value;
    this.setState({
      password: pswd
    })
  }

  authenticate(){
    let username = this.state.username;
    let password = this.state.password;
    let location = 'http://localhost:4567/login';
    axios.post(location, {
      username: username,
      password: password
    }).then(function(response){
      let token1 = response.data.token1;
      let token2 = response.data.token2;
      let us_id = response.data.us_id;
      let flag = response.data.flag;
      if(flag == true) {
        this.setState({
          user_id: us_id,
          login: true,
          token1: token1,
          token2: token2
        });
        this.Initialize(us_id);
      }

    }.bind(this));
  }

  logout(){
    this.setState({
      login: false,
      username: '',
      password: '',
      name: 'test',
      user_id: 0,
      playlist: [],
      friends: [],
      friends_playlist:[],
      queue: [],
      artist_info: [],
      queueView: true,
      friendView: false,
      artistView: false,
      curSong: 1
    });
  }

  signup(){
    let username = this.state.username;
    let password = this.state.password;
    let location = 'http://localhost:4567/signup';
    axios.post(location, {
      username: username,
      password: password
    }).then(function(response){
      let token1 = response.data.token1;
      let token2 = response.data.token2;
      let us_id = response.data.us_id;
      let flag = response.data.flag;
      if(flag == true) {
        this.setState({
          user_id: us_id,
          login: true,
          token1: token1,
          token2: token2
        });
      }
      this.Initialize(us_id);
    }.bind(this));
  }

  addSongToPlaylist(pl_id, so_id){
    let location = 'http://localhost:4567/addSongToPlaylist';
    axios.post(location, {
      pl_id: pl_id,
      so_id: so_id
    }).then(function(response){
        let location = 'http://localhost:4567/getListPlaylist/' + this.state.user_id;
        axios.get(location).then(function (response) {
          let playlist = response.data;
          this.setState({
            playlist: playlist
          });
        }.bind(this));
    }.bind(this));
  }

  createPlaylist(name) {
    let location = 'http://localhost:4567/createPlaylist';
    axios.post(location, {
      us_id: this.state.user_id,
      pl_name: name
    }).then(function(response){
        let error = response.data[0].error;
        if(error == 0) {
          let playlist = response.data[0].playlists;
          this.setState({
            playlist: playlist,
          })
        } else {
          this.logout();
        }
    }.bind(this));
  }

  render() {
    if(this.state.login == true) {
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
              createPlaylist={this.createPlaylist}
              />
            </Col>
            <Col md={9}>
                <Viewer_Container
                  playerView = {this.state.queueView}
                  friendView = {this.state.friendView}
                  artistView = {this.state.artistView}
                  data={this.state.queue}
                  artist_info = {this.state.artist_info}
                  friends_playlist = {this.state.friends_playlist}
                  update={this.update_player_with_song}
                  viewSongs={this.viewFriendsSongsInPlaylist}
                  onArtistClick={this.getArtistInformation}
                  playlist={this.state.playlist}
                  addSongToPlaylist={this.addSongToPlaylist}
                />
            </Col>
            <Col md={1}>
              <BeSocial_Container
                data={this.state.friends}
                getFriendPlaylist={this.getFriendPlaylist}
                logout={this.logout}
              />
            </Col>
          </Row>
          <Row>
            <Player_Container songId={this.state.curSong}/>
          </Row>
        </Grid>
      </div>
      );
    }
    else {
      return(
        <div className="App Login">
          <Grid>
          <form>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              onChange={this.handleChangeUsr}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              onChange={this.handleChangePswd}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            onClick={this.authenticate}
            >
            Login
          </Button >
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            onClick={this.signup}
            >
            Signup
          </Button >
        </form>
        </Grid>
        </div>
      );
    }
  }
}



export default App;
