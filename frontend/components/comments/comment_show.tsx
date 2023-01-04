import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as CommentActions from "../../actions/comment_actions";
import { ThemeContext } from "../../contexts/theme_context";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, Comment, CommentAction, CreatedComment, State, Track, User } from "../../my_types";
import CommentShowItem from "./comment_show_item";

function CommentShow({ commentableType, parent }: { commentableType: "Track" | "Annotation", parent: Track | Annotation }) {
    const comments: {[key:number]: Comment} = useSelector((state: State) => state.entities.comments);
    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const createComment: Function = (comment: CreatedComment) => dispatch(CommentActions.createComment(comment));

    const [currentComments, setCurrentComments] = useState<Array<Comment>>([]);
    const [commentBody, setCommentBody] = useState<string>("");
    const [commentCreateStatus, setCommentCreateStatus] = useState<boolean>(false);
    const [commentErrors, setCommentErrors] = useState<Array<string>>([]);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setCurrentComments(Object.values(comments).filter((comment: Comment) => comment.commentable_type === commentableType && comment.commentable_id === parent.id));
    }, [comments]);

    function commentCreateForm() {
        if (commentCreateStatus === false) {
            return (
                <div className="comment-show__begin">
                    <img className="comment-show__begin--baby" src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                    <textarea
                        className="comment-show__begin--input"
                        placeholder={commentableType === "Track"
                            ? "Add a comment"
                            : "You think you're really smarter?"
                        }
                        onClick={handleCommentCreateStatus}
                        data-testid="comment-show__begin-text"
                    />
                </div>
            )
        } else {
            return (
                <form
                    className="comment-show-form"
                    onSubmit={handleCommentCreateSubmit}
                    data-testid="comment-show-form"
                >
                    <textarea
                        className={commentableType === "Track"
                            ? "comment-show-form__track-text"
                            : "comment-show-form__annotation-text"
                        }
                        onChange={handleCommentBodyChange()}
                        placeholder={commentableType === "Track"
                            ? "Add a comment"
                            : "You think you're really smarter?"
                        }
                        data-testid="comment-show-form__text"
                    />
                    {commentErrors.length > 0 && errorsDisplay()}
                    <div className="comment-show-form__buttons">
                        <button className="comment-show-form__submit">
                            <p>Submit</p>
                        </button>
                        <button
                            className="comment-show-form__cancel"
                            onClick={handleCommentCreateStatus}
                            data-testid="comment-show-form__cancel"
                        >
                            <p>Cancel</p>
                        </button>
                    </div>
                </form>
            );
        }
    }

    function handleCommentCreateStatus(e: MouseEvent<HTMLTextAreaElement | HTMLButtonElement>) {
        e.preventDefault();

        if (commentCreateStatus === false) {
            setCommentCreateStatus(true);
        } else {
            setCommentBody("");
            setCommentCreateStatus(false);
            setCommentErrors([]);
        }
    }

    function handleCommentBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.target.value);
    }

    function handleCommentCreateSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: commentBody,
            commentable_type: commentableType,
            commentable_id: parent.id,
            commenter_id: currentUser.id
        };

        createComment(comment)
            .then((result: CommentAction) => {
                if (result.type === "RECEIVE_COMMENT_ERRORS") {
                    setCommentErrors(result.errors);
                } else {
                    setCommentBody("");
                    setCommentCreateStatus(false);
                    setCommentErrors([]);
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

    return (
        <div className={theme === "light" ? "comment-show" : "comment-show--dark"} data-testid="comment-show">
            {currentUser
                ? commentCreateForm()
                : (
                    <div className="comment-show__session" data-testid="comment-show__session">
                        <p>Please</p>
                        <Link to="/signup">Sign Up</Link>
                        <p>or</p>
                        <Link to="/login">Log In</Link>
                        <p> to comment.</p>
                    </div>
                )
            }
            {currentComments.length > 0 && (
                <ul className="comment-show__items">
                    {currentComments.map((comment, idx) => (
                        <CommentShowItem
                            comment={comment}
                            commentableType={commentableType}
                            parent={parent}
                            key={idx}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CommentShow;