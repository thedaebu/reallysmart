import React from "react";
import {
  Route,
  Switch,
  Link
} from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import DemoUserContainer from "./demo_user/demo_user_container";
import LoginFormContainer from "./session_form/login_form_container";
import SearchbarContainer from "./searchbar/searchbar_container";
import SessionMenuContainer from "./session_menu/session_menu_container";
import SignupFormContainer from "./session_form/signup_form_container";
import TrackIndexContainer from "./tracks/track_index_container"
import TrackShowContainer from "./tracks/track_show_container";

function App() {
    return (
        <div>
            <header className="header">
                <SearchbarContainer/>
                <Link to="/" className="header__logo">REALLYSMART</Link>
                <div className="session-buttons">
                    <SessionMenuContainer/>
                    <DemoUserContainer/>
                </div>
            </header>
            <Switch>
                <Route exact path="/" component={TrackIndexContainer}/>
                <AuthRoute exact path="/signup" component={SignupFormContainer}/>
                <AuthRoute exact path="/login"  component={LoginFormContainer}/>
                <Route path="/tracks/:trackId" component={TrackShowContainer}/>
            </Switch>
        </div>
    );
}

export default App;