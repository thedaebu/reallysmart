import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Account, State } from "../../my_types";

function AccountShowAnnotations() {
    const account: Account = useSelector((state: State) => state.entities.account);

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }
    
    return (
        <ul>
            <h1 className="account-show__h1">Annotations</h1>
            {account.annotations.map((annotation: {body: string, track: {artist: string, title: string}}, idx: number) => (
                <li className="account-show-item" key={idx}>
                    <p>{annotation.body}</p>
                    <Link to={`/tracks/${urlify(annotation.track.artist)}__${urlify(annotation.track.title)}`}>
                        {` ${annotation.track.artist} - ${annotation.track.title}`}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default AccountShowAnnotations;