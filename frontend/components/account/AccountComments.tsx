import React, { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as AccountActions from "./../../actions/account_actions";
import * as CommentActions from "./../../actions/comment_actions";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AccountComment } from "../../my_types";

function AccountComments({ comments, currentUserId }: { comments: Array<AccountComment>; currentUserId: number; }) {
    const [deleteStatuses, setDeleteStatuses] = useState<Set<number>>(new Set());

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const deleteComment: Function = (id: number) => dispatch(CommentActions.deleteComment(id));
    const fetchAccount: Function = (id: number) => dispatch(AccountActions.fetchAccount(id));

    function commentItem(comment: AccountComment) {
        const { body, commentable_body, commentable_type, created_at, id, track, votes } = comment;
        const { artist, title } = track;

        return (
            <li
                className="account-item"
                key={id}
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
                {deleteDisplay(id)}
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

    function deleteDisplay(id: number) {
        return deleteStatuses.has(id) ? (
            <>
                <span className="account-item__question">Are you sure?</span>
                <button
                    className="account-item__button"
                    onClick={handleDeleteSubmit}
                    data-id={id}
                    data-testid="account-item__button"
                >
                    Yes
                </button>
                <button
                    className="account-item__button"
                    onClick={handleDeleteStatus}
                    data-id={id}
                    data-testid="account-item__button"
                >
                    No
                </button>
            </>
        ) : (
            <button
                className="account-item__button"
                onClick={handleDeleteStatus}
                data-id={id}
                data-testid="account-item__button"
            >
                Delete
            </button>
        );
    }

    function handleDeleteSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const id: number = parseInt(e.currentTarget.dataset.id);

        deleteComment(id)
            .then(() => {
                setDeleteStatuses((statuses: Set<number>) => new Set([...statuses].filter((status: number) => status !== id)));
                fetchAccount(currentUserId);
            });
    }

    function handleDeleteStatus(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const id: number = parseInt(e.currentTarget.dataset.id);
        
        if (deleteStatuses.has(id)) {
            setDeleteStatuses((statuses: Set<number>) => new Set([...statuses].filter((status: number) => status !== id)));
        } else {
            setDeleteStatuses((statuses: Set<number>) => new Set([...statuses, id]));
        }
    }

    return (
        <ul>
            <h1 className="account-show__h1">Comments</h1>
            {comments.map((comment: AccountComment) => (
                commentItem(comment)
            ))}
        </ul>
    );
}

export default AccountComments;