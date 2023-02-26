import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { AnyAction } from "@reduxjs/toolkit";
import { State, Track, TrackAction, Window } from "../../my_types";
import LyricsShow from "../lyrics/lyrics";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";
import { useParams } from "react-router-dom";

declare const window: Window;

function TrackShow() {
    const { trackName }: { trackName: string } = useParams();

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
                    <TrackShowHeader track={track} />
                    <LyricsShow track={track} />
                    <footer className="track-show__footer">
                        <iframe className="spotify-player" src={track.spotify_path}></iframe>
                    </footer>
                </>
            )}
        </>
    );
}

export default TrackShow;