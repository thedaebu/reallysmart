import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IndexTrack, Window } from "../../my_types";

declare const window: Window;

function SearchItem({ track }: { track: IndexTrack }) {
    const { artist, artwork_path, title } = track;

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <Link
            className="search-item"
            to={`/tracks/${urlify(artist)}__${urlify(title)}`}
            data-testid="search-item"
            replace
        >
            <div
                className="search-item__image"
                style={{backgroundImage: `url(${artwork_path}`}}
            > 
            </div>
            <section className="search-item__body">
                <div className="search-item__body--top">
                    <p className="search-item__title">{title}</p>
                    <p className="search-item__artist">{artist}</p>
                </div>
                <div className="search-item__body--bottom">
                    <img className="search-item__eye" src={window.eyeIcon} alt="Eye" />
                    <p className="search-item__views">{randomNum()}</p>
                </div>
            </section>
        </Link>
    );
}

const MemoizedSearchItem = memo(SearchItem);
export default MemoizedSearchItem;