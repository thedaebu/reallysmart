import { connect } from "react-redux";
import { fetchSearches } from "../../actions/search_actions";
import Searchbar from "./searchbar";

const mDTP = (dispatch: Function) => {
    return ({
        fetchSearches: (search: string) => dispatch(fetchSearches(search))
    });
};

export default connect(null, mDTP)(Searchbar);