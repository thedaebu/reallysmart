import * as CommentApiUtil from './../util/annotation_api_util'

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

const receiveComment = ({comment, commenter}) => {
    return ({
        type: RECEIVE_COMMENT,
        comment,
        commenter
    })
}

export default fetchComment = commentId => dispatch => {
    return (
        CommentApiUtil.fetchComment(commentId).then(comment => dispatch(receiveComment(comment)))
    )
}

export default createComment = comment => dispatch => {
    return (
        CommentApiUtil.createComment(comment).then(comment => dispatch(receiveComment(comment)))
    )
}
