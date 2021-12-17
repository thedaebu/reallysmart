import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";

const tracksReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return Object.assign({}, action.tracks)
        case RECEIVE_TRACK:
            return Object.assign({}, {[action.track.id]: action.track})
        default:
            return state;
    }
};

export default tracksReducer;