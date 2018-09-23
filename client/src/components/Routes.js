import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import '../css/App.css';
import HomePage from './homepage/HomePage.js'
import NotFound from './global/NotFound'
import Login from './login/View'
import Signup from './signup/View'
import { Route,} from "react-router-dom";
import Profile from './profile/View'
import ConfirmPage from './Confirm'
import ForgotPasswordEmail from './global/forgotPassword/ForgotPasswordEmail'
import ResetPassword from './global/forgotPassword/ResetPassword'
import ExpiredLink from './global/forgotPassword/ExpiredLink'


export default (
  <Route path='/' component={HomePage}>
    <IndexRoute component={HomePage} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/forgot-password" exact component={ForgotPasswordEmail} />
    <Route path="/password-reset/:id" component={ResetPassword} />
    <Route path="/profile" component={Profile} />
    <Route path="/expired-link" component={ExpiredLink} />
    <Route path='/confirm/:id' component={ConfirmPage} />
    <Route path='/404' component={NotFound} />
    <Route component={NotFound} />
  </Route>
)