import { Dispatch } from "react";
import { AnyAction } from "redux";
import { CreatedComment, ReceivedComment } from "../my_types";
import * as CommentApiUtil from "./../util/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveComment = (receivedComment: ReceivedComment) => {
    return ({
        type: RECEIVE_COMMENT,
        comment: receivedComment.comment,
        votes: receivedComment.votes
    });
};

export const fetchComment = (commentId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.fetchComment(commentId)
            .then((comment: ReceivedComment) => dispatch(receiveComment(comment)))
    );
};
export const createComment = (comment: CreatedComment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.createComment(comment)
            .then((comment: ReceivedComment) => dispatch(receiveComment(comment)))
    );
};
