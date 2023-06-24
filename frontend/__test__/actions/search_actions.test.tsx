import * as SearchActions from "../../actions/search_actions";
import * as SearchAPIUtil from "../../util/api/search_api_util";
import { mockStore, testIndexTracksData } from "../test_store_data";
import { IndexTrack } from "../../my_types";

describe("search actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_SEARCHES constant", () => {
            expect(SearchActions.RECEIVE_SEARCHES).toEqual("RECEIVE_SEARCHES");
        });
    });
    describe("functions", () => {
        const searches: {[key: number]: IndexTrack} = testIndexTracksData;
        let store: any;
        beforeEach(() => {
            store = mockStore({ searches: {} });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchSearches", () => {
            test("is exported", () => {
                expect(typeof SearchActions.fetchSearches).toEqual("function");
            });
            test("dispatches RECEIVE_SEARCHES when fetchSearches is called", () => {
                const data = { searches: searches };
                SearchAPIUtil.fetchSearches = jest.fn((search: string) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_SEARCHES", searches: searches }];
                return store.dispatch(SearchActions.fetchSearches("N")).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});