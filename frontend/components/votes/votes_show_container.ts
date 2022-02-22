import { connect } from "react-redux";
import { CreatedVote, State } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchComment } from "../../actions/comment_actions";
import { createVote, deleteVote, fetchVote } from "../../actions/vote_actions";
import VotesShow from "./votes_show";

type OwnProps = {
    voteableType: string
}

const mSTP = (state: State) => {
    return ({
        currentUser: state.entities.user[state.session.id],
        votes: state.entities.votes
    });
};

const mDTP = (dispatch: Function, ownProps: OwnProps) => {
    const fetchParent: Function = ownProps.voteableType === "Annotation"
        ? (annotationId: number) => dispatch(fetchAnnotation(annotationId))
        : (commentId: number) => dispatch(fetchComment(commentId));

    return ({
        createVote: (vote: CreatedVote) => dispatch(createVote(vote)),
        deleteVote: (voteId: number) => dispatch(deleteVote(voteId)),
        fetchParent: fetchParent,
        fetchVote: (voteId: number) => dispatch(fetchVote(voteId))
    });
};

const VotesShowContainer = connect(mSTP, mDTP)(VotesShow);
export default VotesShowContainer;