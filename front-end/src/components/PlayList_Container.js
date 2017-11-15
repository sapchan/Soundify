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
    this.props.get_event(playlist_key);
  }

  render() {
    const data = this.props.data;
    return (
      <div className="PlayList_Container">
        <h3>Hello, {this.state.name}</h3>
        <p>Your Playlists</p>
        <div>
          {this.state.playlists.map(function(d, i){
            return (<PlaylistItem_Component 
              key={i} 
              data={d}
              onPlayListClick={this.send_PlayList_id_Up}
              />)
          }.bind(this))}
        </div>

      </div>
    );
  }
}

export default PlayList_Container;
