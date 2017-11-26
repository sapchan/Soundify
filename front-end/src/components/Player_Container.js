import React, { Component } from 'react';


class Player_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: 0
    };
  }

  componentWillMount(){
    let songId = this.props.songId;
    this.setState({
      songId: songId
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.songId !== nextProps.songId)  {
      this.setState({
        songId: nextProps.songId
      })
    }
  }

  render() {
    return (
      <div className="Player_Container">
        <p>Your current song: {this.state.songId}</p>
      </div>
    );
  }
}

export default Player_Container;
