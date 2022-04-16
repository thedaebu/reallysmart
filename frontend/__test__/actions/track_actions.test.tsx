import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as TrackActions from "../../actions/track_actions";
import * as TrackAPIUtil from "../../util/api/track_api_util";
import { testTracks, testTrackShowStore } from "../test_store_data";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("track actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_TRACKS constant", () => {
            expect(TrackActions.RECEIVE_TRACKS).toEqual("RECEIVE_TRACKS");
        });
        test("exports a RECEIVE_TRACK constant", () => {
            expect(TrackActions.RECEIVE_TRACK).toEqual("RECEIVE_TRACK");
        });
    });
    // describe("functions", () => {
    //     let store: any;
    //     beforeEach(() => {
    //         store = mockStore({ tracks: {} });
    //     });
    //     describe("fetchTracks", () => {
    //         test("is exported", () => {
    //             expect(typeof TrackAPIUtil.fetchTracks).toEqual("function");
    //         });
    //         test("dispatches RECEIVE_TRACKS when fetchTracks is called", () => {
    //             const tracks = testTracks;
    //             TrackAPIUtil.fetchTracks = jest.fn(() => (
    //                 Promise.resolve(tracks)
    //             ));
    //             const actions: any = [{type: "RECEIVE_TRACKS", tracks}];
    //             return store.dispatch(TrackActions.fetchTracks()).then(() => {
    //                 expect(store.getActions()).toEqual(actions);
    //             })
    //         });
    //     });
        // describe("fetchTrack", () => {
        //     test("dispatches RECEIVE_TRACK when fetchTrack is called", () => {
        //         const track = testTrackShowStore.entities;
        //         TrackAPIUtil.fetchTrack = jest.fn((trackId) => (
        //             Promise.resolve(track)
        //         ));
        //         const actions: any = [{type: "RECEIVE_TRACK", track: track}];
        //         return store.dispatch(TrackActions.fetchTrack("1")).then(() => {
        //             expect(store.getActions()).toEqual(actions);
        //         })
        //     });
        // });
    // });
});