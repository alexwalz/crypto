import React, {Component} from 'react'
import { Icon, Header, Grid, Button, Message } from 'semantic-ui-react'
import './styles.css'
import axios from 'axios'
import UserServiceHistory from './UserServiceHistory'
import UserVehicles from '../vehicles/ProfileVehicles'
import {Link} from 'react-router-dom'

class UserProfile extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            update: false,
            error: false
        }
    }

    componentDidMount=(props)=>{

        var currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        var _id = this.props.match.params.id
        axios.get('/api/users/authenticate').then(function(response){

                axios.get('/api/users/profile/'+_id).then(function(response){

                    if(response.status === 200){

                        if(response.data.success === false){
                            window.location ='/profile'
                        }else{
                            currentComponent.setState({user: response.data, update: true})
                        }
                        
                    }

                }).catch(function(err){console.log(err)})

        }).catch(function(err){console.log(err)})

    }

enableCaptainsClub=()=>{

    let currentComponent = this
    axios.put('/api/users/'+this.props.match.params.id, {captainsClub: true}).then(function(response){
        console.log(response)
        if(response.status === 200){
            currentComponent.setState((prevState, props) => ({
                user: {
                    ...prevState.user,
                    captainsClub: true,
                },
            }));
        }
    })
}

disableCaptainsClub=()=>{

    let currentComponent = this
    axios.put('/api/users/'+this.props.match.params.id, {captainsClub: false}).then(function(response){
        console.log(response)
        if(response.status === 200){
            currentComponent.setState((prevState, props) => ({
                user: {
                    ...prevState.user,
                    captainsClub: false,
                },
            }));
        }
    })
}


deleteUser =()=>{

    let _id = this.props.match.params.id

    axios.delete('/api/users/'+_id).then(function(response){
        if(response.status === 200){
            axios.delete(`/api/vehicles/${_id}/all`).then(function(response){
                if(response.status === 200){
                    window.location = '/profile/admin/users'
                }
            }).catch(function(error){console.log(error)})
        }
    }).catch(function(error){console.log(error)})
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

  
    

    render() {

        return(
            <div>
                {this.state.update ? 
                    <div>
                        <div>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user' circular style={{color: "#EF1B36"}}/>
                                <Header.Content>{this.state.user.firstName + ' ' + this.state.user.lastName}</Header.Content>
                                {this.state.user.captainsClub ? <Header.Content style={{color: "#EF1B36"}}>Captains Club Member</Header.Content> : null}
                            </Header>



                            <Grid columns={3} centered divided style={{marginTop: "60px"}}>
                                <Grid.Row> 

                                    <Grid.Column>
                                        <Header as='h2'>
                                            <Icon name='building' />
                                            <Header.Content>
                                                Address
                                            <Header.Subheader>{this.state.user.address}</Header.Subheader>
                                            <Header.Subheader>{this.state.user.city + ' ' + this.state.user.state + ', ' + this.state.user.zip }</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>

                                    <Grid.Column >
                                        <Header as='h2'>
                                            <Icon name='phone' />
                                            <Header.Content>
                                                Phone Number
                                            <Header.Subheader>{this.state.user.phoneNumber}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Header as='h2'>
                                            <Icon name='mail' />
                                            <Header.Content>
                                                Email
                                            <Header.Subheader>{this.state.user.email}</Header.Subheader>
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
                            <UserVehicles id={this.props.match.params.id}/>
                        </div>

                        <div style={{padding: "5% 0 5% 0"}}>
                                <Link to='/profile/admin/users'>
                                    <Button icon labelPosition='left' color='blue'>
                                        <Icon name='arrow left' />
                                        Go Back
                                    </Button>
                                </Link>

                                <Button icon labelPosition='left' color='red' onClick={this.deleteUser}>
                                    Delete User
                                    <Icon name='trash' />
                                </Button>

                                {!this.state.user.captainsClub ?  <Button icon labelPosition='left' onClick={this.enableCaptainsClub}><Icon name='star'/>Enable Captains Club</Button> : <Button icon labelPosition='left' onClick={this.disableCaptainsClub}><Icon name='star'/>Disable Captains Club</Button>}

                            </div>

                    </div>
                    : null
                }
            </div>
        )
    }
}

export default UserProfile