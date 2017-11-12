import React, { Component } from 'react';
import Viewer_Queue_Component from './Viewer_Queue_Component';


class Viewer_Container extends Component {
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
    return (
      <div className="Viewer_Container">
        <p>Your Queue: </p>
          <div>
            {this.state.data.map(function(d, i){
              return (<Viewer_Queue_Component key={i} song={d} />)
            })}
          </div>
      </div>
    );
  }
}

export default Viewer_Container;
