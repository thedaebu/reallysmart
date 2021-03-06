import React from "react";
import VotesShowContainer from "../votes/votes_show_container";

class CommentItem extends React.Component {
    constructor(props) {
        super(props);

        this.commentItem = this.commentItem.bind(this);
    }

    commentItem() {
        const { comment, parent, fetchAction } = this.props;

        return (
            <div>
                <div className="comment-list-item-top">
                    <div className="comment-list-item-top-top">
                        <img className="comment-list-item-baby" src="https://assets.genius.com/images/default_avatar_100.png" />
                        <p className="comment-list-item-commenter">{comment.commenter}</p>
                    </div>
                    <p className="comment-list-item-time">{this.handleTime(comment.updated_at)}</p>
                </div>
                <p className="comment-list-item-body">{comment.body}</p>
                <VotesShowContainer 
                    voteableType="Comment" 
                    voteableId={comment.id} 
                    parent={parent} 
                    fetchAction={fetchAction} 
                    numberOfVotes={comment.votes} 
                />
            </div>
        )
    }

    handleTime(dateTime) {
        const oldDate = new Date(Date.parse(dateTime));
        const currentDate = new Date();
        const yearDiff = currentDate.getFullYear() - oldDate.getFullYear();
        const monthDiff = currentDate.getMonth() - oldDate.getMonth();
        const dayDiff = currentDate.getDate() - oldDate.getDate();
        
        if (yearDiff > 1) {
            return `${yearDiff} years ago`;
        } else if (yearDiff === 1) {
            return `1 year ago`;
        } else if (monthDiff > 1) {
            return `${monthDiff} months ago`;
        } else if (monthDiff === 1) {
            return `1 month ago`;
        } else if (dayDiff > 1) {
            return `${dayDiff} days ago`;
        } else if (dayDiff === 1) {
            return `1 day ago`;
        } else {
            return `<1 day ago`;
        }
    }

    render() {
        const { commentableType } = this.props;
        
        if (commentableType === "Track") {
            return (
                <li className="comment-list-track-item">
                    {this.commentItem()}
                </li>
            );
        } else {
            return (
                <li className="comment-list-anno-item">
                    {this.commentItem()}
                </li>
            );
        }
    }
};

export default CommentItem;