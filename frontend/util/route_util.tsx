import React, { ComponentType, ReactComponentElement } from "react";
import { connect } from "react-redux";
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter, 
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import { State } from "../my_types";

interface Props extends RouteComponentProps {
    component: ComponentType<RouteComponentProps>,
    exact: boolean,
    loggedIn: boolean,
    path: string,
}

const mSTP = (state: State) => {
  return (
    { loggedIn: !!state.session.id }
  );
};

const Auth = (props: Props) => {
    const { component, exact, loggedIn, path } = props;
    const Component = component;

    return (
        <Route
            path={ path } 
            exact={ exact } 
            render={ (props) => {
                return (
                    loggedIn 
                        ? <Redirect to="/" />
                        : <Component { ...props } />
                );
            }}
        />
    );
}

export const AuthRoute = withRouter(connect(mSTP, null)(Auth));