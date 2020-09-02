import React, { Component } from "react";

export default class Price extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <h1>Price: {this.props.price}</h1> 
    );
  }
}
