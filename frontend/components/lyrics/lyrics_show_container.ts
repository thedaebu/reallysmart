import { connect } from "react-redux";
import { Annotation, State } from "../../my_types";
import { fetchAnnotation } from "../../actions/annotation_actions";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import LyricsShow from "./lyrics_show";
import { fetchComment } from "../../actions/comment_actions";

type OwnProps = {
    track: Track
}
interface Track {
    annotation_ids: Array<number>
}

const mSTP = (state: State, ownProps: OwnProps) => {
    const annotations: Array<Annotation> = ownProps.track.annotation_ids.map((id: number) => {
        return state.entities.annotations[id];
    });
    
    return ({
        annotations: annotations,
        currentUser: state.entities.user[state.session.id]
    });
};
const mDTP = (dispatch: Function) => {
    return ({
        closeAnnotationModal: () => dispatch(closeAnnotationModal()),
        fetchAnnotation: (annotationId: number) => dispatch(fetchAnnotation(annotationId)),
        fetchComment: (commentId: number) => dispatch(fetchComment(commentId)),
        openAnnotationModal: () => dispatch(openAnnotationModal())
    });
};

export default connect(mSTP, mDTP)(LyricsShow);