import React, { ChangeEvent, Dispatch, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CommentActions from "../../actions/comment_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, Comment, CommentAction, State, Track, UpdatedComment, User } from "../../my_types";
import VoteShow from "../votes/vote_show";

type Props = {
    comment: Comment;
    commentableType: "Track" | "Annotation",
    parent: Annotation | Track
};

function CommentShowItem(props: Props) {
    const { comment, commentableType, parent } = props;
    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const deleteComment: Function = (commentId: number) => dispatch(CommentActions.deleteComment(commentId));
    const updateComment: Function = (comment: UpdatedComment) => dispatch(CommentActions.updateComment(comment));

    const [commentBody, setCommentBody] = useState<string>(comment.body);
    const [commentDeleteStatus, setCommentDeleteStatus] = useState<boolean>(false);
    const [commentErrors, setCommentErrors] = useState<Array<string>>([]);
    const [commentUpdateStatus, setCommentUpdateStatus] = useState<boolean>(false);

    function timeDisplay() {
        const oldDate: Date = new Date(Date.parse(comment.created_at));
        const currentDate: Date = new Date();
        const timeDiff: number = currentDate.getTime() - oldDate.getTime();
        const dayDiff: number = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (dayDiff > 730) {
            return `${Math.floor(dayDiff/365).toString()} years ago`;
        } else if (dayDiff > 365) {
            return `1 year ago`;
        } else if (dayDiff > 60) {
            return `${Math.floor(dayDiff/30).toString()} months ago`;
        } else if (dayDiff > 30) {
            return `1 month ago`;
        } else if (dayDiff > 2) {
            return `${dayDiff.toString()} days ago`;
        } else if (dayDiff > 1) {
            return `1 day ago`;
        } else {
            return `<1 day ago`;
        }
    }

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const month: string = date.getMonth() < 10 ? `0${date.getMonth().toString()}` : `${date.getMonth().toString()}`;
        const day: string = date.getDate() < 10 ? `0${date.getDate().toString()}` : `${date.getDate().toString()}`;
        const hour: string = date.getHours() < 10 ? `0${date.getHours().toString()}` : `${date.getHours().toString()}`;
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : `${date.getMinutes().toString()}`;
        return `${date.getFullYear().toString()}-${month}-${day} ${hour}:${minute}`;
    }

    function updatebuttons() {
        if (currentUser.id === comment.commenter_id && commentDeleteStatus === false) {
            return (
                <div className="comment-show-item__buttons">
                    <button
                        className="comment-show-item__button"
                        onClick={handleCommentUpdateStatus}
                        data-testid="comment-show-item__edit"
                    >
                        Edit
                    </button>
                    <button
                        className="comment-show-item__button"
                        onClick={handleCommentDeleteStatus}
                        data-testid="comment-show-item__delete"
                    >
                        Delete
                    </button>
                </div>
            );
        } else if (commentDeleteStatus === true) {
            return (
                <div className="comment-show-item__buttons" data-testid="comment-show-item__buttons">
                    <p className="comment-show-item__question">
                        Are you sure?
                    </p>
                    <button className="comment-show-item__button" onClick={handleCommentDeleteSubmit}>
                        Yes
                    </button>
                    <button 
                        className="comment-show-item__button"
                        onClick={handleCommentDeleteStatus}
                        data-testid="comment-show-item__delete"
                    >
                        No
                    </button>
                </div>
            );
        }
    }

    function handleCommentUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCommentBody(comment.body);
        setCommentErrors([]);
        setCommentUpdateStatus(!commentUpdateStatus);
    }

    function commentUpdateForm() {
        return (
            <form
                className="comment-show-form"
                onSubmit={handleUpdatedCommentSubmit}
                data-testid="comment-show-form"
            >
                <textarea
                    className={commentableType === "Track" 
                        ? "comment-show-form__track-text"
                        : "comment-show-form__annotation-text"
                    }
                    onChange={handlecommentBodyChange()}
                    value={commentBody}
                    data-testid="comment-show-form__text"
                />
                {commentErrors.length > 0 && errorsDisplay()}
                <div className="comment-show-form__buttons">
                    <button className="comment-show-form__submit">
                        <p>Save</p>
                    </button>
                    <button
                        className="comment-show-form__cancel"
                        onClick={handleCommentUpdateStatus}
                        data-testid="comment-show-form__cancel"
                    >
                        <p>Cancel</p>
                    </button>
                </div>
            </form>
        );
    }

    function handlecommentBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.currentTarget.value);
    }

    function handleUpdatedCommentSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedComment: UpdatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id,
            commenter_name: currentUser.username,
            id: comment.id
        };

        updateComment(updatedComment)
            .then((result: CommentAction) => {
                if (result.type === "RECEIVE_COMMENT_ERRORS") {
                    setCommentErrors(result.errors);
                } else {
                    setCommentErrors([]);
                    setCommentUpdateStatus(false);
                }
            });
    }

    function errorsDisplay() {
        return (
            <ul className="errors-list">
                {commentErrors.map((commentError: string, idx: number) => (
                    <li key={idx}>{commentError}</li>
                ))}
            </ul>
        );
    }

    function handleCommentDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCommentDeleteStatus(!commentDeleteStatus);
    }

    function handleCommentDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteComment(comment.id)
            .then(() => setCommentDeleteStatus(false));
    }

    return (
        <>
            <li 
                className={commentableType === "Track" 
                    ? "comment-show-item--track"
                    : "comment-show-item--annotation"
                }
            >
                {commentUpdateStatus === true 
                    ? commentUpdateForm()
                    : (
                        <div data-testid="comment-show-item">
                            <div className="comment-show-item__top">
                                <div>
                                    <img className="comment-show-item__baby" src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                                    <p className="comment-show-item__commenter">{comment.commenter_name}</p>
                                </div>
                                <div className="comment-show-item__time">
                                    {timeDisplay()}
                                    <p className="comment-show-item__time--tooltip">{dateDisplay(comment.created_at)}</p>
                                </div>
                            </div>
                            <p className="comment-show-item__body">{comment.body}</p>
                            {comment.created_at !== comment.updated_at && <p className="comment-show-item__edited">edited: {`${dateDisplay(comment.updated_at)}`}</p>}
                            <VoteShow parent={comment} voteableType="Comment" />
                            {currentUser && updatebuttons()}
                        </div>
                    )
                }
            </li>
        </>
    );
}

export default CommentShowItem;