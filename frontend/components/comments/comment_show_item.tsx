import React from "react";
import { Comment } from "../../my_types";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    comment: Comment;
    commentableType: string,
}

function CommentShowItem(props: Props) {
    const { comment, commentableType } = props;

    function commentItem() {
        return (
            <div>
                <div className="comment-list-item-top">
                    <div className="comment-list-item-top-top">
                        <img className="comment-list-item-baby" src="https://assets.genius.com/images/default_avatar_100.png" />
                        <p className="comment-list-item-commenter">{comment.commenter}</p>
                    </div>
                    <p className="comment-list-item-time">{handleTime(comment.updated_at)}</p>
                </div>
                <p className="comment-list-item-body">{comment.body}</p>
                <VotesShowContainer 
                    numberOfVotes={comment.number_of_votes} 
                    parent={comment} 
                    voteableId={comment.id} 
                    voteableType="Comment" 
                />
            </div>
        )
    }

    function handleTime(dateTime: string) {
        const oldDate: Date = new Date(Date.parse(dateTime));
        const currentDate: Date = new Date();
        const timeDiff: number = currentDate.getTime() - oldDate.getTime();
        const dayDiff: number = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (dayDiff > 730) {
            return `${Math.floor(dayDiff/365)} years ago`;
        } else if (dayDiff > 365) {
            return `1 year ago`;
        } else if (dayDiff > 60) {
            return `${Math.floor(dayDiff/30)} months ago`;
        } else if (dayDiff > 30) {
            return `1 month ago`;
        } else if (dayDiff > 2) {
            return `${dayDiff} days ago`
        } else if (dayDiff > 1) {
            return `1 day ago`
        } else {
            return `<1 day ago`
        }
    }

    if (commentableType === "Track") {
        return (
            <li className="comment-list-track-item">
                {commentItem()}
            </li>
        );
    } else {
        return (
            <li className="comment-list-anno-item">
                {commentItem()}
            </li>
        );
    }
}

export default CommentShowItem;