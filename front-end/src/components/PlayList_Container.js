import React, { Component } from 'react';
import PlaylistItem_Component from './PlaylistItem_Component';
import { Grid, Button, Row, Col, Panel } from 'react-bootstrap';

class PlayList_Container extends Component {
  constructor(props) {
    super(props);
    this.send_PlayList_id_Up = this.send_PlayList_id_Up.bind(this);
    this.state = {
      playlists: undefined,
      name: undefined
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    let data = this.props.data;
    let name = this.props.name;
    this.setState({
      playlists: data,
      name: name
    });
  }

  send_PlayList_id_Up(playlist_key){
    this.props.callback(playlist_key);
  }

  handleClick() {
    this.props.getQueue();
  }

  render() {
    const data = this.props.data;
    return (
      <div className="PlayList_Container">
        <h3>Hello, {this.props.name}</h3>
        <hr></hr>
        <a onClick={this.handleClick} className="playlist_item"><h4>Queue</h4></a>
        <hr></hr>
        <h4>Your Playlists</h4>
        <div>
          {this.state.playlists.map(function(d, i){
            return (<PlaylistItem_Component
              playlistId={d['playlist_id']}
              playListName = {d['playlistName']}
              onPlayListClick={this.send_PlayList_id_Up}
              />)
          }.bind(this))}

        </div>

      </div>
    );
  }
}

export default PlayList_Container;
