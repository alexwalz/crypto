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
            search: "",
            authUser: {
                role: 'customer'
            }
		}
    }

    componentDidMount=()=>{

        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/vehicles').then(function(response){
            if(response.data.success === false){
                window.location= '/profile'
            }else{
                currentComponent.setState({vehicles: response.data, update: true})
            }

        }).catch(function(err){
            console.log(err)
        })

    }

    updateSearch=(event)=>{
        this.setState({search: event.target.value.substr(0,20), function(){
            console.log(this.state.search)
        }})
    }


    render() {

        let filteredVehicles;

        if(this.state.update){

            filteredVehicles = this.state.vehicles.filter(
                (vehicle)=>{
                    return(
                        vehicle.license.indexOf(this.state.search) !== -1
                    )
                }
            )
        }

        return(
           <div className='admin-user-view' style={{marginTop: "5%"}}>

                <h1><Icon name='car' style={{color: "#EF1B36"}} />Marina Cove Vehicles</h1>
                <div style={{position: "relative", padding: "20px 0px 30px 0px"}}><input placeholder='License Plate Number' className='user-search-bar' type='text' value={this.state.search} onChange={this.updateSearch.bind(this)} /> <Icon disabled name='search' className='searchIcon' /></div>
                
                <Grid columns={3}>
                    <Grid.Row>

                        {this.state.update ?
                        
                            filteredVehicles.map(vehicle=>{
                                return(
                                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
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