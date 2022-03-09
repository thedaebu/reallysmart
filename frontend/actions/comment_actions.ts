import { Dispatch } from "react";
import { AnyAction } from "redux";
import { CreatedComment, ReceivedComment, UpdatedComment } from "../my_types";
import * as CommentApiUtil from "./../util/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComment = (receivedComment: ReceivedComment) => {
    return ({
        type: RECEIVE_COMMENT,
        comment: receivedComment.comment,
    });
};
const removeComment = (commentId: number) => {
    return ({
        type: REMOVE_COMMENT,
        commentId
    });
};

export const fetchComment = (commentId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.fetchComment(commentId)
            .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
    );
};
export const createComment = (createdComment: CreatedComment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.createComment(createdComment)
            .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
    );
};
export const updateComment = (updatedComment: UpdatedComment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.updateComment(updatedComment)
            .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
    );
};
export const deleteComment = (commentId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.deleteComment(commentId)
            .then(() => dispatch(removeComment(commentId)))
    );
};