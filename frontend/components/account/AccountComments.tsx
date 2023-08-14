import React from "react";
import { Link } from "react-router-dom";
import { AccountComment } from "../../my_types";

function AccountComments({ comments }: { comments: Array<AccountComment>; }) {
    function commentItem(comment: AccountComment, idx: number) {
        const { body, commentable_body, commentable_type, created_at, track, votes } = comment;
        const { artist, title } = track;

        return (
            <li
                className="account-item"
                key={idx}
                data-testid="account-item"
            >
                <p>{body}<span className="account-item__votes"> +{votes}</span></p>
                {commentable_type === "Annotation" && <p>- for annotation <span className="account-item__highlighted">{`'${(notificationify(commentable_body))}' `}</span></p>}
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`} data-testid="account-item__link">
                    <span className="account-item__highlighted">
                        {` ${artist} - ${title}`}
                    </span>
                </Link>
                <time className="account-item__date">{` - ${dateDisplay(created_at)}`}</time>
            </li>
        );
    }

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }

    function notificationify(body: string) {
        return body.length > 30 ? `${body.slice(0,27)}...` : body;
    }

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const year: string = date.getFullYear().toString();
        const month: string = (date.getMonth()+1).toString().padStart(2, "0");
        const day: string = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <ul>
            <h1 className="account-show__h1">Comments</h1>
            {comments.map((comment: AccountComment, idx: number) => (
                commentItem(comment, idx)
            ))}
        </ul>
    );
}

export default AccountComments;