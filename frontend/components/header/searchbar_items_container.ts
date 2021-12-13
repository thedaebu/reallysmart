import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchbarItems from "./searchbar_items";

type State = {
    entities: Entities
}
interface Entities {
    searches: Searches
}
type Searches = {
    [key: number]: Track
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}
// type OwnProps = {
//     location: OwnPropsLocation
// }
// interface OwnPropsLocation {
//     pathname: string
// }

const mSTP = (state: State, ownProps: any) => {
    return ({
        searches: Object.values(state.entities.searches),
        siteLocation: ownProps.location.pathname
    });
};

export default withRouter(connect(mSTP, null)(SearchbarItems));