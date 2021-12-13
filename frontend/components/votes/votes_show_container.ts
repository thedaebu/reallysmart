import { connect } from "react-redux";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { fetchComment } from "../../actions/comment_actions";
import { createVote, deleteVote, fetchVote } from "../../actions/vote_actions";
import VotesShow from "./votes_show";

type State = {
    entities: Entities,
    session: SessionId
}
interface SessionId {
    id: number
}
interface Entities {
    users: UserKey,
    votes: VoteKey
}
interface UserKey {
    [key: number]: User
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}
interface VoteKey {
    [key: number]: Vote
}
type OwnProps = {
    numberOfVotes: number,
    parent: Annotation | Comment,
    voteableId: number,
    voteableType: string
}
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
}
interface Vote {
    id: number,
    voteable_id: number,
    voteable_type: string,
    voter_id: number
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const currentUser = state.entities.users[state.session.id];
    const currentUserVotes = currentUser && Object.keys(state.entities.votes).length !== 0 
        ? currentUser.vote_ids.map((id: number) => {
            if (state.entities.votes[id]) {
                return state.entities.votes[id];
            }
        })
        : Array()
    const currentVote = !currentUserVotes.includes(undefined) 
        ? currentUserVotes.filter((vote: Vote) => vote.voteable_type === ownProps.voteableType && vote.voteable_id === ownProps.voteableId)[0] 
        : null;
    const currentVoteStatus = !currentUserVotes.includes(undefined) && currentUserVotes.filter((vote: Vote) => vote.voteable_type === ownProps.voteableType && vote.voteable_id === ownProps.voteableId).length > 0 
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
        fetchVote: (voteId: number) => dispatch(fetchVote(voteId)),
        createVote: (vote: Vote) => dispatch(createVote(vote)),
        deleteVote: (voteId: number) => dispatch(deleteVote(voteId)),
        fetchAction: fetchAction
    });
};

export default connect(mSTP, mDTP)(VotesShow);