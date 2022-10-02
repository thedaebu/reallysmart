import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IndexTrack, Window } from "../../my_types";

declare const window: Window;

function TrackIndexItem({ listNumber, track }: { listNumber: number, track: IndexTrack }) {
    const { artist, artwork_path, title } = track;
    const urlArtist: string = urlify(artist);
    const urlTitle: string = urlify(title);

    function urlify(string: string) {
        const words: Array<string> = string.split(" ");
        return words.join("_").toLowerCase();
    }

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <Link
            to={`/tracks/${urlArtist}__${urlTitle}`}
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
            <div className="track-index-item__fire-main">
                <img className="track-index-item__fire" src={window.fireIcon} alt="Fire" />
                <p className="track-index-item__fire-number">{randomNum()}</p>
            </div>
            <div className="track-index-item__eye-main">
                <img className="track-index-item__eye" src={window.eyeIcon} alt="Eye" />
                <p className="track-index-item__eye-number">{randomNum() * 10}</p>
            </div>
        </Link>
    );
}

const MemoizedTrackIndexItem = memo(TrackIndexItem);
export type TrackIndexItem = ReturnType<typeof MemoizedTrackIndexItem>;
export default MemoizedTrackIndexItem;