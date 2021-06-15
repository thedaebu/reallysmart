import { CLEAR_SEARCHES, RECEIVE_SEARCHES } from "../actions/search_actions";

const searchesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_SEARCHES:
            return Object.assign({}, action.searches);
        case CLEAR_SEARCHES:
            return Object.assign({})
        default:
            return state;
    }
};

export default searchesReducer;