import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

class ConfirmPage extends Component {

    constructor(props) {

        super(props);
    
        this.state = {
            message: ''
        };
    
    }


    componentDidMount(props){

        let hash = this.props.match.params.id
        let currentComponent = this

        axios.get('/api/confirm/'+hash).then(function(response){
            console.log(response)
            if(response.data.confirm){
                currentComponent.setState({message: 'Your Email has been verified.  You are now able to login!'})
            }
        })

    }

  render() {
    return (
      <div className="not-found-page" style={{height: "100vh", backgroundColor: "#EF1B36", color: "white"}}>
        <div className='not-found-page-content' style={{position: "fixed", top: "25%", left: "25%"}}>
          <h1 style={{color: 'white', fontSize: "5rem"}}>Thank You!</h1>
          <p style={{fontSize: '1.5rem', color: '#1E1E1E'}}>{this.state.message}</p>
          <Link to='/login'><Button>Login</Button></Link>
        </div>
      </div>
    );
  }
}

export default ConfirmPage;