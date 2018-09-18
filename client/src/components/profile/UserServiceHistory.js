import React, {Component} from 'react'
import './styles.css'
import axios from 'axios'
import { Segment } from 'semantic-ui-react'

class LeftSidebar extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            authUser: {}
		}
    }

    componentDidMount=()=>{

        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({authUser: response.data.authenticatedUser})

        }).catch(function(err){
            window.location = '/'
            console.log(err)
        })

    }


    render() {

        return(
            <div>
                <h1 style={{fontSize: "2rem", color: "#EF1B36"}}>Service History</h1>

                <div style={{marginTop: ""}}>
                    <Segment color='green' tertiary>Payment History will go here</Segment>
                    <Segment color='green' tertiary>Payment History will go here</Segment>
                    <Segment color='green' tertiary>Payment History will go here</Segment>
                </div>

            </div>
        )
    }
}

export default LeftSidebar