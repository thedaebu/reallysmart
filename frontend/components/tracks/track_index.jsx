import React, { useState, useEffect } from "react";
import Navbar from "../header/navbar";
import TrackIndexItem from "./track_index_item";

function TrackIndex(props) {
    const [list, setList] = useState(5);
    const { tracks } = props;

    useEffect(() => {
        props.fetchTracks();
        window.scrollTo(0, 0);
    }, [])

    function trackIndexItems() {
        if (list === 5) {
            return (
                tracks.slice(0, 5).map(track => {
                    return <TrackIndexItem track={track} key={track.id}/>;
                })
            )
        } else if (list === 10) {
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

    function listButton() {
        if (list === 5) {
            return ( 
                <p onClick={handleClick} className="tracks-index-load-more">LOAD MORE</p>
            )
        } else if (list === 10) { 
            return ( 
                <p onClick={handleClick} className="tracks-index-load-more">We Miss You DMX!</p>
            )
        } else {
            return (
                null
            )
        }
    }

    function handleClick(e) {
        e.preventDefault();

        if (list === 5) {
            setList(10);
        } else if (list === 10) {
            setList(11);
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
            {listButton()}
        </div>
    )
};

export default TrackIndex;