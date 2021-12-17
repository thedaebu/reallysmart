import { Dispatch } from "react";
import { AnyAction } from "redux";
import * as VoteApiUtil from "./../util/vote_api_util";

export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const REMOVE_VOTE = "REMOVE_VOTE";

type ReceivedVote = {
    user: User,
    vote: Vote
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}
interface Vote {
    id: number,
    voteable_id: number,
    voteable_type: string,
    voter_id: number
}

const receiveVote = ({ user, vote }: { user: User, vote: Vote }) => {
    return ({
        type: RECEIVE_VOTE,
        user,
        vote
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
export const createVote = (vote: Vote) => (dispatch: Dispatch<AnyAction>) => {
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