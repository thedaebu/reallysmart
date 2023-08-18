import React, { useState } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import { ApolloProvider } from "@apollo/client";
import graphQLClient from "../graphql_client/graphql_client";
import { ThemeContext } from "../contexts/theme_context";
import App from "./app";

function Root({ store }: { store: Store<any, AnyAction> }) {
    const [theme, setTheme] = useState<"light" | "dark">(window.sessionStorage.theme ?
        window.sessionStorage.theme :
        "light"
    );

    function changeTheme() {
        switch (theme) {
            case "light":
                setTheme("dark");
                window.sessionStorage.setItem("theme", "dark");
                break;
            case "dark":
                setTheme("light");
                window.sessionStorage.setItem("theme", "light");
                break;
        }
    }

    return (
        <Provider store={store}>
            <ApolloProvider client={graphQLClient}>
                <HashRouter>
                    <ThemeContext.Provider value={{changeTheme, theme}}>
                        <App />
                    </ThemeContext.Provider>
                </HashRouter>
            </ApolloProvider>
        </Provider>
    );
}

export default Root;