import React, { Dispatch, MouseEvent, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../contexts/theme_context";
import * as TrackActions from "../../actions/track_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { IndexTrack, State, Window } from "../../my_types";
import Navbar from "../navbar/navbar";
import MemoizedTrackIndexItem, { TrackIndexItem } from "./track_index_item";

declare const window: Window;

function TrackIndex() {
    const tracks: Array<IndexTrack> = useSelector((state: State) => Object.values(state.entities.indexTracks));

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchTracks: Function = () => dispatch(TrackActions.fetchTracks());

    const [indexCount, setIndexCount] = useState<number>(5);
    const [indexTracks, setIndexTracks] = useState<Array<TrackIndexItem>>([]);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchTracks();
        document.title = "Really Smart";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIndexTracks(tracks.map((track: IndexTrack, idx: number) => (
            <MemoizedTrackIndexItem
                listNumber={idx+1}
                track={track}
                key={idx+1}
            />
        )));
    }, [tracks.length]);

    function trackIndexItems() {
        if (indexCount === 5) {
            return indexTracks.slice(0,5);
        } else if (indexCount === 10) {
            return indexTracks.slice(0,10);
        } else {
            return indexTracks;
        }
    }

    function extendIndexCountButton() {
        if (indexCount === 5) {
            return (
                <button
                    className="track-index__load-more"
                    onClick={setIndexCountLimit} 
                    data-testid="track-index__load-more"
                >
                    LOAD MORE
                </button>
            );
        } else if (indexCount === 10) { 
            return (
                <button
                    className="track-index__load-more"
                    onClick={setIndexCountLimit}
                    data-testid="track-index__load-more"
                >
                    We Miss You DMX!
                </button>
            );
        }
    }

    function setIndexCountLimit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setIndexCount(indexCount+5);
    }

    return (
        <>
            <Navbar />
            <div className={theme === "light" ? "track-index" : "track-index--dark"}>
                <h1 className="track-index__h1">CHARTS</h1>
                <h2 className="track-index__h2">REALLY POPULAR ON REALLY SMART</h2>
                <ul className="track-index__items">
                    {indexTracks.length > 0 && trackIndexItems()}
                </ul>
            </div>
            <div className={theme === "light" ? "track-index__bottom" : "track-index__bottom--dark"}>
                {indexCount <= 10 && extendIndexCountButton()}
            </div>
        </>
    );
}

export default TrackIndex;