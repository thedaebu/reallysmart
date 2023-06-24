import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IndexTrack, Window } from "../../my_types";

declare const window: Window;

function TrackItem({ listNumber, track }: { listNumber: number, track: IndexTrack }) {
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
            className="track-item"
            data-testid="track-item"
        >
            <p className="track-item__id">{listNumber}</p>
            <div
                className="track-item__image"
                style={{
                    backgroundImage: `url(${artwork_path}`
                }}
            > 
            </div>
            <section className="track-item__title-main">
                <p className="track-item__title">{title}</p>
                <p className="track-item__lyrics">LYRICS</p>
            </section>
            <p className="track-item__artist">{artist}</p>
            <section className="track-item__count">
                <img className="track-item__count--icon" src={window.fireIcon} alt="Fire" />
                <p className="track-item__count--number--fire">{randomNum()}</p>
            </section>
            <section className="track-item__count">
                <img className="track-item__count--icon" src={window.eyeIcon} alt="Eye" />
                <p className="track-item__count--number--eye">{randomNum() * 10}</p>
            </section>
        </Link>
    );
}

const MemoizedTrackItem = memo(TrackItem);
export type TrackItem = ReturnType<typeof MemoizedTrackItem>;
export default MemoizedTrackItem;