import React, { Component } from 'react';
import axios from 'axios';

class PlaylistItem_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }
  render() {
    return (
      <div className="playlist_item">
        {this.props.data}
      </div>
    );
  }

}

export default PlaylistItem_Component;
