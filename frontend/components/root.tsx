import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Store } from "redux";
import App from "./app";

type Props = {
    store: Store
}

function Root(props: Props) {
    const { store } = props;

    return (
        <Provider store={ store }>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    );
}

export default Root;