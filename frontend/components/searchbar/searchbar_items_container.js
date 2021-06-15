import { connect } from "react-redux";
import SearchbarItems from "./searchbar_items";
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter, 
  withRouter
} from 'react-router-dom';

const mSTP = ( state, ownProps) => {
    debugger
    return ({
        searches: Object.values(state.entities.searches),
        siteLocation: ownProps.location.pathname
    });
};

const mDTP = (dispatch, ownProps) => {
    return ({

    });
};

export default withRouter(connect(mSTP, mDTP)(SearchbarItems));