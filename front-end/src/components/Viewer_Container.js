import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';
import { Grid, Button, Row, Col, Panel, Table, thead,tbody, Form, FormControl } from 'react-bootstrap';

class Viewer_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      playerView: true,
      friendView: false
    };
    this.updateCurrentSong = this.updateCurrentSong.bind(this);
  }

  componentWillMount(){
    let data = this.props.data;
    let queueView = this.props.playerView;
    let friendView = this.props.friendView;
    this.setState({
      data: data,
      playerView: queueView,
      friendView: friendView
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data != nextProps.data) {
      this.setState({
        data: nextProps.data,
        playerView: nextProps.playerView
      })
    }
  }

  updateCurrentSong(song_id){
    this.props.update(song_id)
  }

  render() {
    return (
      <div className="Viewer_Container">
      <Grid fluid={true}>
        <Row>
          <div className="SearchBar">
            <Form horizontal>
              <Col sm={2}>
              </Col>
              <Col sm={8}>
                <FormControl bsSize={'lg'} type="text" placeholder="Search" />
              </Col>
              <Col sm={2}>
              </Col>
            </Form>
          </div>
        </Row>
        <Row>
          <div className='Viewer_Queue'>
            <Table striped={true} responsive={true}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Duration</th>
                  <th>Play</th>
                </tr>
              </thead>
              <tbody>
              {this.state.data.map(function(s, i)
                {
                  let duration = s.duration;
                  let min = Math.floor(duration/60);
                  let seconds = duration % 60;
                  let time = min + ":" + seconds;
                  return (<Viewer_Queue_Component
                            key={i}
                            songID={s.song_key}
                            song={s.title}
                            artist={s.artist}
                            duration={time}
                            callback={this.updateCurrentSong}
                          />);
                }.bind(this)
              )}
              </tbody>
            </Table>
          </div>
        </Row>
        </Grid>
      </div>
    );
  }
}

export default Viewer_Container;
