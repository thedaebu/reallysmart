import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../contexts/theme_context";
import * as CommentActions from "../../actions/comment_actions";
import CommentItem from "./CommentItem";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, Comment, CommentAction, CreatedComment, State, Track, User } from "../../my_types";

function CommentShow({ commentableType, parent }: { commentableType: "Track" | "Annotation"; parent: Track | Annotation; }) {
    const comments: { [key: number]: Comment; } = useSelector((state: State) => state.entities.comments);
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
        return !createStatus ? (
            <div className="comment-show--begin">
                <img className="comment-show--begin__baby" src="https://assets.genius.com/images/default_avatar_100.png" alt="Baby" />
                <textarea
                    className="comment-show--begin__text"
                    placeholder={commentableType === "Track" ?
                        "Add a comment" :
                        "You think you're really smarter?"
                    }
                    onClick={handleCreateStatus}
                    data-testid="comment-show--begin__text"
                />
            </div>
        ) : (
            <form
                className="comment-form"
                onSubmit={handleCreateSubmit}
                data-testid="comment-form"
            >
                <textarea
                    className={commentableType === "Track" ?
                        "comment-form__body--track" :
                        "comment-form__body--annotation"
                    }
                    onChange={handleBodyChange()}
                    placeholder={commentableType === "Track" ?
                        "Add a comment" :
                        "You think you're really smarter?"
                    }
                    data-testid="comment-form__body"
                />
                {errors.length > 0 && errorsDisplay()}
                <section className="comment-form__buttons">
                    <button className="comment-form__submit">Submit</button>
                    <button
                        className="comment-form__cancel"
                        onClick={handleCreateStatus}
                        data-testid="comment-form__cancel"
                    >
                        Cancel
                    </button>
                </section>
            </form>
        );
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
                    <li className="errors-list__item" key={idx}>{commentError}</li>
                ))}
            </ul>
        );
    }

    return (
        <div 
            className={theme === "light" ?
                "comment-show" :
                "comment-show--dark"
            }
            data-testid="comment-show"
        >
            {currentUser ? (
                createForm()
            ) : (
                <div className="comment-show--session" data-testid="comment-show--session">
                    <p>Please</p>
                    <Link to="/signup">Sign Up</Link>
                    <p>or</p>
                    <Link to="/login">Log In</Link>
                    <p> to comment.</p>
                </div>
            )}
            {currentComments.length && (
                <ul className="comment-items">
                    {currentComments.map((comment: Comment) => (
                        <CommentItem
                            comment={comment}
                            commentableType={commentableType}
                            parent={parent}
                            key={comment.id}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CommentShow;