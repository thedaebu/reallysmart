import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import { ApolloProvider } from "@apollo/client";
import actionCable from "actioncable";
import graphQLClient from "../graphql_client/graphql_client";
import App from "./app";

function Root({ store }: { store: Store<any, AnyAction> }) {
    const cableApp: any = {};
    cableApp["cable"] = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`);

    return (
        <Provider store={store}>
            <ApolloProvider client={graphQLClient}>
                <HashRouter>
                    <App cableApp={cableApp} />
                </HashRouter>
            </ApolloProvider>
        </Provider>
    );
}

export default Root;