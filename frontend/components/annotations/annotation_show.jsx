import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnnotationShowItem from "./annotation_show_item";

function AnnotationShow(props) {
    const [createStatus, setCreateStatus] = useState(props.createStatus);
    const [body, setBody] = useState("");

    const { currentUser, yCoord, startIndex, endIndex, track, annotation, annoId, createAnnotation, fetchTrack, annotationModal, closeAnnotationModal } = props;

    function annotationForm() {
        if (currentUser && startIndex && startIndex !== endIndex && createStatus === false) {
            return (
                <div
                    className="annotation-show-create-main" 
                    style={{
                        position: "relative",
                        top: yCoord-370
                    }}>
                    <span
                        className="annotation-show-create-begin"
                        onClick={handleCreateAnnotation}
                    >
                        <h1>Start the Really Smart Annotation</h1>
                        <h2>(+5 RSQ)</h2>
                    </span>
                </div>
            )
        } else if (currentUser && startIndex && createStatus === true){
            return (
                <div
                    className="annotation-show-create-form-main"
                    style={{
                        position: "relative",
                        top: yCoord-370
                    }}
                >
                    <form
                        id="annotation-show-create-form"
                        onSubmit={handleSubmitAnnotation}
                    >
                        <textarea
                            className="annotation-show-create-form-top" 
                            placeholder="Everything you teach us is for a reason, but none of it is important."
                            value={body}
                            onChange={handleFormChange()}
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
                        top: yCoord-370
                    }}
                >
                    <Link to="/signup">Sign Up to Start Really Smarting</Link>
                </div>
            );
        }
    }

    function handleCreateAnnotation(e) {
        e.preventDefault();

        setCreateStatus(true);
    }

    function handleFormChange() { 
        return e => setBody(e.target.value);
    }

    function handleSubmitAnnotation(e) {
        e.preventDefault();

        const annotation = {
            body: body,
            annotator_id: currentUser.id,
            track_id: track.id,
            start_index: startIndex,
            end_index: endIndex
        };

        setBody("");
        createAnnotation(annotation).then(() => fetchTrack(track.id));
        closeAnnotationModal();
    }

    function handleCancelAnnotation(e) {
        e.preventDefault();

        setCreateStatus(false);
        setBody("")
        closeAnnotationModal();
    }

    if (annotation) {
        return (
            <AnnotationShowItem
                annotation={annotation}
                yCoord={yCoord}
                currentUser={currentUser}
                annoId={annoId}
            />
        );
    } else if (startIndex && annotationModal) {
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