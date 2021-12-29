import React, { MouseEvent, useState, useEffect } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { Annotation, Comment, User, Vote } from "../../my_types";

type Props = {
    createVote: Function,
    currentUser: User,
    deleteVote: Function,
    fetchAction: Function,
    numberOfVotes: number,
    parent: Annotation | Comment,
    voteableId: number,
    voteableType: string,
    votes: {[key: number]: Vote}
}

function VotesShow(props: Props) {
    const [currentUserVote, setCurrentUserVote] = useState<Vote | null>(null);

    const { createVote, currentUser, deleteVote, fetchAction, numberOfVotes, parent, voteableId, voteableType, votes } = props;

    function handleVoteUpdate(e: MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault();

        const currentUserVotes: Array<Vote> = findCurrentUserVotes(currentUser, votes);
        setCurrentUserVote(findCurrentUserVote(currentUserVotes, voteableId, voteableType));

        if (currentUser && currentUserVote) {
            deleteVote(currentUserVote.id)
                .then(() => fetchAction(parent.id))

            setCurrentUserVote(null);
        } else if (currentUser) {
            const vote = {
                voteable_type: voteableType,
                voteable_id: voteableId,
                voter_id: currentUser.id
            }

            createVote(vote)
                .then(() => fetchAction(parent.id));

            setCurrentUserVote(findCurrentUserVote(currentUserVotes, voteableId, voteableType));
        }
    }

    function findCurrentUserVotes(currentUser: User, votes: {[key: number]: Vote}) {
        if (currentUser && Object.keys(votes).length > 0) {
            return currentUser.vote_ids.map((id: number) => {
                if (votes[id]) {
                    return votes[id];
                }
            }).filter((vote: Vote | undefined) => {
                if (vote !== undefined) {
                    return vote;
                }
            })
        } else {
            return Array();
        }
    }

    function findCurrentUserVote(currentUserVotes: Array<Vote>, voteableId: number, voteableType: string) {
        for (let vote of currentUserVotes) {
            if (vote.voteable_id === voteableId && vote.voteable_type === voteableType) {
                return vote;
            }
        }
        return null;
    }

    if (currentUser && currentUserVote !== null) {
        return (
            <div className="vote-show-main">
                <RiThumbUpLine
                    className="vote-show-voted"
                    onClick={handleVoteUpdate}
                />
                <div className="vote-show-count">+{numberOfVotes}</div>
            </div>
        );
    } else if (currentUser && currentUserVote === null) {
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