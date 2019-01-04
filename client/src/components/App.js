import React, { Component } from 'react';
import '../css/App.css';
import HomePage from './frontend/Homepage'
import NotFound from './global/NotFound'
import Login from './auth/login/View'
import Signup from './auth/signup/View'
import { Route, withRouter, Switch } from "react-router-dom";
import Profile from './dashboard/profile/View'
import ConfirmPage from './auth/confirm/View'
import ForgotPasswordEmail from './global/forgotPassword/ForgotPasswordEmail'
import ResetPassword from './global/forgotPassword/ResetPassword'
import ExpiredLink from './global/forgotPassword/ExpiredLink'



class App extends Component {
  render() {
    return (
          <div>
            <Switch>

              {/* FRONTEND ROUTES */}
              <Route path="/" exact component={HomePage} />

              {/* DASHBOARD ROUTES */}
              <Route path="/profile" component={Profile} />

              {/* AUTH ROUTES */}
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/forgot-password" exact component={ForgotPasswordEmail} />
              <Route path="/password-reset/:id" component={ResetPassword} />
              <Route path="/expired-link" component={ExpiredLink} />
              <Route path='/confirm/:id' component={ConfirmPage} />

              {/* ERROR ROUTES */}
              <Route path='/404' component={NotFound} />
              <Route component={NotFound} />

            </Switch>
          </div>
    );
  }
}

export default withRouter(App);