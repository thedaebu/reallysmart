import React, { lazy, Suspense } from "react";
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
import Searchbar from "./searchbar/searchbar";
import NotificationShow from "./notifications/notification_show";
const TrackIndex = lazy(() => import("./tracks/track_index"));
const TrackShow = lazy(() => import("./tracks/track_show"));

function App({ cableApp }: { cableApp: any}) {
    return (
        <div>
            <header className="header">
                <Searchbar />
                <Link to="/" className="header__logo">REALLYSMART</Link>
                <div className="session-buttons">
                    <NotificationShow cableApp={cableApp} />
                    <SessionMenu />
                    <DemoLogin />
                </div>
            </header>
            <Switch>
                <Route exact path="/">
                    <Suspense fallback={<div></div>}>
                        <TrackIndex />
                    </Suspense>
                </Route>
                <AuthRoute exact path="/signup" component={SignupForm} />
                <AuthRoute exact path="/login"  component={LoginForm} />
                <Route path="/tracks/:trackName">
                    <Suspense fallback={<div></div>}>
                        <TrackShow />
                    </Suspense>
                </Route>
            </Switch>
        </div>
    );
}

export default App;