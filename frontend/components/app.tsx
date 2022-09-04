import React from "react";
import {
  Route,
  Switch,
  Link
} from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import DemoLogin from "./demo_login/demo_login";
import LoginForm from "./session_form/login_form";
import SessionMenu from "./session_menu/session_menu";
import SignupForm from "./session_form/signup_form";
import TrackIndex from "./tracks/track_index";
import TrackShow from "./tracks/track_show";
import Searchbar from "./searchbar/searchbar";

function App() {
    return (
        <div>
            <header className="header">
                <Searchbar />
                <Link to="/" className="header__logo">REALLYSMART</Link>
                <div className="session-buttons">
                    <SessionMenu />
                    <DemoLogin />
                </div>
            </header>
            <Switch>
                <Route exact path="/" component={TrackIndex} />
                <AuthRoute exact path="/signup" component={SignupForm} />
                <AuthRoute exact path="/login"  component={LoginForm} />
                <Route path="/tracks/:trackId" component={TrackShow} />
            </Switch>
        </div>
    );
}

export default App;