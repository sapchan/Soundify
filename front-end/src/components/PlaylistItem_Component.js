import React, { Component } from 'react';

class PlaylistItem_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentWillMount(){
    let data = this.props.name;
    this.setState({ data });
  }

  render() {
    return (
      <div className="playlist_item">
        {this.props.name}
      </div>
    );
  }

}

export default PlaylistItem_Component;
