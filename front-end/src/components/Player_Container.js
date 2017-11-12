import React, { Component } from 'react';


class Player_Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Player_Container">
        <p>Your current song: {this.props.data}</p>
      </div>
    );
  }
}

export default Player_Container;
