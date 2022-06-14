import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import searchesReducer from "../../reducers/searches_reducer";
import { IndexTrack } from "../../my_types";
import { testIndexTracksData } from "../test_store_data";

describe("searches reducer", () => {
    const testTracks: { [key: number]: IndexTrack} = testIndexTracksData;

    test("exports a function", () => {
        expect(typeof searchesReducer).toEqual("function");
    });
    describe("search actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(searchesReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: { [key:number]: IndexTrack } = searchesReducer(testTracks, { type: "NONSEARCH_ACTION"});
            expect(state).toEqual(testTracks);
        });
        describe("RECEIVE_SEARCHES action", () => {
            test("returns all search data", () => {
                const state: { [key:number]: IndexTrack } = searchesReducer({}, { type: "RECEIVE_SEARCHES", searches: testTracks });
                expect(state).toEqual(testTracks);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: IndexTrack } = searchesReducer(testTracks, { type: "RECEIVE_SEARCHES", searches: {} });
                expect(testTracks).toEqual(testTracks);
            });
        });
        describe("CLEAR_SEARCHES action", () => {
            test("returns all search data", () => {
                const state: { [key:number]: IndexTrack } = searchesReducer(testTracks, { type: "CLEAR_SEARCHES" });
                expect(state).toEqual({});
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: IndexTrack } = searchesReducer(testTracks, { type: "CLEAR_SEARCHES" });
                expect(testTracks).toEqual(testTracks);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_SEARCHES action", () => {
            testStore.dispatch({ type: "RECEIVE_SEARCHES", searches: testTracks });
            expect(testStore.getState().entities.searches).toEqual(testTracks);
        });test("contains no data for CLEAR_SEARCHES action", () => {
            testStore.dispatch({ type: "CLEAR_SEARCHES" });
            expect(testStore.getState().entities.searches).toEqual({});
        });
    });
});