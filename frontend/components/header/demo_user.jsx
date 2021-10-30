import React from "react";


function DemoUser(props) {
    const { login, currentUser } = props;

    function loginWithDemo(e) {
        e.preventDefault();
        
        login({
            username: "notsosmart",
            password: "notsosmart"
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