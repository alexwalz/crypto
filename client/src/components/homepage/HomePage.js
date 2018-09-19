import React, { Component } from 'react';
import axios from 'axios'
import Navbar from '../global/navigation/View'
import LandingPage from './LandingPage'


class HomePage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      update: false,
      authenticated: false
    };

}


  componentDidMount=()=>{

    var currentComponent = this

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get('/api/users/authenticate').then(function(response){
      currentComponent.setState({authUser: response.data.authenticatedUser, update: true, authenticated: true})
    }).catch(function(err){
      console.log(err)

    })
  }


  render() {
    return (
      <div className="App">
        <Navbar/>
        <LandingPage/>
      </div>
    );
  }
}

export default HomePage;
