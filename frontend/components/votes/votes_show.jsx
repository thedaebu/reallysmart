import React, { useState, useEffect } from "react";
import { RiThumbUpLine } from "react-icons/ri";

function VotesShow(props) {
    const [currentVoteStatus, setCurrentVoteStatus] = useState(props.currentVoteStatus);
    const { currentUser, fetchVote, parent, currentVote, voteableType, voteableId, deleteVote, createVote, fetchAction, numberOfVotes } = props;

    useEffect(() => {
        if (currentUser && currentUser.vote_ids.length > 0) {
            currentUser.vote_ids.forEach(id => {
                fetchVote(id);
            })
        }
    }, []);

    function handleVote(e) {
        e.preventDefault();

        if (currentUser && currentVoteStatus === true) {
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
                    onClick={handleVote}
                />
                <div className="vote-show-count">+{numberOfVotes}</div>
            </div>
        );
    } else if (currentUser && currentVoteStatus === false) {
        return (
            <div className="vote-show-main">
                <RiThumbUpLine
                    className="vote-show-not-voted"
                    onClick={handleVote}
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