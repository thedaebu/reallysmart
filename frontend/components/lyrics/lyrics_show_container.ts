import { connect } from "react-redux";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import LyricsShow from "./lyrics_show";

type State = {
    entities: Entities,
    session: SessionId
}
interface Entities {
    annotations: AnnotationKey,
    users: UserKey
}
interface AnnotationKey {
    [key: number]: Annotation
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
interface UserKey {
    [key: number]: User
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}
interface SessionId {
    id: number
}
type OwnProps = {
    track: Track
}
interface Track {
    annotation_ids: Array<number>
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const annotations = ownProps.track.annotation_ids.map((id: number) => {
        return state.entities.annotations[id];
    });
    
    return ({
        currentUser: state.entities.users[state.session.id],
        annotations: annotations
    });
};
const mDTP = (dispatch: Function) => {
    return ({
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        openAnnotationModal: (data: boolean) => dispatch(openAnnotationModal(data)),
        closeAnnotationModal: () => dispatch(closeAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(LyricsShow);