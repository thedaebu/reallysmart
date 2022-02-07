import React, { MouseEvent, useState } from "react";
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

    function updatebuttons() {
        if (currentUser && currentUser.username === annotation.annotator && annotationDeleteStatus === false && annotationUpdateStatus === false) {
            return (
                <div className="annotation-show-item__buttons">
                    <button className="annotation-show-item__edit" onClick={handleAnnotationUpdateStatus}>
                        Edit
                    </button>
                    {deleteButton()} 
                </div>
            );
        } else if (annotationDeleteStatus === true) {
            return (
                <div>
                    <button className="annotation-show-item__delete" onClick={handleAnnotationDeleteSubmit}>
                        Are you sure?
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

    function handleAnnotationDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (annotationDeleteStatus === false) {
            setAnnotationDeleteStatus(true);
        } else {
            setAnnotationDeleteStatus(false);
        }
    }

    function deleteButton() {
        if (annotationDeleteStatus === false) {
            return (
                <button className="annotation-show-item__delete" onClick={handleAnnotationDeleteStatus}>
                    Delete
                </button>
            );
        } else {
            return (
                null
            );
        }
    }

    function handleAnnotationDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        deleteAnnotation(annotation.id)
            .then(() => fetchTrack(track.id));
        setAnnotationDeleteStatus(false);
    }

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
                currentUser={currentUser}
                parent={annotation}
            />
        </div>
    );
}

export default AnnotationShowItem;