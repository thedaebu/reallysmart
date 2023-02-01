import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnnotationAlert, Mention, State, User } from "../../my_types";
import { BiEnvelope } from "react-icons/bi";
import NotificationList from "./notification_list";
import { useLocation } from "react-router-dom";

function NotificationShow({ cableApp }: { cableApp: any }) {
    const currentUser: User = useSelector((state:State) => state.entities.user);
    const { annotation_alerts, mentions } = currentUser;

    const [notificationOpenStatus, setNotificationOpenStatus] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Array<AnnotationAlert | Mention>>([]);
    const [readStatus, setReadStatus] = useState<boolean>(true);

    const location: string = useLocation().pathname;

    useEffect(() => {
        const sortedNotifications: Array<AnnotationAlert | Mention> = [...annotation_alerts, ...mentions].sort((a,b) => (new Date(Date.parse(b.created_at)).getTime() - (new Date(Date.parse(a.created_at)).getTime())));
        setNotifications(() => ([...sortedNotifications]));
        isRead(sortedNotifications);

        cableApp.cable.subscriptions.create(
            {
                channel: "NotificationChannel",
                user_id: currentUser.id
            },
            {
                received: ({ notification }: { notification: AnnotationAlert | Mention }) => {
                    setNotifications((notifications: Array<AnnotationAlert | Mention>) => [notification, ...notifications]);
                    setReadStatus(false);
                }
            }
        );
    }, []);

    useEffect(() => {
        setNotificationOpenStatus(false);
    }, [location]);

    function isRead(notifications: Array<AnnotationAlert | Mention>) {
        if (notifications.length > 0 && notifications[0].read === false) setReadStatus(false);
    }

    function makeReadStatusTrue() {
        setReadStatus(true);
    }

    function changeNotificationOpenStatus() {
        setNotificationOpenStatus(!notificationOpenStatus);
    }

    return (
        <>
            <BiEnvelope
                className={readStatus === false ? "notification-icon__unread" : "notification-icon__read"}
                size={16}
                onClick={changeNotificationOpenStatus}
                data-testid="notification-icon"
            />
            {notificationOpenStatus === true && (
                <NotificationList
                    changeNotificationOpenStatus={changeNotificationOpenStatus}
                    makeReadStatusTrue={makeReadStatusTrue}
                    notifications={notifications}
                />
            )}
        </>
    );
}

export default NotificationShow;