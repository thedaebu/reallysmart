import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnnotationNotification, State } from "../../my_types";
import { BiEnvelope } from "react-icons/bi";
import NotificationList from "./notification_list";

function NotificationShow({ cableApp }: { cableApp: any }) {
    const currentUser = useSelector((state:State) => state.entities.user[state.session.id]);

    const [notificationOpenStatus, setNotificationOpenStatus] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Array<AnnotationNotification>>([]);
    const [readStatus, setReadStatus] = useState<boolean>(true);

    useEffect(() => {
        if(currentUser) {
            const sortedNotifications: Array<AnnotationNotification> = currentUser.notifications.sort((a,b) => (new Date(Date.parse(b.created_at)).getTime() - (new Date(Date.parse(a.created_at)).getTime())));
            setNotifications(() => ([...sortedNotifications]));
            isRead(sortedNotifications);

            cableApp.cable.subscriptions.create(
                {
                    channel: "NotificationChannel",
                    user_id: currentUser.id
                },
                {
                    received: ({ notification }: { notification: AnnotationNotification }) => {
                        setNotifications((notifications: Array<AnnotationNotification>) => [...notifications, notification]);
                        setReadStatus(false);
                    }
                }
            )
        }
    }, [currentUser]);

    function isRead(notifications: Array<AnnotationNotification>) {
        if (notifications.length && notifications[0].read === false) setReadStatus(false);
    }

    function makeReadStatusTrue() {
        setReadStatus(true);
    }

    function changeNotificationOpenStatus() {
        setNotificationOpenStatus(!notificationOpenStatus);
    }

    return (
        <>
            {currentUser &&
                <div>
                    <BiEnvelope
                        className={readStatus === false ? "notification-icon__unread" : "notification-icon__read"}
                        size={16}
                        onClick={changeNotificationOpenStatus}
                    />
                    {notificationOpenStatus === true && (
                        <NotificationList
                            changeNotificationOpenStatus={changeNotificationOpenStatus}
                            makeReadStatusTrue={makeReadStatusTrue}
                            notifications={notifications}
                        />
                    )}
                </div>
            }
        </>
    );
}

export default NotificationShow;