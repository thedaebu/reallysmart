import React from "react";
import { Annotation, User } from "../../my_types";
import CommentShowContainer from "../comments/comment_show_container";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    annotation: Annotation,
    currentUser: User,
    yCoord: number
}

function AnnotationShowItem(props: Props) {
    const { annotation, currentUser, yCoord } = props;

    function updatebuttons() {
        if (currentUser && currentUser.username === annotation.annotator) {
            return (
                <div className="annotation-show-item__buttons">
                    <button className="annotation-show-item__edit">
                        Edit
                    </button>
                    <button className="annotation-show-item__delete">
                        Delete
                    </button>
                </div>
            );
        } else {
            return null;
        }
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
            { updatebuttons() }
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