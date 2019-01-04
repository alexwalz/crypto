import React from 'react'
import { Button, Image } from 'semantic-ui-react';


const NameContainer =()=>{
    return(
        <div className='button-container'>

            <div className='ui-line'> </div>

            <div className='button-group'>
                <Button.Group vertical>
                    <Button circular icon='search' color='teal'></Button>
                    <Button circular icon='key' color='teal'></Button>
                    <Button circular icon='info' color='teal'></Button>
                </Button.Group>
            </div>

             <div className='ui-line'> </div>

        </div>
    )
}

export default NameContainer