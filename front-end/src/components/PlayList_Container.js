import React, { Component } from 'react';
import PlaylistItem_Component from './PlaylistItem_Component';


class PlayList_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: undefined,
      name: undefined
    };
  }

  componentWillMount(){
    let data = this.props.data;
    let name = this.props.name;
    console.log(data);
    this.setState({
      playlists: data,
      name: name
    });
  }

  render() {
    const data = this.props.data;
    return (
      <div className="PlayList_Container">
        <h3>Hello, {this.state.name}</h3>
        <p>Your Playlists</p>
        <div>
          {this.state.playlists.map(function(d, i){
            return (<PlaylistItem_Component key={i} name={d} />)
          })}
        </div>

      </div>
    );
  }
}

export default PlayList_Container;
