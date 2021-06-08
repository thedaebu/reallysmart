import React from "react";
import Navbar from "../header/navbar";
import TrackIndexItem from "./track_index_item";

class TrackIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: 5
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {   
        this.props.fetchTracks();    
        window.scrollTo(0, 0);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.state.list === 5) {
            this.setState({
                list: 10
            })
        } else if (this.state.list === 10) {
            this.setState({
                list: 11
            })
        }
    }

    render() {
        const { tracks } = this.props;

        let trackIndexItems;
        if (this.state.list === 5) {
            trackIndexItems = tracks.slice(0, 5).map(track => {
                return <TrackIndexItem track={track} key={track.id} />;
            })
        } else if (this.state.list === 10) {
            trackIndexItems = tracks.slice(0, 10).map(track => {
                return <TrackIndexItem track={track} key={track.id} />;
            })
        } else {
            trackIndexItems = tracks.map(track => {
                return <TrackIndexItem track={track} key={track.id} />;
            })
        }

        let loadMore;
        if (this.state.list === 5) {
            loadMore = <p onClick={this.handleClick} className='tracks-index-load-more'>LOAD MORE</p>
        } else if (this.state.list === 10) { 
            loadMore = <p onClick={this.handleClick} className='tracks-index-load-more'>We Miss You DMX!</p>
        } else {
            loadMore = null;
        }

        return (
            <div className='tracks-index-main'>
                <Navbar />
                <div className='tracks-index-top'>
                    <h1 className='tracks-index-h1' >CHARTS</h1>
                    <h2 className='tracks-index-h2' >REALLY POPULAR ON REALLY SMART</h2>
                    <ul className='tracks-index-list'>
                        {trackIndexItems}
                    </ul>
                </div>
                {loadMore}
            </div>
        )
    }
};

export default TrackIndex;