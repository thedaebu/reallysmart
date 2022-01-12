import React, { MouseEvent, useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { Annotation, Comment, CreatedVote, ReceivedVote, User, Vote } from "../../my_types";

type Props = {
    createVote: Function,
    currentUser: User,
    deleteVote: Function,
    fetchParent: Function,
    fetchVote: Function,
    numberOfVotes: number,
    parent: Annotation | Comment,
    voteableId: number,
    voteableType: string,
    votes: {[key: number]: Vote}
}

function VotesShow(props: Props) {
    const [currentUserVote, setCurrentUserVote] = useState<Vote | null>(null);

    const { createVote, currentUser, deleteVote, fetchParent, fetchVote, numberOfVotes, parent, voteableId, voteableType, votes } = props;

    useEffect(() => {
        setCurrentUserVote(findCurrentUserVote(currentUser, votes, voteableId, voteableType));
    }, [])

    useEffect(() => {
        setCurrentUserVote(findCurrentUserVote(currentUser, votes, voteableId, voteableType));
    }, [currentUser])

    function handleVoteUpdate(e: MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault();

        setCurrentUserVote(findCurrentUserVote(currentUser, votes, voteableId, voteableType));

        if (currentUserVote !== null) {
            deleteVote(currentUserVote.id)
                .then(() => fetchParent(parent.id));

            setCurrentUserVote(null);
        } else {
            const vote: CreatedVote = {
                voteable_type: voteableType,
                voteable_id: voteableId,
                voter_id: currentUser.id
            };

            createVote(vote)
                .then((receivedVote: ReceivedVote) => {
                    fetchVote(receivedVote.vote.id);
                    setCurrentUserVote(receivedVote.vote);
                    fetchParent(parent.id);
                });
        }
    }

    function findCurrentUserVote(currentUser: User, votes: {[key: number]: Vote}, voteableId: number, voteableType: string) {
        if (currentUser && Object.keys(votes).length > 0) {
            for (let voteId of currentUser.vote_ids) {
                const currentVote: Vote = votes[voteId];
                if (currentVote && currentVote.voteable_id === voteableId && currentVote.voteable_type === voteableType) {
                    return currentVote;
                }
            }
        } else {
            return null;
        }
    }

    if (currentUser && currentUserVote !== null) {
        return (
            <div className="vote-show">
                <RiThumbUpLine
                    className="vote-show__voted"
                    onClick={handleVoteUpdate}
                />
                <div className="vote-show__count">+{numberOfVotes}</div>
            </div>
        );
    } else if (currentUser && currentUserVote === null) {
        return (
            <div className="vote-show">
                <RiThumbUpLine
                    className="vote-show__not-voted"
                    onClick={handleVoteUpdate}
                />
                <div className="vote-show__count">+{numberOfVotes}</div>
            </div>
        );
    } else {
        return (
            <div className="vote-show">
                <RiThumbUpLine className="vote-show__not-voted"/>
                <div className="vote-show__count">+{numberOfVotes}</div>
            </div>
        );
    }
};

export default VotesShow;