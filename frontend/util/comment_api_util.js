export const fetchComment = (commentId) => {
    return (
        $.ajax({
            method: 'GET',
            url: `api/comments/${commentId}`
        })
    );
};

export const createComment = (comment) => {
    return (
        $.ajax({
            method: 'POST',
            url: `api/comments`,
            data: { comment }
        })
    );
};