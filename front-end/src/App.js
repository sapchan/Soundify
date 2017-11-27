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
      friends_playlist:[{
            "playlistName": "playlist 1",
            "playlist_id": 123
        },
        {
            "playlistName": "playlist 2",
            "playlist_id": 132
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
      artist_info: [
          {
            'Name': 'name',
            'artist_id' : 0,
            'Description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis hendrerit ipsum, at maximus est. Maecenas consequat consectetur orci, in laoreet dolor gravida in. Cras suscipit semper ex, eget consequat libero interdum ac. Nam sed posuere ligula. Vivamus vel sem ut neque imperdiet congue. Quisque ac dolor a risus laoreet elementum. Duis lacinia risus odio, ac varius mi sagittis sit amet. Vestibulum ut diam fringilla, maximus libero eget, tincidunt nulla. Integer eleifend odio et elementum pretium. Nulla id erat vulputate, volutpat mi at, consequat magna. Vestibulum id dolor in tellus lobortis porta. Mauris a pulvinar felis, euismod bibendum urna. Proin ac magna interdum, suscipit tortor ac, faucibus erat.',
            'Albums': [
              {
                'album_title': 'album 1',
                'songs': [{
                    'songName': 'Song 1',
                    'song_key': 0,
                    'duration': 0
                    }]
                }]
          }],
      queueView: true,
      friendView: false,
      artistView: false,
      curSong: 1
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
      let artist_info = information[0]['artist_info'];
      this.setState({
        name: name,
        user_id: user_id,
        playlist: playlist,
        friends: friends,
        queue: queue,
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
    let location = 'http://localhost:4567/playlist/' + playList_id;
    axios.get(location).then(function (response) {
      let queue = response.data;
      this.setState({
        queue: queue
      });
    }.bind(this));
    if(this.state.queueView != true) {
      this.changeToPlaylist();
    }
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
    if(this.state.queueView != true) {
      this.changeToPlaylist();
    }
  }

  // When an artist is clicked on, the artist view should be triggered
  getArtistInformation(artist_id){
    let location = 'http://localhost:4567/getArtistInformation/' + artist_id;
    axios.get(location).then(function (response) {
      let artist_info = response.data.artistInfo;
      this.setState({
        artist_info: artist_info
      });
    }.bind(this));
    if(this.state.artistView != true) {
      this.changeToArtist();
    }
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
    let location = 'http://localhost:4567/getListPlaylist/' + user_id;
    axios.get(location).then(function (response) {
      let friends_playlist = response.data.playlist;
      this.setState({
        friends_playlist: friends_playlist
      });
    }.bind(this));
    if(this.state.friendView != true) {
      this.changeToFriend();
    }
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

  // function to add the playlist with the input name
  addPlaylist(playlistName) {
    let location = 'http://localhost:4567/addPlaylist/' + this.state.user_id;
    axios.post(location, {
      playlist:playlistName
    }).then(function(response){
      this.getYourPlaylists(this.state.user_id);
    }).bind(this);
  }

  // displays the sogns depending on the playlist id
  viewFriendsSongsInPlaylist(playlist_id){
    this.getPlaylist(playlist_id)
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
                  artistView = {this.state.artistView}
                  data={this.state.queue}
                  artist_info = {this.state.artist_info}
                  friends_playlist = {this.state.friends_playlist}
                  update={this.update_player_with_song}
                  viewSongs={this.viewFriendsSongsInPlaylist}
                  onArtistClick={this.getArtistInformation}
                />
            </Col>
            <Col md={1}>
              <BeSocial_Container
                data={this.state.friends}
                getFriendPlaylist={this.getFriendPlaylist}
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
}



export default App;
