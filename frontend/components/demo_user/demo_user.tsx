import React, { MouseEvent } from "react";
import { SessionUser, User } from "../../my_types";

type Props = {
    currentUser: User,
    login: Function
}

function DemoUser(props: Props) {
    const { currentUser, login } = props;

    function loginWithDemo(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        const sessionUser: SessionUser = {
            password: "notsosmart",
            username: "notsosmart"
        };

        login(sessionUser);
    }

    if (currentUser) {
        return (
            null
        );
    } else {
        return (
            <a className="demo" onClick={loginWithDemo}>DEMO</a>
        );
    }
}

export default DemoUser;