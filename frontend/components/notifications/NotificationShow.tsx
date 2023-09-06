import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import cableApp from "../../util/action_cable_util";
import NotificationList from "./NotificationList";
import { BiEnvelope } from "react-icons/bi";
import { Notification, State, User } from "../../my_types";

function NotificationShow() {
    const currentUser: User = useSelector((state: State) => state.entities.user);
    const { annotation_alerts, mentions } = currentUser;

    const location: string = useLocation().pathname;

    const [notifications, setNotifications] = useState<Array<Notification>>([]);
    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [readStatus, setReadStatus] = useState<boolean>(true);

    useEffect(() => {
        handleCableApp(currentUser.id);
        const sortedNotifications: Array<Notification> = [...annotation_alerts, ...mentions].sort((a,b) => (new Date(Date.parse(b.created_at)).getTime() - (new Date(Date.parse(a.created_at)).getTime())));
        setNotifications(() => ([...sortedNotifications]));
        checkReadStatus(sortedNotifications);
    }, []);

    useEffect(() => {
        setOpenStatus(false);
    }, [location]);

    function handleCableApp(userId: number) {
        cableApp.cable.subscriptions.create(
            {
                channel: "NotificationChannel",
                user_id: userId
            },
            {
                received: ({ notification }: { notification: Notification; }) => {
                    setNotifications((notifications: Array<Notification>) => [notification, ...notifications]);
                    setReadStatus(false);
                }
            }
        );
    }

    function checkReadStatus(notifications: Array<Notification>) {
        if (notifications.length && notifications[0].read === false) setReadStatus(false);
    }

    function makeReadStatusTrue() {
        setReadStatus(true);
    }

    function changeOpenStatus() {
        setOpenStatus((status: boolean) => !status);
    }

    return (
        <>
            <BiEnvelope
                className={readStatus === false ?
                    "notification-icon__unread" :
                    "notification-icon__read"
                }
                size={16}
                onClick={changeOpenStatus}
                data-testid="notification-icon"
            />
            {openStatus && (
                <NotificationList
                    changeOpenStatus={changeOpenStatus}
                    makeReadStatusTrue={makeReadStatusTrue}
                    notifications={notifications}
                />
            )}
        </>
    );
}

export default NotificationShow;