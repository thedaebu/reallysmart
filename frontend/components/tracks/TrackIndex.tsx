import React, { Dispatch, MouseEvent, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { ThemeContext } from "../../contexts/theme_context";
import MemoizedTrackItem, { TrackItem } from "./TrackItem";
import Navbar from "../navbar/Navbar";
import { AnyAction } from "@reduxjs/toolkit";
import { IndexTrack, State, Window } from "../../my_types";

declare const window: Window;

function TrackIndex() {
    const tracks: Array<IndexTrack> = useSelector((state: State) => Object.values(state.entities.indexTracks));

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchTracks: Function = () => dispatch(TrackActions.fetchTracks());

    const [indexCount, setIndexCount] = useState<number>(5);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchTracks();
        document.title = "Really Smart";
        window.scrollTo(0, 0);
    }, []);

    function trackIndexItems() {
        const indexTracks: Array<TrackItem> = tracks.map((track: IndexTrack, idx: number) => (
            <MemoizedTrackItem
                listNumber={idx+1}
                track={track}
                key={track.id}
            />
        ));
        switch (indexCount) {
            case 5:
                return indexTracks.slice(0,5);
            case 10:
                return indexTracks.slice(0,10);
            default:
                return indexTracks;
        }
    }

    function extendIndexCountButton() {
        switch (indexCount) {
            case 5:
                return (
                    <button
                        className="track-index__load-more"
                        onClick={setIndexCountLimit} 
                        data-testid="track-index__load-more"
                    >
                        LOAD MORE
                    </button>
                );
            case 10:
                return (
                    <button
                        className="track-index__load-more"
                        onClick={setIndexCountLimit}
                        data-testid="track-index__load-more"
                    >
                        We Miss You DMX!
                    </button>
                );
            default:
                return null;
        }
    }

    function setIndexCountLimit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setIndexCount(indexCount+5);
    }

    return (
        <>
            <Navbar />
            <div 
                className={theme === "light" ?
                    "track-index" :
                    "track-index--dark"
                }
            >
                <h1 className="track-index__h1">CHARTS</h1>
                <h2 className="track-index__h2">REALLY POPULAR ON REALLY SMART</h2>
                <ul className="track-items">
                    {tracks.length > 0 && trackIndexItems()}
                </ul>
            </div>
            <div 
                className={theme === "light" ?
                    "track-index__bottom" :
                    "track-index__bottom--dark"
                }
            >
                {extendIndexCountButton()}
            </div>
        </>
    );
}

export default TrackIndex;