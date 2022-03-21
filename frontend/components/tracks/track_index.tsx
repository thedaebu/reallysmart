import React, { Dispatch, MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks } from "../../actions/track_actions";
import { IndexTrack, State, Window } from "../../my_types";
import Navbar from "../navbar/navbar";
import TrackIndexItem from "./track_index_item";

declare const window: Window;

function TrackIndex() {
    const tracks: Array<IndexTrack> = useSelector((state: State) => Object.values(state.entities.tracks));

    const dispatch: Dispatch<any> = useDispatch();

    const [trackIndexList, setTrackIndexList] = useState<number>(5);

    useEffect(() => {
        dispatch(fetchTracks());
        window.scrollTo(0, 0);
    }, [])

    function trackIndexItems() {
        if (trackIndexList === 5) {
            return (
                tracks.slice(0, 5).map((track: IndexTrack, idx: number) => {
                    return <TrackIndexItem 
                        listNumber={idx+1}
                        track={track}
                        key={idx+1}
                    />;
                })
            )
        } else if (trackIndexList === 10) {
            return (
                tracks.slice(0, 10).map((track: IndexTrack, idx: number) => {
                    return <TrackIndexItem
                        listNumber={idx+1}
                        track={track}
                        key={idx+1}
                    />;
                })
            )
        } else {
            return (
                tracks.map((track: IndexTrack, idx: number) => {
                    return <TrackIndexItem
                        listNumber={idx+1}
                        track={track}
                        key={idx+1}
                    />;
                })
            )
        }
    }

    function extendTrackIndexListButton() {
        if (trackIndexList === 5) {
            return ( 
                <button 
                    className="track-index__load-more"
                    onClick={setTrackIndexListLimit} 
                    data-testid="track-index__load-more"
                >
                    LOAD MORE
                </button>
            );
        } else if (trackIndexList === 10) { 
            return ( 
                <button 
                    className="track-index__load-more"
                    onClick={setTrackIndexListLimit} 
                    data-testid="track-index__load-more"
                >
                    We Miss You DMX!
                </button>
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
            <Navbar />
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