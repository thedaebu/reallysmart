interface User {
    username: string,
    password: string
}

export const signup = (user: User) => {
    return (
        $.ajax({
            method: "POST",
            url: "/api/users",
            data: { user }
        })
    );
};

export const login = (user: User) => {
    return (
        $.ajax({
            method: "POST",
            url: "/api/session",
            data: { user }
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
