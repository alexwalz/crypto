import React, {Component} from 'react'
import VehicleCard from '../vehicles/VehicleCard'
import './styles.css'
import axios from 'axios'
import { Grid, Icon } from 'semantic-ui-react'

class UsersView extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            update: false,
            authUser: {
                role: 'customer'
            }
		}
    }

    componentDidMount=()=>{


        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/vehicles').then(function(response){

            console.log(response)
            currentComponent.setState({vehicles: response.data, update: true})

        }).catch(function(err){
            console.log(err)
        })

    }

    render() {

        return(
           <div className='admin-user-view' style={{marginTop: "5%"}}>
                <h1><Icon name='car' style={{color: "#EF1B36"}} />Marina Cove Vehicles</h1>
                <Grid columns={3}>
                    <Grid.Row>

                        {this.state.update ?
                        
                            this.state.vehicles.map(vehicle=>{
                                return(
                                    <VehicleCard vehicle={vehicle} />
                                )
                            })

                            : null
                        }

                    </Grid.Row>
                </Grid>

           </div>
        )
    }
}

export default UsersView