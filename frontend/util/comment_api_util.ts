interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}

export const fetchComment = (commentId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/comments/${commentId.toString()}`
        })
    );
};

export const createComment = (comment: Comment) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/comments`,
            data: { comment }
        })
    );
};