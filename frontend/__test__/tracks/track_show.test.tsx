import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import TrackShow from "../../components/tracks/track_show";
import * as trackActions from "../../actions/track_actions";
import { testMatch, testShowStore } from "../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testShowStore);

const useMockEffect = jest.spyOn(React, 'useEffect');
const useMockSelector = jest.spyOn(reactRedux, 'useSelector');
const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');
const useFetchTrack = jest.spyOn(trackActions, 'fetchTrack');


describe("track show", () => {
    // beforeAll(() => server.listen());
    afterEach(() => {
        cleanup()
        // server.resetHandlers()
    });
    // afterAll(() => server.close());

    render(
        <BrowserRouter>
            <Provider store={testStore}>
                <TrackShow history={undefined} location={undefined} match={testMatch} />
            </Provider>
        </BrowserRouter>
    )

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
        const track = testShowStore.entities.track[1]
        const header = screen.queryByTestId("track-show-header");
        test("contains the artist and title of the track", () => {
            expect(header).toHaveTextContent(track.artist);
            expect(header).toHaveTextContent(track.title);
        });
    });
})