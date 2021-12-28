import { Dispatch } from "react";
import { AnyAction } from "redux";
import { CreatedVote, ReceivedVote } from "../my_types";
import * as VoteApiUtil from "./../util/vote_api_util";

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
        VoteApiUtil.fetchVote(voteId)
            .then((vote: ReceivedVote) => dispatch(receiveVote(vote)))
    );
};
export const createVote = (vote: CreatedVote) => (dispatch: Dispatch<AnyAction>) => {
    return (
        VoteApiUtil.createVote(vote)
            .then((vote: ReceivedVote) => dispatch(receiveVote(vote)))
    );
};
export const deleteVote = (voteId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        VoteApiUtil.deleteVote(voteId)
            .then((voteId: number) => dispatch(removeVote(voteId)))
    );
};