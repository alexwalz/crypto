import React from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import './styles.css'

const LeftSidebar =()=>{
    return(
        <Sidebar as={Menu}  icon='labeled' inverted vertical visible width='thin'>
        <Menu.Item as='a' href='/' style={{backgroundColor: "#EF1B36"}}>
            <Icon name='home' />
            Home
        </Menu.Item>
        <Menu.Item as='a'>
            <Icon name='settings' />
            Settings
        </Menu.Item>
        <Menu.Item as='a'>
            <Icon name='balance scale' />
            Services
        </Menu.Item>
    </Sidebar>
    )
}

export default LeftSidebar