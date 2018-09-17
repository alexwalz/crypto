/* eslint-disable no-undef */
import { Message, Grid, Icon } from 'semantic-ui-react'
import React, { Component} from 'react'
import './styles.css'
import axios from 'axios'

import NewVehicle from './NewVehicle'
import VehicleCard from './VehicleCard'



class LoginForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            user: "",
            update: false,
            error: false,
            vehicles: {},
		}
    }

    componentDidMount=()=>{

        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({user: response.data.authenticatedUser.id}, function(){
                axios.get('/api/vehicles/'+this.state.user).then(function(response){
                    currentComponent.setState({vehicles: response.data, update: true})
                }).catch(function(err){
                    console.log(err)
                })
            })

        }).catch(function(err){
            window.location = '/'
            console.log(err)
        })

    }

    errorMessage = () => {
        return(
           <Message negative>
           <Message.Header>Error Loading Vehicles</Message.Header>
               <p>{this.state.errorMessage}</p>
           </Message>
        )
   }



    render() {

      return ( 
        
            <div>

                <NewVehicle />

                <div className='vehicles-container'>
                    <h1><Icon disabled name='car'/> My Vehicles</h1>
                    <Grid columns={3}>
                        <Grid.Row>

                            {this.state.update? 

                                this.state.vehicles.map(vehicle =>{
                                    return(
                                        <VehicleCard key={vehicle._id} vehicle={vehicle}/>
                                    )
                                })
                            
                            : null}

                        </Grid.Row>
                    </Grid>

                </div>

            </div>
        )
    }
  }
  
  export default LoginForm;