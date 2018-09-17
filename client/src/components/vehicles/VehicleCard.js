import React from 'react'
import './styles.css'
import axios from 'axios'
import { Card, Image, Button, Grid } from 'semantic-ui-react'



const VehicleCard =(props)=>{

    const deleteVehicle =()=>{
        axios.delete('/api/vehicles/'+props.vehicle._id).then(function(response){
            if(response.status === 200){
                window.location.reload()
            }
        }).catch(function(error){
            console.log(error)
        })
    }

    return(

        <Grid.Column style={{marginTop: "20px"}}>

            <Card>

                <Card.Content>
                    <Image floated='right' size='mini' src='https://png.icons8.com/metro/1600/car.png' />
                    <Card.Header>{props.vehicle.year} {props.vehicle.make} {props.vehicle.model}</Card.Header>
                    <Card.Meta>{props.vehicle.type}</Card.Meta>
                    <Card.Description style={{textAlign: "center", color: "#EF1B36", fontSize: "1.3rem"}}>
                        {props.vehicle.license}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                        Services
                        </Button>
                        <Button basic color='red' onClick={deleteVehicle}>
                        Delete
                        </Button>
                    </div>
                </Card.Content>

            </Card>

      </Grid.Column>
    )
}

export default VehicleCard