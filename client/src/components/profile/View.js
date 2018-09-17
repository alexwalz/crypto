/* eslint-disable no-undef */
import React, { Component} from 'react'
import Sidebar from './Sidebar'
import './styles.css'
import axios from 'axios'
import NewVehicle from '../vehicles/NewVehicle'


class Profile extends Component {
	constructor(props) {
        super(props);
		this.state={

		}
    }

    componentDidMount=()=>{
        var currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){
            console.log(response)
            currentComponent.setState({authUser: response})
        }).catch(function(err){
          console.log(err)
        })
    }


    render() {

      return ( 
            <div>

                <Sidebar />

                <div style={{marginLeft: "150px", padding: "5%"}}>
                    <NewVehicle />
                </div>


            </div>
                
        )
    }
  }
  
  export default Profile;