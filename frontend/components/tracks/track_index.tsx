import React, { useState, useEffect, MouseEvent } from "react";
import { Track, Window } from "../../my_types";
import Navbar from "../navbar/navbar";
import TrackIndexItem from "./track_index_item";

declare const window: Window;
type Props = {
    fetchTracks: Function,
    tracks: Array<Track>
}

function TrackIndex(props: Props) {
    const { fetchTracks, tracks } = props;
    
    const [trackIndexList, setTrackIndexList] = useState<number>(5);

    useEffect(() => {
        fetchTracks();
        window.scrollTo(0, 0);
    }, [])

    function trackIndexItems() {
        if (trackIndexList === 5) {
            return (
                tracks.slice(0, 5).map((track: Track) => {
                    return <TrackIndexItem track={track} key={track.id}/>;
                })
            )
        } else if (trackIndexList === 10) {
            return (
                tracks.slice(0, 10).map(track => {
                    return <TrackIndexItem track={track} key={track.id}/>;
                })
            )
        } else {
            return (
                tracks.map(track => {
                    return <TrackIndexItem track={track} key={track.id}/>;
                })
            )
        }
    }

    function extendTrackIndexListButton() {
        if (trackIndexList === 5) {
            return ( 
                <button onClick={setTrackIndexListLimit} className="track-index__load-more">LOAD MORE</button>
            );
        } else if (trackIndexList === 10) { 
            return ( 
                <button onClick={setTrackIndexListLimit} className="track-index__load-more">We Miss You DMX!</button>
            );
        } else {
            return (
                null
            );
        }
    }

    function setTrackIndexListLimit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (trackIndexList === 5) {
            setTrackIndexList(10);
        } else if (trackIndexList === 10) {
            setTrackIndexList(11);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="track-index">
                <h1 className="track-index__h1">CHARTS</h1>
                <h2 className="track-index__h2">REALLY POPULAR ON REALLY SMART</h2>
                <ul className="track-index__items">
                    {trackIndexItems()}
                </ul>
            </div>
            {extendTrackIndexListButton()}
        </>
    );
};

export default TrackIndex;