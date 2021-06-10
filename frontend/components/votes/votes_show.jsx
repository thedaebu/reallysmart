import React from "react";
import { RiThumbUpLine } from "react-icons/ri";

class VotesShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentVoteStatus: this.props.currentVoteStatus
        };

        this.handleVote = this.handleVote.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser && this.props.currentUser.vote_ids.length > 0) {
            this.props.currentUser.vote_ids.forEach(id => {
                this.props.fetchVote(id);
            })
        }
    }

    handleVote(e) {
        e.preventDefault();

        const { parent, currentUser, currentVote, voteableType, voteableId, deleteVote, createVote, fetchAction} = this.props;

        if (currentUser && this.state.currentVoteStatus) {
            this.setState({currentVoteStatus: false});
            deleteVote(currentVote.id).then(() => fetchAction(parent.id))
        } else if (currentUser) {
            createVote({
                voter_id: currentUser.id,
                voteable_type: voteableType,
                voteable_id: voteableId
            }).then(() => fetchAction(parent.id))
            this.setState({currentVoteStatus: true});
        }
    }

    render() {
        const { numberOfVotes, currentUser } = this.props;
        
        if (currentUser && this.state.currentVoteStatus === true) {
            return (
                <div className="vote-show-main" >
                    <RiThumbUpLine className="vote-show-voted" onClick={this.handleVote} />
                    <div className="vote-show-count" >+{numberOfVotes}</div>
                </div>
            );
        } else if (currentUser && this.state.currentVoteStatus === false) {
            return (
                <div className="vote-show-main" >
                    <RiThumbUpLine className="vote-show-not-voted" onClick={this.handleVote} />
                    <div className="vote-show-count" >+{numberOfVotes}</div>
                </div>
            );
        } else {
            return (
                <div className="vote-show-main" >
                    <RiThumbUpLine className="vote-show-not-voted"/>
                    <div className="vote-show-count" >+{numberOfVotes}</div>
                </div>
            );
        }
    }
};

export default VotesShow;