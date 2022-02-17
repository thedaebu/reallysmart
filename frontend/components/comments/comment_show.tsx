import React, { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Annotation, Comment, CreatedComment, Track, User } from "../../my_types";
import { CommentShowItemContainer } from "./comment_show_item_container";

type Props = {
    commentableType: string,
    comments: {[key: number]: Comment},
    createComment: Function,
    currentUser: User,
    fetchAnnotation: Function,
    fetchTrack: Function,
    parent: Annotation | Track
}

function CommentShow(props: Props) {
    const { commentableType, comments, createComment, currentUser, fetchAnnotation, fetchTrack, parent } = props;
    
    const [annotationCreateStatus, setAnnotationCreateStatus] = useState<boolean>(false);
    const [commentBody, setCommentBody] = useState<string>("");
    const [trackCreateStatus, setTrackCreateStatus] = useState<boolean>(false);

    function commentForm() {
        if (currentUser && trackCreateStatus === false && commentableType === "Track") {
            return (
                <div className="comment-show__begin">
                    <img src="https://assets.genius.com/images/default_avatar_100.png"/>
                    <textarea
                        onClick={handleTrackCommentStatus}
                        placeholder="Add a comment"
                    />
                </div>
            );
        } else if (currentUser && trackCreateStatus === true && commentableType === "Track") {
            return (
                <form
                    className="comment-show-form"
                    onSubmit={handleTrackCommentSubmit}
                >
                    <textarea
                        className="comment-show-form__track-text"
                        onChange={handleCommentBodyChange()}
                        placeholder="Add a comment"
                    />
                    <div className="comment-show-form__buttons">
                        <button className="comment-show-form__submit">
                            <p>Submit</p>
                        </button>
                        <button
                            className="comment-show-form__cancel"
                            onClick={handleTrackCommentCancel}
                        >
                            <p>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        } else if (currentUser && annotationCreateStatus === false && commentableType === "Annotation") {
            return (
                <div className="comment-show__begin">
                    <img src="https://assets.genius.com/images/default_avatar_100.png"/>
                    <textarea
                        onClick={handleAnnotationCommentStatus}
                        placeholder="You think you're really smarter?"
                    />
                </div>
            );
        } else if (currentUser && annotationCreateStatus === true && commentableType === "Annotation") {
            return (
                <form
                    className="comment-show-form"
                    onSubmit={handleAnnotationCommentSubmit}
                >
                    <textarea
                        className="comment-show-form__annotation-text"
                        onChange={handleCommentBodyChange()}
                        placeholder="You think you're really smarter?"
                    />
                    <div className="comment-show-form__buttons">
                        <button className="comment-show-form__submit">
                            <p>Submit</p>
                        </button>
                        <button
                            className="comment-show-form__cancel"
                            onClick={handleAnnotationCommentCancel}
                        >
                            <p>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        } else {
            return (
                <div className="comment-show__session">
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
        const currentComments: Array<Comment> = parent.comment_ids.map((id: number) => comments[id]);

        if (validComments(currentComments) === true && currentComments.length > 0) {
            return (
                <ul className="comment-show__items">
                    {currentComments.map(comment => {
                        return <CommentShowItemContainer
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

    function validComments(currentComments: Array<Comment>) {
        let isValid = true;
        currentComments.forEach((comment: Comment) => {
            if (comment === undefined) {
                isValid = false;
            }
        })
        return isValid;
    }

    function handleTrackCommentStatus(e: MouseEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        setTrackCreateStatus(true);
    }

    function handleAnnotationCommentStatus(e: MouseEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        setAnnotationCreateStatus(true);
    }

    function handleTrackCommentCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCommentBody("");
        setTrackCreateStatus(false);
    }

    function handleAnnotationCommentCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setCommentBody("");
        setAnnotationCreateStatus(false);
    }

    function handleCommentBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.target.value);
    }

    function handleTrackCommentSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id
        };

        createComment(comment)
            .then(() => fetchTrack(parent.id.toString()));
        setTrackCreateStatus(false);
    }

    function handleAnnotationCommentSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id
        };

        createComment(comment)
            .then(() => fetchAnnotation(parent.id));
        setAnnotationCreateStatus(false);
    }

    return (
        <div className="comment-show">
            {commentForm()}
            {commentItems()}
        </div>
    );
}

export default CommentShow;