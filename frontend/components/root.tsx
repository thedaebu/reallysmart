import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink
} from "@apollo/client";
import App from "./app";

type Props = {
    store: Store<any, AnyAction>
}

function Root(props: Props) {
    const { store } = props;
    let uri: string

    if (process.env.NODE_ENV == "production") {
        uri = "https://really-smart.herokuapp.com";
    } else {
        uri = "http://localhost:3000/graphql";
    }
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    const client = new ApolloClient({
        uri: uri,
        credentials: 'same-origin',
        headers: {
            'X-CSRF-Token': csrfToken
        },
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <Provider store={ store }>
                <HashRouter>
                    <App />
                </HashRouter>
            </Provider>
        </ApolloProvider>
    );
}

export default Root;