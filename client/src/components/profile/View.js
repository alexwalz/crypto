import React, { Component} from 'react'
import Sidebar from './Sidebar'
import './styles.css'
import axios from 'axios'
import Vehicles from '../vehicles/View'
import AdminView from '../adminPortal/View'
import MyProfile from './MyProfile'
import CustomerProfiles from './CustomerProfile'
// eslint-disable-next-line 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from '../NotFound'


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
            currentComponent.setState({authUser: response})
        }).catch(function(err){
          console.log(err)
        })
    }


    render() {

      return ( 

            <div>

                <Sidebar/>

                <div style={{marginLeft: "150px", padding: "5%"}}>
                    <Switch location={this.props.location}>
                        <Route path="/profile/vehicles" component={Vehicles} />
                        <Route path="/profile/admin" component={AdminView} />
                        <Route path="/profile/user/:id"  component={CustomerProfiles} />
                        <Route path="/profile" user={this.state.authUser} component={MyProfile} />
                        <Route component={NotFound} />
                    </Switch>
                </div>


            </div>
                
        )

    }

  }
  
  export default Profile;