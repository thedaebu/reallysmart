import React, { ChangeEvent, Dispatch, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, AnnotationAction, State, UpdatedAnnotation, User } from "../../my_types";
import CommentShow from "../comments/comment_show";
import VoteShow from "../votes/vote_show";

function AnnotationShowItem({ annotation, trackId }: { annotation: Annotation, trackId: number }) {
    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const deleteAnnotation: Function = (annotationId: number) => dispatch(AnnotationActions.deleteAnnotation(annotationId));
    const updateAnnotation: Function = (annotation: UpdatedAnnotation) => dispatch(AnnotationActions.updateAnnotation(annotation));

    const [annotationBody, setAnnotationBody] = useState<string>(annotation.body);
    const [annotationDeleteStatus, setAnnotationDeleteStatus] = useState<boolean>(false);
    const [annotationErrors, setAnnotationErrors] = useState<Array<string>>([]);
    const [annotationUpdateStatus, setAnnotationUpdateStatus] = useState<boolean>(false);
    const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>(annotation);

    useEffect(() => {
        setAnnotationBody(annotation.body);
    }, [annotationUpdateStatus]);

    function dateDisplay() {
        const date: Date = new Date(Date.parse(annotation.updated_at));
        const month: string = date.getMonth() < 10 ? `0${date.getMonth().toString()}` : `${date.getMonth().toString()}`;
        const day: string = date.getDate() < 10 ? `0${date.getDate().toString()}` : `${date.getDate().toString()}`;
        const hour: string = date.getHours() < 10 ? `0${date.getHours().toString()}` : `${date.getHours().toString()}`;
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes().toString()}` : `${date.getMinutes().toString()}`;
        return `${date.getFullYear().toString()}-${month}-${day} ${hour}:${minute}`;
    }

    function updatebuttons() {
        if (currentUser.id === currentAnnotation.annotator_id && annotationDeleteStatus === false) {
            return (
                <div className="annotation-show-item__buttons">
                    <button 
                        className="annotation-show-item__button"
                        onClick={handleAnnotationUpdateStatus}
                        data-testid="annotation-show-item__edit"
                    >
                        Edit
                    </button>
                    <button
                        className="annotation-show-item__button"
                        onClick={handleAnnotationDeleteStatus}
                        data-testid="annotation-show-item__delete"
                    >
                        Delete
                    </button>
                </div>
            );
        } else if (annotationDeleteStatus === true) {
            return (
                <div className="annotation-show-item__buttons">
                    <p className="annotation-show-item__question" data-testid="annotation-show-item__question">
                        Are you sure?
                    </p>
                    <button className="annotation-show-item__button" onClick={handleAnnotationDeleteSubmit}>
                        Yes
                    </button>
                    <button
                        className="annotation-show-item__button"
                        onClick={handleAnnotationDeleteStatus}
                        data-testid="annotation-show-item__delete-no"
                    >
                        No
                    </button>
                </div>
            );
        }
    }

    function handleAnnotationUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setAnnotationUpdateStatus(!annotationUpdateStatus);
        setAnnotationErrors([]);
    }

    function annotationUpdateForm() {
        return (
            <form
                id="annotation-show-form"
                onSubmit={handleAnnotationUpdateSubmit}
                data-testid="annotation-show-form"
            >
                <textarea
                    className="annotation-show-form__body" 
                    onChange={handleAnnotationBodyChange()}
                    value={annotationBody}
                >
                </textarea>
                {annotationErrors.length > 0 && errorsDisplay()}
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
                        onClick={handleAnnotationUpdateStatus}
                        data-testid="annotation-show-form__bottom-cancel"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    function handleAnnotationBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setAnnotationBody(e.currentTarget.value);
    }

    function handleAnnotationUpdateSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedAnnotation: UpdatedAnnotation = {
            annotator_id: currentUser.id,
            body: annotationBody,
            end_index: currentAnnotation.end_index,
            id: currentAnnotation.id,
            start_index: currentAnnotation.start_index,
            track_id: trackId
        };

        updateAnnotation(updatedAnnotation)
            .then((result: AnnotationAction) => {
                if (result.type === "RECEIVE_ANNOTATION_ERRORS") {
                    setAnnotationErrors(result.errors);
                } else {
                    setAnnotationUpdateStatus(false);
                }
            });
    }

    function errorsDisplay() {
        return (
            <ul className="errors-list">
                {annotationErrors.map((annotationError: string, idx: number) => (
                    <li key={idx}>{annotationError}</li>
                ))}
            </ul>
        );
    }

    function handleAnnotationDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setAnnotationDeleteStatus(!annotationDeleteStatus);
    }

    function handleAnnotationDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteAnnotation(currentAnnotation.id)
            .then(() => setCurrentAnnotation(null));
    }

    return (
        <>
            {currentAnnotation && (
                annotationUpdateStatus === true 
                    ? annotationUpdateForm()
                    : (
                        <div className="annotation-show-item" data-testid="annotation-show-item">
                            <p className="annotation-show-item__name">Really Smart Annotation by {annotation.annotator_name}</p>
                            <p className="annotation-show-item__body">{annotation.body}</p>
                            {annotation.created_at !== annotation.updated_at && <p className="annotation-show-item__edited">edited: {`${dateDisplay()}`}</p>}
                            <VoteShow parent={annotation} voteableType="Annotation" />
                            {currentUser && updatebuttons()}
                            <CommentShow
                                commentableType="Annotation"
                                parent={annotation}
                            />
                        </div>
                    )
                )
            }
        </>
    );
}

export default AnnotationShowItem;