import React, { lazy, Suspense, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "../contexts/theme_context";
import { AccountRoute, SessionRoute } from "../util/route_util";
import AccountShow from "./account/AccountShow";
import DemoLogin from "./demo_login/DemoLogin";
import FlashMessage from "./flash_message/FlashMessage";
import LoginForm from "./session_form/LoginForm";
import NotificationShow from "./notifications/NotificationShow";
import Searchbar from "./searches/Searchbar";
import SessionMenu from "./session_menu/SessionMenu";
import SignupForm from "./session_form/SignupForm";
import ThemeToggle from "./theme_toggle/ThemeToggle";
const TrackIndex = lazy(() => import("./tracks/TrackIndex"));
const TrackShow = lazy(() => import("./tracks/TrackShow"));
import { State, User } from "../my_types";

function App() {
    const currentUser: User = useSelector((state: State) => state.entities.user);
    const flashMessage: string = useSelector((state: State) => state.entities.flashMessage);

    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme === "light" ?
            "app" :
            "app--dark"
        }>
            {flashMessage && <FlashMessage flashMessage={flashMessage} />}
            <header className="header">
                <Searchbar theme={theme} />
                <Link to="/" className="header__logo">REALLYSMART</Link>
                <section className="session-buttons">
                    {currentUser && <NotificationShow />}
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