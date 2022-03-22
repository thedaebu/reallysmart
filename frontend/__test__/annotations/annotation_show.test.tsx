import React from "react";
import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import TrackShow from "../../components/tracks/track_show";
import { testMatch, testTrackStore } from "../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testTrackStore);

describe("annotation show", () => {
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

    test("contains the annotation body and annotator username when annotated section is clicked on", () => {
        const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
        userEvent.click(annotatedSection);
        const annotationShow = screen.queryByTestId("annotation-show");
        expect(annotationShow).toHaveTextContent("reallysmart");
        expect(annotationShow).toHaveTextContent("She is singing about Selene, her alter-ego, who comes out when she becomes under the influence. She is claiming Selene is making her do things not of her own will but she is not trying to will herself against Selene.")
    });
    test("contains comment show component", () => {
        const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
        userEvent.click(annotatedSection);
        const annotationShow = screen.queryByTestId("annotation-show");
        const commentShowItem = within(annotationShow).queryAllByTestId("comment-show-item")[0];
        expect(commentShowItem).toBeInTheDocument();
    });
    test("contains votes show component", () => {
        const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
        userEvent.click(annotatedSection);
        const annotationShow = screen.queryByTestId("annotation-show");
        const voteShow = within(annotationShow).queryAllByTestId("vote-show")[0];
        expect(voteShow).toBeInTheDocument();
    });
});