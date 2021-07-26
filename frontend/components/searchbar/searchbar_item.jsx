import React from "react";
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from "react-router-dom";

class SearchbarItem extends React.Component {
    constructor(props) {
        super(props);
    }

    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    render() {
        const { track } = this.props.searchbarItem;

        return (
            <Link className="searchbar-item-main" to={`/tracks/${track.id}`} replace>
                <div className="searchbar-item-image" style={{ backgroundImage: `url(${track.artwork_path}`, backgroundPosition: "center", backgroundSize: "cover" }}> </div>
                <div className="searchbar-item-right">
                    <div className="searchbar-item-right-top">
                        <p className="searchbar-item-title">{track.title}</p>
                        <p className="searchbar-item-artist">{track.artist}</p>
                    </div>
                    <div className="searchbar-item-right-bottom">
                        <img className="searchbar-item-eye" src={window.eyeIcon} />
                        <p className="searchbar-item-views">{this.randomNum()}</p>
                    </div>
                </div>
            </Link>
        );
    }
};

export default SearchbarItem;