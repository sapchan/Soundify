import React, { Component } from 'react';
import '../assets/main.css'
import { Grid, Button, Row, Col, Panel, Table, thead,tbody, FormControl } from 'react-bootstrap';

class Search_Bar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.searching = this.searching.bind(this);
  }

  searching(evt) {
    let searchValue = evt.target.value;
    this.setState({
      searchValue: searchValue
    })
    this.props.getText(searchValue);
  }

  render() {
    return (
      <div className="SearchBar">
        <Col sm={2}>
        </Col>
        <Col sm={8}>
          <FormControl type="text" value={this.state.searchValue} onChange={this.searching} />
        </Col>
        <Col sm={2}>
        </Col>
      </div>
    )
  }

}

export default Search_Bar;
