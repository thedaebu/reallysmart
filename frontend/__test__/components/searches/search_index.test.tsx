import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testShowStore } from "../../test_store_data";
import * as SearchActions from "../../../actions/search_actions";
import { IndexTrack } from "../../../my_types";
import Searchbar from "../../../components/searchbar/searchbar";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore(testShowStore);

const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');
const useMockState = jest.spyOn(React, 'useState');
const mockFetchSearches = jest.spyOn(SearchActions, 'fetchSearches');

describe("search index", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <Searchbar />
                </Provider>
            </BrowserRouter>
        );
    })
    afterEach(() => {
        cleanup();
    });

    test("useDispatch is called", () => {
        const searchbarField = screen.queryByTestId("searchbar-field");
        userEvent.type(searchbarField, "Niki");
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
    });
    test("fetchSearches is called", () => {
        const searchbarField = screen.queryByTestId("searchbar-field");
        userEvent.type(searchbarField, "Niki");
        expect(mockFetchSearches).toHaveBeenCalled();
    });
    describe("searchbar field", () => {
        test("contains no value at start", () => {
            const searchbarField = screen.queryByTestId("searchbar-field");
            expect(searchbarField).toBeEmptyDOMElement();
        });
        test("contains value of what is typed in it by user", () => {
            const searchbarField = screen.queryByTestId("searchbar-field");
            userEvent.type(searchbarField, "Niki");
            expect(searchbarField).toHaveValue("Niki");
        });
    });
    describe("search index", () => {
        test("is not shown at start", () => {
            const searchIndex = screen.queryByTestId("search-index");
            expect(searchIndex).toBeFalsy();
        });
        test("is shown once the user types in the searchbar field", () => {
            const searchbarField = screen.queryByTestId("searchbar-field");
            userEvent.type(searchbarField, "Niki");
            const searchIndex = screen.queryByTestId("search-index");
            expect(searchIndex).toBeInTheDocument();
        });
    });
    describe("search index items", () => {
        test("displays 5 search index items at maximum", () => {
            const searchbarField = screen.queryByTestId("searchbar-field");
            userEvent.type(searchbarField, "Niki");
            const searchIndex = screen.queryByTestId("search-index");
            const searchIndexItems = within(searchIndex).queryAllByTestId("search-index-item");
            expect(searchIndexItems.length).toBeLessThan(6);
        });
        test("contains the artist and the title of the track", () => {
            const searchIndexData: {[key: number]: IndexTrack} = testShowStore.entities.searches
            const searchbarField = screen.queryByTestId("searchbar-field");
            userEvent.type(searchbarField, "Niki");
            const searchIndex = screen.queryByTestId("search-index");
            const searchIndexItems = within(searchIndex).queryAllByTestId("search-index-item");
            searchIndexItems.forEach((searchIndexItem, idx) => {
                expect(searchIndexItem).toHaveTextContent(searchIndexData[idx+1].artist);
                expect(searchIndexItem).toHaveTextContent(searchIndexData[idx+1].title);
            });
        });
    });
    test("proceeds to correct url depending on which track is clicked on", () => {
        const searchbarField = screen.queryByTestId("searchbar-field");
        userEvent.type(searchbarField, "Niki");
        const searchIndex = screen.queryByTestId("search-index");
        const searchIndexItem = within(searchIndex).queryAllByTestId("search-index-item")[0];
        userEvent.click(searchIndexItem);
        let pathName = global.window.location.pathname;
        expect(pathName).toEqual('/tracks/1');
    });
});