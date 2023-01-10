import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { Track, TrackAction } from "../my_types";

const trackReducer = (state: Track | {} = {}, action: TrackAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return {};
        case RECEIVE_TRACK:
            return action.track;
        default:
            return state;
    }
};

export default trackReducer;