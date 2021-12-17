import React, { useState, useEffect, MouseEvent } from "react";
import { RiThumbUpLine } from "react-icons/ri";

type Props = {
    createVote: Function,
    currentUser: User,
    currentVote: Vote | null,
    currentVoteStatus: boolean,
    deleteVote: Function,
    fetchAction: Function,
    fetchVote: Function,
    numberOfVotes: number,
    parent: Annotation | Comment,
    voteableId: number,
    voteableType: string
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
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
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}
interface Vote {
    id: number,
    voteable_id: number,
    voteable_type: string,
    voter_id: number
}

function VotesShow(props: Props) {
    const [currentVoteStatus, setCurrentVoteStatus] = useState(props.currentVoteStatus);
    
    const { createVote, currentUser, currentVote, deleteVote, fetchAction, fetchVote, numberOfVotes, parent, voteableId, voteableType } = props;

    useEffect(() => {
        if (currentUser && currentUser.vote_ids.length > 0) {
            currentUser.vote_ids.forEach(id => {
                fetchVote(id);
            })
        }
    }, []);

    function handleVoteUpdate(e: MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault();

        if (currentUser && currentVoteStatus === true && currentVote) {
            setCurrentVoteStatus(false);
            deleteVote(currentVote.id).then(() => fetchAction(parent.id))
        } else if (currentUser) {
            createVote({
                voter_id: currentUser.id,
                voteable_type: voteableType,
                voteable_id: voteableId
            }).then(() => fetchAction(parent.id));
            setCurrentVoteStatus(true);
        }
    }

    if (currentUser && currentVoteStatus === true) {
        return (
            <div className="vote-show-main">
                <RiThumbUpLine
                    className="vote-show-voted"
                    onClick={handleVoteUpdate}
                />
                <div className="vote-show-count">+{numberOfVotes}</div>
            </div>
        );
    } else if (currentUser && currentVoteStatus === false) {
        return (
            <div className="vote-show-main">
                <RiThumbUpLine
                    className="vote-show-not-voted"
                    onClick={handleVoteUpdate}
                />
                <div className="vote-show-count">+{numberOfVotes}</div>
            </div>
        );
    } else {
        return (
            <div className="vote-show-main">
                <RiThumbUpLine className="vote-show-not-voted"/>
                <div className="vote-show-count">+{numberOfVotes}</div>
            </div>
        );
    }
};

export default VotesShow;