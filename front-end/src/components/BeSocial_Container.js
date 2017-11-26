import React, { Component } from 'react';
import BeSocial_Friend_Item from './BeSocial_Friend_Item';

class BeSocial_Container extends Component {
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
      <div className="BeSocial_Container">
        <h3>Friends</h3>
        <div>
          {this.state.data.map(function(d, i){
            return (<BeSocial_Friend_Item key={d['friend_id']} name={d['friend_name']} />)
          })}
        </div>
      </div>
    );
  }
}

export default BeSocial_Container;
