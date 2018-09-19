import React from 'react'
import './styles.css'
import { Card, Image, Button, Grid, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'



const UserCard =(props)=>{

    return(

        <Grid.Column style={{marginTop: "20px"}}>

            <Card>

                <Card.Content>
                    <Image floated='right' size='mini' src='https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png' />
                    <Card.Header>{props.user.firstName} {props.user.lastName}</Card.Header>
                    <Card.Meta style={{color: "#EF1B36"}}>{props.user.role === 'admin' ? <Icon name='star'/> : <Icon name='user'/>} {props.user.role.toUpperCase()}</Card.Meta>
                    <Card.Meta style={{color: "#EF1B36"}}>{props.user.captainsClub ? <div><Icon name='star'/>Captains Club Member</div> : null}</Card.Meta>
                    <Card.Description style={{paddingTop: "20px"}}>
                        <Icon disabled name='phone' />{props.user.phoneNumber}<br/><br/>
                        <Icon disabled name='building' />{props.user.address}<br/>
                        <div style={{marginLeft: "20px"}}>{props.user.city + ' ' + props.user.state + ", " + props.user.zip}</div>
                            <br/>
                        <Icon disabled name='mail' />{props.user.email}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <div>
                        <Link to={'/profile/user/'+ props.user._id}><Button basic style={{width: "100%", border: "1px solid #EF1B36"}}>
                        View Profile
                        </Button></Link>
                    </div>
                </Card.Content>

            </Card>

      </Grid.Column>
    )
}

export default UserCard