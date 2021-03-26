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
import NavBar from './header/navbar';
import SearchBar from './header/search_bar';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import TrackIndexContainer from './tracks/track_index_container'
import TrackShowContainer from './tracks/track_show_container';
 

const App = () => (
    <div>
        <header>
            <SearchBar/>
            <Link to='/' className='logo'>REALLYSMART</Link>
            <div className='header-right'>
                <HeaderContainer />
                <DemoUserContainer />
            </div>
        </header>
        <NavBar />
        <Switch>
            
            <Route exact path="/" component={TrackIndexContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <AuthRoute exact path="/login"  component={LoginFormContainer}/>
            <Route path="/tracks/:trackId" component={TrackShowContainer} />
        </Switch>
    </div>
);

export default App;