import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';
import { Grid, Button, Row, Col, Panel } from 'react-bootstrap';

class Viewer_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentWillMount(){
    let data = this.props.data;
    this.setState({ data });
  }

  render() {
    return (
      <div className="Viewer_Container">
        <p>Your Queue: </p>
          <div>
            {this.state.data.map(function(d, i){
              console.log(d[0]);
              return (<Viewer_Queue_Component key={i} song={d[0]} artist={d[1]} createDate={d[2]} />)
            })}
          </div>
      </div>
    );
  }
}

export default Viewer_Container;
