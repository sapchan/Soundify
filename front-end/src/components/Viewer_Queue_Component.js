import React, { Component } from 'react';

class Viewer_Queue_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: undefined
    };
  }

  componentWillMount(){
    let data = this.props.song;
    console.log(data);
    this.setState({
      song: data
    });
  }

  render() {
    return (
      <div className="playlist_item">
        {this.state.song}
      </div>
    );
  }

}

export default Viewer_Queue_Component;
