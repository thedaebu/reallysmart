import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import { ApolloProvider } from "@apollo/client";
import App from "./app";
import { graphqlClient } from "../graphql_client/graphql_client";

type Props = {
    store: Store<any, AnyAction>
}

function Root(props: Props) {
    const { store } = props;

    return (
        <ApolloProvider client={graphqlClient}>
            <Provider store={ store }>
                <HashRouter>
                    <App />
                </HashRouter>
            </Provider>
        </ApolloProvider>
    );
}

export default Root;