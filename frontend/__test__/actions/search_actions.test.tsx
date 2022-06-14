import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as SearchActions from "../../actions/search_actions";
import * as SearchAPIUtil from "../../util/api/search_api_util";
import { testIndexTracksData } from "../test_store_data";
import { Middleware } from "redux";
import { IndexTrack } from "../../my_types";

const middlewares: Array<Middleware> = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("search actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_SEARCHES constant", () => {
            expect(SearchActions.RECEIVE_SEARCHES).toEqual("RECEIVE_SEARCHES");
        });
        test("exports a CLEAR_SEARCHES constant", () => {
            expect(SearchActions.CLEAR_SEARCHES).toEqual("CLEAR_SEARCHES");
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
        describe("clearSearches", () => {
            test("is exported", () => {
                expect(typeof SearchActions.clearSearches).toEqual("function");
            });
            test("dispatches CLEAR_SEARCHES when clearSearches is called", () => {
                const actions = [{ type: "CLEAR_SEARCHES" }];
                store.dispatch(SearchActions.clearSearches());
                expect(store.getActions()).toEqual(actions);
            });
        });
    });
});