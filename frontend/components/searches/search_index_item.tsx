import React from "react";
import { Link } from "react-router-dom";
import { Track, Window } from "../../my_types";

declare const window: Window;
type Props = {
    track: Track
}

function SearchIndexItem(props: Props) {
    const { track } = props;

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }
    
    return (
        <Link className="search-index-item" to={`/tracks/${track.id}`} replace>
            <div
                className="search-index-item__image" style={{ 
                    backgroundImage: `url(${track.artwork_path}`
                }}> 
            </div>
            <div className="search-index-item__body">
                <div className="search-index-item__body-top">
                    <p className="search-index-item__title">{track.title}</p>
                    <p className="search-index-item__artist">{track.artist}</p>
                </div>
                <div className="search-index-item__body-bottom">
                    <img className="search-index-item__eye" src={window.eyeIcon} />
                    <p className="search-index-item__views">{randomNum()}</p>
                </div>
            </div>
        </Link>
    );
}

export default SearchIndexItem;