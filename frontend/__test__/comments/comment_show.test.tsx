import React from "react";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import TrackShow from "../../components/tracks/track_show";
import { testMatch, testTrackShowStore } from "../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testTrackShowStore);

describe("comment show", () => {
    // beforeAll(() => server.listen());
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <TrackShow history={undefined} location={undefined} match={testMatch} />
                </Provider>
            </BrowserRouter>
        );
    })
    afterEach(() => {
        cleanup()
        // server.resetHandlers()
    });
    // afterAll(() => server.close());

    test("contains the commenter username and the body of the comment", () => {
        const lyrics = screen.queryByTestId("lyrics__main");
        const commentShowItem = within(lyrics).queryAllByTestId("comment-show-item")[0];
        expect(commentShowItem).toHaveTextContent("This is one of my new favorite songs now.");
        expect(commentShowItem).toHaveTextContent("reallysmart");
    });
    describe("comments for track", () => {
        test("contains the correct amount of comments for the track", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentShowItems = within(lyrics).queryAllByTestId("comment-show-item");
            expect(commentShowItems.length).toEqual(2);
        });
        test("contains correct comments for track", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentShowItem1 = within(lyrics).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem1).toHaveTextContent("This is one of my new favorite songs now.");
            const commentShowItem2 = within(lyrics).queryAllByTestId("comment-show-item")[1];
            expect(commentShowItem2).toHaveTextContent("I wonder what these lyrics mean.");
        });
    });
    describe("comments for annotation", () => {
        test("contains the correct amount of comments for the annotation", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            const commentShowItems = within(annotationShow).queryAllByTestId("comment-show-item");
            expect(commentShowItems.length).toEqual(1);
        });
        test("contains correct comments for the annotation", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            const commentShowItems = within(annotationShow).queryAllByTestId("comment-show-item");
            expect(commentShowItems.length).toEqual(1);
            const commentShowItem = within(annotationShow).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem).toHaveTextContent("OOOOOHHHHHHH! Now I get it.");
        });
    });
    test("contains votes show component", () => {
        const lyrics = screen.queryByTestId("lyrics__main");
        const commentShowItem = within(lyrics).queryAllByTestId("comment-show-item")[0];
        const voteShow = within(commentShowItem).queryByTestId("vote-show");
        expect(voteShow).toBeInTheDocument();
    });
});