import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation, CreatedAnnotation, Track, User } from "../../my_types";
import AnnotationShowItem from "./annotation_show_item";

type Props = {
    annotation: Annotation | null,
    annotationModal: boolean,
    closeAnnotationModal: Function,
    createAnnotation: Function,
    createStatus: boolean,
    currentUser: User,
    endIndex: number,
    falseCreateStatus: Function,
    fetchTrack: Function,
    startIndex: number,
    track: Track,
    trueCreateStatus: Function,
    yCoord: number
}

function AnnotationShow(props: Props) {
    const [annotationBody, setAnnotationBody] = useState<string>("");
    const [annotationCreateStatus, setAnnotationCreateStatus] = useState<boolean>(props.createStatus);

    const { annotation, annotationModal, closeAnnotationModal, createAnnotation, createStatus, currentUser, endIndex, falseCreateStatus, fetchTrack, startIndex, track, trueCreateStatus, yCoord } = props;

    useEffect(() => {
        setAnnotationCreateStatus(createStatus)
    }, [createStatus])

    function annotationForm() {
        if (currentUser && startIndex && startIndex !== endIndex && annotationCreateStatus === false) {
            return (
                <div
                    className="annotation-show-create-main" 
                    style={{
                        position: "relative",
                        top: yCoord !== 0 
                            ? yCoord
                            : -367
                    }}>
                    <button
                        className="annotation-show-create-begin"
                        onClick={handleCreateAnnotation}
                    >
                        <h1>Start the Really Smart Annotation</h1>
                        <h2>(+5 RSQ)</h2>
                    </button>
                </div>
            )
        } else if (currentUser && startIndex && annotationCreateStatus === true){
            return (
                <div
                    className="annotation-show-create-form-main"
                    style={{
                        position: "relative",
                        top: yCoord !== 0 
                            ? yCoord
                            : -367
                    }}
                >
                    <form
                        id="annotation-show-create-form"
                        onSubmit={handleSubmitAnnotation}
                    >
                        <textarea
                            className="annotation-show-create-form-top" 
                            onChange={handleAnnotationBodyChange()}
                            placeholder="Everything you teach us is for a reason, but none of it is important."
                            value={annotationBody}
                        >
                        </textarea>

                        {/* <div className="annotation-show-create-form-middle">
                            <p className="annotation-show-create-form-middle-tools">Tools:</p>

                            <div className="annotation-show-create-form-middle-items">
                                <a className="annotation-show-create-form-middle-item" >
                                    Add Image
                                    <span class="tooltip">Link is for styling</span>
                                </a>
                                <a className="annotation-show-create-form-middle-item" >
                                    Formatting Help
                                    <span class="tooltip">Link is for styling</span>
                                </a>
                                <div>
                                    <a className="annotation-show-create-form-middle-item">
                                        How To Annotate
                                        <span class="tooltip">Link is for styling</span>
                                    </a>                       
                                </div>
                            </div>
                        </div> */}

                        <div className="annotation-show-create-form-bottom">
                            <button className="annotation-show-create-form-bottom-save-main"
                            type="submit">
                                <p className="annotation-show-create-form-bottom-save-word">Save</p>
                                <p className="annotation-show-create-form-bottom-save-score">(+5 RSQ)</p>
                            </button>
                            <button
                                className="annotation-show-create-form-bottom-cancel"
                                onClick={handleCancelAnnotation}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            );
        } else if (currentUser === undefined) {
            return (
                <div
                    className="annotation-show-main-signup"
                    style={{
                        position: "relative",
                        top: yCoord !== 0 
                            ? yCoord
                            : -367
                    }}
                >
                    <Link to="/signup">Sign Up to Start Really Smarting</Link>
                </div>
            );
        }
    }

    function handleCreateAnnotation(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        trueCreateStatus();
    }

    function handleAnnotationBodyChange() { 
        return (e: ChangeEvent<HTMLTextAreaElement>) => setAnnotationBody(e.currentTarget.value);
    }

    function handleSubmitAnnotation(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const annotation: CreatedAnnotation = {
            annotator_id: currentUser.id,
            body: annotationBody,
            end_index: endIndex,
            start_index: startIndex,
            track_id: track.id
        };

        setAnnotationBody("");
        createAnnotation(annotation)
            .then(() => fetchTrack(track.id));
        closeAnnotationModal();
        falseCreateStatus();
    }

    function handleCancelAnnotation(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setAnnotationCreateStatus(false);
        setAnnotationBody("")
        closeAnnotationModal();
        falseCreateStatus();
    }

    if (annotation) {
        return (
            <AnnotationShowItem
                annotation={annotation}
                currentUser={currentUser}
                yCoord={yCoord}
            />
        );
    } else if (annotationModal && startIndex) {
        return (
            <div>
                {annotationForm()}
            </div>
        );
    } else {
        return(
            <p>
                About "{track.title}"
            </p>
        );
    }
}

export default AnnotationShow;