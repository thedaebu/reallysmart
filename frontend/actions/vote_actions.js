import * as VoteApiUtil from "./../util/vote_api_util";

export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const RECEIVE_CREATED_VOTE = "RECEIVE_CREATED_VOTE";
export const REMOVE_VOTE = "REMOVE_VOTE";

const receiveVote = ({vote, user}) => {
    return ({
        type: RECEIVE_VOTE,
        vote,
        user
    });
};

const receiveCreatedVote = ({vote, user}) => {
    return ({
        type: RECEIVE_CREATED_VOTE,
        vote,
        user
    });
};

const removeVote = (voteId) => {
    return({
        type: REMOVE_VOTE,
        voteId
    });
};

export const fetchVote = (voteId) => dispatch => {
    return (
        VoteApiUtil.fetchVote(voteId).then(vote => dispatch(receiveVote(vote)))
    );
};

export const createVote = (vote) => dispatch => {
    return (
        VoteApiUtil.createVote(vote).then(vote => dispatch(receiveCreatedVote(vote)))
    );
};

export const deleteVote = (voteId) => dispatch => {
    return (
        VoteApiUtil.deleteVote(voteId).then(voteId => dispatch(removeVote(voteId)))
    );
};