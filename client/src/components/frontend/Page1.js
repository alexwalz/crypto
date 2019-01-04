import React, { Component } from 'react';
import './styles.css'
import NameContainer from './NameContainer'
import Sidebar from './Sidebar'


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
}


  render() {
    return (
      <div className="landing-page">
          <NameContainer/>
          <Sidebar/>
      </div>
    );
  }
}

export default HomePage;