import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Account, State } from "../../my_types";

function AccountShowComments() {
    const account: Account = useSelector((state: State) => state.entities.account);

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }
    
    return (
        <ul >
            <h1 className="account-show__h1">Comments</h1>
            {account.comments.map((comment: {body: string, track: {artist: string, title: string}}, idx: number) => (
                <li className="account-show-item" key={idx}>
                    <p>{comment.body}</p>
                    <Link to={`/tracks/${urlify(comment.track.artist)}__${urlify(comment.track.title)}`}>
                        {` ${comment.track.artist} - ${comment.track.title}`}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default AccountShowComments;