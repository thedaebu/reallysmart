import React, { ChangeEvent, MouseEvent, useState } from "react";
import { Annotation, Track, User } from "../../my_types";
import CommentShowContainer from "../comments/comment_show_container";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    annotation: Annotation,
    currentUser: User,
    deleteAnnotation: Function,
    fetchTrack: Function,
    track: Track,
    updateAnnotation: Function,
    yCoord: number
}

function AnnotationShowItem(props: Props) {
    const { annotation, currentUser, deleteAnnotation, fetchTrack, track, updateAnnotation, yCoord } = props;

    const [annotationDeleteStatus, setAnnotationDeleteStatus] = useState<boolean>(false);
    const [annotationUpdateStatus, setAnnotationUpdateStatus] = useState<boolean>(false);
    const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>(props.annotation);
    const [updatedAnnotationBody, setUpdatedAnnotationBody] = useState<string>(props.annotation.body);

    function updatebuttons() {
        if (currentUser && currentUser.id === currentAnnotation.annotator_id && annotationDeleteStatus === false) {
            return (
                <div className="annotation-show-item__buttons">
                    <button className="annotation-show-item__edit" onClick={handleAnnotationUpdateStatus}>
                        Edit
                    </button>
                    <button className="annotation-show-item__delete" onClick={handleAnnotationDeleteStatus}>
                        Delete
                    </button>
                </div>
            );
        } else if (annotationDeleteStatus === true) {
            return (
                <div className="annotation-show-item__buttons">
                    <p className="annotation-show_item__question">
                        Are you sure?
                    </p>
                    <button className="annotation-show-item__delete" onClick={handleAnnotationDeleteSubmit}>
                        Yes
                    </button>
                    <button className="annotation-show-item__delete" onClick={handleAnnotationDeleteStatus}>
                        Cancel
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }

    function handleAnnotationUpdateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (annotationUpdateStatus === false) {
            setAnnotationUpdateStatus(true);
        } else {
            setAnnotationUpdateStatus(false);
        }
    }

    function handleUpdatedAnnotationBodyChange() {
        return (e: ChangeEvent<HTMLTextAreaElement>) => setUpdatedAnnotationBody(e.currentTarget.value);
    }

    function handleAnnotationDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (annotationDeleteStatus === false) {
            setAnnotationDeleteStatus(true);
        } else {
            setAnnotationDeleteStatus(false);
        }
    }

    function handleUpdatedAnnotationSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedAnnotation = {
            annotator_id: currentUser.id,
            body: updatedAnnotationBody,
            end_index: annotation.end_index,
            id: annotation.id,
            start_index: annotation.start_index,
            track_id: track.id
        }

        updateAnnotation(updatedAnnotation)
            .then(() => fetchTrack(track.id));
        setCurrentAnnotation(null);
        setAnnotationUpdateStatus(false);
    }

    function handleAnnotationDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteAnnotation(currentAnnotation.id)
            .then(() => fetchTrack(track.id));
        setCurrentAnnotation(null);
        setAnnotationDeleteStatus(false);
    }

    if (currentAnnotation && annotationUpdateStatus === false) {
        return (
            <div
                className="annotation-show-item" 
                style={{
                    position: "relative", 
                    top: yCoord
                }}
            >
                <p className="annotation-show-item__name">Really Smart Annotation by {annotation.annotator}</p>
                <p className="annotation-show-item__body">{annotation.body}</p>
                {updatebuttons()}
                <VotesShowContainer
                    numberOfVotes={annotation.number_of_votes}
                    parent={annotation}
                    voteableId={annotation.id}
                    voteableType="Annotation"
                />
                <CommentShowContainer
                    commentableType="Annotation"
                    parent={annotation}
                />
            </div>
        );
    } else if (currentAnnotation && annotationUpdateStatus === true) {
        return (
            <div
                className="annotation-show-form"
                style={{
                    position: "relative",
                    top: yCoord
                }}
            >
                <form
                    id="annotation-show-form"
                    onSubmit={handleUpdatedAnnotationSubmit}
                >
                    <textarea
                        className="annotation-show-form__body" 
                        onChange={handleUpdatedAnnotationBodyChange()}
                        placeholder="Everything you teach us is for a reason, but none of it is important."
                        value={updatedAnnotationBody}
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
                            <p className="annotation-show-form__bottom-save-text">Update</p>
                        </button>
                        <button
                            className="annotation-show-form__bottom-cancel"
                            onClick={handleAnnotationUpdateStatus}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            null
        );
    }
}

export default AnnotationShowItem;