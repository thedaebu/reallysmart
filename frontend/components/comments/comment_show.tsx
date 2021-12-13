import React, { useState, useEffect, MouseEvent, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
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
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}

function CommentShow(props: Props) {
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
                        return <CommentShowItem
                            parent={parent}
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

        setCreateAnnoStatus(true);
    }

    function handleTrackCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCreateTrackStatus(false);
    }

    function handleAnnoCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCreateAnnoStatus(false);
    }

    function handleBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);
    }

    function handleTrackSubmit(e: FormEvent<HTMLFormElement>) {
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

    function handleAnnoSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment = {
            body: body,
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