/* eslint-disable no-undef */
import { Button, Form, Message } from 'semantic-ui-react'
import React, { Component} from 'react'
import './styles.css'
import axios from 'axios'



class LoginForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            user: "",
            update: false,
            error: false,
            vehicles: {},
            newVehicle: {
                type: "",
                year: "",
                make: "",
                model: "",
                license: ""
            }
		}
    }

    componentDidMount=()=>{


        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({user: response.data.authenticatedUser.id}, function(){

                axios.get('/api/vehicles/'+this.state.user).then(function(response){
                    currentComponent.setState({vehicles: response.data}, function(){
                        console.log(this.state.vehicles)
                    })
                }).catch(function(err){
                    console.log(err)
                })

            })

        }).catch(function(err){
            window.location = '/'
            console.log(err)
        })

    }

    errorMessage = () => {
        return(
           <Message negative>
           <Message.Header>Error Adding Vehicle</Message.Header>
               <p>{this.state.errorMessage}</p>
           </Message>
        )
   }

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
        this.setState((prevState, props) => ({
            newVehicle: {
                ...prevState.newVehicle,
                [name]: value,
            },
        }));
    }

    handleSubmit=(e)=>{

        let currentComponent = this

        e.preventDefault()

        let newVehicle={
            type: this.state.newVehicle.type,
            year: this.state.newVehicle.year,
            make: this.state.newVehicle.make,
            model: this.state.newVehicle.model,
            license: this.state.newVehicle.license,
            user: this.state.user
        }

        axios.post('/api/vehicles', newVehicle)

        .then((result) => {

            if(result.status === 200){

                axios.get('/api/vehicles/'+this.state.user).then(function(response){

                    currentComponent.setState({vehicles: response.data}, function(){
                        console.log(this.state.vehicles)
                    })
    
                }).catch(function(err){console.log(err)})

            }

          })

          .catch((error) => {console.log(error)});

    }


    render() {

      return ( 
        
        <Form style={{marginLeft: "auto", marginRight: "auto"}}>

            <Form.Group inline>

                <Form.Field>
                    <label style={{color: "#FB3668"}}>Type</label>
                    <br/>
                    <input onChange={this.handleInputChange} placeholder='Truck' name='type'/>
                </Form.Field>
                
                <Form.Field>
                    <label style={{color: "#FB3668"}}>Year</label>
                    <br/>
                    <input onChange={this.handleInputChange} placeholder='2015' name='year'/>
                </Form.Field>

                <Form.Field>
                    <label style={{color: "#FB3668"}}>Make</label>
                    <br/>
                    <input onChange={this.handleInputChange} placeholder='Ford' name='make' />
                </Form.Field>
        
                <Form.Field>
                    <label style={{color: "#FB3668"}}>Model</label>
                    <input onChange={this.handleInputChange} placeholder='F-150' name='model'/>
                </Form.Field>

                <Form.Field>
                    <label style={{color: "#FB3668"}}>License Plate Number</label>
                    <input onChange={this.handleInputChange} placeholder='123 xyz' name='license'/>
                </Form.Field>

            </Form.Group>

            <Button onClick={this.handleSubmit} type='submit' style={{backgroundColor: "#FB3668", color: "white", marginTop: "20px", marginLeft: "auto", marginRight: "auto"}}>Add Vehicle</Button>
        
        </Form>
        )
    }
  }
  
  export default LoginForm;