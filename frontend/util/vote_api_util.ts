interface Vote {
    id: number,
    voteable_id: number,
    voteable_type: string,
    voter_id: number
}

export const fetchVote = (voteId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/votes/${voteId.toString()}`
        })
    );
};

export const createVote = (vote: Vote) => {
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