import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';
import Viewer_Friend_Component from './Viewer_Friend_Component';
import Viewer_Artist_Container from './Viewer_Artist_Container';
import axios from 'axios';
import Search_Bar from './Search_Bar';
import '../assets/main.css';
import { Grid, Button, Row, Col, Panel, Table, thead,tbody, Form, FormControl } from 'react-bootstrap';

class Viewer_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      playerView: true,
      friendView: false,
      artistView: false,
      searchView: false,
      friendsPlaylist: undefined,
      artist_info: undefined,
      playlist: undefined,
      search_information: undefined,
      search_from_api_songs: [],
      search_from_api_users: []
    };
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.viewFriendsPlaylist = this.viewFriendsPlaylist.bind(this);
    this.change_in_search = this.change_in_search.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentWillMount(){
    let data = this.props.data;
    let queueView = this.props.playerView;
    let friendView = this.props.friendView;
    let artistView = this.props.artistView;
    let friendsPlaylist = this.props.friends_playlist;
    let artist_info = this.props.artist_info;
    let playlist = this.props.playlist;
    let searchView = this.props.searchView;
    let search_information = this.props.search_information;
    this.setState({
      data: data,
      playerView: queueView,
      friendView: friendView,
      artistView: artistView,
      friendsPlaylist: friendsPlaylist,
      artist_info: artist_info,
      playlist: playlist,
      searchView: searchView,
      search_information: search_information,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data ||
       this.props.playerView !== nextProps.playerView ||
       this.props.friendView !== nextProps.friendView ||
       this.props.artistView !== nextProps.artistView ||
       this.props.friends_playlist !== nextProps.friends_playlist ||
       this.props.artist_info !== nextProps.artist_info ||
       this.props.playlist !== nextProps.playlist ||
       this.props.searchView !== nextProps.searchView ||
       this.props.search_information !== nextProps.search_information ||
       this.props.searchView !== nextProps.searchView
    ) {
      this.setState({
        data: nextProps.data,
        playerView: nextProps.playerView,
        friendView: nextProps.friendView,
        artistView: nextProps.artistView,
        friendsPlaylist: nextProps.friends_playlist,
        artist_info: nextProps.artist_info,
        playlist: nextProps.playlist,
        search_information: nextProps.search_information,
        searchView: nextProps.searchView
      })
    }
  }

  updateCurrentSong(song_id){
    this.props.update(song_id);
  }

  viewFriendsPlaylist(playlist_id) {
    this.props.viewSongs(playlist_id);
  }

  change_in_search(text) {
    if(text === '') {
      this.setState({
        searchView: false,
        search_information: undefined,
      });
    } else {
      this.setState({
        search_information: text,
        searchView: true,
      });
      if (text.length > 5) {
        this.getSearchResults(text);
      }
    }
  }

  getSearchResults(text) {
    let location = 'http://localhost:4567/search/' + text ;
    axios.get(location).then(function (response) {
        let search_from_api_songs = response.data[0].songs;
        let search_from_api_users = response.data[0].users;
        this.setState({
          search_from_api_songs: search_from_api_songs,
          search_from_api_users: search_from_api_users
        })
    }.bind(this));
  }

  render() {
    if(this.state.searchView == true) {
      return(
        <div className="Viewer_Container">
        <Grid fluid={true}>
          <Row>
            <Search_Bar
              getText={this.change_in_search}
            />
          </Row>
          <Row>
            <div className='Viewer_Queue'>
              <h3> Search Results for  {this.state.search_information}</h3>
              <hr></hr>
              <h5>People: </h5>
              <Table striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>Person Name</th>
                    <th>Follow</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.search_from_api_users.map(function(s,i) {
                    return(
                      <tr>
                        <td>{s.username}</td>
                        <td><Button onClick={() => { this.props.addFriend(s.us_id) }}>
                          +
                        </Button></td>
                      </tr>
                    )
                  }.bind(this))}
                </tbody>
              </Table>
              <h5>Songs: </h5>
              <Table striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Popularity</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.search_from_api_songs.map(function(s, i)
                    {
                      return (
                        <Viewer_Queue_Component
                                key={i}
                                songID={s.song_key}
                                song={s.title}
                                artist={s.artist}
                                artist_id={s.artist_id}
                                duration={s.duration}
                                callback={this.updateCurrentSong}
                                onArtistClick={this.props.onArtistClick}
                                playlist={this.state.playlist}
                                addSongToPlaylist={this.props.addSongToPlaylist}
                              />);
                    }.bind(this)
                  )}
                </tbody>
              </Table>
            </div>
          </Row>
          </Grid>
        </div>
      );
    } else if(this.state.friendView == true) {
      return(
        <div className="Viewer_Container">
        <Grid fluid={true}>
          <Row>
            <Search_Bar
              getText={this.change_in_search}
            />
          </Row>
          <Row>
            <div className='Viewer_Queue'>
              <Table striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>PlayList Name</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.friendsPlaylist.map(function(s, i)
                  {
                    return (<Viewer_Friend_Component
                              key={i}
                              playlist={s.name}
                              playlist_id={s.pl_id}
                              sendUp={this.viewFriendsPlaylist}
                    />);
                  }.bind(this)
                )}
                </tbody>
              </Table>
            </div>
          </Row>
          </Grid>
        </div>
      );
    } else if(this.state.artistView == true) {
      let info = this.state.artist_info;
      let artistName = info[0].Name;
      let description = info[0].Description;
      let albums = info[0].Albums;
      let ar_id = info[0].artist_id;
      return(
        <div className="Viewer_Container">
        <Grid fluid={true}>
          <Row>
            <Search_Bar
              getText={this.change_in_search}
            />
          </Row>
          <Row>
            <div className='Viewer_Queue'>
              <Viewer_Artist_Container
                artist_name={artistName}
                artist_description={description}
                album_covers={albums}
                ar_id={ar_id}
                callback={this.props.update}
                onArtistClick={this.props.onArtistClick}
                playlist={this.props.playlist}
              />
            </div>
          </Row>
          </Grid>
        </div>
      );
    } else if(this.state.playerView == true) {
      return (
        <div className="Viewer_Container">
        <Grid fluid={true}>
          <Row>
            <Search_Bar
              getText={this.change_in_search}
            />
          </Row>
          <Row>
            <div className='Viewer_Queue'>
              <Table striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Popularity</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.data.map(function(s, i)
                  {
                    return (<Viewer_Queue_Component
                              key={i}
                              songID={s.song_key}
                              song={s.title}
                              artist={s.artist}
                              artist_id={s.artist_id}
                              duration={s.duration}
                              callback={this.updateCurrentSong}
                              onArtistClick={this.props.onArtistClick}
                              playlist={this.state.playlist}
                              addSongToPlaylist={this.props.addSongToPlaylist}
                            />);
                  }.bind(this)
                )}
                </tbody>
              </Table>
            </div>
          </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Viewer_Container;
