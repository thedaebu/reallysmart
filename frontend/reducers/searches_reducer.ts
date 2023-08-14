import { RECEIVE_SEARCHES } from "../actions/search_actions";
import { IndexTrack, SearchAction } from "../my_types";

const searchesReducer = (state: { [key: number]: IndexTrack; } = {}, action: SearchAction) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_SEARCHES:
            return action.searches;
        default:
            return state;
    }
};

export default searchesReducer;