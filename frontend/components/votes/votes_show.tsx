import React, { MouseEvent, useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { Annotation, Comment, CreatedVote, ReceivedVote, User, Vote } from "../../my_types";

type Props = {
    createVote: Function,
    currentUser: User,
    deleteVote: Function,
    fetchParent: Function,
    fetchVote: Function,
    parent: Annotation | Comment,
    voteableType: string,
    votes: {[key: number]: Vote}
}

function VotesShow(props: Props) {
    const { createVote, currentUser, deleteVote, fetchParent, fetchVote, parent, voteableType, votes } = props;

    const [currentNumberOfVotes, setCurrentNumberOfVotes] = useState<number>(0);
    const [currentUserVote, setCurrentUserVote] = useState<Vote | null>(null);

    useEffect(() => {
        setCurrentUserVote(findCurrentUserVote(currentUser, votes));
    }, [])

    useEffect(() => {
        setCurrentUserVote(findCurrentUserVote(currentUser, votes));
    }, [currentUser])

    function voteThumb() {
        if (currentUser) {
            if (currentUserVote) {
                return (
                    <RiThumbUpLine
                        className="vote-show__voted"
                        onClick={handleVoteUpdate}
                    />
                );
            } else {
                return (
                    <RiThumbUpLine
                        className="vote-show__not-voted"
                        onClick={handleVoteUpdate}
                    />
                );
            }
        } else {
            return (
                <RiThumbUpLine className="vote-show__not-voted"/>
            );
        }
    }

    function handleVoteUpdate(e: MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault();

        setCurrentUserVote(findCurrentUserVote(currentUser, votes));

        if (currentUserVote) {
            deleteVote(currentUserVote.id)
                .then(() => fetchParent(parent.id));

            setCurrentUserVote(null);
            setCurrentNumberOfVotes(currentNumberOfVotes-1);
        } else {
            const vote: CreatedVote = {
                voteable_type: voteableType,
                voteable_id: parent.id,
                voter_id: currentUser.id
            };

            createVote(vote)
                .then((receivedVote: ReceivedVote) => {
                    fetchVote(receivedVote.vote.id);
                    setCurrentUserVote(receivedVote.vote);
                    fetchParent(parent.id);
                });

            setCurrentNumberOfVotes(currentNumberOfVotes+1);
        }
    }

    function findCurrentUserVote(currentUser: User, votes: {[key: number]: Vote}) {
        const currentVotes: Array<Vote> = getCurrentVotes(votes)

        if (currentUser && currentVotes.length > 0) {
            for (let voteId of currentUser.vote_ids) {
                const currentVote: Vote = votes[voteId];
                if (currentVote && currentVote.voteable_id === parent.id && currentVote.voteable_type === voteableType) {
                    return currentVote;
                }
            }
        } else {
            return null;
        }
    }

    function getCurrentVotes(votes: {[key: number]: Vote}) {
        const currentVotes: Array<Vote> = Object.values(votes).filter((vote: Vote) => vote.voteable_type === voteableType && vote.voteable_id === parent.id)
        setCurrentNumberOfVotes(currentVotes.length)
        return currentVotes;
    }

    return (
        <div className="vote-show">
            {voteThumb()}
            <div className="vote-show__count">
                +{currentNumberOfVotes}
            </div>
        </div>
    );
};

export default VotesShow;