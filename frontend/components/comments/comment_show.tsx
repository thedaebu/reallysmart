import React, { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Annotation, Comment, CreatedComment, Track, User } from "../../my_types";
import CommentShowItem from "./comment_show_item";

type Props = {
    commentableType: string,
    commentMessage: string,
    comments: Array<Comment>,
    createComment: Function,
    currentUser: User,
    fetchAction: Function,
    fetchComment: Function,
    parent: Annotation | Track
}

function CommentShow(props: Props) {
    const [commentBody, setCommentBody] = useState<string>("");
    const [createAnnotationStatus, setCreateAnnotationStatus] = useState<boolean>(false);
    const [createTrackStatus, setCreateTrackStatus] = useState<boolean>(false);

    const { commentableType, commentMessage, comments, createComment, currentUser, fetchAction, parent } = props;

    function commentForm() {
        if (currentUser && createTrackStatus === true && commentableType === "Track") {
            return (
                <form
                    className="comment-show-create-end-main"
                    onSubmit={handleTrackSubmit}
                >
                    <textarea
                        className="comment-show-create-end-track-text"
                        onChange={handleBodyChange()}
                        placeholder={commentMessage}
                    />
                    <div className="comment-show-create-end-buttons">
                        <button className="comment-show-create-end-submit">
                            <p>Submit</p>
                        </button>
                        <button
                            className="comment-show-create-end-cancel"
                            onClick={handleTrackCancel}
                        >
                            <p>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        } else if (currentUser && createAnnotationStatus === true && commentableType === "Annotation") {
            return (
                <form
                    className="comment-show-create-end-main"
                    onSubmit={handleAnnoSubmit}
                >
                    <textarea
                        className="comment-show-create-end-anno-text"
                        onChange={handleBodyChange()}
                        placeholder={commentMessage}
                    />
                    <div className="comment-show-create-end-buttons">
                        <button className="comment-show-create-end-submit">
                            <p>Submit</p>
                        </button>
                        <button
                            className="comment-show-create-end-cancel"
                            onClick={handleAnnoCancel}
                        >
                            <p>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        } else if (currentUser && createTrackStatus === false && commentableType === "Track") {
            return (
                <div className="comment-show-create-begin-main">
                    <img src="https://assets.genius.com/images/default_avatar_100.png"/>
                    <textarea
                        onClick={handleTrackStatus}
                        placeholder={commentMessage}
                    />
                </div>
            );
        } else if (currentUser && createAnnotationStatus === false && commentableType === "Annotation") {
            return (
                <div className="comment-show-create-begin-main">
                    <img src="https://assets.genius.com/images/default_avatar_100.png"/>
                    <textarea
                        onClick={handleAnnoStatus}
                        placeholder={commentMessage}
                    />
                </div>
            );
        } else {
            return (
                <div className="comment-session-main">
                    <p>Please</p>
                    <Link to="/signup">Sign Up</Link>
                    <p>or</p>
                    <Link to="/login">Log In</Link>
                    <p> to comment.</p>
                </div>
            );
        }
    }

    function commentItems() {
        if (comments[0] !== undefined) {
            return (
                <ul className="comment-list-main">
                    {comments.map(comment => {
                        return <CommentShowItem
                            comment={comment}
                            commentableType={commentableType}
                            key={comment.id}
                        />
                    })}
                </ul>
            );
        } else {
            return (
                null
            );
        }
    }

    function handleTrackStatus(e: MouseEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        setCreateTrackStatus(true);
    }

    function handleAnnoStatus(e: MouseEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        setCreateAnnotationStatus(true);
    }

    function handleTrackCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCreateTrackStatus(false);
    }

    function handleAnnoCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCreateAnnotationStatus(false);
    }

    function handleBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.target.value);
    }

    function handleTrackSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id
        };

        createComment(comment).then(() => fetchAction(parent.id));
        setCreateTrackStatus(false);
    }

    function handleAnnoSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id
        };

        createComment(comment).then(() => fetchAction(parent.id));
        setCreateAnnotationStatus(false);
    }

    return (
        <div className="comment-main">
            {commentForm()}
            {commentItems()}
        </div>
    );
}

export default CommentShow;