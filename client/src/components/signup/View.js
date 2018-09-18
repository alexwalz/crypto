/* eslint-disable no-undef */
import { Button, Form, Icon, Message, Loader } from 'semantic-ui-react'
import React, { Component} from 'react'
import './styles.css'
import axios from 'axios'



class LoginForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            role: "customer",
            username: "",
            password: "",
            error: false,
            errorMessage: "",
            submitting: false
		}
    }

    componentDidMount=()=>{
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.get('/api/users/authenticate').then(function(response){
          window.location='/profile'
        }).catch(function(err){
          console.log(err)
        })
    }

    errorMessage = () => {
        return(
           <Message negative>
           <Message.Header>Error Creating Account</Message.Header>
               <p>{this.state.errorMessage}</p>
           </Message>
        )
   }

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }

    handleSubmit=(e)=>{

        e.preventDefault()

        this.setState({
            submitting: true
        }, function(){
            console.log(this.state)
        })

        axios.post('api/auth/signup', this.state)
        .then((result) => {

            if(result.data.success){
                this.props.history.push('/login')
            }else{
                this.setState({error: true, errorMessage: result.data.msg, submitting: false})
            }
            
          })
          .catch((error) => {
            console.log(error)
          });

    }


    render() {

      return ( 
            <div className='signup-page-container'>

                <div className='signup-form-container'>

                    <div className='signup-page-home-link'><a href='/'><Icon disabled name='arrow left' />Back to Home</a></div>

                    <h1 style={{color: "white", fontSize: "2rem", textAlign: "center", padding: "5%"}}>New Account Creation</h1>

                    {this.state.error ? this.errorMessage() : null}

                    <Form style={{marginLeft: "auto", marginRight: "auto"}}>

                        <Form.Group inline>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>First Name</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='John' name='firstName'/>
                            </Form.Field>
                            
                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Last Name</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='Doe' name='lastName'/>
                            </Form.Field>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Phone Number</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='Doe' name='phoneNumber' />
                            </Form.Field>

                        </Form.Group>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Email</label>
                                <input onChange={this.handleInputChange} placeholder='email@noreply.com' name='email' style={{width: "559px"}}/>
                            </Form.Field>


                        <Form.Field>
                            <label style={{color: "#FB3668"}}>Address</label>
                            <input onChange={this.handleInputChange} placeholder='1234 Beck Street' name='address' style={{width: "559px"}}/>
                        </Form.Field>

                        <Form.Group inline>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>City</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='Salt Lake City'  name='city' />
                            </Form.Field>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>State</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='Utah' name='state' />
                            </Form.Field>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Zip Code</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='84105' name='zip' />
                            </Form.Field>

                        </Form.Group>

                        <Form.Group inline>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Username</label>
                                <br/>
                                <input onChange={this.handleInputChange} placeholder='my_username'  name='username' />
                            </Form.Field>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Password</label>
                                <input onChange={this.handleInputChange} placeholder='*********' type='password' name='password'/>
                            </Form.Field>

                            <Form.Field>
                                <label style={{color: "#FB3668"}}>Confirm Password</label>
                                <input onChange={this.handleInputChange} placeholder='*********' type='password' name='confirmPassword'/>
                            </Form.Field>

                        </Form.Group>

                        {this.state.submitting ? 
                            <Button disabled={true} onClick={this.handleSubmit} type='submit' style={{backgroundColor: "#FB3668", color: "white", width: "100%", marginTop: "20px"}}><Loader size='big' inverted active />Creating Account</Button> 
                            :
                            <Button onClick={this.handleSubmit} type='submit' style={{backgroundColor: "#FB3668", color: "white", width: "100%", marginTop: "20px"}}>Create Account</Button>
                        }

                        <br/>
                        <p style={{color: "white", marginTop: "30px"}}>Already have an account? <a href='/login' style={{color: "#FB3668", paddingLeft: "9px"}}> Login Here</a></p>
                    </Form>
                </div>
            </div>
                
        )
    }
  }
  
  export default LoginForm;