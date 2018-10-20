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
            <div className='landing-page-text'>
            <h1 className='landing-page-title'>New Website</h1>
            <p className='landing-page-subtitle'>Site is currently under construction.  Please come back later for additional information.</p>
            </div>
            <div className='contact-button-container'><Button>Contact Us</Button></div>
      </div>
    );
  }
}

export default HomePage;