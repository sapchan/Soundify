import React, { Component } from 'react';
import { Grid, Button, Row, Col, Panel, tr, td } from 'react-bootstrap';

class Viewer_Queue_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: undefined,
      artist: undefined,
      duration: undefined,
      songID: undefined,
      artist_id: undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleArtistClick = this.handleArtistClick.bind(this);
  }

  componentWillMount(){
    let songName = this.props.song;
    let artist_id = this.props.artist_id;
    let artist = this.props.artist;
    let duration = this.props.duration;
    let songID = this.props.songID;
    this.setState({
      songName: songName,
      artist: artist,
      duration: duration,
      songID: songID,
      artist_id: artist_id
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.song !== nextProps.song ||
       this.props.artist !== nextProps.artist ||
       this.props.duration !== nextProps.duration ||
       this.props.songID !== nextProps.songID ||
       this.props.artist_id !== nextProps.artist_id)  {
      this.setState({
        songName: nextProps.song,
        artist: nextProps.artist,
        duration: nextProps.duration,
        songID: nextProps.songID,
        artist_id: nextProps.artist_id
      })
    }
  }

  handleClick(){
    this.props.callback(this.state.songID);
  }

  handleArtistClick() {
    this.props.onArtistClick(this.state.artist_id);
  }

  render() {
      return (
          <tr>
             <td>{this.state.songName}</td>
             <td><a onClick={this.handleArtistClick}>{this.state.artist}</a></td>
             <td>{this.state.duration}</td>
             <td><Button onClick={this.handleClick}>
               play
             </Button></td>
          </tr>
      );
    }

}

export default Viewer_Queue_Component;
