import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import HeaderContainer from './header/header_container';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';

const App = () => (
    <div>
        <header>
            <h1>Really Smart</h1>
            <HeaderContainer />
        </header>
        <Switch>
            
            <Route exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/login"  component={LoginFormContainer}/>
        </Switch>
    </div>
);

export default App;