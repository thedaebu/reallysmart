import React, { ChangeEvent, Dispatch, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import * as TrackActions from "../../actions/track_actions";
import { Annotation, State, Track, UpdatedAnnotation, User } from "../../my_types";
import CommentShow from "../comments/comment_show";
import VoteShow from "../votes/vote_show";

function AnnotationShowItem({ annotation, track }: { annotation: Annotation, track: Track }) {
    const trackId: number = track.id;

    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);

    const dispatch: Dispatch<any> = useDispatch();
    const deleteAnnotation: Function = (annotationId: number) => dispatch(AnnotationActions.deleteAnnotation(annotationId));
    const fetchTrack: Function = (trackId: string) => dispatch(TrackActions.fetchTrack(trackId));
    const updateAnnotation: Function = (annotation: UpdatedAnnotation) => dispatch(AnnotationActions.updateAnnotation(annotation));

    const [annotationDeleteStatus, setAnnotationDeleteStatus] = useState<boolean>(false);
    const [annotationEditStatus, setAnnotationEditStatus] = useState<boolean>(false);
    const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>(annotation);
    const [editedAnnotationBody, setEditedAnnotationBody] = useState<string>(annotation.body);

    function annotationShowItem() {
        if (annotationEditStatus === false) {
            return (
                <div
                    className="annotation-show-item" 
                    data-testid="annotation-show-item"
                >
                    <p className="annotation-show-item__name">Really Smart Annotation by {annotation.annotator_name}</p>
                    <p className="annotation-show-item__body">{annotation.body}</p>
                    <VoteShow
                        parent={annotation}
                        voteableType="Annotation"
                    />
                    {currentUser && updatebuttons()}
                    <CommentShow
                        commentableType="Annotation"
                        parent={annotation}
                    />
                </div>
            );
        } else if (annotationEditStatus === true) {
            return (
                <form
                    id="annotation-show-form"
                    onSubmit={handleUpdatedAnnotationSubmit}
                    data-testid="annotation-show-form"
                >
                    <textarea
                        className="annotation-show-form__body" 
                        onChange={handleEditedAnnotationBodyChange()}
                        value={editedAnnotationBody}
                    >
                    </textarea>
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
                        <button className="annotation-show-form__bottom-save"
                        type="submit">
                            <p className="annotation-show-form__bottom-save-text">Save</p>
                        </button>
                        <button
                            className="annotation-show-form__bottom-cancel"
                            onClick={handleAnnotationEditStatus}
                            data-testid="annotation-show-form__bottom-cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            );
        }
    }

    function updatebuttons() {
        if (currentUser.id === currentAnnotation.annotator_id && annotationDeleteStatus === false) {
            return (
                <div className="annotation-show-item__buttons">
                    <button 
                        className="annotation-show-item__edit"
                        onClick={handleAnnotationEditStatus}
                        data-testid="annotation-show-item__edit"
                    >
                        Edit
                    </button>
                    <button
                        className="annotation-show-item__delete"
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
                    <p 
                        className="annotation-show-item__question"
                        data-testid="annotation-show-item__question"
                    >
                        Are you sure?
                    </p>
                    <button className="annotation-show-item__delete" onClick={handleAnnotationDeleteSubmit}>
                        Yes
                    </button>
                    <button
                        className="annotation-show-item__delete"
                        onClick={handleAnnotationDeleteStatus}
                        data-testid="annotation-show-item__delete-no"
                    >
                        No
                    </button>
                </div>
            );
        }
    }

    function handleAnnotationEditStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setAnnotationEditStatus(!annotationEditStatus);
    }

    function handleEditedAnnotationBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setEditedAnnotationBody(e.currentTarget.value);
    }

    function handleUpdatedAnnotationSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedAnnotation: UpdatedAnnotation = {
            annotator_id: currentUser.id,
            annotator_name: currentUser.username,
            body: editedAnnotationBody,
            end_index: currentAnnotation.end_index,
            id: currentAnnotation.id,
            start_index: currentAnnotation.start_index,
            track_id: trackId
        };

        updateAnnotation(updatedAnnotation)
            .then(() => {
                fetchTrack(trackId.toString());
                setAnnotationEditStatus(false);
            });
    }

    function handleAnnotationDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setAnnotationDeleteStatus(!annotationDeleteStatus);
    }

    function handleAnnotationDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteAnnotation(currentAnnotation.id)
            .then(() => {
                fetchTrack(trackId.toString());
                setCurrentAnnotation(null);
                setAnnotationDeleteStatus(false);
            });
    }

    return (
        <>
            {currentAnnotation && annotationShowItem()}
        </>
    );
}

export default AnnotationShowItem;