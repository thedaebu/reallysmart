import React, { MouseEvent } from "react";
import { SessionUser, User } from "../../my_types";

type Props = {
    currentUser: User,
    login: Function
}

function DemoUser(props: Props) {
    const { currentUser, login } = props;

    function demoButton() {
        if (!currentUser) {
            return (
                <button className="demo-user" onClick={loginWithDemo}>DEMO</button>
            );
        } else {
            return (
                null
            );
        }
    }

    function loginWithDemo(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const demoUser: SessionUser = {
            password: "notsosmart",
            username: "notsosmart"
        };
        login(demoUser);
    }

    return (
        <>
            {demoButton()}
        </>
    )
}

export default DemoUser;