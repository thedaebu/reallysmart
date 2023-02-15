import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IndexTrack, Window } from "../../my_types";

declare const window: Window;

function SearchIndexItem({ track }: { track: IndexTrack }) {
    const { artist, artwork_path, title } = track;

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <Link
            className="search-index-item"
            to={`/tracks/${urlify(artist)}__${urlify(title)}`}
            data-testid="search-index-item"
            replace
        >
            <div
                className="search-index-item__image"
                style={{backgroundImage: `url(${artwork_path}`}}
            > 
            </div>
            <div className="search-index-item__body">
                <div className="search-index-item__body-top">
                    <p className="search-index-item__title">{title}</p>
                    <p className="search-index-item__artist">{artist}</p>
                </div>
                <div className="search-index-item__body-bottom">
                    <img className="search-index-item__eye" src={window.eyeIcon} alt="Eye" />
                    <p className="search-index-item__views">{randomNum()}</p>
                </div>
            </div>
        </Link>
    );
}

const MemoizedSearchIndexItem = memo(SearchIndexItem);
export default MemoizedSearchIndexItem;