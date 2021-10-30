import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentItem from "./comment_item";

function CommentShow(props) {
    const [createTrackStatus, setCreateTrackStatus] = useState(false);
    const [createAnnoStatus, setCreateAnnoStatus] = useState(false);
    const [body, setBody] = useState("");

    const { parent, fetchComment, currentUser, commentableType, commentMessage, comments, fetchAction, createComment } = props;

    useEffect(() => {
        parent.comment_ids.forEach(id => {
            fetchComment(id);
        });
    }, []);

    function commentForm() {
        if (currentUser && createTrackStatus === true && commentableType === "Track") {
            return (
                <form
                    className="comment-show-create-end-main"
                    onSubmit={handleTrackSubmit}
                >
                    <textarea
                        className="comment-show-create-end-track-text"
                        placeholder={commentMessage}
                        onChange={handleBodyChange()}
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
        } else if (currentUser && createAnnoStatus === true && commentableType === "Annotation") {
            return (
                <form
                    className="comment-show-create-end-main"
                    onSubmit={handleAnnoSubmit}
                >
                    <textarea
                        className="comment-show-create-end-anno-text"
                        placeholder={commentMessage}
                        onChange={handleBodyChange()}
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
                        placeholder={commentMessage}
                        onClick={handleTrackStatus}
                    />
                </div>
            );
        } else if (currentUser && createAnnoStatus === false && commentableType === "Annotation") {
            return (
                <div className="comment-show-create-begin-main">
                    <img src="https://assets.genius.com/images/default_avatar_100.png"/>
                    <textarea
                        placeholder={commentMessage}
                        onClick={handleAnnoStatus}
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
                        return <CommentItem
                            parent={parent}
                            fetchAction={fetchAction}
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

    function handleTrackStatus(e) {
        e.preventDefault();

        setCreateTrackStatus(true);
    }

    function handleAnnoStatus(e) {
        e.preventDefault();

        setCreateAnnoStatus(true);
    }

    function handleTrackCancel(e) {
        e.preventDefault();

        setCreateTrackStatus(false);
    }

    function handleAnnoCancel(e) {
        e.preventDefault();

        setCreateAnnoStatus(false);
    }

    function handleBodyChange() {
        return e => setBody(e.target.value);
    }

    function handleTrackSubmit(e) {
        e.preventDefault();

        const comment = {
            body: body,
            commenter_id: currentUser.id,
            commentable_type: commentableType,
            commentable_id: parent.id
        };

        createComment(comment).then(() => fetchAction(parent.id));
        setCreateTrackStatus(false);
    }

    function handleAnnoSubmit(e) {
        e.preventDefault();

        const comment = {
            body: this.state.body,
            commenter_id: currentUser.id,
            commentable_type: commentableType,
            commentable_id: parent.id
        };

        createComment(comment).then(() => fetchAction(parent.id));
        setCreateAnnoStatus(false);
    }

    return (
        <div className="comment-main">
            {commentForm()}
            {commentItems()}
        </div>
    );
}

export default CommentShow;