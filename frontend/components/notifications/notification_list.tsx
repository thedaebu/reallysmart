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
    console.log(notifications)
    useEffect(() => {
        makeReadStatusTrue();
        updateNotifications();
    }, []);

    const updateNotification: Function = (notification: any) => NotificationActions.updateNotification(notification);

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
            const { body, commenter, track } = notification;
            const { artist, title } = track;

            return (
                <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                    <span className="notification-list__item-highlighted">{`${commenter} `}</span>
                    commented on your annotation
                    <span className="notification-list__item-highlighted">{` '${(notificationify(body))}' `}</span>
                    for
                    <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
                </Link>
            );
        } else {
            const { body, mentioner, track } = notification;
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