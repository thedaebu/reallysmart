import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import TrackShow from "../../components/tracks/track_show";
import * as trackActions from "../../actions/track_actions";
import { testMatch, testTrackStore } from "../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testTrackStore);

const useFetchTrack = jest.spyOn(trackActions, 'fetchTrack');
const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');
const useMockEffect = jest.spyOn(React, 'useEffect');

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
    describe("useEffect", () => {
        test("useEffect should be called", () => {
            expect(useMockEffect).toHaveBeenCalled();
        });
        test("dispatch should be called", () => {
            expect(useMockDispatch).toHaveBeenCalled();
        });
        test("fetchTrack should be called", () => {
            expect(useFetchTrack).toHaveBeenCalled();
        });
    });
    describe("track show header", () => {
        const track = testTrackStore.entities.tracks[1]
        const header = screen.getByTestId("track-show-header");
        test("contains the artist and title of the track", () => {
            expect(header).toHaveTextContent(track.artist);
            expect(header).toHaveTextContent(track.title);
        });
    });
})