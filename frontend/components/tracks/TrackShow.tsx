import React, { Dispatch, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import Lyrics from "../lyrics/Lyrics";
import NavBar from "../navbar/Navbar";
import TrackHeader from "./TrackHeader";
import { AnyAction } from "@reduxjs/toolkit";
import { State, Track, TrackAction, Window } from "../../my_types";

declare const window: Window;

function TrackShow() {
    const { trackName } = useParams();

    const track: Track = useSelector((state: State) => state.entities.track);

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchTrack: Function = (trackInfo: Array<string>) => dispatch(TrackActions.fetchTrack(trackInfo));

    useEffect(() => {
        const trackSearch: Array<string> = formatTrackName(trackName);
        fetchTrack(trackSearch)
            .then((result: TrackAction) => document.title = `${result.track.artist} - ${result.track.title}`)
        window.scrollTo(0, 0);
    }, [trackName]);

    function formatTrackName(trackName: string) {
        return trackName.split("__").map((word: string) => unUrlify(word));
    }

    function unUrlify(string: string) {
        return string.split("_").join(" ");
    }

    return(
        <>
            <NavBar />
            {track && (
                <>
                    <TrackHeader track={track} />
                    <Lyrics track={track} />
                    <footer className="track-footer">
                        <iframe className="spotify-player" src={track.spotify_path}></iframe>
                    </footer>
                </>
            )}
        </>
    );
}

export default TrackShow;