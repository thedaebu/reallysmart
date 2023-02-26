import React, { Dispatch, lazy, Suspense, useContext, useEffect } from "react";
import {
    Route,
    Switch,
    Link
} from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import { ThemeContext } from "../contexts/theme_context";
import { useDispatch, useSelector } from "react-redux";
import { State, User, Window } from "../my_types";
import DemoLogin from "./demo_login/demo_login";
import LoginForm from "./session_form/login_form";
import SessionMenu from "./session_menu/session_menu";
import SignupForm from "./session_form/signup_form";
import Searchbar from "./searchbar/searchbar";
import NotificationShow from "./notifications/notification_show";
import ThemeToggle from "./theme_toggle/theme_toggle";
import * as SessionActions from "./../actions/session_actions";
import { AnyAction } from "redux";
const TrackIndex = lazy(() => import("./tracks/track_index"));
const TrackShow = lazy(() => import("./tracks/track_show"));

declare const window: Window;

function App({ cableApp }: { cableApp: any}) {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchUser: Function = (sessionToken: string) => dispatch(SessionActions.fetchUser(sessionToken));

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (window.currentUser) {
            fetchUser(window.currentUser.session_token);
            delete window.currentUser
        }
    }, [window.currentUser]);

    return (
        <div className={theme === "light" ? "app" : "app--dark"}>
            <header className="header">
                <Searchbar theme={theme} />
                <Link to="/" className="header__logo">REALLYSMART</Link>
                <div className="session-buttons">
                    {currentUser && <NotificationShow cableApp={cableApp} />}
                    <SessionMenu />
                    {!currentUser && <DemoLogin />}
                    <ThemeToggle />
                </div>
            </header>
            <Switch>
                <Route exact path="/">
                    <Suspense fallback={<div></div>}>
                        <TrackIndex />
                    </Suspense>
                </Route>
                <AuthRoute exact path="/signup" component={SignupForm} />
                <AuthRoute exact path="/login" component={LoginForm} />
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