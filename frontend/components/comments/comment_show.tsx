import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as AnnotationActions from "../../actions/annotation_actions";
import * as CommentActions from "../../actions/comment_actions";
import * as TrackActions from "../../actions/track_actions";
import { Annotation, Comment, CreatedComment, State, Track, User } from "../../my_types";
import CommentShowItem from "./comment_show_item";

function CommentShow({ commentableType, parent }: { commentableType: "Track" | "Annotation", parent: Annotation | Track }) {
    const comments: {[key:number]: Comment} = useSelector((state: State) => state.entities.comments);
    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);

    const dispatch: Dispatch<any> = useDispatch();
    const createComment: Function = (comment: CreatedComment) => dispatch(CommentActions.createComment(comment));
    const fetchAnnotation: Function = (annotationId: number) => dispatch(AnnotationActions.fetchAnnotation(annotationId));
    const fetchTrack: Function = (trackId: string) => dispatch(TrackActions.fetchTrack(trackId));

    const [commentBody, setCommentBody] = useState<string>("");
    const [commentCreateStatus, setCommentCreateStatus] = useState<boolean>(false);

    function commentForm() {
        if (currentUser) {
            if (commentCreateStatus === false && commentableType === "Track") {
                return (
                    <div className="comment-show__begin">
                        <img src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                        <textarea
                            onClick={handleCommentCreateStatus}
                            placeholder="Add a comment"
                        />
                    </div>
                );
            } else if (commentCreateStatus === true && commentableType === "Track") {
                return (
                    <form
                        className="comment-show-form"
                        onSubmit={handleCommentSubmit}
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
                                onClick={handleCommentCreateStatus}
                            >
                                <p>Cancel</p>
                            </button>
                        </div>
                    </form>
                );
            } else if (commentCreateStatus === false && commentableType === "Annotation") {
                return (
                    <div className="comment-show__begin">
                        <img src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                        <textarea
                            onClick={handleCommentCreateStatus}
                            placeholder="You think you're really smarter?"
                        />
                    </div>
                );
            } else if (commentCreateStatus === true && commentableType === "Annotation") {
                return (
                    <form
                        className="comment-show-form"
                        onSubmit={handleCommentSubmit}
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
                                onClick={handleCommentCreateStatus}
                            >
                                <p>Cancel</p>
                            </button>
                        </div>
                    </form>
                );
            } 
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
        const currentComments = getCurrentComments(comments)
        if (currentComments.length > 0) {
            return (
                <ul className="comment-show__items">
                    {currentComments.map((comment, idx) => {
                        return (
                            <CommentShowItem
                                comment={comment}
                                commentableType={commentableType}
                                parent={parent}
                                key={idx}
                            />
                        );
                    })}
                </ul>
            );
        } else {
            return null;
        }
    }

    function getCurrentComments(comments: {[key: number]: Comment}) {
        const currentComments = Object.values(comments).filter((comment: Comment) => comment.commentable_type === commentableType && comment.commentable_id === parent.id);
        return currentComments;
    }

    function handleCommentCreateStatus(e: MouseEvent<HTMLTextAreaElement | HTMLButtonElement>) {
        e.preventDefault();

        if (commentCreateStatus === false) {
            setCommentCreateStatus(true);
        } else {
            setCommentBody("");
            setCommentCreateStatus(false);
        }
    }

    function handleCommentBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.target.value);
    }

    function handleCommentSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id,
            commenter_name: currentUser.username
        };

        if (commentableType === "Track") {
            createComment(comment)
                .then(() => fetchTrack(parent.id.toString()));
        } else {
            createComment(comment)
                .then(() => fetchAnnotation(parent.id))
        }
        setCommentBody("");
        setCommentCreateStatus(false);
    }

    return (
        <div className="comment-show">
            {commentForm()}
            {commentItems()}
        </div>
    );
}

export default CommentShow;