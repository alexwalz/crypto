import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import axios from 'axios'

class ResetPassword extends Component {
	constructor(props) {
      super(props);
      this.state={
            passwordHash: '',
            password: '',
            confirmPassword: '',
            error: false,
            success: false,
            matchError: false
      }
    }

    componentDidMount=()=>{
        this.setState({passwordHash: this.props.match.params.id}, function(){
          axios.get('/api/users/verify-hash/'+this.state.passwordHash).then(function(response){
            if(!response.data.success){
              window.location = '/expired-link'
            }
          })
        })
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
      currentComponent.setState({matchError: false, error: false})

      if(this.state.password === this.state.confirmPassword){

        axios.post('/api/users/password-reset/'+this.state.passwordHash, {password: this.state.password}).then(function(response){
          
          console.log(response)
          if(response.data.success){
            window.location = '/login'
          }else{

          }

        }).catch(function(error){

          console.log(error)
          currentComponent.setState({error: true})

        })

      }else{

        currentComponent.setState({matchError: true})

      }


    }

    errorMessage = () => {
      return(
          <Message negative style={{width: "70%", margin: "20px 0 20px 0"}}>
          <Message.Header>Error Resetting Password</Message.Header>
              <p>Well... Looks like something is wrong on our end.  Please contact us if you continue to get this error.</p>
          </Message>
      )
  }

  passwordsMatchError = () => {
    return(
        <Message negative style={{width: "70%", margin: "20px 0 20px 0"}}>
        <Message.Header>Passwords don't match</Message.Header>
            <p>This isn't a great start...  Go ahead and try again.</p>
        </Message>
    )
}

  successMessage = () => {
    return(
        <Message positive style={{width: "70%", margin: "20px 0 20px 0"}}>
        <Message.Header>Password Reset Successfully</Message.Header>
            <p>We did what we needed to do on our end.  Don't make us do it again.</p>
        </Message>
    )
}


    render() {

      return ( 

          <div style={{height: "100vh", backgroundColor: "#EF1B36", color: "white"}}>
          
          <div className='login-page-home-link'><Link to='/' style={{color: 'white'}}><Icon disabled name='arrow left' />Back to Home</Link></div>
          
            <div  style={{position: "fixed", top: "25%", left: "15%"}}>
             
              <h1 style={{color: 'white', fontSize: "5rem"}}>Hey! Time to Reset your Password!</h1>
              <p style={{fontSize: '1.5rem', color: '#1E1E1E', width: "70%"}}>Go ahead and enter in your new password below.  Try not to forget it this time.</p>
             
              {this.state.error ? this.errorMessage() : null}
              {this.state.matchError ? this.passwordsMatchError() : null}
              {this.state.success ? this.successMessage() : null}
             
              <Form style={{width: "50%"}}>
              <Form.Field>
                <label>Password</label>
                <input placeholder='**********' type='password' name='password' onChange={this.handleInputChange}/>
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input placeholder='**********' type='password' name='confirmPassword' onChange={this.handleInputChange}/>
              </Form.Field>
              </Form>
             
              <Button style={{marginTop: "20px"}} onClick={this.submit}>Reset</Button>
            
            </div>
          </div>
                
        )

    }

  }
  
  export default ResetPassword;