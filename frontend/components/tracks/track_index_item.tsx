import React from "react";
import { Link } from "react-router-dom";
import { Track, Window } from "../../my_types";

declare const window: Window;

type TrackIndexItemProps = {
    track: Track
}

function TrackIndexItem(props: TrackIndexItemProps) {
    const { track } = props;

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return ( 
        <Link className="track-index-item" to={`/tracks/${track.id}`}>
            <p className="track-index-item__id">{track.id}</p>
            <div
                className="track-index-item__image"
                style={{
                    backgroundImage: `url(${track.artwork_path}`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}
            > 
            </div>
            <div className="track-index-item__title-main">
                <p className="track-index-item__title">{track.title}</p>
                <p className="track-index-item__lyrics">LYRICS</p>
            </div>
            <p className="track-index-item__artist">{track.artist}</p>
            <div className="track-index-item__fire-main">
                <img className="track-index-item__fire" src={window.fireIcon}/>
                <p className="track-index-item__fire-number">{randomNum()}</p>
            </div>
            <div className="track-index-item__eye-main">
                <img className="track-index-item__eye" src={window.eyeIcon}/>
                <p className="track-index-item__eye-number">{randomNum() * 10}</p>
            </div>
        </Link>
    )
}

export default TrackIndexItem;