import React, { ChangeEvent, Dispatch, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CommentActions from "../../actions/comment_actions";
import VoteShow from "../votes/VoteShow";
import { AiOutlineLeft } from "react-icons/ai";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, Comment, CommentAction, State, Track, UpdatedComment, User } from "../../my_types";

type Props = {
    comment: Comment;
    commentableType: "Track" | "Annotation";
    parent: Annotation | Track;
};

function CommentItem(props: Props) {
    const { comment, commentableType, parent } = props;
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const deleteComment: Function = (commentId: number) => dispatch(CommentActions.deleteComment(commentId));
    const updateComment: Function = (comment: UpdatedComment) => dispatch(CommentActions.updateComment(comment));

    const [body, setBody] = useState<string>(comment.body);
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
    const [errors, setErrors] = useState<Array<string>>([]);
    const [updateStatus, setUpdateStatus] = useState<boolean>(false);

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
            return <><AiOutlineLeft size={16} />1 day ago</>;
        }
    }

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const year: string = date.getFullYear().toString();
        const month: string = (date.getMonth()+1).toString().padStart(2, "0");
        const day: string = date.getDate().toString().padStart(2, "0");
        const hour: string = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    function updatebuttons() {
        return !deleteStatus ? (
            <section className="comment-item__buttons">
                <button
                    className="comment-item__button"
                    onClick={handleUpdateStatus}
                    data-testid="comment-item__edit"
                >
                    Edit
                </button>
                <button
                    className="comment-item__button"
                    onClick={handleDeleteStatus}
                    data-testid="comment-item__delete"
                >
                    Delete
                </button>
            </section>
        ) : (
            <section className="comment-item__buttons" data-testid="comment-item__buttons">
                <p className="comment-item__question">
                    Are you sure?
                </p>
                <button className="comment-item__button" onClick={handleDeleteSubmit}>
                    Yes
                </button>
                <button 
                    className="comment-item__button"
                    onClick={handleDeleteStatus}
                    data-testid="comment-item__delete"
                >
                    No
                </button>
            </section>
        );
    }

    function handleUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setBody(comment.body);
        setErrors([]);
        setUpdateStatus(!updateStatus);
    }

    function updateForm() {
        return (
            <form
                className="comment-form"
                onSubmit={handleUpdateSubmit}
                data-testid="comment-form"
            >
                <textarea
                    className={commentableType === "Track" ?
                        "comment-form__body--track" :
                        "comment-form__body--annotation"
                    }
                    onChange={handleBodyChange()}
                    value={body}
                    data-testid="comment-form__body"
                />
                {errors.length > 0 && errorsDisplay()}
                <section className="comment-form__buttons">
                    <button className="comment-form__submit">
                        <p>Save</p>
                    </button>
                    <button
                        className="comment-form__cancel"
                        onClick={handleUpdateStatus}
                        data-testid="comment-form__cancel"
                    >
                        <p>Cancel</p>
                    </button>
                </section>
            </form>
        );
    }

    function handleBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value);
    }

    function handleUpdateSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedComment: UpdatedComment = {
            body,
            commentable_id: parent.id,
            commentable_type: commentableType,
            commenter_id: currentUser.id,
            id: comment.id
        };

        updateComment(updatedComment)
            .then((result: CommentAction) => {
                if (result.type === "RECEIVE_COMMENT_ERRORS") {
                    setErrors(result.errors);
                } else {
                    setErrors([]);
                    setUpdateStatus(false);
                }
            });
    }

    function errorsDisplay() {
        return (
            <ul className="errors-list">
                {errors.map((commentError: string, idx: number) => (
                    <li key={idx}>{commentError}</li>
                ))}
            </ul>
        );
    }

    function handleDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setDeleteStatus(!deleteStatus);
    }

    function handleDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteComment(comment.id)
            .then(() => setDeleteStatus(false));
    }

    return (
        <>
            <li 
                className={commentableType === "Track" ?
                    "comment-item--track" :
                    "comment-item--annotation"
                }
            >
                {updateStatus ? (
                    updateForm()
                ) : (
                    <div data-testid="comment-item">
                        <div className="comment-item__top">
                            <div>
                                <img className="comment-item__baby" src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                                <p className="comment-item__commenter">{comment.commenter_name}</p>
                            </div>
                            <div className="comment-item__time">
                                {timeDisplay()}
                                <p className="comment-item__time--tooltip">{dateDisplay(comment.created_at)}</p>
                            </div>
                        </div>
                        <p className="comment-item__body">{comment.body}</p>
                        {comment.created_at !== comment.updated_at && <time className="comment-item__edited">edited: {`${dateDisplay(comment.updated_at)}`}</time>}
                        <VoteShow parent={comment} voteableType="Comment" />
                        {(currentUser && currentUser.id === comment.commenter_id) && updatebuttons()}
                    </div>
                )}
            </li>
        </>
    );
}

export default CommentItem;