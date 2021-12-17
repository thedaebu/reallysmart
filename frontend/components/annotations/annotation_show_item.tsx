import React from "react";
import CommentShowContainer from "../comments/comment_show_container";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    annotation: Annotation,
    currentUser: User,
    yCoord: number | null
}
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}

function AnnotationShowItem(props: Props) {
    const { annotation, currentUser, yCoord } = props;
    
    return (
        <div
            className="annotation-show-main" 
            style={{
                position: "relative", 
                top: yCoord !== null
                    ? yCoord-370
                    : -370
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