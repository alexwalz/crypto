import React, {Component} from 'react'
import './styles.css'
import axios from 'axios'
import UsersView from '../users/UsersView'
import VehiclesView from '../vehicles/VehiclesView'
import { Icon, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
// eslint-disable-next-line 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class AdminView extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            activeItem: 'users',
            updated: false,
            authUser: {}
		}
    }

    componentDidMount=()=>{


        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){

            if(response.data.authenticatedUser.role === 'customer'){
                window.location = '/profile'
            }

            currentComponent.setState({authUser: response.data.authenticatedUser, updated: true})

        }).catch(function(err){
            console.log(err)
        })

    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        return(
            <div>
                <h1 style={{fontSize: "3rem", color: "#EF1B36", paddingBottom: "1%"}}>Administrator View</h1>

                <Menu icon='labeled'>

                { this.state.updated ? 
                    this.state.authUser.role === 'admin' ?
                            <Link to='/profile/admin/users'><Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
                            <Icon name='users' />Customers</Menu.Item></Link>
                     : null
                    :null
                }

                { this.state.updated ? 
                    this.state.authUser.role === 'admin' ?
                        <Link to='/profile/admin/vehicles'>
                            <Menu.Item name='car' active={activeItem === 'car'} onClick={this.handleItemClick}>
                            <Icon name='car' />Vehicles</Menu.Item>
                        </Link>
                     : null
                    :null
                }

                { this.state.updated ? 
                    this.state.authUser.role === 'admin' || this.state.authUser.role === 'employee' ?

                    <Link to='/profile/admin/services'>
                        <Menu.Item name='balance scale' active={activeItem === 'balance scale'} onClick={this.handleItemClick}>
                        <Icon name='balance scale' />Services</Menu.Item>
                    </Link>

                    : null
                  :null
                }

                </Menu>


                <div style={{padding: "2% 2% 2% 2%"}}>
                    <Switch location={this.props.location}>
                        <Route path="/profile/admin/users" component={UsersView} />
                        <Route path="/profile/admin/vehicles" component={VehiclesView} />
                    </Switch>
                </div>

            </div>
        )
    }
}

export default AdminView