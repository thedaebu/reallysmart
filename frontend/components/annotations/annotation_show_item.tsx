import React from "react";
import CommentShowContainer from "../comments/comment_show_container";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    annoId: string | null,
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
    debugger
    const { annotation, yCoord, currentUser, annoId } = props;

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
                parent={annotation}
                voteableType="Annotation"
                voteableId={annotation.id}
                numberOfVotes={annotation.votes}
            />
            <CommentShowContainer
                parent={annotation}
                currentUser={currentUser}
                commentableType="Annotation"
                commentableId={annoId}
            />
        </div>
    );
}

export default AnnotationShowItem;