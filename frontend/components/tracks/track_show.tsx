import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { RouteComponentProps } from "react-router";
import { State, Track, Window } from "../../my_types";
import LyricsShow from "../lyrics/lyrics";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";

declare const window: Window;

function TrackShow(props: RouteComponentProps<{ trackName: string }>) {
    const trackName: string = props.match.params.trackName;

    const track: Track = useSelector((state: State) => state.entities.track);

    const dispatch: Dispatch<any> = useDispatch();
    const fetchTrack: Function = (trackInfo: Array<string>) => dispatch(TrackActions.fetchTrack(trackInfo));

    const [trackInfo, setTrackInfo] = useState<Array<string>>([]);

    useEffect(() => {
        const trackSearch: Array<string> = formatTrackName(trackName);
        fetchTrack(trackSearch);
        window.scrollTo(0, 0);
    }, [trackName]);

    function formatTrackName(trackName: string) {
        const unUrlifiedWords: Array<string> = trackName.split("__");
        for (let i = 0; i < 2; i++) {
            unUrlifiedWords[i] = unUrlify(unUrlifiedWords[i]);
        }
        setTrackInfo(unUrlifiedWords);
        return unUrlifiedWords;
    }

    function unUrlify(string: string) {
        const words = string.split("_");
        return words.join(" ");
    }

    return(
        <>
            {Object.keys(track).length > 0 && (
                <>
                    <NavBar />
                    <TrackShowHeader track={track} />
                    <LyricsShow track={track} trackInfo={trackInfo} />
                    <footer className="track-show__footer">
                        <iframe className="spotify-player" src={track.spotify_path}></iframe>
                    </footer>
                </>
            )}
        </>
    );
}

export default TrackShow;