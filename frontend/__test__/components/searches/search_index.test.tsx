import React from "react";
import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import { IndexTrack } from "../../../my_types";
import { renderNonShowComponentWithoutUser, testShowStoreWithoutUser } from "../../test_store_data";
import * as SearchActions from "../../../actions/search_actions";
import Searchbar from "../../../components/searches/Searchbar";

const useMockDispatch = jest.spyOn(reactRedux, "useDispatch");
const useMockState = jest.spyOn(React, "useState");
const mockFetchSearches = jest.spyOn(SearchActions, "fetchSearches");

describe("search index", () => {
    beforeEach(() => {
        renderNonShowComponentWithoutUser(<Searchbar theme="light" />);
    });
    afterEach(() => {
        cleanup();
    });

    test("useDispatch is called", () => {
        const searchbarInput = screen.queryByTestId("searchbar__input");
        userEvent.type(searchbarInput, "Niki");
        expect(useMockDispatch).toHaveBeenCalled();
    });
    test("useState is called", () => {
        expect(useMockState).toHaveBeenCalled();
    });
    test("fetchSearches is called", () => {
        const searchbarInput = screen.queryByTestId("searchbar__input");
        userEvent.type(searchbarInput, "Niki");
        expect(mockFetchSearches).toHaveBeenCalled();
    });
    describe("searchbar field", () => {
        test("contains no value at start", () => {
            const searchbarInput = screen.queryByTestId("searchbar__input");
            expect(searchbarInput).toBeEmptyDOMElement();
        });
        test("contains value of what is typed in it by user", () => {
            const searchbarInput = screen.queryByTestId("searchbar__input");
            userEvent.type(searchbarInput, "Niki");
            expect(searchbarInput).toHaveValue("Niki");
        });
    });
    describe("search index", () => {
        test("is not shown at start", () => {
            const searchIndex = screen.queryByTestId("search-index");
            expect(searchIndex).not.toBeInTheDocument();
        });
        test("is shown once the user types in the searchbar field", () => {
            const searchbarInput = screen.queryByTestId("searchbar__input");
            userEvent.type(searchbarInput, "Niki");
            const searchIndex = screen.queryByTestId("search-index");
            expect(searchIndex).toBeInTheDocument();
        });
    });
    describe("search index items", () => {
        test("displays 5 search index items at maximum", () => {
            const searchbarInput = screen.queryByTestId("searchbar__input");
            userEvent.type(searchbarInput, "Niki");
            const searchIndex = screen.queryByTestId("search-index");
            const searchItems = within(searchIndex).queryAllByTestId("search-item");
            expect(searchItems.length).toBeLessThan(6);
        });
        test("contains the artist and the title of the track", () => {
            const searchIndexData: {[key: number]: IndexTrack} = testShowStoreWithoutUser.entities.searches
            const searchbarInput = screen.queryByTestId("searchbar__input");
            userEvent.type(searchbarInput, "Niki");
            const searchIndex = screen.queryByTestId("search-index");
            const searchItems = within(searchIndex).queryAllByTestId("search-item");
            searchItems.forEach((searchIndexItem, idx) => {
                expect(searchIndexItem).toHaveTextContent(searchIndexData[idx+1].artist);
                expect(searchIndexItem).toHaveTextContent(searchIndexData[idx+1].title);
            });
        });
    });
    test("proceeds to correct url depending on which track is clicked on", () => {
        const searchbarInput = screen.queryByTestId("searchbar__input");
        userEvent.type(searchbarInput, "Niki");
        const searchIndex = screen.queryByTestId("search-index");
        const searchIndexItem = within(searchIndex).queryAllByTestId("search-item")[0];
        userEvent.click(searchIndexItem);
        let pathName = global.window.location.pathname;
        expect(pathName).toEqual("/tracks/niki__selene");
    });
});