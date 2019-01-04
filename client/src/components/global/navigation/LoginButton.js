import React from 'react'
import {Button, Icon} from "semantic-ui-react"

const LoginButton = () =>{
    return(
        <Button icon inverted color='teal' labelPosition='left' href='/login'  style={{position: "absolute", top: "3%", right: '3%'}}>
            <Icon name='arrow right' />
            Login
        </Button>
    )
}

export default LoginButton