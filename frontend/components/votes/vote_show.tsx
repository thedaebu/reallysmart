import React, { Dispatch, MouseEvent, useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationActions from "../../actions/annotation_actions";
import * as CommentActions from "../../actions/comment_actions";
import * as VoteAPIUtil from "../../util/api/vote_api_util";
import { AnyAction } from "@reduxjs/toolkit";
import { Annotation, Comment, CreatedVote, State, User, Vote } from "../../my_types";

function VoteShow({ parent, voteableType }: { parent: Annotation | Comment, voteableType: "Annotation" | "Comment" }) {
    const currentUser: User = useSelector((state: State) => state.entities.user);
    const votes: {[key: number]: Vote} = parent.votes;

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const createVote: Function = (vote: CreatedVote) => VoteAPIUtil.createVote(vote);
    const deleteVote: Function = (voteId: number) => VoteAPIUtil.deleteVote(voteId);
    const fetchParent: Function = voteableType === "Annotation"
        ? (annotationId: number) => dispatch(AnnotationActions.fetchAnnotation(annotationId))
        : (commentId: number) => dispatch(CommentActions.fetchComment(commentId));

    const [currentNumberOfVotes, setCurrentNumberOfVotes] = useState<number>(0);
    const [currentUserVote, setCurrentUserVote] = useState<Vote | null>(null);

    useEffect(() => {
        getCurrentVotes(votes);
    }, []);

    useEffect(() => {
        getCurrentVotes(votes);
    }, [currentUser, votes]);

    function voteThumb() {
        if (currentUserVote) {
            return (
                <RiThumbUpLine
                    className="vote-show__voted"
                    onClick={handleUpdate}
                    data-testid="vote-show__voted"
                />
            );
        } else {
            return (
                <RiThumbUpLine
                    className="vote-show__not-voted"
                    onClick={handleUpdate}
                    data-testid="vote-show__not-voted"
                />
            );
        } 
    }

    function handleUpdate(e: MouseEvent<HTMLOrSVGElement>) {
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
                .then(() => fetchParent(parent.id));
        }
    }

    function getCurrentVotes(votes: {[key: number]: Vote}) {
        const currentVotes: Array<Vote> = Object.values(votes);
        const voteCount: number = currentVotes.length;
        setCurrentNumberOfVotes(voteCount);
        if (currentUser) {
            for (let i = 0; i < voteCount; i++) {
                const vote: Vote = currentVotes[i];
                if (currentUser.id === vote.voter_id) {
                    setCurrentUserVote(vote);
                    break;
                }
            };
        }
    }

    return (
        <div className="vote-show" data-testid="vote-show">
            {currentUser 
                ? voteThumb()
                : <RiThumbUpLine className="vote-show__not-voted" data-testid="vote-show__not-voted" />
            }
            <div className="vote-show__count">
                +{currentNumberOfVotes}
            </div>
        </div>
    );
}

export default VoteShow;