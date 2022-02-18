import React, { ChangeEvent, MouseEvent, useState } from "react";
import { Annotation, Comment, Track, User } from "../../my_types";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    currentUser: User,
    comment: Comment;
    commentableType: string,
    deleteComment: Function,
    fetchAnnotation: Function,
    fetchTrack: Function,
    parent: Annotation | Track,
    updateComment: Function
}

function CommentShowItem(props: Props) {
    const { currentUser, comment, commentableType, deleteComment, fetchAnnotation, fetchTrack, parent, updateComment } = props;

    const [commentDeleteStatus, setCommentDeleteStatus] = useState<boolean>(false);
    const [commentUpdateStatus, setCommentUpdateStatus] = useState<boolean>(false);
    const [currentComment, setCurrentComment] = useState<Comment>(props.comment);
    const [updatedCommentBody, setUpdatedCommentBody] = useState<string>(props.comment.body);
    
    function commentItem() {
        return (
            <div>
                <div className="comment-show-item__top">
                    <div>
                        <img className="comment-show-item__baby" src="https://assets.genius.com/images/default_avatar_100.png" />
                        <p className="comment-show-item__commenter">{comment.commenter}</p>
                    </div>
                    <p className="comment-show-item__time">{handleTime(comment.updated_at)}</p>
                </div>
                <p className="comment-show-item__body">{comment.body}</p>
                <VotesShowContainer 
                    numberOfVotes={comment.number_of_votes} 
                    parent={comment} 
                    voteableId={comment.id} 
                    voteableType="Comment" 
                />
                {updatebuttons()}
            </div>
        )
    }

    function handleTime(dateTime: string) {
        const oldDate: Date = new Date(Date.parse(dateTime));
        const currentDate: Date = new Date();
        const timeDiff: number = currentDate.getTime() - oldDate.getTime();
        const dayDiff: number = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (dayDiff > 730) {
            return `${Math.floor(dayDiff/365)} years ago`;
        } else if (dayDiff > 365) {
            return `1 year ago`;
        } else if (dayDiff > 60) {
            return `${Math.floor(dayDiff/30)} months ago`;
        } else if (dayDiff > 30) {
            return `1 month ago`;
        } else if (dayDiff > 2) {
            return `${dayDiff} days ago`
        } else if (dayDiff > 1) {
            return `1 day ago`
        } else {
            return `<1 day ago`
        }
    }

    function updatebuttons() {
        if (currentUser && currentUser.id === currentComment.commenter_id && commentDeleteStatus === false) {
            return (
                <div className="comment-show-item__buttons">
                    <button className="comment-show-item__edit" onClick={handleCommentUpdateStatus}>
                        Edit
                    </button>
                    <button className="comment-show-item__delete" onClick={handleCommentDeleteStatus}>
                        Delete
                    </button>
                </div>
            );
        } else if (commentDeleteStatus === true) {
            return (
                <div className="comment-show-item__buttons">
                    <p className="comment-show_item__question">
                        Are you sure?
                    </p>
                    <button className="comment-show-item__delete" onClick={handleCommentDeleteSubmit}>
                        Yes
                    </button>
                    <button className="comment-show-item__delete" onClick={handleCommentDeleteStatus}>
                        Cancel
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }

    function handleCommentUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (commentUpdateStatus === false) {
            setCommentUpdateStatus(true);
        } else {
            setCommentUpdateStatus(false);
        }
    }

    function handleUpdatedCommentBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setUpdatedCommentBody(e.currentTarget.value)
    }

    function handleUpdatedCommentSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    function handleCommentDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (commentDeleteStatus === false) {
            setCommentDeleteStatus(true);
        } else {
            setCommentDeleteStatus(false);
        }
    }

    function handleCommentDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteComment(currentComment.id)
            .then(() => {
                if (commentableType === "Track") {
                    fetchTrack(parent.id);
                } else {
                    fetchAnnotation(parent.id);
                }
            })
        setCurrentComment(null);
        setCommentDeleteStatus(false);
    }

    if (currentComment && commentableType === "Track") {
        return (
            <li className="comment-show-item--track">
                {commentItem()}
            </li>
        );
    } else if (currentComment && commentableType === "Annotation") {
        return (
            <li className="comment-show-item--annotation">
                {commentItem()}
            </li>
        );
    } else {
        return (
            null
        );
    }
}

export default CommentShowItem;