import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

type Props = {
    component: any,
    loggedIn: boolean
};

export function AccountRoute(props: Props) {
    const { component, loggedIn } = props;
    const Component = component;

    return (
        loggedIn
            ? <Suspense fallback={<div></div>}>
                <Component />
            </Suspense>
            : <Navigate to="/" />
    );
}
export function SessionRoute(props: Props) {
    const { component, loggedIn } = props;
    const Component = component;

    return (
        loggedIn
            ? <Navigate to="/" />
            : <Component />
    );
}