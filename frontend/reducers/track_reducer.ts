import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { Action, Track } from "../my_types";

const trackReducer = (state: {[key: number]: Track} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return {};
        case RECEIVE_TRACK:
            return {[action.track.id]: action.track};
        default:
            return state;
    }
};

export default trackReducer;