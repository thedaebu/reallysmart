import React, { Dispatch, MouseEvent, useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import * as CommentActions from "../../actions/comment_actions";
import * as SessionActions from "../../actions/session_actions"
import * as VoteActions from "../../actions/vote_actions";
import { Annotation, Comment, CreatedVote, ReceivedVote, State, User, Vote } from "../../my_types";

type Props = {
    parent: Annotation | Comment,
    voteableType: string
}

function VoteShow(props: Props) {
    const { parent, voteableType } = props;

    const currentUser: User = useSelector((state: State) => state.entities.user[state.session.id]);
    const votes: {[key: number]: Vote} = useSelector((state: State) => state.entities.votes);

    const dispatch: Dispatch<any> = useDispatch();
    const createVote: Function = (vote: CreatedVote) => dispatch(VoteActions.createVote(vote));
    const deleteVote: Function = (voteId: number) => dispatch(VoteActions.deleteVote(voteId));
    const fetchParent: Function = voteableType === "Annotation"
        ? (annotationId: number) => dispatch(AnnotationActions.fetchAnnotation(annotationId))
        : (commentId: number) => dispatch(CommentActions.fetchComment(commentId));
    const fetchUser: Function = (userId: number) => dispatch(SessionActions.fetchUser(userId));

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
                <RiThumbUpLine className="vote-show__not-voted" />
            );
        }
    }

    function handleVoteUpdate(e: MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault();

        if (currentUserVote) {
            deleteVote(currentUserVote.id)

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
                    setCurrentUserVote(receivedVote.vote);
                    setCurrentNumberOfVotes(currentNumberOfVotes+1);
                    fetchParent(parent.id);
                    fetchUser(currentUser.id);
                });
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
        <div className="vote-show" data-testid="vote-show">
            {voteThumb()}
            <div className="vote-show__count">
                +{currentNumberOfVotes}
            </div>
        </div>
    );
};

export default VoteShow;