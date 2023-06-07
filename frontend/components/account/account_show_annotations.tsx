import React from "react";
import { Link } from "react-router-dom";
import { AccountAnnotation } from "../../my_types";

function AccountShowAnnotations({ annotations }: { annotations: Array<AccountAnnotation>; }) {
    const sortedAnnotations: Array<AccountAnnotation> = annotations.sort((a,b) => (new Date(Date.parse(b.created_at)).getTime() - (new Date(Date.parse(a.created_at)).getTime())));

    function annotationItem(annotation: AccountAnnotation, idx: number) {
        const { body, created_at, track, votes } = annotation;
        const { artist, title } = track;

        return (
            <li className="account-show__item" key={idx}>
                <p>{body}<span className="account-show__item-votes"> +{votes}</span></p>
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                    <span className="account-show__item-highlighted">
                        {` ${artist} - ${title}`}
                    </span>
                </Link>
                <time className="account-show__item-date">{` - ${dateDisplay(created_at)}`}</time>
            </li>
        );
    }

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const year: string = date.getFullYear().toString();
        const month: string = (date.getMonth()+1).toString().padStart(2, "0")
        const day: string = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
    
    return (
        <ul>
            <h1 className="account-show__h1">Annotations</h1>
            {sortedAnnotations.map((annotation: AccountAnnotation, idx: number) => (
                annotationItem(annotation, idx)
            ))}
        </ul>
    );
}

export default AccountShowAnnotations;