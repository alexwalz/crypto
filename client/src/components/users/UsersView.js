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
            search: "",
            authUser: {
                role: 'customer'
            },
            users: {
                firstName: "admin",
                lastName: "admin"

            }
		}
    }

    componentDidMount=()=>{

        let currentComponent = this

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.get('/api/users').then(function(response){
            if(response.data.success === false){
                window.location='/profile'
            }else{
                currentComponent.setState({users: response.data, update: true})
            }

        }).catch(function(err){
            console.log(err)
        })

    }


    updateSearch=(event)=>{
        this.setState({search: event.target.value.substr(0,20).toLowerCase(), function(){
            console.log(this.state.search)
        }})
    }

    render() {

        let filteredContacts;

        if(this.state.update){

            filteredContacts = this.state.users.filter(
                (user)=>{
                    let fullName = user.firstName + ' ' + user.lastName
                    return(
                        fullName.toLowerCase().indexOf(this.state.search) !== -1
                    )
                }
            )
        }

        return(
           <div className='admin-user-view'>
                <h1><Icon name='users' style={{color: "#EF1B36"}}/>Marina Cove Customers</h1>

                <div style={{position: "relative", padding: "20px 0px 30px 0px"}}><input placeholder='Customer Name' className='user-search-bar' type='text' value={this.state.search} onChange={this.updateSearch.bind(this)} /> <Icon disabled name='search' className='searchIcon' /></div>

                <Grid columns={3}>
                    <Grid.Row>

                        {this.state.update ?
                        
                            filteredContacts.slice(0, 9).map(user=>{
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