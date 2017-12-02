import React, { Component } from 'react';
import BeSocial_Friend_Item from './BeSocial_Friend_Item';
import '../assets/main.css';
import { Grid, Button, Row, Col, Panel, Table, thead,tbody, Form, FormControl } from 'react-bootstrap';


class BeSocial_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
    this.sendUp = this.sendUp.bind(this);
  }

  sendUp(friend_id) {
    this.props.getFriendPlaylist(friend_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data != nextProps.data) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  componentWillMount(){
    let data = this.props.data;
    this.setState({ data });
  }
  render() {
    return (
      <div className="BeSocial_Container">
          <Button onClick={this.props.logout}>Log Out</Button>
          <h3></h3>
          <h3>Friends</h3>
          <hr></hr>
          <div>
            {this.state.data.map(function(d, i){
              return (<BeSocial_Friend_Item
                      key={i}
                      friend_key={d['us_id']}
                      name={d['username']}
                      onFriendClick={this.sendUp}
              />
          )
            }.bind(this))}
          </div>
      </div>
    );
  }
}

export default BeSocial_Container;
