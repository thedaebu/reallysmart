import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Comment, CreatedComment, ReceivedComment, UpdatedComment } from "../my_types";
import * as CommentAPIUtil from "./../util/api/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

const receiveComment = ({ comment }: {comment: Comment}) => {
    return ({
        type: RECEIVE_COMMENT,
        comment
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
        CommentAPIUtil.fetchComment(commentId)
            .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
    );
};
export const createComment = (createdComment: CreatedComment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentAPIUtil.createComment(createdComment)
            .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
    );
};
export const updateComment = (updatedComment: UpdatedComment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentAPIUtil.updateComment(updatedComment)
            .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
    );
};
export const deleteComment = (commentId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentAPIUtil.deleteComment(commentId)
            .then(() => dispatch(removeComment(commentId)))
    );
};