import { connect } from "react-redux";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { createVote, deleteVote, fetchVote } from "../../actions/vote_actions";
import VotesShow from "./votes_show";

const mSTP = (state, ownProps) => {
    const currentUser = state.entities.users[state.session.id];
    const currentUserVotes = currentUser && Object.keys(state.entities.votes).length !== 0 
        ? currentUser.vote_ids.map(id => {
            if (state.entities.votes[id]) {
                return state.entities.votes[id];
            }
        })
        : Array()
    const currentVote = !currentUserVotes.includes(undefined) 
        ? currentUserVotes.filter(vote => vote.voteable_type === ownProps.voteableType && vote.voteable_id === ownProps.voteableId)[0] 
        : null;
    const currentVoteStatus = !currentUserVotes.includes(undefined) && currentUserVotes.filter(vote => vote.voteable_type === ownProps.voteableType && vote.voteable_id === ownProps.voteableId).length > 0 
        ? true 
        : false

    return ({
        currentUser: currentUser,  
        currentVote: currentVote,
        currentVoteStatus: currentVoteStatus
    });
};

const mDTP = (dispatch, ownProps) => {
    if (ownProps.voteableType === "Annotation") {
        return ({
            fetchVote: (voteId) => dispatch(fetchVote(voteId)),
            createVote: (vote) => dispatch(createVote(vote)),
            deleteVote: (voteId) => dispatch(deleteVote(voteId)),
            fetchAction: (annotationId) => dispatch(fetchAnnotation(annotationId))
        });
    } else {
        return ({
            fetchVote: (voteId) => dispatch(fetchVote(voteId)),
            createVote: (vote) => dispatch(createVote(vote)),
            deleteVote: (voteId) => dispatch(deleteVote(voteId))
        });
    }
};

export default connect(mSTP, mDTP)(VotesShow);