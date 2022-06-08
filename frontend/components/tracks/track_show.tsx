import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { RouteComponentProps } from "react-router";
import { State, Track, Window } from "../../my_types";
import LyricsShow from "../lyrics/lyrics";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";

declare const window: Window;

function TrackShow(props: RouteComponentProps<{ trackId: string }>) {
    const trackId = props.match.params.trackId;

    const track: Track = useSelector((state: State) => state.entities.track[parseInt(trackId)]);

    const dispatch: Dispatch<any> = useDispatch();
    const fetchTrack: Function = (trackId: string) => dispatch(TrackActions.fetchTrack(trackId));

    useEffect(() => {
        fetchTrack(trackId);
        window.scrollTo(0, 0);
    }, [trackId]);

    return(
        <>
            {track && (
                <>
                    <NavBar />
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