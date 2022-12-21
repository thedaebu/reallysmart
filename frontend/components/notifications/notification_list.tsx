import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { RiCheckboxIndeterminateFill } from "react-icons/ri"
import * as NotificationActions from "./../../actions/notification_actions";
import { AnnotationNotification } from '../../my_types';

type Props = {
    changeNotificationOpenStatus: Function,
    makeReadStatusTrue: Function,
    notifications: Array<AnnotationNotification>
}

function NotificationList(props: Props) {
    const { changeNotificationOpenStatus, makeReadStatusTrue, notifications } = props;

    useEffect(() => {
        makeReadStatusTrue();
        updateNotifications();
    }, []);

    const updateNotification: Function = (notification: any) => NotificationActions.updateNotification(notification);

    function updateNotifications() {
        for (let i = 0; i < notifications.length; i++) {
            let notification: any = notifications[i];
            if (notification.read === true) break;
            const updatedNotification = {
                id: notification.id,
                type: "Annotation"
            }
            notification["type"] = "Annotation";
            updateNotification(updatedNotification);
        }
    }

    function handleNotificationOpenStatus() {
        changeNotificationOpenStatus();
    }

    function notificationItem(notification: AnnotationNotification) {
        const { body, commenter, track } = notification;
        const { artist, title } = track;

        return (
            <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                <span className="notification-list__item-highlighted">{`${commenter} `}</span>
                commented on your annotation '
                <span className="notification-list__item-highlighted">{`${(notificationify(body))}`}</span>
                ' for
                <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
            </Link>
        );
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
                {notifications.map((notification: AnnotationNotification, idx: number) => {
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