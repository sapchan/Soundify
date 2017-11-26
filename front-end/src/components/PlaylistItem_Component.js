import React, { Component } from 'react';
import PlayList_Container from './PlayList_Container';
import { Grid, Button, Row, Col, Panel, Button as btn } from 'react-bootstrap';

class PlaylistItem_Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      key: undefined
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    let name = this.props.playListName;
    let playlistId = this.props.playlistId;
    this.setState({
    title: name,
    key: playlistId
     });
  }

  handleClick() {
    this.props.onPlayListClick(this.state.key);
  }

  render() {
    return (
      <Grid>
        <Row>
          <a onClick={this.handleClick} className="playlist_item">
            {this.state.title}
          </a>
        </Row>
      </Grid>
    );
  }

}

export default PlaylistItem_Component;
