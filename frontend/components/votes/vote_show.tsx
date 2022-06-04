import React, { Dispatch, MouseEvent, useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import * as CommentActions from "../../actions/comment_actions";
import * as SessionActions from "../../actions/session_actions"
import * as VoteActions from "../../actions/vote_actions";
import { Annotation, Comment, CreatedVote, ReceivedVote, State, User, Vote } from "../../my_types";

function VoteShow({ parent, voteableType }: { parent: Annotation | Comment, voteableType: "Annotation" | "Comment" }) {
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
        getCurrentVotes(votes);
    }, [])

    useEffect(() => {
        getCurrentVotes(votes);
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
    };

    function handleVoteUpdate(e: MouseEvent<HTMLOrSVGElement>) {
        e.preventDefault();

        if (currentUserVote) {
            deleteVote(currentUserVote.id);

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
    };

    function getCurrentVotes(votes: {[key: number]: Vote}) {
        let voteCount: number = 0;
        Object.values(votes).forEach((vote: Vote) => {
            if (vote.voteable_type === voteableType && vote.voteable_id === parent.id) {
                voteCount++;
                if (currentUser && currentUser.id === vote.voter_id) {
                    setCurrentUserVote(vote);
                }
            }
        });
        setCurrentNumberOfVotes(voteCount);
    };

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