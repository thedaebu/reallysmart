import { CreatedVote } from "../my_types";
import * as VoteAPIUtil from "./../util/api/vote_api_util";

export const createVote: Function = (createdVote: CreatedVote) => (
    VoteAPIUtil.createVote(createdVote)
);
export const deleteVote: Function = (voteId: number) => (
    VoteAPIUtil.deleteVote(voteId)
);