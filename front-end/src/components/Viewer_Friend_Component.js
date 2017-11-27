import React, { Component } from 'react';
import { Grid, Button, Row, Col, Panel, tr, td } from 'react-bootstrap';

class Viewer_Friend_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: undefined,
      playlist_id: undefined
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount(){
    let playlist = this.props.playlist;
    let playlist_id = this.props.playlist_id;
    this.setState({
      playlist: playlist,
      playlist_id: playlist_id
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.playlist !== nextProps.playlist ||
       this.props.playlist_id !== nextProps.playlist_id)  {
      this.setState({
        playlist: nextProps.playlist,
        playlist_id: nextProps.playlist_id
      })
    }
  }

  handleClick(){
    this.props.sendUp(this.state.playlist_id);
  }

  render() {
      return (
          <tr>
             <td>{this.state.playlist}</td>
             <td><Button onClick={this.handleClick}>
               View
             </Button></td>
          </tr>
      );
    }

}

export default Viewer_Friend_Component;
