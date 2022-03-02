import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation, CreatedAnnotation, Track, User } from "../../my_types";
import AnnotationShowItemContainer from "./annotation_show_item_container";

type Props = {
    annotation: Annotation | null,
    annotationCreateStatus: boolean,
    annotationModal: boolean,
    closeAnnotationModal: Function,
    createAnnotation: Function,
    currentUser: User,
    endIndex: number,
    fetchTrack: Function,
    handleAnnotationCreateStatus: Function,
    startIndex: number,
    track: Track,
    yCoord: number
}

function AnnotationShow(props: Props) {
    const { annotation, annotationModal, closeAnnotationModal, createAnnotation, annotationCreateStatus, currentUser, endIndex, fetchTrack, handleAnnotationCreateStatus, startIndex, track, yCoord } = props;
    
    const [annotationBody, setAnnotationBody] = useState<string>("");

    function annotationShow() {
        if (annotation) {
            return (
                <AnnotationShowItemContainer
                    annotation={annotation}
                    track={track}
                    yCoord={yCoord}
                />
            );
        } else if (annotationModal && startIndex) {
            return (
                <div className="annotation-show__without-annotation">
                    {annotationForm()}
                </div>
            );
        } else {
            return(
                <p className="annotation-show__without-annotation">
                    About "{track.title}"
                </p>
            );
        }
    }

    function annotationForm() {
        if (currentUser && startIndex && startIndex !== endIndex && annotationCreateStatus === false) {
            return (
                <div
                    className="annotation-show-begin" 
                    style={{
                        position: "relative",
                        top: yCoord
                    }}>
                    <button
                        className="annotation-show-begin__button"
                        onClick={setAnnotationCreateStatus}
                    >
                        <h1>Start the Really Smart Annotation</h1>
                        <h2>(+5 RSQ)</h2>
                    </button>
                </div>
            )
        } else if (currentUser && annotationCreateStatus === true) {
            return (
                <form
                    id="annotation-show-form"
                    onSubmit={handleAnnotationCreateSubmit}
                    style={{
                    position: "relative",
                    top: yCoord
                }}
                >
                    <textarea
                        className="annotation-show-form__body" 
                        onChange={handleAnnotationBodyChange()}
                        placeholder="Everything you teach us is for a reason, but none of it is important."
                        value={annotationBody}
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
                            <p className="annotation-show-form__bottom-save-score">(+5 RSQ)</p>
                        </button>
                        <button
                            className="annotation-show-form__bottom-cancel"
                            onClick={handleAnnotationCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            );
        } else {
            return (
                <div
                    className="annotation-show__session"
                    style={{
                        position: "relative",
                        top: yCoord
                    }}
                >
                    <Link to="/signup">Sign Up to Start Really Smarting</Link>
                </div>
            );
        }
    }

    function setAnnotationCreateStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        handleAnnotationCreateStatus();
    }

    function handleAnnotationBodyChange() { 
        return (e: ChangeEvent<HTMLTextAreaElement>) => setAnnotationBody(e.currentTarget.value);
    }

    function handleAnnotationCreateSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const annotation: CreatedAnnotation = {
            annotator_id: currentUser.id,
            annotator_name: currentUser.username,
            body: annotationBody,
            end_index: endIndex,
            start_index: startIndex,
            track_id: track.id
        };

        createAnnotation(annotation)
            .then(() => fetchTrack(track.id.toString()));
        closeAnnotationModal();
        setAnnotationBody("");
        handleAnnotationCreateStatus();
    }

    function handleAnnotationCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        closeAnnotationModal();
        setAnnotationBody("");
        handleAnnotationCreateStatus();
    }

    return (
        <>
            {annotationShow()}
        </>
    );
}

export default AnnotationShow;