import React, { ChangeEvent, Dispatch, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, AnnotationAction, State, UpdatedAnnotation, User } from "../../my_types";
import CommentShow from "../comments/comment_show";
import VoteShow from "../votes/vote_show";

function AnnotationShowItem({ annotation, trackId }: { annotation: Annotation, trackId: number }) {
    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const deleteAnnotation: Function = (annotationId: number) => dispatch(AnnotationActions.deleteAnnotation(annotationId));
    const updateAnnotation: Function = (annotation: UpdatedAnnotation) => dispatch(AnnotationActions.updateAnnotation(annotation));

    const [body, setBody] = useState<string>(annotation.body);
    const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>(annotation);
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
    const [errors, setErrors] = useState<Array<string>>([]);
    const [updateStatus, setUpdateStatus] = useState<boolean>(false);

    useEffect(() => {
        setBody(annotation.body);
    }, [updateStatus]);

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const year: string = date.getFullYear().toString();
        const month: string = (date.getMonth()+1).toString().padStart(2, "0")
        const day: string = date.getDate().toString().padStart(2, "0");
        const hour: string = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    function updateButtons() {
        if (deleteStatus === false) {
            return (
                <div className="annotation-show-item__buttons">
                    <button 
                        className="annotation-show-item__button"
                        onClick={handleUpdateStatus}
                        data-testid="annotation-show-item__edit"
                    >
                        Edit
                    </button>
                    <button
                        className="annotation-show-item__button"
                        onClick={handleDeleteStatus}
                        data-testid="annotation-show-item__delete"
                    >
                        Delete
                    </button>
                </div>
            );
        } else {
            return (
                <div className="annotation-show-item__buttons">
                    <p className="annotation-show-item__question" data-testid="annotation-show-item__question">
                        Are you sure?
                    </p>
                    <button className="annotation-show-item__button" onClick={handleDeleteSubmit}>
                        Yes
                    </button>
                    <button
                        className="annotation-show-item__button"
                        onClick={handleDeleteStatus}
                        data-testid="annotation-show-item__delete-no"
                    >
                        No
                    </button>
                </div>
            );
        }
    }

    function handleUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setUpdateStatus(!updateStatus);
        setErrors([]);
    }

    function updateForm() {
        return (
            <form
                id="annotation-show-form"
                onSubmit={handleUpdateSubmit}
                data-testid="annotation-show-form"
            >
                <textarea
                    className="annotation-show-form__body" 
                    onChange={handleBodyChange()}
                    value={body}
                >
                </textarea>
                {errors.length > 0 && errorsDisplay()}
                <div className="annotation-show-form__middle">
                    <p className="annotation-show-form__middle__tools">Tools:</p>
                    <div className="annotation-show-form__middle__items">
                        <a className="annotation-show-form__middle__item">
                            Add Image
                            <p className="tooltip">Link is for styling</p>
                        </a>
                        <a className="annotation-show-form__middle__item">
                            Formatting Help
                            <p className="tooltip">Link is for styling</p>
                        </a>
                        <div>
                            <a className="annotation-show-form__middle__item">
                                How To Annotate
                                <p className="tooltip">Link is for styling</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="annotation-show-form__bottom">
                    <button className="annotation-show-form__bottom-save" type="submit">
                        <p className="annotation-show-form__bottom-save-text">Save</p>
                    </button>
                    <button
                        className="annotation-show-form__bottom-cancel"
                        onClick={handleUpdateStatus}
                        data-testid="annotation-show-form__bottom-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    function handleBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value);
    }

    function handleUpdateSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedAnnotation: UpdatedAnnotation = {
            annotator_id: currentUser.id,
            body,
            end_index: currentAnnotation.end_index,
            id: currentAnnotation.id,
            start_index: currentAnnotation.start_index,
            track_id: trackId
        };
        updateAnnotation(updatedAnnotation)
            .then((result: AnnotationAction) => {
                if (result.type === "RECEIVE_ANNOTATION_ERRORS") {
                    setErrors(result.errors);
                } else {
                    setUpdateStatus(false);
                }
            });
    }

    function errorsDisplay() {
        return (
            <ul className="errors-list">
                {errors.map((annotationError: string, idx: number) => (
                    <li key={idx}>{annotationError}</li>
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

        deleteAnnotation(currentAnnotation.id)
            .then(() => setCurrentAnnotation(null));
    }

    return (
        <>
            {currentAnnotation && (
                updateStatus
                    ? updateForm()
                    : (
                        <div className="annotation-show-item" data-testid="annotation-show-item">
                            <p className="annotation-show-item__name">Really Smart Annotation by {annotation.annotator_name}</p>
                            <p className="annotation-show-item__body">{annotation.body}</p>
                            {annotation.created_at !== annotation.updated_at && <p className="annotation-show-item__edited">edited: {dateDisplay(annotation.updated_at)}</p>}
                            <VoteShow parent={annotation} voteableType="Annotation" />
                            {(currentUser && currentUser.id === currentAnnotation.annotator_id) && updateButtons()}
                            <CommentShow commentableType="Annotation" parent={annotation} />
                        </div>
                    )
                )
            }
        </>
    );
}

export default AnnotationShowItem;