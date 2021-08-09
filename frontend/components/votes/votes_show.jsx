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
        const { currentUser, fetchVote } = this.props;

        if (currentUser && currentUser.vote_ids.length > 0) {
            currentUser.vote_ids.forEach(id => {
                fetchVote(id);
            })
        }
    }

    handleVote(e) {
        e.preventDefault();

        const { parent, currentUser, currentVote, voteableType, voteableId, deleteVote, createVote, fetchAction} = this.props;
        const { currentVoteStatus } = this.state;

        if (currentUser && currentVoteStatus === true) {
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
        const { currentVoteStatus } = this.state;

        if (currentUser && currentVoteStatus === true) {
            return (
                <div className="vote-show-main" >
                    <RiThumbUpLine className="vote-show-voted" onClick={this.handleVote} />
                    <div className="vote-show-count" >+{numberOfVotes}</div>
                </div>
            );
        } else if (currentUser && currentVoteStatus === false) {
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