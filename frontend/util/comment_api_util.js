export const fetchComment = (commentId) => {
    return ({
        method: "GET",
        url: `api/comments/${commentId}`
    })
}

export const createComment = (comment) => {
    return ({
        method: "POST",
        url: `api/comments`,
        data: {comment}
    })
}