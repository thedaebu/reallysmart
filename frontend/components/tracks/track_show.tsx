import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { useParams } from "react-router";
import { Action, State, Track, Window } from "../../my_types";
import LyricsShow from "../lyrics/lyrics";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";

declare const window: Window;

function TrackShow() {
    const { trackName }: { trackName: string } = useParams();

    const track: Track = useSelector((state: State) => state.entities.track);

    const dispatch: Dispatch<any> = useDispatch();
    const fetchTrack: Function = (trackInfo: Array<string>) => dispatch(TrackActions.fetchTrack(trackInfo));

    useEffect(() => {
        const trackSearch: Array<string> = formatTrackName(trackName);
        fetchTrack(trackSearch)
            .then((result: Action) => document.title = `${result.track.artist} - ${result.track.title}`)
        window.scrollTo(0, 0);
    }, [trackName]);

    function formatTrackName(trackName: string) {
        const unUrlifiedWords: Array<string> = trackName.split("__");
        for (let i = 0; i < 2; i++) {
            unUrlifiedWords[i] = unUrlify(unUrlifiedWords[i]);
        }
        return unUrlifiedWords;
    }

    function unUrlify(string: string) {
        const words = string.split("_");
        return words.join(" ");
    }

    return(
        <>
            <NavBar />
            {Object.keys(track).length > 0 && (
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