import React, { Component } from 'react';
import PlaylistItem_Component from './PlaylistItem_Component';


class PlayList_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentWillMount(){
    let data = this.props.data;
    console.log(data);
    this.setState({ data });
  }

  render() {
    const data = this.props.data;
    return (
      <div className="PlayList_Container">
        <p>Your Playlists</p>
        <div>
          {this.state.data.map(function(d, i){
            return (<PlaylistItem_Component key={i} name={d} />)
          })}
        </div>

      </div>
    );
  }
}

export default PlayList_Container;
