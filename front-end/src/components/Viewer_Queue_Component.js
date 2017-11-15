import React, { Component } from 'react';
import { Grid, Button, Row, Col, Panel } from 'react-bootstrap';

class Viewer_Queue_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: undefined,
      artist: undefined,
      createDate: undefined
    };
  }

  componentWillMount(){
    let songName = this.props.song;
    let artist = this.props.artist;
    let date = this.props.createDate;
    this.setState({
      songName: songName,
      artist: artist,
      createDate: date
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.song != nextProps.song || this.props.artist != nextProps.artist ||
       this.props.createDate != nextProps.createDate)  {
      this.setState({
        songName: nextProps.song,
        artist: nextProps.artist,
        createDate: nextProps.createDate
      })
    }
  }

  render() {
    return (
      <div className="playlist_item">
            <Col md={4}>
              {this.state.songName}
            </Col>
            <Col md={4}>
              {this.state.artist}
            </Col>
            <Col md={4}>
              {this.state.createDate}
            </Col>
      </div>
    );
  }

}

export default Viewer_Queue_Component;
