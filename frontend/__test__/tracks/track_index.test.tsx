import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import { IndexTrack } from "../../my_types";
import TrackIndex from "../../components/tracks/track_index";
import * as trackActions from "../../actions/track_actions";
import { testIndexStore } from "../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testIndexStore);

const useFetchTracks = jest.spyOn(trackActions, 'fetchTracks');
const useMockEffect = jest.spyOn(React, 'useEffect');
const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');

describe("track index", () => {
    beforeAll(() => server.listen());
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <TrackIndex />
                </Provider>
            </BrowserRouter>
        )
    });
    afterEach(() => {
        cleanup()
        server.resetHandlers()
    });
    afterAll(() => server.close());

    describe("useEffect", () => {
        test("useEffect should be called", () => {
            expect(useMockEffect).toHaveBeenCalled();
        }) 
        test("dispatch should be called", () => {
            expect(useMockDispatch).toHaveBeenCalled();
        })
        test("fetchTracks should be called", () => {
            expect(useFetchTracks).toHaveBeenCalled();
        })
    });
    test("starts with five tracks and then shows the rest when the 'LOAD MORE' button is clicked", () => {
        const extendListButton = screen.getByTestId("track-index__load-more");
        let trackIndexItems = screen.getAllByTestId("track-index-item");
        expect(trackIndexItems.length).toBeLessThan(6);

        userEvent.click(extendListButton);
        trackIndexItems = screen.getAllByTestId("track-index-item");
        expect(trackIndexItems.length).toBeGreaterThan(5);
    });
    test("proceeds to correct url depending on which track is clicked on", () => {
        const pathName = global.window.location.pathname;
        expect(pathName).toEqual('/');

        const firstTrackIndexItem = screen.getAllByTestId("track-index-item")[0];
        userEvent.click(firstTrackIndexItem);
        let newPathName = global.window.location.pathname;
        expect(newPathName).toEqual('/tracks/1');

        const secondTrackIndexItem = screen.getAllByTestId("track-index-item")[1];
        userEvent.click(secondTrackIndexItem);
        newPathName = global.window.location.pathname;
        expect(newPathName).toEqual('/tracks/2');
    });
    describe("track index item", () => {
        test("contains track index items", () => {
            const trackIndexItems = screen.getAllByTestId("track-index-item");
            expect(trackIndexItems).toBeDefined();
            const trackIndexItem = trackIndexItems[0];
            expect(trackIndexItem).toBeInTheDocument();
        })
        test("displays the artist and title for each track index item", () => {
            const trackIndexData: {[key:number]: IndexTrack} = testIndexStore.entities.tracks;
            const trackIndexItems = screen.getAllByTestId("track-index-item");
            trackIndexItems.forEach((trackIndexItem, idx) => {
                expect(trackIndexItem).toHaveTextContent(trackIndexData[idx+1].artist);
                expect(trackIndexItem).toHaveTextContent(trackIndexData[idx+1].title);
            })
        })
    })
});