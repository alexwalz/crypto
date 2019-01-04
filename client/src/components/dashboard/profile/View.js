import React, { Component} from 'react'
import Sidebar from '../../global/navigation/Sidebar'
import './styles.css'
import axios from 'axios'


class Profile extends Component {
	constructor(props) {
        super(props);
		this.state={
            authUser: {
                firstName: '',
                lastName: ''
            }

		}
    }

    componentDidMount=()=>{
        var currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){
            console.log(response)
            currentComponent.setState({authUser: response.data.authenticatedUser})
        }).catch(function(err){
          console.log(err)
        })
    }


    render() {

      return ( 

            <div>
                <Sidebar/>

                
                <div style={{marginLeft: "150px", padding: "5%"}}>
                    <h1>Welcome, {this.state.authUser.firstName}!</h1>
                </div>
                


            </div>
                
        )

    }

  }
  
  export default Profile;