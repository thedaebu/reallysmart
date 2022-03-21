import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { State } from "../../my_types";
import TrackShow from "./track_show";

type OwnProps = RouteComponentProps<GivenProps>
type GivenProps = {
    trackId: string
}

const mSTP = (state: State, ownProps: OwnProps) => {
    return ({
        trackId: ownProps.match.params.trackId
    });
};

const TrackShowContainer = connect(mSTP, null)(TrackShow);
export default TrackShowContainer;