import { Dispatch } from "react";
import { AnyAction } from "redux";
import * as CommentApiUtil from "./../util/comment_api_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}

const receiveComment = (comment: Comment) => {
    return ({
        type: RECEIVE_COMMENT,
        comment
    });
};

export const fetchComment = (commentId: number) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.fetchComment(commentId).then((comment: Comment) => dispatch(receiveComment(comment)))
    );
};

export const createComment = (comment: Comment) => (dispatch: Dispatch<AnyAction>) => {
    return (
        CommentApiUtil.createComment(comment).then((comment: Comment) => dispatch(receiveComment(comment)))
    );
};
