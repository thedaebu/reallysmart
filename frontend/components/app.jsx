import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import DemoUserContainer from './demo_user/demo_user_container';
import HeaderContainer from './header/header_container';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
 

const App = () => (
    <div>
        <header>
            <input className='search-bar' type='text' value='Search...'/>
            <Link to='/' className='logo'>REALLYSMART</Link>
            <div className='header-right'>
                <HeaderContainer />
                <DemoUserContainer />
            </div>
        </header>
        <Switch>
            
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <AuthRoute exact path="/login"  component={LoginFormContainer}/>
        </Switch>
    </div>
);

export default App;