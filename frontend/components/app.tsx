import React, { lazy, Suspense, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AccountRoute, SessionRoute } from "../util/route_util";
import { ThemeContext } from "../contexts/theme_context";
import { useSelector } from "react-redux";
import { State, User } from "../my_types";
import DemoLogin from "./demo_login/demo_login";
import LoginForm from "./session_form/login_form";
import SessionMenu from "./session_menu/session_menu";
import SignupForm from "./session_form/signup_form";
import Searchbar from "./searchbar/searchbar";
import NotificationShow from "./notifications/notification_show";
import ThemeToggle from "./theme_toggle/theme_toggle";
import AccountShow from "./account/account_show";
const TrackIndex = lazy(() => import("./tracks/track_index"));
const TrackShow = lazy(() => import("./tracks/track_show"));

function App({ cableApp }: { cableApp: any}) {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme === "light"
            ? "app"
            : "app--dark"}
        >
            <header className="header">
                <Searchbar theme={theme} />
                <Link to="/" className="header__logo">REALLYSMART</Link>
                <section className="session-buttons">
                    {currentUser && <NotificationShow cableApp={cableApp} />}
                    <SessionMenu />
                    {!currentUser && <DemoLogin />}
                    <ThemeToggle />
                </section>
            </header>
            <Routes>
                <Route
                    path="/"
                    element={<Suspense fallback={<div></div>}>
                        <TrackIndex />
                    </Suspense>}
                />
                <Route
                    path="/signup"
                    element={<SessionRoute
                        component={SignupForm}
                        loggedIn={!!currentUser}
                    />}
                />
                <Route
                    path="/login"
                    element={<SessionRoute
                        component={LoginForm}
                        loggedIn={!!currentUser}
                    />}
                />
                <Route
                    path="/tracks/:trackName"
                    element={<Suspense fallback={<div></div>}>
                        <TrackShow />
                    </Suspense>}
                />
                <Route path="/account" element={
                    <AccountRoute
                        component={AccountShow}
                        loggedIn={!!currentUser}
                    />
                } />
            </Routes>
        </div>
    );
}

export default App;