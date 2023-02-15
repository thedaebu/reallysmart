import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IndexTrack, Window } from "../../my_types";

declare const window: Window;

function TrackIndexItem({ listNumber, track }: { listNumber: number, track: IndexTrack }) {
    const { artist, artwork_path, title } = track;

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <Link
            to={`/tracks/${urlify(artist)}__${urlify(title)}`}
            className="track-index-item"
            data-testid="track-index-item"
        >
            <p className="track-index-item__id">{listNumber}</p>
            <div
                className="track-index-item__image"
                style={{
                    backgroundImage: `url(${artwork_path}`
                }}
            > 
            </div>
            <div className="track-index-item__title-main">
                <p className="track-index-item__title">{title}</p>
                <p className="track-index-item__lyrics">LYRICS</p>
            </div>
            <p className="track-index-item__artist">{artist}</p>
            <div className="track-index-item__count">
                <img className="track-index-item__count--icon" src={window.fireIcon} alt="Fire" />
                <p className="track-index-item__count--number--fire">{randomNum()}</p>
            </div>
            <div className="track-index-item__count">
                <img className="track-index-item__count--icon" src={window.eyeIcon} alt="Eye" />
                <p className="track-index-item__count--number--eye">{randomNum() * 10}</p>
            </div>
        </Link>
    );
}

const MemoizedTrackIndexItem = memo(TrackIndexItem);
export type TrackIndexItem = ReturnType<typeof MemoizedTrackIndexItem>;
export default MemoizedTrackIndexItem;