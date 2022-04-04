import { Dispatch } from "react";
import { AnyAction } from "redux";
import { CreatedVote, ReceivedVote } from "../my_types";
import * as VoteAPIUtil from "../util/api/vote_api_util";

export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const REMOVE_VOTE = "REMOVE_VOTE";

const receiveVote = (receivedVote: ReceivedVote) => {
    return ({
        type: RECEIVE_VOTE,
        vote: receivedVote.vote
    });
};
const removeVote = (voteId: number) => {
    return({
        type: REMOVE_VOTE,
        voteId
    });
};

export const fetchVote = (voteId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        VoteAPIUtil.fetchVote(voteId)
            .then((receivedVote: ReceivedVote) => dispatch(receiveVote(receivedVote)))
    );
};
export const createVote = (createdVote: CreatedVote) => (dispatch: Dispatch<AnyAction>) => {
    return (
        VoteAPIUtil.createVote(createdVote)
            .then((receivedVote: ReceivedVote) => dispatch(receiveVote(receivedVote)))
    );
};
export const deleteVote = (voteId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        VoteAPIUtil.deleteVote(voteId)
            .then(() => dispatch(removeVote(voteId)))
    );
};