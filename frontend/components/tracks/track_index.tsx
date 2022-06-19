import React, { Dispatch, MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { IndexTrack, State, Window } from "../../my_types";
import Navbar from "../navbar/navbar";
import MemoizedTrackIndexItem from "./track_index_item";

declare const window: Window;

function TrackIndex() {
    const tracks: Array<IndexTrack> = useSelector((state: State) => Object.values(state.entities.indexTracks));

    const dispatch: Dispatch<any> = useDispatch();
    const fetchTracks: Function = () => dispatch(TrackActions.fetchTracks());

    const [trackIndexList, setTrackIndexList] = useState<number>(5);

    useEffect(() => {
        fetchTracks();
        window.scrollTo(0, 0);
    }, [])

    function trackIndexItems() {
        if (trackIndexList === 5) {
            return (
                tracks.slice(0, 5).map((track: IndexTrack, idx: number) => {
                    return (
                        <MemoizedTrackIndexItem
                            listNumber={idx+1}
                            track={track}
                            key={idx+1}
                        />
                    );
                })
            );
        } else if (trackIndexList === 10) {
            return (
                tracks.slice(0, 10).map((track: IndexTrack, idx: number) => {
                    return (
                        <MemoizedTrackIndexItem
                            listNumber={idx+1}
                            track={track}
                            key={idx+1}
                        />
                    );
                })
            );
        } else {
            return (
                tracks.map((track: IndexTrack, idx: number) => {
                    return (
                        <MemoizedTrackIndexItem
                            listNumber={idx+1}
                            track={track}
                            key={idx+1}
                        />
                    );
                })
            );
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
        }
    }

    function setTrackIndexListLimit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setTrackIndexList(trackIndexList+5);
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
            {trackIndexList <= 10 && extendTrackIndexListButton()}
        </>
    );
};

export default TrackIndex;