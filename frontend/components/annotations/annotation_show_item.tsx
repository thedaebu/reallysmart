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
    
    return (
        <div
            className="annotation-show-main" 
            style={{
                position: "relative", 
                top: yCoord !== 0
                    ? yCoord
                    : -367
            }}
        >
            <p className="annotation-show-name">Really Smart Annotation by {annotation.annotator}</p>
            <p className="annotation-show-body">{annotation.body}</p>
            <VotesShowContainer
                numberOfVotes={annotation.votes}
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