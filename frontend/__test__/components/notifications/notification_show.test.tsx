import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContext } from "../../../contexts/theme_context";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import actionCable from "actioncable";
import * as NotificationAPIUtil from "../../../util/api/notification_api_util";
import App from "../../../components/app";
import { Store } from "../../../store/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStoreWithoutUser: any = mockStore(testShowStoreWithoutUser);
const testStoreWithUser: any = mockStore(testShowStoreWithUser);

const useMockEffect = jest.spyOn(React, "useEffect");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useMockState = jest.spyOn(React, "useState");
const useUpdateNotification = jest.spyOn(NotificationAPIUtil, "updateNotification");

const cableApp: any = {};
cableApp["cable"] = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)

function renderComponent(store: Store) {
    render(
        <BrowserRouter>
            <MemoryRouter initialEntries={['tracks/niki__selene']}>
                <Provider store={store}>
                    <Route path='tracks/:trackName'>
                        <ThemeContext.Provider value={{theme: "light", changeTheme: jest.fn}}>
                            <App cableApp={cableApp} />
                        </ThemeContext.Provider>
                    </Route>
                </Provider>
            </MemoryRouter>
        </BrowserRouter>
    );
}

describe("notification show", () => {
    describe("no user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });

        test("does not display notification icon", () => {
            const notificationIcon = screen.queryByTestId("notification-icon");
            expect(notificationIcon).toBeFalsy();
        });
    });
    describe("current user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithUser);
        });
        afterEach(() => {
            cleanup();
        });

        describe("hooks", () => {
            test("useEffect is called", () => {
                expect(useMockEffect).toHaveBeenCalled();
            });
            test("useSelector is called", () => {
                expect(useMockSelector).toHaveBeenCalled();
            });
            test("useState is called", () => {
                expect(useMockState).toHaveBeenCalled();
            });
        });
        test("displays notification icon", () => {
            const notificationIcon = screen.queryByTestId("notification-icon");
            expect(notificationIcon).toBeTruthy();
        });
        test("does not display notification list initially", () => {
            const notificationList = screen.queryByTestId("notification-list");
            expect(notificationList).toBeFalsy();
        });
        describe("notification list", () => {
            let notificationIcon: any;
            let notificationList: any;
            let notificationItems: Array<any>;

            beforeEach(() => {
                notificationIcon = screen.queryByTestId("notification-icon");
                userEvent.click(notificationIcon);
                notificationList = screen.queryByTestId("notification-list");
                notificationItems = within(notificationList).queryAllByTestId("notification-list__item");
            });
            afterEach(() => {
                cleanup();
            });

            test("displays notification list after notification icon is clicked on", () => {
                expect(notificationList).toBeTruthy();
            });
            test("updateNotification is called when the notification list opens", () => {
                expect(useUpdateNotification).toHaveBeenCalled();
            });
            test("displays notifications sorted by latest notification", () => {
                expect(notificationItems[0]).toHaveTextContent("2022-04-11");
                expect(notificationItems[1]).toHaveTextContent("2022-04-10");
                expect(notificationItems[2]).toHaveTextContent("2022-04-09");
            });
            test("displays correct format for annotation alert", () => {
                expect(notificationItems[2]).toHaveTextContent("commented on your annotation");
            });
            test("displays correct format for mention in track comment", () => {
                expect(notificationItems[0]).toHaveTextContent("mentioned you in a comment");
                expect(notificationItems[0]).not.toHaveTextContent("for your annotation");
            });
            test("displays correct format for mention in annotation comment", () => {
                expect(notificationItems[1]).toHaveTextContent("mentioned you in a comment");
                expect(notificationItems[1]).toHaveTextContent("for the annotation");
            });
        });
    });
});