import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import TrackShow from "../../components/tracks/track_show";
import { testMatch, testTrackStore } from "../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testTrackStore);

const useMockEffect = jest.spyOn(React, 'useEffect');
const useMockState = jest.spyOn(React, 'useState');
const useMockSelector = jest.spyOn(reactRedux, 'useSelector');
const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');

describe("lyrics", () => {
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

    test("useEffect is called", () => {
        expect(useMockEffect).toHaveBeenCalled();
    });
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
    });
    test("useSelector is called", () => {
        expect(useMockSelector).toHaveBeenCalled();
    })
    test("useDispatch is called", () => {
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("contains the correct number of annotated sections", () => {
        const annotatedSections = screen.getAllByTestId("lyrics__is-annotation");
        expect(annotatedSections.length).toBe(2);
    });
    test("contains the correct number of non-annotatid sections", () => {
        const annotatedSections = screen.getAllByTestId("lyrics__not-annotation");
        expect(annotatedSections.length).toBe(3);
    });
    test("contains the lyrics of the song", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        expect(lyricsBody).toHaveTextContent(testTrackStore.entities.tracks[1].lyrics);
    });
    
    describe("annotation show component", () => {
        test("is not show at start", () => {
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toBeFalsy();
        });
        test("is shown when an annotated section is clicked on", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toBeInTheDocument();
        });
        test("disappears when anywhere except an annotated section is clicked on after already clicking on an annotated section", () => {
            const annotatedSection = screen.queryAllByTestId("lyrics__is-annotation")[0];
            userEvent.click(annotatedSection);
            const nonAnnotatedSection = screen.queryAllByTestId("lyrics__not-annotation")[0];
            userEvent.click(nonAnnotatedSection);
            const annotationShow = screen.queryByTestId("annotation-show");
            expect(annotationShow).toBeFalsy();
        });
    });
});