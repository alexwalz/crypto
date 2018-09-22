import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found-page" style={{height: "100vh", backgroundColor: "#EF1B36", color: "white"}}>
        <div className='not-found-page-content' style={{position: "fixed", top: "25%", left: "25%"}}>
          <h1 style={{color: 'white', fontSize: "5rem"}}>Something's wrong here...</h1>
          <p style={{fontSize: '1.5rem', color: '#1E1E1E', width: "70%"}}>We were unable to locate the page that you are looking for.  If you continue to experience this problem, please contact us.</p>
          <Link to='/'><Button>Home</Button></Link>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
