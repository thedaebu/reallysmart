import React from "react";
import VotesShowContainer from "../votes/votes_show_container";

type Props = {
    comment: Comment;
    commentableType: string;
    fetchAction: Function,
    parent: Annotation | Track
}
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface Comment {
    body: string,
    commentable_id: number,
    commenter: string,
    commenter_id: number,
    id: number,
    updated_at: string,
    votes: number
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

function CommentShowItem(props: Props) {
    const { comment, parent, fetchAction, commentableType } = props;

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
                    voteableType="Comment" 
                    voteableId={comment.id} 
                    parent={comment} 
                    fetchAction={fetchAction} 
                    numberOfVotes={comment.votes} 
                />
            </div>
        )
    }

    function handleTime(dateTime: string) {
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