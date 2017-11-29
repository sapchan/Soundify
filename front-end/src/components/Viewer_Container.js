import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';
import Viewer_Friend_Component from './Viewer_Friend_Component';
import Viewer_Artist_Container from './Viewer_Artist_Container';
import { Grid, Button, Row, Col, Panel, Table, thead,tbody, Form, FormControl } from 'react-bootstrap';

class Viewer_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      playerView: true,
      friendView: false,
      artistView: false,
      friendsPlaylist: undefined,
      artist_info: undefined
    };
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
    this.viewFriendsPlaylist = this.viewFriendsPlaylist.bind(this);
  }

  componentWillMount(){
    let data = this.props.data;
    let queueView = this.props.playerView;
    let friendView = this.props.friendView;
    let artistView = this.props.artistView;
    let friendsPlaylist = this.props.friends_playlist;
    let artist_info = this.props.artist_info;
    this.setState({
      data: data,
      playerView: queueView,
      friendView: friendView,
      artistView: artistView,
      friendsPlaylist: friendsPlaylist,
      artist_info: artist_info
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data ||
       this.props.playerView !== nextProps.playerView ||
       this.props.friendView !== nextProps.friendView ||
       this.props.artistView !== nextProps.artistView ||
       this.props.friends_playlist !== nextProps.friends_playlist ||
       this.props.artist_info !== nextProps.artist_info
    ) {
      this.setState({
        data: nextProps.data,
        playerView: nextProps.playerView,
        friendView: nextProps.friendView,
        artistView: nextProps.artistView,
        friendsPlaylist: nextProps.friends_playlist,
        artist_info: nextProps.artist_info
      })
    }
  }

  updateCurrentSong(song_id){
    this.props.update(song_id);
  }

  viewFriendsPlaylist(playlist_id) {
    this.props.viewSongs(playlist_id);
  }

  render() {
    if(this.state.playerView == true) {
      return (
        <div className="Viewer_Container">
        <Grid fluid={true}>
          <Row>
            <div className="SearchBar">
              <Form horizontal>
                <Col sm={2}>
                </Col>
                <Col sm={8}>
                  <FormControl bsSize={'lg'} type="text" placeholder="Search" />
                </Col>
                <Col sm={2}>
                </Col>
              </Form>
            </div>
          </Row>
          <Row>
            <div className='Viewer_Queue'>
              <Table striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Popularity</th>
                    <th>Play</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.data.map(function(s, i)
                  {
                    console.log(s)
                    return (<Viewer_Queue_Component
                              key={i}
                              songID={s.so_id}
                              song={s.title}
                              artist={s.name}
                              artist_id={s.ar_id}
                              duration={s.duration}
                              callback={this.updateCurrentSong}
                              onArtistClick={this.props.onArtistClick}
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
            <div className="SearchBar">
              <Form horizontal>
                <Col sm={2}>
                </Col>
                <Col sm={8}>
                  <FormControl bsSize={'lg'} type="text" placeholder="Search" />
                </Col>
                <Col sm={2}>
                </Col>
              </Form>
            </div>
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
                              playlist={s.playlistName}
                              playlist_id={s.playlist_id}
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
    } else {
      let info = this.state.artist_info;
      let artistName = info[0].Name;
      let description = info[0].Description;
      let albums = info[0].Albums;
      let ar_id = info[0].artist_id;
      return(
        <div className="Viewer_Container">
        <Grid fluid={true}>
          <Row>
            <div className="SearchBar">
              <Form horizontal>
                <Col sm={2}>
                </Col>
                <Col sm={8}>
                  <FormControl bsSize={'lg'} type="text" placeholder="Search" />
                </Col>
                <Col sm={2}>
                </Col>
              </Form>
            </div>
          </Row>
          <Row>
            <div className='Viewer_Queue'>
              <Viewer_Artist_Container
                artist_name={artistName}
                artist_description={description}
                album_covers={albums}
                ar_id={ar_id}
              />
            </div>
          </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default Viewer_Container;
