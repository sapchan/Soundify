import React, { Component } from 'react';
import axios from 'axios';


class BeSocial_Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BeSocial_Container">
        {this.props.data.friends}
      </div>
    );
  }
}

export default BeSocial_Container;
