import React, { Component } from 'react';

class BeSocial_Friend_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      friend_key: undefined
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    let name = this.props.name;
    let friend_key = this.props.friend_key;
    this.setState({
      name: name,
      friend_key: friend_key
    });
  }

  handleClick(){
    this.props.onFriendClick(this.state.friend_key);
  }

  render() {
    return (
      <div className="friend">
        <a onClick={this.handleClick} >{this.props.name}</a>
        <hr></hr>
      </div>
    );
  }

}

export default BeSocial_Friend_Item;
