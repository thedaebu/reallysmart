interface SessionUser {
    username: string,
    password: string
}

export const login = (sessionUser: SessionUser) => {
    return (
        $.ajax({
            method: "POST",
            url: "/api/session",
            data: { sessionUser }
        })
    );
};
export const signup = (sessionUser: SessionUser) => {
    return (
        $.ajax({
            method: "POST",
            url: "/api/users",
            data: { sessionUser }
        })
    );
};
export const logout = () => {
    return (
        $.ajax({
            method: "DELETE",
            url: "/api/session"
        })
    );
};
