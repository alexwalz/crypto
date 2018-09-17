import React, {Component} from 'react'
import UserCard from './UserCard'
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
        axios.get('/api/users').then(function(response){

            console.log(response)
            currentComponent.setState({users: response.data, update: true})

        }).catch(function(err){
            console.log(err)
        })

    }

    render() {

        return(
           <div className='admin-user-view'>
                <h1><Icon name='users' style={{color: "#EF1B36"}}/>Marina Cove Customers</h1>
                <Grid columns={3}>
                    <Grid.Row>

                        {this.state.update ?
                        
                            this.state.users.map(user=>{
                                return(
                                    <UserCard key={user._id} user={user} />
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