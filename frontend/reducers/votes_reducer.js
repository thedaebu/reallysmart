import { RECEIVE_CREATED_VOTE, RECEIVE_VOTE, REMOVE_VOTE } from "../actions/vote_actions";


const votesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    
    switch (action.type) {
        case RECEIVE_VOTE:
            return Object.assign({}, state, {[action.vote.id]: action.vote});
        case RECEIVE_CREATED_VOTE:
            return Object.assign({}, state, {[action.vote.id]: action.vote});
        case REMOVE_VOTE:
            delete newState[action.voteId];
            return newState;
        default:
            return state;
    }
};

export default votesReducer;