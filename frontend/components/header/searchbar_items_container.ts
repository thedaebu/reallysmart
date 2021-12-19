import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { State } from "../../my_types";
import SearchbarItems from "./searchbar_items";

// type OwnProps = {
//     clearSearchField: Function,
//     searchField: string 
// } & RouteComponentProps

const mSTP = (state: State, ownProps: any) => {
    return ({
        searches: Object.values(state.entities.searches),
        siteLocation: ownProps.location.pathname
    });
};

export default withRouter(connect(mSTP, null)(SearchbarItems));