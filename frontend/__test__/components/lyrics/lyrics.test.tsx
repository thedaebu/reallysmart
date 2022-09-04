import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TrackShow from "../../../components/tracks/track_show";
import { testMatch, testShowStore } from "../../test_store_data";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testShowStore);

const useMockEffect = jest.spyOn(React, 'useEffect');
const useMockSelector = jest.spyOn(reactRedux, 'useSelector');
const useMockState = jest.spyOn(React, 'useState');
const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');

describe("lyrics", () => {
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
    test("contains the lyrics of the song", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        expect(lyricsBody).toHaveTextContent(testShowStore.entities.track[1].lyrics);
    });
    test("contains the correct number of annotated sections", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        const annotatedSections = within(lyricsBody).getAllByTestId("lyrics__is-annotation");
        expect(annotatedSections.length).toBe(2);
    });
    test("contains the correct number of non-annotated sections", () => {
        const lyricsBody = screen.getByTestId("lyrics__body");
        const annotatedSections = within(lyricsBody).getAllByTestId("lyrics__not-annotation");
        expect(annotatedSections.length).toBe(3);
    });
    describe("highlighted lyrics part", () => {
        test("does not exist at start", () => {
            const highlightedCurrentLyricsPart = screen.queryByTestId("lyrics__highlighted");
            expect(highlightedCurrentLyricsPart).not.toBeInTheDocument();
        });
    });
    describe("annotation show component", () => {
        test("is not shown at start", () => {
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
    describe("comment show component", () => {
        test("contains comment show component", () => {
            const lyrics = screen.queryByTestId("lyrics__main");
            const commentShowItem = within(lyrics).queryAllByTestId("comment-show-item")[0];
            expect(commentShowItem).toBeInTheDocument();
        });
    });
});