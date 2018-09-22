import React, {Component} from 'react'
import { Icon, Header, Grid, Button, Form, Message } from 'semantic-ui-react'
import './styles.css'
import axios from 'axios'
import UserServiceHistory from './UserServiceHistory'
import UserVehicles from '../vehicles/View'

class UserProfile extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            edit: false,
            error: false,
            passwordErrorMessage: '',
            passwordError: false,
            changePassword: false
        }
    }

    componentDidMount=()=>{
        var currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){
            currentComponent.setState({authUser: response.data.authenticatedUser, update: true})
        }).catch(function(err){
            console.log(err)
        })
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState((prevState, props) => ({
            authUser: {
                ...prevState.authUser,
                [name]: value,
            },
        }));
    }

    handleSubmit=()=>{
        let  currentComponent = this

        axios.put('/api/users/'+this.state.authUser.id, this.state.authUser).then(function(response){

            if(response.status === 200){
                currentComponent.setState({edit: false, error: false})
            }else{
                currentComponent.setState({error: true})
            }
        }).catch(function(error){
            currentComponent.setState({error: true})
        })
    }


    profileEdit=()=>{
        if(this.state.edit){
            this.setState({edit: false})
        }else{
            this.setState({edit: true})
        }
    }


    errorMessage = () => {
        return(
            <Message negative>
            <Message.Header>Error Updating Profile</Message.Header>
                <p>We were not able to update your profile.  Please try again.</p>
                <p>If you are still having issues, please contact our team to let us know.</p>
            </Message>
        )
    }

    passwordErrorMessage = () => {
        return(
        <Message negative>
        <Message.Header>Error Updating Password</Message.Header>
            <p>{this.state.passwordErrorMessage}</p>
        </Message>
        )
    }

    validatePassword=(event)=>{

        const value = event.target.value;
        const name = event.target.name;
        this.setState((prevState, props) => ({
                ...prevState,
                [name]: value,
        }));
    }

    submitPasswordChange=()=>{
        let currentComponent = this

        if(this.state.password === this.state.confirmPassword){
            axios.put('/api/users/password/'+this.state.authUser.id, {password: this.state.password}).then(function(response){
                console.log(response)
                if(response.data.success){
                    currentComponent.setState({changePassword: false, passwordError: false, passwordErrorMessage: ''})
                }else{
                    currentComponent.setState({passwordError: true, passwordErrorMessage: 'Unable to update password.  Please contact our team if you continue to run into issues'})
                }
            })
        }else{
            this.setState({passwordError: true, passwordDisabled: true, passwordErrorMessage: 'Passwords do not match.  Please update and try again.'})
        }
    }

    changePasswordBoolean=()=>{
        this.setState({changePassword: true})
    }

    changePassword=()=>{
        return(
            <div>
                {this.state.passwordError ? this.passwordErrorMessage() : null}
                        <div>
                            <Form>
                                <Form.Field>
                                <label>New Password</label>
                                <input placeholder='**********' type='password' name='password' onChange={this.validatePassword}/>
                                </Form.Field>
                                <Form.Field>
                                <label>Confirm Password</label>
                                <input placeholder='**********' type='password' name='confirmPassword' onChange={this.validatePassword}/>
                                </Form.Field>
                            </Form>
                        </div>
                        <Button style={{marginTop: "25px"}} onClick={this.submitPasswordChange}>Change Password</Button>
            </div>
        )
    }

    returnData=()=>{
        return(
            <div>
                    <div>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='user' circular style={{color: "#EF1B36"}}/>
                            <Header.Content>{this.state.authUser.firstName + ' ' + this.state.authUser.lastName}</Header.Content>
                            {this.state.authUser.captainsClub ? <Header.Content style={{color: "#EF1B36"}}>Captains Club Member</Header.Content> : null}
                            <Button onClick={this.profileEdit} style={{marginTop: "10px"}}>Edit Profile</Button>
                            <Button onClick={this.changePasswordBoolean} style={{marginTop: "10px"}}>Change Password</Button>
                        </Header>

                        {this.state.changePassword ? this.changePassword() : null}

                        <Grid columns={3} centered divided style={{marginTop: "60px"}}>
                            <Grid.Row> 

                                <Grid.Column>
                                    <Header as='h2'>
                                        <Icon name='building' />
                                        <Header.Content>
                                            Address
                                        <Header.Subheader>{this.state.authUser.address}</Header.Subheader>
                                        <Header.Subheader>{this.state.authUser.city + ' ' + this.state.authUser.state + ', ' + this.state.authUser.zip }</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>

                                <Grid.Column >
                                    <Header as='h2'>
                                        <Icon name='phone' />
                                        <Header.Content>
                                            Phone Number
                                        <Header.Subheader>{this.state.authUser.phoneNumber}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>

                                <Grid.Column>
                                    <Header as='h2'>
                                        <Icon name='mail' />
                                        <Header.Content>
                                            Email
                                        <Header.Subheader>{this.state.authUser.email}</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                    <div style={{marginTop: "80px"}}>
                        <UserServiceHistory/>
                    </div>

                    <div style={{marginTop: "80px"}}>
                        <UserVehicles/>
                    </div>
                </div>
        )
    }
    
    returnForm=()=>{
        return(
            <div>
                    {this.state.error ? this.errorMessage() : null}

                        <Header as='h2' icon textAlign='center'>
                            <Icon name='user' circular style={{color: "#EF1B36"}}/>
                            <Header.Content>{this.state.authUser.firstName + ' ' + this.state.authUser.lastName}</Header.Content>
                            <Button onClick={this.handleSubmit} style={{marginTop: "20px", marginBottom: "60px", backgroundColor: "#EF1B36", color: "white"}}>Save Profile</Button>
                            <Form>
                                <Form.Field>
                                <label>First Name</label>
                                <input placeholder={this.state.authUser.firstName} name='firstName' onChange={this.handleInputChange}/>
                                </Form.Field>
                                <Form.Field>
                                <label>Last Name</label>
                                <input placeholder={this.state.authUser.lastName} name='lastName' onChange={this.handleInputChange}/>
                                </Form.Field>
                            </Form>
                            
                        </Header>

                        <Grid columns={3} centered divided style={{marginTop: "60px"}}>
                            <Grid.Row> 

                                <Grid.Column>
                                    <Header as='h2'>
                                        <Icon name='building' />
                                        <Header.Content>
                                            Address
                                        <Header.Subheader>
                                        <Form>
                                            <Form.Field>
                                            <label>Address</label>
                                            <input placeholder={this.state.authUser.address} name='address' onChange={this.handleInputChange}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>City</label>
                                            <input placeholder={this.state.authUser.city} name='city' onChange={this.handleInputChange}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>State</label>
                                            <input placeholder={this.state.authUser.state} name='state' onChange={this.handleInputChange}/>
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Zip Code</label>
                                            <input placeholder={this.state.authUser.zip} name='zip' onChange={this.handleInputChange}/>
                                            </Form.Field>

                                        </Form>
                                        </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>

                                <Grid.Column >
                                    <Header as='h2'>
                                        <Icon name='phone' />
                                        <Header.Content>
                                            Phone Number
                                        <Header.Subheader>

                                            <Form>
                                                <Form.Field>
                                                    <label>Phone Number</label>
                                                    <input placeholder={this.state.authUser.phoneNumber} name='phoneNumber' onChange={this.handleInputChange}/>
                                                </Form.Field>
                                            </Form>

                                        </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>

                                <Grid.Column>
                                    <Header as='h2'>
                                        <Icon name='mail' />
                                        <Header.Content>
                                            Email
                                        <Header.Subheader>

                                        <Form>
                                            <Form.Field>
                                                <label>Email</label>
                                                <input placeholder={this.state.authUser.email} name='email' onChange={this.handleInputChange}/>
                                            </Form.Field>
                                        </Form>

                                        </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    
                    </div>
        )
    }

    render() {

        return(
            <div>
                

                {this.state.update ?

                    this.state.edit ? this.returnForm() : this.returnData()
                    
                    
                    :null
                }

            </div>
        )
    }
}

export default UserProfile