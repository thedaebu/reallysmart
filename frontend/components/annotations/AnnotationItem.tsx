import React, { ChangeEvent, Dispatch, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import CommentShow from "../comments/CommentShow";
import VoteShow from "../votes/VoteShow";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, AnnotationAction, State, UpdatedAnnotation, User } from "../../my_types";

function AnnotationItem({ annotation, trackId }: { annotation: Annotation; trackId: number; }) {
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
        const month: string = (date.getMonth()+1).toString().padStart(2, "0");
        const day: string = date.getDate().toString().padStart(2, "0");
        const hour: string = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    function updateButtons() {
        return !deleteStatus ? (
            <div className="annotation-item__buttons">
                <button 
                    className="annotation-item__button"
                    onClick={handleUpdateStatus}
                    data-testid="annotation-item__edit"
                >
                    Edit
                </button>
                <button
                    className="annotation-item__button"
                    onClick={handleDeleteStatus}
                    data-testid="annotation-item__delete"
                >
                    Delete
                </button>
            </div>
        ) : (
            <div className="annotation-item__buttons">
                <p className="annotation-item__question" data-testid="annotation-item__question">Are you sure?</p>
                <button className="annotation-item__button" onClick={handleDeleteSubmit}>Yes</button>
                <button
                    className="annotation-item__button"
                    onClick={handleDeleteStatus}
                    data-testid="annotation-item__delete-no"
                >
                    No
                </button>
            </div>
        )
    }

    function handleUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setUpdateStatus(!updateStatus);
        setErrors([]);
    }

    function updateForm() {
        return (
            <form
                id="annotation-form"
                onSubmit={handleUpdateSubmit}
                data-testid="annotation-form"
            >
                <textarea
                    className="annotation-form__body" 
                    onChange={handleBodyChange()}
                    value={body}
                >
                </textarea>
                {errors.length > 0 && errorsDisplay()}
                <section className="annotation-form__middle">
                    <p className="annotation-form__middle__tools">Tools:</p>
                    <div className="annotation-form__middle__items">
                        <a className="annotation-form__middle__item">
                            Add Image
                            <p className="tooltip">Link is for styling</p>
                        </a>
                        <a className="annotation-form__middle__item">
                            Formatting Help
                            <p className="tooltip">Link is for styling</p>
                        </a>
                        <div>
                            <a className="annotation-form__middle__item">
                                How To Annotate
                                <p className="tooltip">Link is for styling</p>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="annotation-form__bottom">
                    <button className="annotation-form__bottom__submit" type="submit">
                        <p className="annotation-form__bottom__submit--text">Save</p>
                    </button>
                    <button
                        className="annotation-form__bottom__cancel"
                        onClick={handleUpdateStatus}
                        data-testid="annotation-form__bottom__cancel"
                    >
                        Cancel
                    </button>
                </section>
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
                    <li className="errors-list__item" key={idx}>{annotationError}</li>
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
                updateStatus ? (
                    updateForm()
                ) : (
                    <div className="annotation-item" data-testid="annotation-item">
                        <p className="annotation-item__name">Really Smart Annotation by {annotation.annotator_name}</p>
                        <p className="annotation-item__body">{annotation.body}</p>
                        {annotation.created_at !== annotation.updated_at && (
                            <time className="annotation-item__edited">
                                edited: {dateDisplay(annotation.updated_at)}
                            </time>
                        )}
                        <VoteShow parent={annotation} voteableType="Annotation" />
                        {(currentUser && currentUser.id === currentAnnotation.annotator_id) && updateButtons()}
                        <CommentShow commentableType="Annotation" parent={annotation} />
                    </div>
                )
            )}
        </>
    );
}

export default AnnotationItem;