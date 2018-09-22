import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

class ExpiredLink extends Component {
	constructor(props) {
      super(props);
      this.state={
      }
    }

    componentDidMount=()=>{

    }




    render() {

      return ( 

          <div style={{height: "100vh", backgroundColor: "#EF1B36", color: "white"}}>
          
          <div className='login-page-home-link'><Link to='/' style={{color: 'white'}}><Icon disabled name='arrow left' />Back to Home</Link></div>
          
            <div  style={{position: "fixed", top: "25%", left: "15%"}}>
             
              <h1 style={{color: 'white', fontSize: "5rem"}}>Password Reset Link Expired.</h1>
              <p style={{fontSize: '1.5rem', color: '#1E1E1E', width: "70%"}}>Your password reset link has expired.  Please generate a new link by sending yourself a new email.</p>
             
             
              <Button style={{marginTop: "20px"}} href='/forgot-password'>Generate New Link</Button>
            
            </div>
          </div>
                
        )

    }

  }
  
  export default ExpiredLink;