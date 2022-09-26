import { CreatedVote } from "../my_types";
import * as VoteAPIUtil from "./../util/api/vote_api_util";

export const createVote = (createdVote: CreatedVote) => {
    return (
        VoteAPIUtil.createVote(createdVote)
    );
};
export const deleteVote = (voteId: number) => {
    return (
        VoteAPIUtil.deleteVote(voteId)
    );
};