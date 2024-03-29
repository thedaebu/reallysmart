import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { IndexTrack, TracksAction } from "../my_types";

const indexTracksReducer = (state: { [key: number]: IndexTrack; } = {}, action: TracksAction) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_TRACK:
            return {};
        case RECEIVE_TRACKS:
            return action.tracks;
        default:
            return state;
    }
};

export default indexTracksReducer;