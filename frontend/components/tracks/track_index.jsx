import React from "react";
import Navbar from "../header/navbar";
import TrackIndexItem from "./track_index_item";

class TrackIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: 5
        };

        this.trackIndexItems = this.trackIndexItems.bind(this);
        this.listButton = this.listButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {   
        this.props.fetchTracks();    
        window.scrollTo(0, 0);
    }

    trackIndexItems() {
        const { tracks } = this.props;

        if (this.state.list === 5) {
            return (
                tracks.slice(0, 5).map(track => {
                    return <TrackIndexItem track={track} key={track.id} />;
                })
            );
        } else if (this.state.list === 10) {
            return (
                tracks.slice(0, 10).map(track => {
                    return <TrackIndexItem track={track} key={track.id} />;
                })
            );
        } else {
            return (
                tracks.map(track => {
                    return <TrackIndexItem track={track} key={track.id} />;
                })
            );
        }
    }

    listButton() {
        if (this.state.list === 5) {
            return ( 
                <p onClick={this.handleClick} className="tracks-index-load-more">LOAD MORE</p>
            );
        } else if (this.state.list === 10) { 
            return ( 
                <p onClick={this.handleClick} className="tracks-index-load-more">We Miss You DMX!</p>
            );
        } else {
            return (
                null
            );
        }
    }

    handleClick(e) {
        e.preventDefault();

        if (this.state.list === 5) {
            this.setState({
                list: 10
            });
        } else if (this.state.list === 10) {
            this.setState({
                list: 11
            });
        }
    }

    render() {
        return (
            <div className="tracks-index-main">
                <Navbar />
                <div className="tracks-index-top">
                    <h1 className="tracks-index-h1" >CHARTS</h1>
                    <h2 className="tracks-index-h2" >REALLY POPULAR ON REALLY SMART</h2>
                    <ul className="tracks-index-list">
                        {this.trackIndexItems()}
                    </ul>
                </div>
                {this.listButton()}
            </div>
        );
    }
};

export default TrackIndex;