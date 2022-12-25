import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { RiCheckboxIndeterminateFill } from "react-icons/ri"
import * as NotificationActions from "./../../actions/notification_actions";
import { AnnotationAlert, Mention } from '../../my_types';

type Props = {
    changeNotificationOpenStatus: Function,
    makeReadStatusTrue: Function,
    notifications: Array<AnnotationAlert | Mention>
}

function NotificationList(props: Props) {
    const { changeNotificationOpenStatus, makeReadStatusTrue, notifications } = props;

    const updateNotification: Function = (notification: AnnotationAlert | Mention) => NotificationActions.updateNotification(notification);

    useEffect(() => {
        makeReadStatusTrue();
        updateNotifications();
    }, []);

    function updateNotifications() {
        for (let i = 0; i < notifications.length; i++) {
            let notification: AnnotationAlert | Mention = notifications[i];
            if (notification.read === true) break;
            const updatedNotification = {
                id: notification.id,
                type: notification.type === "AnnotationAlert" ? "AnnotationAlert" : "Mention"
            }
            updateNotification(updatedNotification);
        }
    }

    function handleNotificationOpenStatus() {
        changeNotificationOpenStatus();
    }

    function notificationItem(notification: AnnotationAlert | Mention) {
        if (notification.type === "AnnotationAlert"){
            const { body, commenter, created_at, track } = notification;
            const { artist, title } = track;

            return (
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                    <span className="notification-list__item-highlighted">{`${commenter} `}</span>
                    commented on your annotation
                    <span className="notification-list__item-highlighted">{` '${(notificationify(body))}' `}</span>
                    for
                    <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
                    <span className="notification-list__item-date">{` -${dateDisplay(created_at)}`}</span>
                </Link>
            );
        } else {
            const { body, created_at, mentioner, track } = notification;
            const { artist, title } = track;

            return (
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                    <span className="notification-list__item-highlighted">{`${mentioner} `}</span>
                    mentioned you in a comment
                    {body.length > 0 &&
                        <span>
                            {' for the annotation '}<span className="notification-list__item-highlighted">{`'${(notificationify(body))}' `}</span>
                        </span>
                    }
                    {' for'}
                    <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
                    {` - ${dateDisplay(created_at)}`}
                </Link>
            );
        }
    }

    function urlify(string: string) {
        const words: Array<string> = string.split(" ");
        return words.join("_").toLowerCase();
    }

    function notificationify(body: string) {
        return body.length > 30
            ? `${body.slice(0,27)}...`
            : body;
    }

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const month: string = date.getMonth() < 10 ? `0${date.getMonth().toString()}` : `${date.getMonth().toString()}`;
        const day: string = date.getDate() < 10 ? `0${date.getDate().toString()}` : `${date.getDate().toString()}`;
        return `${date.getFullYear().toString()}-${month}-${day}`;
    }

    return (
        <div className="notification-list">
            <div className="notification-list__top">
                <p className="notification-list__top-notifications">NOTIFICATIONS</p>
                <RiCheckboxIndeterminateFill 
                    className="notification-list__top-exit"
                    size={16}
                    onClick={handleNotificationOpenStatus}
                />
            </div>
            <ul>
                {notifications.map((notification: AnnotationAlert | Mention, idx: number) => {
                    return (
                        <li className="notification-list__item" key={idx}>
                            {notificationItem(notification)}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default NotificationList;