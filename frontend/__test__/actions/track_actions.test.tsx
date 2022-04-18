import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as TrackActions from "../../actions/track_actions";
import * as TrackAPIUtil from "../../util/api/track_api_util";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("track actions", () => {
    describe("action constants", () => {
        test("exports a RECEIVE_TRACKS constant", () => {
            expect(TrackActions.RECEIVE_TRACKS).toEqual("RECEIVE_TRACKS");
        });
        test("exports a RECEIVE_TRACK constant", () => {
            expect(TrackActions.RECEIVE_TRACK).toEqual("RECEIVE_TRACK");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({tracks: {}});
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchTracks", () => {
            test("is exported", () => {
                expect(typeof TrackAPIUtil.fetchTracks).toEqual("function");
            });
            test("dispatches RECEIVE_TRACKS when fetchTracks is called", () => {
                TrackAPIUtil.fetchTracks = jest.fn(() => (
                    Promise.resolve({})
                ));
                const actions: any = [{type: "RECEIVE_TRACKS"}];
                return store.dispatch(TrackActions.fetchTracks()).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("fetchTrack", () => {
            test("is exported", () => {
                expect(typeof TrackAPIUtil.fetchTrack).toEqual("function");
            });
            test("dispatches RECEIVE_TRACK when fetchTrack is called", () => {
                TrackAPIUtil.fetchTrack = jest.fn(() => (
                    Promise.resolve({})
                ));
                const actions: Array<{[type: string]: string}> = [{type: "RECEIVE_TRACK"}];
                return store.dispatch(TrackActions.fetchTrack("1")).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});