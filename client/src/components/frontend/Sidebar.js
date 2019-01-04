import React from 'react'
import { Button } from 'semantic-ui-react';

const NameContainer =()=>{
    return(
        <div className='button-container'>

            <div className='ui-line'> </div>

            <div className='button-group'>
                <Button.Group vertical>
                    <Button circular icon='search' color='teal'></Button>
                    <Button circular icon='user' color='teal'></Button>
                    <Button circular icon='info' color='teal'></Button>
                </Button.Group>
            </div>

             <div className='ui-line'> </div>

        </div>
    )
}

export default NameContainer