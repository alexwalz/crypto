import React, { Component } from 'react';
import '../css/App.css';
import HomePage from './homepage/HomePage.js'
import NotFound from './NotFound.js'
import Login from './login/View'
import Signup from './signup/View'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, withRouter, Switch } from "react-router-dom";
import Profile from './profile/View'


class App extends Component {
  render() {
    const currentKey = this.props.location.pathname.split("/")[1] || "/";
    const timeout = { enter: 300, exit: 200 };
    return (
      <TransitionGroup component="main" className="page-main" style={{ height: '100%' }}>
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="fade"
          appear
        >
          <div>
            <Switch location={this.props.location}>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/profile" exact component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);