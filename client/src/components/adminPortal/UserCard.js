import React from 'react'
import './styles.css'
import axios from 'axios'
import { Card, Image, Button, Grid, Icon } from 'semantic-ui-react'



const UserCard =(props)=>{

    const deleteUser =()=>{
        axios.delete('/api/users/'+props.vehicle._id).then(function(response){
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
                    <Image floated='right' size='mini' src='https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png' />
                    <Card.Header>{props.user.firstName} {props.user.lastName}</Card.Header>
                    <Card.Meta style={{color: "#EF1B36"}}>{props.user.role}</Card.Meta>
                    <Card.Description style={{paddingTop: "20px"}}>
                        <Icon disabled name='phone' />{props.user.phoneNumber}<br/><br/>
                        <Icon disabled name='building' />{props.user.address}<br/>
                        <div style={{marginLeft: "20px"}}>{props.user.city + props.user.state + ", " + props.user.zip}</div>
                            <br/>
                        <Icon disabled name='mail' />{props.user.email}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                        Profile
                        </Button>
                        <Button basic color='red' onClick={deleteUser}>
                        Delete
                        </Button>
                    </div>
                </Card.Content>

            </Card>

      </Grid.Column>
    )
}

export default UserCard