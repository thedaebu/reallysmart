import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { State } from "../../my_types";
import SearchbarItems from "./searchbar_items";

type OwnProps = GivenProps & RouteComponentProps
type GivenProps = {
    clearSearchField: Function,
    searchField: string 
}

const mSTP = (state: State, ownProps: OwnProps) => {
    return ({
        searches: Object.values(state.entities.searches),
        siteLocation: ownProps.location.pathname
    });
};

export default withRouter(connect(mSTP, null)(SearchbarItems));