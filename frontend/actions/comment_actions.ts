import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Comment, CreatedComment } from "../my_types";
import * as CommentApiUtil from "./../util/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveComment = (comment: Comment) => {
    return ({
        type: RECEIVE_COMMENT,
        comment
    });
};

export const fetchComment = (commentId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.fetchComment(commentId)
            .then((comment: Comment) => dispatch(receiveComment(comment)))
    );
};
export const createComment = (comment: CreatedComment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.createComment(comment)
            .then((comment: Comment) => dispatch(receiveComment(comment)))
    );
};
