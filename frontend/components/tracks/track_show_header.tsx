import React from "react";
import { Track, Window } from "../../my_types";

declare const window: Window;
type Props = {
    track: Track
}

function TrackShowHeader(props: Props) {
    const { track } = props;

    function randomNum() {
      return Math.floor(Math.random() * 1000);
    }

    return (
        <div 
            className="track-show__background" 
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${track.artwork_path})`,
                backgroundPosition: "center", 
                backgroundSize: "cover" 
            }}
        >
            <div className="track-show__shade">
                <div>
                    <div className="track-show__left">
                        <div
                            className="track-show__image"
                            style={{
                                backgroundImage: `url(${track.artwork_path}`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                        </div>
                        <div className="track-show__text">
                            <p className="track-show__title">{track.title}</p>
                            <p className="track-show__artist">{track.artist}</p>
                        </div>
                    </div>
                    <div className="track-show__right">
                        <div>
                            <img src={window.fireIcon}/>
                            <p className="track-show__fire-number">{randomNum()}</p>
                        </div>
                        <div>
                            <img src={window.eyeIcon}/>
                            <p className="track-show__eye-number">{randomNum() * 10}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackShowHeader;