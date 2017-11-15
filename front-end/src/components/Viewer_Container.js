import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';
import { Grid, Button, Row, Col, Panel } from 'react-bootstrap';

class Viewer_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      playerView: true
    };
  }

  componentWillMount(){
    let data = this.props.data;
    let view = this.props.playerView;
    this.setState({ 
      data: data,
      playerView: view
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

  render() {
    return (
      <div className="Viewer_Container">
        <p>Your Queue: </p>
          <div>
            {this.state.data.map(function(d, i){
              return (<Viewer_Queue_Component key={i} song={d[0]} artist={d[1]} createDate={d[2]} />)
            })}
          </div>
      </div>
    );
  }
}

export default Viewer_Container;
