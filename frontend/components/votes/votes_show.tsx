import React, { MouseEvent, useState, useEffect } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { Annotation, Comment, User, Vote } from "../../my_types";

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
            deleteVote(currentVote.id)
                .then(() => fetchAction(parent.id))
        } else if (currentUser) {
            const vote = {
                voteable_type: voteableType,
                voteable_id: voteableId,
                voter_id: currentUser.id
            }

            createVote(vote)
                .then(() => fetchAction(parent.id));
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