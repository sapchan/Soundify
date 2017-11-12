import React, { Component } from 'react';

class BeSocial_Friend_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentWillMount(){
    let data = this.props.name;
    this.setState({ data });
  }

  render() {
    return (
      <div className="friend">
        {this.props.name}
      </div>
    );
  }

}

export default BeSocial_Friend_Item;
