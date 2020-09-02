import React, { Component } from "react";

export default class Description extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <h1>Description: {this.props.description}</h1> 
    );
  }
}
