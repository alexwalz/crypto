import React, {Component} from 'react'
import { Icon, Menu, Sidebar, Label } from 'semantic-ui-react'
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

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
      }

    render() {

        return(
            <Sidebar as={Menu}  icon='labeled' inverted vertical visible width='thin'>

                <Link to='/'><Menu.Item as='a' href='/' style={{backgroundColor: "#EF1B36"}}>
                    <Icon name='home' />
                    Home
                </Menu.Item></Link>

                <Menu.Item as='a' onClick={this.logout}>
                    <Icon name='arrow left' />
                    Logout
                </Menu.Item>

                {this.state.authUser.role === 'admin' ? 

                    <Link to='/profile/admin/users'><Menu.Item as='a' >
                        <Label as='a' color='teal' ribbon style={{position: "absolute", marginLeft: "33px"}}>
                            Admin
                        </Label>
                        <Icon name='user' />
                        Admin Portal
                    </Menu.Item></Link>

                : null}

                <Link to='/profile'><Menu.Item as='a' href='/'>
                    <Icon name='user' />
                    Profile
                </Menu.Item></Link>
                
            </Sidebar>
        )
    }
}

export default LeftSidebar