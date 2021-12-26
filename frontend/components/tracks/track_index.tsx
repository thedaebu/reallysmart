import React, { useState, useEffect, MouseEvent } from "react";
import { Track } from "../../my_types";
import Navbar from "../navbar/navbar";
import TrackIndexItem from "./track_index_item";

type TrackIndexProps = {
    fetchTracks: Function,
    tracks: Array<Track>
}

function TrackIndex(props: TrackIndexProps) {
    const [indexList, setIndexList] = useState<number>(5);

    const { tracks } = props;

    useEffect(() => {
        props.fetchTracks();
        window.scrollTo(0, 0);
    }, [])

    function trackIndexItems() {
        if (indexList === 5) {
            return (
                tracks.slice(0, 5).map(track => {
                    return <TrackIndexItem track={track} key={track.id}/>;
                })
            )
        } else if (indexList === 10) {
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

    function extendIndexList() {
        if (indexList === 5) {
            return ( 
                <button onClick={setIndexListLimit} className="tracks-index-load-more">LOAD MORE</button>
            )
        } else if (indexList === 10) { 
            return ( 
                <button onClick={setIndexListLimit} className="tracks-index-load-more">We Miss You DMX!</button>
            )
        } else {
            return (
                null
            )
        }
    }

    function setIndexListLimit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (indexList === 5) {
            setIndexList(10);
        } else if (indexList === 10) {
            setIndexList(11);
        }
    }

    return (
        <div className="tracks-index-main">
            <Navbar />
            <div className="tracks-index-top">
                <h1>CHARTS</h1>
                <h2>REALLY POPULAR ON REALLY SMART</h2>
                <ul>
                    {trackIndexItems()}
                </ul>
            </div>
            {extendIndexList()}
        </div>
    )
};

export default TrackIndex;