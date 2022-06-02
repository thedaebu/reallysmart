import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { Action, IndexTrack, Track } from "../my_types";

const tracksReducer = (state: {[key: number]: IndexTrack | Track} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return action.tracks;
        case RECEIVE_TRACK:
            return {[action.track.id]: action.track};
        default:
            return state;
    }
};

export default tracksReducer;