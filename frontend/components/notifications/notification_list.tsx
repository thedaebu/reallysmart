import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiCheckboxIndeterminateFill } from "react-icons/ri"
import * as NotificationAPIUtil from "../../util/api/notification_api_util";
import { Notification, UpdatedNotification } from "../../my_types";

type Props = {
    changeOpenStatus: Function;
    makeReadStatusTrue: Function;
    notifications: Array<Notification>;
};

function NotificationList(props: Props) {
    const { changeOpenStatus, makeReadStatusTrue, notifications } = props;

    const updateNotification: Function = (notification: Notification) => NotificationAPIUtil.updateNotification(notification);

    useEffect(() => {
        makeReadStatusTrue();
        updateNotifications();
    }, []);

    function updateNotifications() {
        for (let i = 0; i < notifications.length; i++) {
            let notification: Notification = notifications[i];
            if (notification.read) break;
            const updatedNotification: UpdatedNotification = {
                id: notification.id,
                type: notification.type
            }
            updateNotification(updatedNotification);
        }
    }

    function notificationItem(notification: Notification) {
        const { body, created_at, track, type } = notification;
        const { artist, title } = track;
        const name: string = type === "AnnotationAlert"
            ? notification.commenter_name
            : notification.mentioner_name;

        switch (type) {
            case "AnnotationAlert":
                return (
                    <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                        <span className="notification-list__item-highlighted">{`${name} `}</span>
                        <span className="notification-list__item-regular">commented on your annotation</span>
                        <span className="notification-list__item-highlighted">{` '${(notificationify(body))}' `}</span>
                        <span className="notification-list__item-regular">for</span>
                        <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
                        <time className="notification-list__item-date">{` - ${dateDisplay(created_at)}`}</time>
                    </Link>
                );
            case "Mention":
                const { commentable_type } = notification;
                return (
                    <Link to={`/tracks/${urlify(artist)}__${urlify(title)}`}>
                        <span className="notification-list__item-highlighted">{`${name} `}</span>
                        <span className="notification-list__item-regular">mentioned you in a comment</span>
                        {commentable_type === "Annotation" &&
                            <span className="notification-list__item-regular">
                                {' for the annotation '}<span className="notification-list__item-highlighted">{`'${(notificationify(body))}' `}</span>
                            </span>
                        }
                        <span className="notification-list__item-regular">{" for"}</span>
                        <span className="notification-list__item-highlighted">{` ${artist} - ${title}`}</span>
                        <time className="notification-list__item-date">{` - ${dateDisplay(created_at)}`}</time>
                    </Link>
                );
        }
    }

    function urlify(string: string) {
        return string.split(" ").join("_").toLowerCase();
    }

    function notificationify(body: string) {
        return (
            body.length > 30
                ? `${body.slice(0,27)}...`
                : body
        );
    }

    function dateDisplay(dateTime: string) {
        const date: Date = new Date(Date.parse(dateTime));
        const year: string = date.getFullYear().toString();
        const month: string = (date.getMonth()+1).toString().padStart(2, "0")
        const day: string = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="notification-list" data-testid="notification-list">
            <div className="notification-list__top">
                <p className="notification-list__top-notifications">NOTIFICATIONS</p>
                <RiCheckboxIndeterminateFill 
                    className="notification-list__top-exit"
                    size={16}
                    onClick={() => changeOpenStatus()}
                />
            </div>
            <ul>
                {notifications.map((notification: Notification, idx: number) => {
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