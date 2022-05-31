import { RECEIVE_TRACK, RECEIVE_TRACKS } from "../actions/track_actions";
import { RECEIVE_VOTE, REMOVE_VOTE } from "../actions/vote_actions";
import { Action, Vote } from "../my_types";

const votesReducer = (state: {[key: number]: Vote} = {}, action: Action) => {
    Object.freeze(state);
    const newState: {[key: number]: Vote} = Object.assign({}, state);
    
    switch (action.type) {
        case RECEIVE_TRACKS:
            return {};
        case RECEIVE_TRACK:
            return action.votes;
        case RECEIVE_VOTE:
            return {...state, [action.vote.id]: action.vote};
        case REMOVE_VOTE:
            delete newState[action.voteId];
            return newState;
        default:
            return state;
    }
};

export default votesReducer;