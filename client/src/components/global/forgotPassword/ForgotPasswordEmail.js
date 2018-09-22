import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'

class ForgotPasswordEmail extends Component {
	constructor(props) {
      super(props);
      this.state={
            username: '',
            error: false,
            success: false,
            disabled: false
      }
    }

    componentDidMount=()=>{

    }

    handleInputChange = (event) => {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({
        [name]: value
          });
      }

    submit=()=>{
      let currentComponent = this
      currentComponent.setState({error: false, success: false, disabled: true})
      axios.post('api/users/forgot-password', {username: this.state.username}).then(function(response){
        
        if(response.data.success){
          currentComponent.setState({success: true})
        }else{
          currentComponent.setState({success: false, error: true, disabled: false})
        }

      }).catch(function(error){
        currentComponent.setState({success: false, error: true, disabled: false})
      })
    }

    errorMessage = () => {
      return(
          <Message negative style={{width: "70%", margin: "20px 0 20px 0"}}>
          <Message.Header>Error Finding User</Message.Header>
              <p>We were unable to find a profile with the username that you supplied.</p>
          </Message>
      )
  }

  successMessage = () => {
    return(
        <Message positive style={{width: "70%", margin: "20px 0 20px 0"}}>
        <Message.Header>Email Sent!</Message.Header>
            <p>We sent you an email with password reset instructions.  If you do not see this email, please be sure to check your spam!</p>
        </Message>
    )
}


    render() {

      return ( 

          <div style={{height: "100vh", backgroundColor: "#EF1B36", color: "white"}}>
          
          <div className='login-page-home-link'><Link to='/' style={{color: 'white'}}><Icon disabled name='arrow left' />Back to Home</Link></div>
          
            <div  style={{position: "fixed", top: "25%", left: "15%"}}>
             
              <h1 style={{color: 'white', fontSize: "5rem"}}>Did You Forget Your Password?</h1>
              <p style={{fontSize: '1.5rem', color: '#1E1E1E', width: "70%"}}>Thats ok... We can help out.  Please enter your username below and we'll email you a password reset.  If you forgot that too, then you're out of luck.</p>
             
              {this.state.error ? this.errorMessage() : null}
              {this.state.success ? this.successMessage() : null}
             
              <Form style={{width: "50%"}}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='username' name='username' onChange={this.handleInputChange}/>
              </Form.Field>
              </Form>
             
              <Button disabled={this.state.disabled} style={{marginTop: "20px"}} onClick={this.submit}>Email Me</Button>
            
            </div>
          </div>
                
        )

    }

  }
  
  export default ForgotPasswordEmail;