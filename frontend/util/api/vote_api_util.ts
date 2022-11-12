import $ from "jquery";
import { CreatedVote } from "../../my_types";

export const createVote: Function = (vote: CreatedVote) => (
    $.ajax({
        data: {
            vote,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "POST",
        url: `api/votes`
    })
);
export const deleteVote: Function = (voteId: number) => (
    $.ajax({
        data: {authenticity_token: $('[name="csrf-token"]').attr("content")},
        method: "DELETE",
        url: `api/votes/${voteId.toString()}`
    })
);