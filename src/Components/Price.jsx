import React, { Component } from "react";

export default class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.price,
      currency: 'dollars'
    };
  }

  handleChangeCurrency = () => {
    let {value, currency} = this.state;
    if(currency === 'dollars'){
      value = value*478;
      currency = 'dram';
    }
    else{
      value = value/478;
      currency = 'dollars';
    };

    this.setState({
      value,
      currency
    });
  }
  render() {
    return(
        <div>
          <h1>Price: {this.state.value}<span>{this.state.currency==='dollars'? '$' : 'dram'}</span></h1> 
          <button onClick={this.handleChangeCurrency}>Change the currency</button>
        </div>
    );
  }
}
