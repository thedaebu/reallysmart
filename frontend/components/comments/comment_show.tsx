import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as CommentActions from "../../actions/comment_actions";
import { ThemeContext } from "../../contexts/theme_context";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, Comment, CommentAction, CreatedComment, State, Track, User } from "../../my_types";
import CommentShowItem from "./comment_show_item";

function CommentShow({ commentableType, parent }: { commentableType: "Track" | "Annotation", parent: Track | Annotation }) {
    const comments: {[key: number]: Comment} = useSelector((state: State) => state.entities.comments);
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const createComment: Function = (comment: CreatedComment) => dispatch(CommentActions.createComment(comment));

    const [body, setBody] = useState<string>("");
    const [createStatus, setCreateStatus] = useState<boolean>(false);
    const [currentComments, setCurrentComments] = useState<Array<Comment>>([]);
    const [errors, setErrors] = useState<Array<string>>([]);
    
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setCurrentComments(handleCurrentComments(Object.values(comments)));
    }, [comments]);

    function handleCurrentComments(comments: Array<Comment>) {
        return comments.filter((comment: Comment) => isCurrentComment(comment));
    }

    function isCurrentComment(comment: Comment) {
        return comment.commentable_type === commentableType && comment.commentable_id === parent.id;
    }

    function createForm() {
        if (!createStatus) {
            return (
                <div className="comment-show__begin">
                    <img className="comment-show__begin--baby" src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                    <textarea
                        className="comment-show__begin--input"
                        placeholder={commentableType === "Track"
                            ? "Add a comment"
                            : "You think you're really smarter?"
                        }
                        onClick={handleCreateStatus}
                        data-testid="comment-show__begin-text"
                    />
                </div>
            )
        } else {
            return (
                <form
                    className="comment-show-form"
                    onSubmit={handleCreateSubmit}
                    data-testid="comment-show-form"
                >
                    <textarea
                        className={commentableType === "Track"
                            ? "comment-show-form__track-text"
                            : "comment-show-form__annotation-text"
                        }
                        onChange={handleBodyChange()}
                        placeholder={commentableType === "Track"
                            ? "Add a comment"
                            : "You think you're really smarter?"
                        }
                        data-testid="comment-show-form__text"
                    />
                    {errors.length > 0 && errorsDisplay()}
                    <section className="comment-show-form__buttons">
                        <button className="comment-show-form__submit">
                            <p>Submit</p>
                        </button>
                        <button
                            className="comment-show-form__cancel"
                            onClick={handleCreateStatus}
                            data-testid="comment-show-form__cancel"
                        >
                            <p>Cancel</p>
                        </button>
                    </section>
                </form>
            );
        }
    }

    function handleCreateStatus(e: MouseEvent<HTMLTextAreaElement | HTMLButtonElement>) {
        e.preventDefault();

        if (!createStatus) {
            setCreateStatus(true);
        } else {
            setBody("");
            setCreateStatus(false);
            setErrors([]);
        }
    }

    function handleBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value);
    }

    function handleCreateSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment: CreatedComment = {
            body: body,
            commentable_id: parent.id,
            commentable_type: commentableType,
            commenter_id: currentUser.id
        };
        createComment(comment)
            .then((result: CommentAction) => {
                if (result.type === "RECEIVE_COMMENT_ERRORS") {
                    setErrors(result.errors);
                } else {
                    setBody("");
                    setCreateStatus(false);
                    setErrors([]);
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

    return (
        <div 
            className={theme === "light"
                ? "comment-show"
                : "comment-show--dark"
            }
            data-testid="comment-show"
        >
            {currentUser
                ? createForm()
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