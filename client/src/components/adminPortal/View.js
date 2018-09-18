import React, {Component} from 'react'
import './styles.css'
import axios from 'axios'
import UsersView from '../users/UsersView'
import VehiclesView from '../vehicles/VehiclesView'

class AdminView extends Component {
    
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
            console.log(err)
        })

    }

    render() {

        return(
            <div>
                <UsersView />
                <VehiclesView />

            </div>
        )
    }
}

export default AdminView