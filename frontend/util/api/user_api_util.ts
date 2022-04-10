import $ from "jquery";

export const fetchUser = (userId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/users/${userId.toString()}`
        })
    )
}