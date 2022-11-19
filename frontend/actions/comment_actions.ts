import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Comment, CreatedComment, ReceivedComment, UpdatedComment } from "../my_types";
import * as CommentAPIUtil from "./../util/api/comment_api_util";

export const RECEIVE_COMMENT: string = "RECEIVE_COMMENT";
export const REMOVE_COMMENT: string = "REMOVE_COMMENT";

const receiveComment: Function = ({ comment }: {comment: Comment}) => ({
    comment,
    type: RECEIVE_COMMENT
});
const removeComment: Function = (commentId: number) => ({
    commentId,
    type: REMOVE_COMMENT
});

export const fetchComment: Function = (commentId: number) => (dispatch: Dispatch<AnyAction>) => (
    CommentAPIUtil.fetchComment(commentId)
        .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
);
export const createComment: Function = (createdComment: CreatedComment) => (dispatch: Dispatch<AnyAction>) => (
    CommentAPIUtil.createComment(createdComment)
        .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)), (errors: JQuery.jqXHR) => ({errors: errors.responseJSON}))
);
export const updateComment: Function = (updatedComment: UpdatedComment) => (dispatch: Dispatch<AnyAction>) => (
    CommentAPIUtil.updateComment(updatedComment)
        .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)), (errors: JQuery.jqXHR) => ({errors: errors.responseJSON}))
);
export const deleteComment: Function = (commentId: number) => (dispatch: Dispatch<AnyAction>) => (
    CommentAPIUtil.deleteComment(commentId)
        .then(() => dispatch(removeComment(commentId)), (errors: JQuery.jqXHR) => ({errors: errors.responseJSON}))
);