import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TrackShow from "../../../components/tracks/track_show";
import { testMatch, testShowStore } from "../../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testShowStore);

describe("vote show", () => {
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
        cleanup();
    });
    
    test("contains the correct amount of votes for the track comment", () => {
        const lyrics = screen.queryByTestId("lyrics__main");
        const commentShowItem1 = within(lyrics).queryAllByTestId("comment-show-item")[0];
        const voteShow1 = within(commentShowItem1).queryByTestId("vote-show");
        expect(voteShow1).toHaveTextContent("+1");
        const commentShowItem2 = within(lyrics).queryAllByTestId("comment-show-item")[1];
        const voteShow2 = within(commentShowItem2).queryByTestId("vote-show");
        expect(voteShow2).toHaveTextContent("+0");
    });
    test("contains the correct amount of votes for the annotation", () => {
        const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
        userEvent.click(annotatedSection);
        const annotationShow = screen.queryByTestId("annotation-show");
        expect(annotationShow).toHaveTextContent("+1");
    });
    test("contains the correct amount of comments for the annotation", () => {
        const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
        userEvent.click(annotatedSection);
        const annotationShow = screen.queryByTestId("annotation-show");
        const commentShowItem = within(annotationShow).queryByTestId("comment-show-item");
        const voteShow = within(commentShowItem).queryByTestId("vote-show");
        expect(voteShow).toHaveTextContent("+0");
    });
})