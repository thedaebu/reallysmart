import React from "react";
import { Track, Window } from "../../my_types";

declare const window: Window;

function TrackShowHeader({ track }: { track: Track }) {
    const { artist, artwork_path, title } = track;

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <div
            className="track-show__background" 
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${artwork_path})`
            }}
            data-testid="track-show-header"
        >
            <div className="track-show__shade">
                <div>
                    <section className="track-show__left">
                        <div
                            className="track-show__image"
                            style={{
                                backgroundImage: `url(${artwork_path})`
                            }}
                        >
                        </div>
                        <div className="track-show__text">
                            <p className="track-show__title">{title}</p>
                            <p className="track-show__artist">{artist}</p>
                        </div>
                    </section>
                    <section className="track-show__right">
                        <div>
                            <img src={window.fireIcon} alt="Fire" />
                            <p className="track-show__fire-number">{randomNum()}</p>
                        </div>
                        <div>
                            <img src={window.eyeIcon} alt="Eye" />
                            <p className="track-show__eye-number">{randomNum() * 10}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TrackShowHeader;