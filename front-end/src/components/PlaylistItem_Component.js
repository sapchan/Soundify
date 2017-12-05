import React, { Component } from 'react';
import PlayList_Container from './PlayList_Container';
import '../assets/main.css';
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
    const deleteStyle = {
      color: 'red'
    }
    return (
        <Row>
          <Col md={10}>
              <a onClick={this.handleClick}>{this.state.title}</a>
          </Col>
          <Col md={2}>
              <a onClick={() => { this.props.delete(this.state.key) }} ><span style={deleteStyle}>x</span></a>
          </Col>
        </Row>
    );
  }

}

export default PlaylistItem_Component;
