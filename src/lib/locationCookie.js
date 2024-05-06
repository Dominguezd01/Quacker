import { getCookie } from "./getCookie"

import { goto } from "$app/navigation"
export default function locationCookie() {
    if (getCookie("token") === "") {
        goto("/users/auth/login")
    }
    if (getCookie("userName") === "") {
        goto("/users/auth/login")
    }
    if (getCookie("displayName") === "") {
        goto("/users/auth/login")
    }
    if (getCookie("displayName") === "") {
        goto("/users/auth/login")
    }
}