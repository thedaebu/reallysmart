import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter, 
  withRouter
} from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path} exact={exact} 
    render={props => !loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mSTP = (state, ownProps) => {
  return { loggedIn: !!state.session.id };
};

export const AuthRoute = withRouter(connect(mSTP,null)(Auth));