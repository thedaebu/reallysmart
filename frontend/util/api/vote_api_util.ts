import $ from "jquery";
import { CreatedVote } from "../../my_types";

export const fetchVote = (voteId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/votes/${voteId.toString()}`
        })
    );
};
export const createVote = (vote: CreatedVote) => {
    return (
        $.ajax({
            data: {
                authenticity_token: $('[name="csrf-token"]').attr("content"),
                vote
            },
            method: "POST",
            url: `api/votes`
        })
    );
};
export const deleteVote = (voteId: number) => {
    return (
        $.ajax({
            data: { authenticity_token: $('[name="csrf-token"]').attr("content") },
            method: "DELETE",
            url: `api/votes/${voteId.toString()}`
        })
    );
};