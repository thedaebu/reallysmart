import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation, CreatedAnnotation, Track, User } from "../../my_types";
import AnnotationShowItem from "./annotation_show_item";

type Props = {
    annotation: Annotation | null,
    annotationCreateStatus: boolean,
    annotationModal: boolean,
    closeAnnotationModal: Function,
    createAnnotation: Function,
    currentUser: User,
    endIndex: number,
    fetchComment: Function,
    fetchTrack: Function,
    setAnnotationCreateStatusFalse: Function,
    setAnnotationCreateStatusTrue: Function,
    startIndex: number,
    track: Track,
    yCoord: number
}

function AnnotationShow(props: Props) {
    const [annotationBody, setAnnotationBody] = useState<string>("");

    const { annotation, annotationModal, closeAnnotationModal, createAnnotation, annotationCreateStatus, currentUser, endIndex, fetchComment, fetchTrack, setAnnotationCreateStatusFalse, setAnnotationCreateStatusTrue, startIndex, track, yCoord } = props;

    useEffect(() => {
        if (annotation !== null) {
            annotation.comment_ids.forEach((commentId: number) => {
                fetchComment(commentId);
            });
        }
    }, [annotation])

    function annotationForm() {
        if (currentUser && startIndex && startIndex !== endIndex && annotationCreateStatus === false) {
            return (
                <div
                    className="annotation-show-create-main" 
                    style={{
                        position: "relative",
                        top: yCoord
                    }}>
                    <button
                        className="annotation-show-create-begin"
                        onClick={handleAnnotationCreateStart}
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
                        top: yCoord
                    }}
                >
                    <form
                        id="annotation-show-create-form"
                        onSubmit={handleAnnotationSubmit}
                    >
                        <textarea
                            className="annotation-show-create-form-top" 
                            onChange={handleAnnotationBodyChange()}
                            placeholder="Everything you teach us is for a reason, but none of it is important."
                            value={annotationBody}
                        >
                        </textarea>
                        <div className="annotation-show-create-form-middle">
                            <p className="annotation-show-create-form-middle-tools">Tools:</p>
                            <div className="annotation-show-create-form-middle-items">
                                <a className="annotation-show-create-form-middle-item">
                                    Add Image
                                    <p className="tooltip" id="tooltip-1">Link is for styling</p>
                                </a>
                                <a className="annotation-show-create-form-middle-item">
                                    Formatting Help
                                    <p className="tooltip" id="tooltip-2">Link is for styling</p>
                                </a>
                                <div>
                                    <a className="annotation-show-create-form-middle-item">
                                        How To Annotate
                                        <p className="tooltip" id="tooltip-3">Link is for styling</p>
                                    </a>                       
                                </div>
                            </div>
                        </div>
                        <div className="annotation-show-create-form-bottom">
                            <button className="annotation-show-create-form-bottom-save-main"
                            type="submit">
                                <p className="annotation-show-create-form-bottom-save-word">Save</p>
                                <p className="annotation-show-create-form-bottom-save-score">(+5 RSQ)</p>
                            </button>
                            <button
                                className="annotation-show-create-form-bottom-cancel"
                                onClick={handleAnnotationCancel}
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
                        top: yCoord
                    }}
                >
                    <Link to="/signup">Sign Up to Start Really Smarting</Link>
                </div>
            );
        }
    }

    function handleAnnotationCreateStart(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setAnnotationCreateStatusTrue();
    }

    function handleAnnotationBodyChange() { 
        return (e: ChangeEvent<HTMLTextAreaElement>) => setAnnotationBody(e.currentTarget.value);
    }

    function handleAnnotationSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const annotation: CreatedAnnotation = {
            annotator_id: currentUser.id,
            body: annotationBody,
            end_index: endIndex,
            start_index: startIndex,
            track_id: track.id
        };

        createAnnotation(annotation)
            .then(() => fetchTrack(track.id));
        closeAnnotationModal();
        setAnnotationBody("");
        setAnnotationCreateStatusFalse();
    }

    function handleAnnotationCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        closeAnnotationModal();
        setAnnotationBody("");
        setAnnotationCreateStatusFalse();
    }

    if (annotation !== null) {
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