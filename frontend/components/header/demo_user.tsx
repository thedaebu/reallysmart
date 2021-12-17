import React, { MouseEvent } from "react";

type Props = {
    currentUser: User,
    login: Function
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}

function DemoUser(props: Props) {
    const { currentUser, login } = props;

    function loginWithDemo(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        
        login({
            password: "notsosmart",
            username: "notsosmart"
        });
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