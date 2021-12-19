import { CreatedVote } from "../my_types";

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
            method: "POST",
            url: `api/votes`,
            data: { vote }
        })
    );
};
export const deleteVote = (voteId: number) => {
    return (
        $.ajax({
            method: "DELETE",
            url: `api/votes/${voteId.toString()}`
        })
    );
};