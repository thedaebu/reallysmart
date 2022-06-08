import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { Action, IndexTrack } from "../my_types";

const indexTracksReducer = (state: {[key: number]: IndexTrack}, action: Action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_TRACKS:
            return action.tracks;
        case RECEIVE_TRACK:
            return {};
        default:
            return state;
    }
};

export default indexTracksReducer;