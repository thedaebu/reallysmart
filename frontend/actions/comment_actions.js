import * as CommentApiUtil from './../util/comment_api_util'

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

const receiveComment = ({comment, commenter}) => {
    return ({
        type: RECEIVE_COMMENT,
        comment
    })
}

export const fetchComment = commentId => dispatch => {
    return (
        CommentApiUtil.fetchComment(commentId).then(comment => dispatch(receiveComment(comment)))
    )
}

export const createComment = comment => dispatch => {
    return (
        CommentApiUtil.createComment(comment).then(comment => dispatch(receiveComment(comment)))
    )
}
