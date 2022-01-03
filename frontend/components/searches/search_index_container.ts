import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { State } from "../../my_types";
import SearchIndex from "./search_index";

const mSTP = (state: State, ownProps: RouteComponentProps) => {
    return ({
        searches: Object.values(state.entities.searches),
        siteLocation: ownProps.location.pathname
    });
};

export default withRouter(connect(mSTP, null)(SearchIndex));