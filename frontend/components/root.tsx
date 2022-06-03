import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import { ApolloProvider } from "@apollo/client";
import graphQLClient from "../graphql_client/graphql_client";
import App from "./app";

function Root({ store }: { store: Store<any, AnyAction> }) {
    return (
        <Provider store={store}>
            <ApolloProvider client={graphQLClient}>
                <HashRouter>
                    <App />
                </HashRouter>
            </ApolloProvider>
        </Provider>
    );
}

export default Root;