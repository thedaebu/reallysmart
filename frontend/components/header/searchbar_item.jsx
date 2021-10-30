import React from "react";
import { Link } from "react-router-dom";

function SearchbarItem(props) {
    const { track } = props.searchbarItem;

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <Link className="searchbar-item-main" to={`/tracks/${track.id}`} replace>
            <div
                className="searchbar-item-image" style={{ 
                    backgroundImage: `url(${track.artwork_path}`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}> 
            </div>
            <div className="searchbar-item-body">
                <div className="searchbar-item-body-top">
                    <p className="searchbar-item-title">{track.title}</p>
                    <p className="searchbar-item-artist">{track.artist}</p>
                </div>
                <div className="searchbar-item-body-bottom">
                    <img className="searchbar-item-eye" src={window.eyeIcon} />
                    <p className="searchbar-item-views">{randomNum()}</p>
                </div>
            </div>
        </Link>
    );
}

export default SearchbarItem;