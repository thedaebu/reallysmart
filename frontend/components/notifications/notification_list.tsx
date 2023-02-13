import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { RiCheckboxIndeterminateFill } from "react-icons/ri"
import * as NotificationAPIUtil from "../../util/api/notification_api_util";
import { AnnotationAlert, Mention } from '../../my_types';

type Props = {
    changeNotificationOpenStatus: Function,
    makeReadStatusTrue: Function,
    notifications: Array<AnnotationAlert | Mention>
}

function NotificationList(props: Props) {
    const { changeNotificationOpenStatus, makeReadStatusTrue, notifications } = props;

    const updateNotification: Function = (notification: AnnotationAlert | Mention) => NotificationAPIUtil.updateNotification(notification);

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
            const { body, commenter_name, created_at, track } = notification;
            const { artist, title } = track;

            return (
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                    <span className="notification-list__item-highlighted">{`${commenter_name} `}</span>
                    <span className="notification-list__item-regular">commented on your annotation</span>
                    <span className="notification-list__item-highlighted">{` '${(notificationify(body))}' `}</span>
                    <span className="notification-list__item-regular">for</span>
                    <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
                    <span className="notification-list__item-date">{` -${dateDisplay(created_at)}`}</span>
                </Link>
            );
        } else {
            const { body, created_at, mentioner_name, track } = notification;
            const { artist, title } = track;

            return (
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                    <span className="notification-list__item-highlighted">{`${mentioner_name} `}</span>
                    <span className="notification-list__item-regular">mentioned you in a comment</span>
                    {body.length > 0 &&
                        <span>
                            {' for the annotation '}<span className="notification-list__item-highlighted">{`'${(notificationify(body))}' `}</span>
                        </span>
                    }
                    <span className="notification-list__item-regular">{" for"}</span>
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
        const month: string = date.getMonth() < 9 ? `0${(date.getMonth()+1).toString()}` : `${(date.getMonth()+1).toString()}`;
        const day: string = date.getDate() < 10 ? `0${date.getDate().toString()}` : `${date.getDate().toString()}`;
        return `${date.getFullYear().toString()}-${month}-${day}`;
    }

    return (
        <div className="notification-list" data-testid="notification-list">
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
                        <li
                            className="notification-list__item"
                            key={idx}
                            data-testid="notification-list__item"
                        >
                            {notificationItem(notification)}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default NotificationList;