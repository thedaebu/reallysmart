import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TrackShow from "../../../components/tracks/track_show";
import { testShowStoreWithoutUser, testShowStoreWithUser } from "../../test_store_data";
import { Store } from "../../../store/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStoreWithoutUser: any = mockStore(testShowStoreWithoutUser);
const testStoreWithUser: any = mockStore(testShowStoreWithUser);

function renderComponent(store: Store) {
    render(
        <BrowserRouter>
            <MemoryRouter initialEntries={['tracks/niki__selene']}>
                <Provider store={store}>
                    <Route path='tracks/:trackName'>
                        <TrackShow/>
                    </Route>
                </Provider>
            </MemoryRouter>
        </BrowserRouter>
    );
}

describe("vote show", () => {
    describe("user irrelevant tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
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
        test("contains the correct amount of votes for the annotation comment", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            const commentShowItem = within(annotationShow).queryByTestId("comment-show-item");
            const voteShow = within(commentShowItem).queryByTestId("vote-show");
            expect(voteShow).toHaveTextContent("+0");
        });
    });
    describe("no user tests", () => {
        beforeEach(() => {
            renderComponent(testStoreWithoutUser);
        });
        afterEach(() => {
            cleanup();
        });

        test("contains an upvote button and does not change the upvote count when clicked on", () => {
            const voteShow = screen.queryAllByTestId("vote-show")[0];
            expect(voteShow).toBeTruthy();
            const voteShowNotVoted = within(voteShow).queryByTestId("vote-show__not-voted");
            expect(voteShowNotVoted).toBeTruthy();
            expect(voteShow).toHaveTextContent("+1");
            userEvent.click(voteShowNotVoted);
            expect(voteShow).toHaveTextContent("+1");
        });
    });
});