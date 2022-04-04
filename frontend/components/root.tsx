import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./../graphql_client/graphql_client";
import { Store } from "./../my_types";
import App from "./app";

type Props = {
    store: Store
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