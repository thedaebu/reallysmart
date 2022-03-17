import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import TrackIndex from "../../components/tracks/track_index";
import * as trackActions from "../../actions/track_actions";

const tracks = [
    {
        artist: "NIKI",
        artwork_path: "https://i.ytimg.com/vi/GBqqoPSJ9GY/maxresdefault.jpg",
        id: 1,
        title: "Selene"
    },
    {
        artist: "Modjo",
        artwork_path: "https://i.ytimg.com/vi/Z0V4CtdXlhk/maxresdefault.jpg",
        id: 2,
        title: "Lady"
    },
    {
        artist: "Drake",
        artwork_path: "https://images.genius.com/65dacc63f81321a1cee1435f303a1bf5.1000x1000x1.jpg",
        id: 3,
        title: "Fake Love"
    },
    {
        artist: "Bishop Briggs",
        artwork_path: "https://images.genius.com/2f7cccb4dfe4cd619758a9d436faa5eb.1000x1000x1.png",
        id: 4,
        title: "River"
    },
    {
        artist: "Lea Salonga",
        artwork_path: "https://i.ytimg.com/vi/RxUmbraYDcE/hqdefault.jpg",
        id: 5,
        title: "Reflection"
    },
    {
        artist: "Ne-Yo",
        artwork_path: "https://images-na.ssl-images-amazon.com/images/I/516J-AHuqOL._SY355_.jpg",
        id: 6,
        title: "Stay"
    }
]

describe("track index", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const testStore = mockStore({ entities: {tracks: tracks }});

    const useFetchTracks = jest.spyOn(trackActions, 'fetchTracks');
    const useMockDispatch= jest.spyOn(reactRedux, 'useDispatch');

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
        test("dispatch should be called", () => {
            expect(useMockDispatch).toBeCalled();
        })
        test("fetchTracks should be called", () => {
            expect(useFetchTracks).toBeCalled();
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
            const trackIndexItems = screen.getAllByTestId("track-index-item");
            trackIndexItems.forEach((trackIndexItem, idx) => {
                expect(trackIndexItem).toHaveTextContent(tracks[idx].artist);
                expect(trackIndexItem).toHaveTextContent(tracks[idx].title);
            })
        })
    })
});