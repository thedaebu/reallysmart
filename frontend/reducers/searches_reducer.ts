import { CLEAR_SEARCHES, RECEIVE_SEARCHES } from "../actions/search_actions";
import { Action, Track } from "../my_types";

const searchesReducer = (state: {[key: number]: Track} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_SEARCHES:
            return action.searches;
        case CLEAR_SEARCHES:
            return {};
        default:
            return state;
    }
};

export default searchesReducer;