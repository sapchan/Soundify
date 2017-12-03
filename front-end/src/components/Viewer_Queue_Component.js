import React, { Component } from 'react';
import { Grid, Button, Row, Col, Panel, Table, tr, td, Modal } from 'react-bootstrap';

class Viewer_Queue_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: undefined,
      artist: undefined,
      duration: undefined,
      songID: undefined,
      artist_id: undefined,
      modal: false,
      playlist: undefined
    };
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleArtistClick = this.handleArtistClick.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount(){
    let songName = this.props.song;
    let artist_id = this.props.artist_id;
    let artist = this.props.artist;
    let duration = this.props.duration;
    let songID = this.props.songID;
    let playlist = this.props.playlist;
    this.setState({
      songName: songName,
      artist: artist,
      duration: duration,
      songID: songID,
      artist_id: artist_id,
      playlist: playlist
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.song !== nextProps.song ||
       this.props.artist !== nextProps.artist ||
       this.props.duration !== nextProps.duration ||
       this.props.songID !== nextProps.songID ||
       this.props.artist_id !== nextProps.artist_id ||
       this.props.playlist !== nextProps.playlist
     )  {
      this.setState({
        songName: nextProps.song,
        artist: nextProps.artist,
        duration: nextProps.duration,
        songID: nextProps.songID,
        artist_id: nextProps.artist_id,
        playlist: nextProps.playlist
      })
    }
  }

  handleClickPlay(){
    this.props.callback(this.state.songID);
  }

  handleArtistClick() {
    this.props.onArtistClick(this.state.artist_id);
  }

  close() {
    this.setState({
      modal: false
    })
  }

  show() {
    this.setState({
      modal: true
    })
  }

  handleClickAdd(){
    this.show();
  }

  render() {
      return (
          <tr>
             <td>{this.state.songName}</td>
             <td><a onClick={this.handleArtistClick}>{this.state.artist}</a></td>
             <td>{this.state.duration}</td>
             <td><Button onClick={this.handleClickPlay}>
               play
             </Button>
             <Button onClick={this.handleClickAdd}>
               +
             </Button>
             </td>
             <div className="static-modal">
               <Modal show={this.state.modal} onHide={this.close}>
                 <Modal.Header closeButton>
                   Add {this.state.songName} to Playlist:
                 </Modal.Header>
                 <Modal.Body>
                   <Table striped={true} responsive={true}>
                     <thead>
                       <tr>
                         <th>PlayList Name</th>
                       </tr>
                     </thead>
                     <tbody>
                       {this.state.playlist.map(function(s,i) {
                         return(
                           <tr>
                              <td>{s.name}</td>
                              <td><Button onClick={function() {
                                  this.props.addSongToPlaylist(s.pl_id, this.state.songID)
                                }.bind(this)}>
                                +
                              </Button></td>
                           </tr>
                         )
                       }.bind(this))
                       }
                     </tbody>
                   </Table>
                 </Modal.Body>
                 <Modal.Footer>
                 <Button onClick={this.close}>Close</Button>
                 </Modal.Footer>
               </Modal>
             </div>
          </tr>
      );
    }

}

export default Viewer_Queue_Component;
