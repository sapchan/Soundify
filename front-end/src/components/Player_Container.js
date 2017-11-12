import React, { Component } from 'react';
import axios from 'axios';


class Player_Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Player_Container">
        {this.props.data.queue}
      </div>
    );
  }
}

export default Player_Container;
