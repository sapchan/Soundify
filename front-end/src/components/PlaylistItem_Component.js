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
    let data = this.props.data;
    this.setState({ 
    title: data[0],
    key: data[1]
     });
  }
  
  handleClick() {
    this.props.onPlayListClick(this.state.key);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Button onClick={this.handleClick} className="playlist_item">
            {this.state.title}
          </Button>
        </Row>
      </Grid>
    );
  }

}

export default PlaylistItem_Component;
