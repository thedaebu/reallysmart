import { connect } from "react-redux";
import { fetchSearches } from "../../actions/search_actions";
import Searchbar from "./searchbar";

const mDTP = (dispatch: Function) => {
    return ({
        fetchSearches: (search: string) => dispatch(fetchSearches(search))
    });
};

const SearchbarContainer = connect(null, mDTP)(Searchbar);
export default SearchbarContainer;