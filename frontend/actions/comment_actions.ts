import { Dispatch } from "react";
import * as CommentAPIUtil from "./../util/api/comment_api_util";
import { Comment, CommentAction, CreatedComment, ReceivedComment, UpdatedComment } from "../my_types";

export const RECEIVE_COMMENT: string = "RECEIVE_COMMENT";
export const RECEIVE_COMMENT_ERRORS: string = "RECEIVE_COMMENT_ERRORS";
export const REMOVE_COMMENT: string = "REMOVE_COMMENT";

export const receiveComment: Function = ({ comment }: { comment: Comment; }, flashMessage: string = "") => ({
    comment,
    flashMessage,
    type: RECEIVE_COMMENT
});
const receiveCommentErrors: Function = (errors: Array<string>) => ({
    errors,
    type: RECEIVE_COMMENT_ERRORS
});
export const removeComment: Function = (commentId: number, flashMessage: string = "") => ({
    commentId,
    flashMessage,
    type: REMOVE_COMMENT
});

export const createComment: Function = (createdComment: CreatedComment) => (dispatch: Dispatch<CommentAction>) => (
    CommentAPIUtil.createComment(createdComment)
        .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment, "Comment Creation Successful.")), (errors: JQuery.jqXHR) => receiveCommentErrors(errors.responseJSON))
        );
export const deleteComment: Function = (commentId: number) => (dispatch: Dispatch<CommentAction>) => (
    CommentAPIUtil.deleteComment(commentId)
        .then(() => dispatch(removeComment(commentId, "Comment Deletion Successful.")), (errors: JQuery.jqXHR) => dispatch(receiveCommentErrors(errors.responseJSON)))
);
export const fetchComment: Function = (commentId: number) => (dispatch: Dispatch<CommentAction>) => (
    CommentAPIUtil.fetchComment(commentId)
        .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment)))
);
export const updateComment: Function = (updatedComment: UpdatedComment) => (dispatch: Dispatch<CommentAction>) => (
    CommentAPIUtil.updateComment(updatedComment)
        .then((receivedComment: ReceivedComment) => dispatch(receiveComment(receivedComment, "Comment Update Successful.")), (errors: JQuery.jqXHR) => dispatch(receiveCommentErrors(errors.responseJSON)))
);