import { RECEIVE_SEARCHES } from "../actions/search_actions";
import { Action, Track } from "../my_types";

const searchesReducer = (state: {[key: number]: Track} = {}, action: Action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_SEARCHES:
            return action.searches;
        default:
            return state;
    }
};

export default searchesReducer;