import React, { ChangeEvent, Dispatch, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as AnnotationActions from "../../actions/annotation_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { AnnotationAction, CreatedAnnotation, State, Track, User } from "../../my_types";

type Props = {
    createStatus: boolean;
    endIndex: number;
    handleCreateStatus: Function;
    handleTextDeselect: Function;
    openStatus: boolean;
    removeHighlight: Function;
    startIndex: number;
    track: Track;
};

function AnnotationPrompt(props: Props) {
    const { createStatus, endIndex, handleCreateStatus,  handleTextDeselect, openStatus, removeHighlight, startIndex, track } = props;

    const currentUser: User = useSelector((state: State) => state.entities.user);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const createAnnotation: Function = (annotation: CreatedAnnotation) => dispatch(AnnotationActions.createAnnotation(annotation));

    const [body, setBody] = useState<string>("");
    const [errors, setErrors] = useState<Array<string>>([]);

    useEffect(() => {
        setBody("");
        setErrors([]);
    }, [openStatus]);

    function createForm() {
        if (!createStatus) {
            return (
                <div className="annotation-show-begin">
                    <button className="annotation-show-begin__button" onClick={makeCreateStatusTrue}>
                        <h1>Start the Really Smart Annotation</h1>
                        <h2>(+5 RSQ)</h2>
                    </button>
                </div>
            );
        } else {
            return (
                <form
                    id="annotation-show-form"
                    onSubmit={handleCreateSubmit}
                >
                    <textarea
                        className="annotation-show-form__body" 
                        onChange={handleBodyChange()}
                        placeholder="Everything you teach us is for a reason, but none of it is important."
                        value={body}
                    >
                    </textarea>
                    {errors.length > 0 && errorsDisplay()}
                    <section className="annotation-show-form__middle">
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
                    </section>
                    <section className="annotation-show-form__bottom">
                        <button className="annotation-show-form__bottom-save" type="submit">
                            <p className="annotation-show-form__bottom-save-text">Save</p>
                            <p className="annotation-show-form__bottom-save-score">(+5 RSQ)</p>
                        </button>
                        <button className="annotation-show-form__bottom-cancel" onClick={handleAnnotationCancel}>
                            Cancel
                        </button>
                    </section>
                </form>
            );
        }
    }

    function makeCreateStatusTrue(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        handleCreateStatus();
    }

    function handleBodyChange() { 
        return (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value);
    }

    function handleCreateSubmit(e: MouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const annotation: CreatedAnnotation = {
            annotator_id: currentUser.id,
            body,
            end_index: endIndex,
            start_index: startIndex,
            track_id: track.id
        };
        createAnnotation(annotation)
            .then((result: AnnotationAction) => {
                if (result.type === "RECEIVE_ANNOTATION_ERRORS") {
                    setErrors(result.errors);
                } else {
                    handleTextDeselect();
                    setBody("");
                    setErrors([]);
                }
            });
    }

    function handleAnnotationCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        handleTextDeselect();
        removeHighlight();
        setBody("");
        setErrors([]);
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

    return (
        <>
            {currentUser
                ? createForm()
                : (
                    <div className="annotation-show-session" >
                        <Link to="/signup">Sign Up to Start Really Smarting</Link>
                    </div>
                )
            }
        </>
    );
}

export default AnnotationPrompt;