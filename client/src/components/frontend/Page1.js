import React, { Component } from 'react';
import './styles.css'
import {Button} from 'semantic-ui-react'


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
}


  render() {
    return (
      <div className="landing-page">
          <div style={{paddingLeft: "5%"}}>
            <h1 className='landing-page-title title'>CryptoMe</h1>
            <h2 className='landing-page-subtitle sub-title'>A Directory for all your Crypto-Currency Needs</h2>
            <Button.Group floated='left' style={{paddingLeft: "11.5%", paddingTop: "1%"}}>
              <Button inverted color='teal'>Search</Button>
              <Button.Or />
              <Button inverted color='teal'>Info</Button>
            </Button.Group>
          </div>
      </div>
    );
  }
}

export default HomePage;