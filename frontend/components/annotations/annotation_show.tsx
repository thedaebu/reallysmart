import React, { ChangeEvent, Dispatch, MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as AnnotationActions from "../../actions/annotation_actions";
import { ThemeContext } from "../../contexts/theme_context";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, AnnotationAction, CreatedAnnotation, State, Track, User } from "../../my_types";
import AnnotationShowItem from "./annotation_show_item";

type Props = {
    annotation: Annotation | null,
    annotationCreateStatus: boolean,
    annotationOpenStatus: boolean,
    endIndex: number,
    handleAnnotationCreateStatus: Function,
    handleTextDeselect: Function,
    removeLyricsPartHighlight: Function,
    startIndex: number,
    track: Track,
    yCoord: number
};

function AnnotationShow(props: Props) {
    const { annotation, annotationCreateStatus, endIndex, handleAnnotationCreateStatus, removeLyricsPartHighlight, startIndex, track, yCoord, annotationOpenStatus, handleTextDeselect } = props;

    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const createAnnotation: Function = (annotation: CreatedAnnotation) => dispatch(AnnotationActions.createAnnotation(annotation));

    const [annotationBody, setAnnotationBody] = useState<string>("");
    const [annotationErrors, setAnnotationErrors] = useState<Array<string>>([]);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setAnnotationBody("");
        setAnnotationErrors([]);
    }, [annotationOpenStatus]);

    function annotationShow() {
        if (annotation) {
            return (
                <div
                    style={{
                        position: "relative",
                        top: yCoord ? yCoord : -367
                    }}
                >
                    <AnnotationShowItem annotation={annotation} trackId={track.id} />
                </div>
            );
        } else if (annotationOpenStatus) {
            return (
                <div 
                    style={{
                        position: "relative",
                        top: yCoord ? yCoord : -367
                    }}
                >
                    {currentUser 
                        ? annotationCreateForm()
                        : (
                            <div className="annotation-show-session" >
                                <Link to="/signup">Sign Up to Start Really Smarting</Link>
                            </div>
                        )
                    }
                </div>
            );
        } else {
            return (
                <p className="annotation-show-about">Highlight part of the lyrics to add an annotation<br />Click on a highlighted section to show annotation</p>
            );
        }
    }

    function annotationCreateForm() {
        if (annotationCreateStatus === false) {
            return (
                <div className="annotation-show-begin">
                    <button className="annotation-show-begin__button" onClick={setAnnotationCreateStatus}>
                        <h1>Start the Really Smart Annotation</h1>
                        <h2>(+5 RSQ)</h2>
                    </button>
                </div>
            );
        } else if (annotationCreateStatus === true) {
            return (
                <form
                    id="annotation-show-form"
                    onSubmit={handleAnnotationCreateSubmit}
                >
                    <textarea
                        className="annotation-show-form__body" 
                        onChange={handleAnnotationBodyChange()}
                        placeholder="Everything you teach us is for a reason, but none of it is important."
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
                            <p className="annotation-show-form__bottom-save-score">(+5 RSQ)</p>
                        </button>
                        <button className="annotation-show-form__bottom-cancel" onClick={handleAnnotationCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
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
            body: annotationBody,
            end_index: endIndex,
            start_index: startIndex,
            track_id: track.id
        };

        createAnnotation(annotation)
            .then((result: AnnotationAction) => {
                if (result.type === "RECEIVE_ANNOTATION_ERRORS") {
                    setAnnotationErrors(result.errors);
                } else {
                    handleTextDeselect();
                    setAnnotationBody("");
                    setAnnotationErrors([]);
                }
            });
    }

    function handleAnnotationCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        handleTextDeselect();
        removeLyricsPartHighlight();
        setAnnotationBody("");
        setAnnotationErrors([]);
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

    return (
        <div className={theme === "light" ? "annotation-show" : "annotation-show--dark"} data-testid="annotation-show">
            {annotationShow()}
        </div>
    );
}

export default AnnotationShow;