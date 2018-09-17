import React, {Component} from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './styles.css'
import axios from 'axios'

class LeftSidebar extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            authUser: {
                role: 'customer'
            }
		}
    }

    componentDidMount=()=>{


        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({authUser: response.data.authenticatedUser})

        }).catch(function(err){
            window.location = '/'
            console.log(err)
        })

    }

    render() {

        return(
            <Sidebar as={Menu}  icon='labeled' inverted vertical visible width='thin'>
                <Link to='/'><Menu.Item as='a' href='/' style={{backgroundColor: "#EF1B36"}}>
                    <Icon name='home' />
                    Home
                </Menu.Item></Link>

                <Link to='/profile'><Menu.Item as='a' href='/'>
                    <Icon name='user' />
                    Profile
                </Menu.Item></Link>
                <Link to='/profile/settings'><Menu.Item as='a'>
                    <Icon name='settings' />
                    Settings
                </Menu.Item></Link>
                <Link to='/profile/services'><Menu.Item as='a'>
                    <Icon name='balance scale' />
                    Services
                </Menu.Item></Link>
                <Link to='/profile/vehicles'><Menu.Item as='a'>
                    <Icon name='car' />
                    Vehicles
                </Menu.Item></Link>

                {this.state.authUser.role === 'admin' ? 

                    <Link to='/profile/admin'><Menu.Item as='a'>
                        <Icon name='user' />
                        Admin Portal
                    </Menu.Item></Link>: null}


            </Sidebar>
        )
    }
}

export default LeftSidebar