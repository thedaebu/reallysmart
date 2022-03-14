import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import { BrowserRouter } from "react-router-dom";
import TrackIndex from "../../components/tracks/track_index";
import { fetchTracks } from "../../actions/track_actions";
import { Provider } from "react-redux";

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
const props = {
    fetchTracks: fetchTracks,
    tracks: tracks
}
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore({ tracks: tracks });

describe("track index", () => {
    beforeAll(() => server.listen())
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <TrackIndex {...props} />
                </Provider>
            </BrowserRouter>
        )
    })
    afterEach(() => {
        cleanup()
        server.resetHandlers()
    });
    afterAll(() => server.close())

    describe("track index item", () => {
        test("displays the artist and title of each track", () => {
            const trackIndexItems = screen.getAllByTestId("track-index-item");
            trackIndexItems.forEach((trackIndexItem, idx) => {
                expect(trackIndexItem).toHaveTextContent(tracks[idx].artist)
                expect(trackIndexItem).toHaveTextContent(tracks[idx].title)
            })
        })
    })

    test("starts with five tracks and then shows the rest when the 'LOAD MORE' button is clicked", () => {
        const extendListButton = screen.getByTestId("track-index__load-more");
        let trackIndexItems = screen.queryAllByTestId("track-index-item");
        expect(trackIndexItems.length).toBeLessThan(6);
        fireEvent.click(extendListButton);
        trackIndexItems = screen.queryAllByTestId("track-index-item");
        expect(trackIndexItems.length).toBeGreaterThan(5);
    });
});