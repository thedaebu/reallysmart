import React from "react";

declare const window: any;

type TrackShowHeaderProps = {
    track: Track
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}

function TrackShowHeader(props: TrackShowHeaderProps) {
    const { track } = props;
    
    const artworkPath = track.artwork_path;
    
    function randomNum() {
      return Math.floor(Math.random() * 1000);
    }

    return (
        <div 
            className="track-show-header-main" 
            style={{ 
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${artworkPath})`, 
                backgroundPosition: "center", 
                backgroundSize: "cover" 
            }}
        >
            <div className="track-show-header-shade">
                <div>
                    <div className="track-show-header-left">
                        <div
                            className="track-show-header-image"
                            style={{
                                backgroundImage: `url(${artworkPath}`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                        </div>
                        <div className="track-show-header-center">
                            <p className="track-show-header-title">{track.title}</p>
                            <p className="track-show-header-artist">{track.artist}</p>
                        </div>
                    </div>
                    <div className="track-show-header-right">
                        <div>
                            <img src={window.fireIcon}/>
                            <p className="track-index-item-fire-number">{randomNum()}</p>
                        </div>
                        <div>
                            <img src={window.eyeIcon}/>
                            <p className="track-index-item-eye-number">{randomNum() * 10}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackShowHeader;