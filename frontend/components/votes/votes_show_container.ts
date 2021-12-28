import { connect } from "react-redux";
import { Annotation, Comment, CreatedVote, State, User, Vote } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchComment } from "../../actions/comment_actions";
import { createVote, deleteVote, fetchVote } from "../../actions/vote_actions";
import VotesShow from "./votes_show";

type OwnProps = {
    numberOfVotes: number,
    parent: Annotation | Comment,
    voteableId: number,
    voteableType: string
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const currentUser: User = state.entities.user[state.session.id];
    const currentUserVotes: Array<Vote> = currentUser && Object.keys(state.entities.votes).length > 0 
        ? currentUser.vote_ids.map((id: number) => {
            if (state.entities.votes[id]) {
                return state.entities.votes[id];
            }
        }).filter((vote: Vote | undefined) => {
            if (vote !== undefined) {
                return vote;
            }
        })
        : Array()
    function findCurrentVote(votes: Array<Vote>) {
        for (let vote of votes) {
            if (vote.voteable_type === ownProps.voteableType && vote.voteable_id === ownProps.voteableId) {
                return vote;
            }
        }
        return null;
    }
    const currentVote = findCurrentVote(currentUserVotes);
    const currentVoteStatus: boolean = currentVote !== null 
        ? true 
        : false

    return ({
        currentUser: currentUser,
        currentVote: currentVote,
        currentVoteStatus: currentVoteStatus
    });
};

const mDTP = (dispatch: Function, ownProps: OwnProps) => {
    const fetchAction = ownProps.voteableType === "Annotation"
        ? (annotationId: number) => dispatch(fetchAnnotation(annotationId))
        : (commentId: number) => dispatch(fetchComment(commentId))

    return ({
        createVote: (vote: CreatedVote) => dispatch(createVote(vote)),
        deleteVote: (voteId: number) => dispatch(deleteVote(voteId)),
        fetchAction: fetchAction,
        fetchVote: (voteId: number) => dispatch(fetchVote(voteId))
    });
};

export default connect(mSTP, mDTP)(VotesShow);