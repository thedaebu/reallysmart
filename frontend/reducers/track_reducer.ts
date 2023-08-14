import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { Track, TrackAction } from "../my_types";

const defaultState: Track = {
    artist: "",
    artwork_path: "",
    id: 0,
    lyrics: "",
    spotify_path: "",
    title: ""
};

const trackReducer = (state: Track = defaultState, action: TrackAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACK:
            return action.track;
        case RECEIVE_TRACKS:
            return {};
        default:
            return state;
    }
};

export default trackReducer;