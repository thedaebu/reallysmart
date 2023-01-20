import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContext } from "../../../contexts/theme_context";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import TrackShow from "../../../components/tracks/track_show";
import * as trackActions from "../../../actions/track_actions";
import { testShowStoreWithoutUser } from "../../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testShowStoreWithoutUser);

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockEffect = jest.spyOn(React, "useEffect");
const useMockSelector = jest.spyOn(reactRedux, "useSelector");
const useFetchTrack = jest.spyOn(trackActions, "fetchTrack");

describe("track show", () => {
    render(
        <BrowserRouter>
            <MemoryRouter initialEntries={['tracks/niki__selene']}>
                <Provider store={testStore}>
                    <Route path='tracks/:trackName'>
                        <ThemeContext.Provider value={{theme: "light", changeTheme: jest.fn}}>
                            <TrackShow />
                        </ThemeContext.Provider>
                    </Route>
                </Provider>
            </MemoryRouter>
        </BrowserRouter>
    );

    test("useEffect is called", () => {
        expect(useMockEffect).toHaveBeenCalled();
    });
    test("useSelector is called", () => {
        expect(useMockSelector).toHaveBeenCalled();
    })
    test("useDispatch is called", () => {
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("fetchTrack is called", () => {
        expect(useFetchTrack).toHaveBeenCalled();
    });
    describe("track show header", () => {
        const track = testShowStoreWithoutUser.entities.track;
        const header = screen.queryByTestId("track-show-header");
        test("contains the artist and title of the track", () => {
            expect(header).toHaveTextContent(track.artist);
            expect(header).toHaveTextContent(track.title);
        });
    });
});