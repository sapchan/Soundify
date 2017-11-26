import React, { Component } from 'react';
import { Grid, Button, Row, Col, Panel, tr, td } from 'react-bootstrap';

class Viewer_Queue_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: undefined,
      artist: undefined,
      duration: undefined,
      songID: undefined
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount(){
    let songName = this.props.song;
    let artist = this.props.artist;
    let duration = this.props.duration;
    let songID = this.props.songID;
    this.setState({
      songName: songName,
      artist: artist,
      duration: duration,
      songID: songID
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.song !== nextProps.song ||
       this.props.artist !== nextProps.artist ||
       this.props.duration !== nextProps.duration ||
       this.props.songID !== nextProps.songID)  {
      this.setState({
        songName: nextProps.song,
        artist: nextProps.artist,
        duration: nextProps.duration,
        songID: nextProps.songID
      })
    }
  }

  handleClick(){
    this.props.callback(this.state.songID);
  }

  render() {
      return (
          <tr>
             <td>{this.state.songID}</td>
             <td>{this.state.songName}</td>
             <td>{this.state.artist} </td>
             <td>{this.state.duration}</td>
             <td><Button onClick={this.handleClick}>
               play
             </Button></td>
          </tr>
      );
    }

}

export default Viewer_Queue_Component;
