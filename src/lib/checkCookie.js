import { getCookie } from "./getCookie.js"
import { goto } from "$app/navigation"
export function checkCookie() {
    let user = getCookie("token")
    if (user == "") {
        goto("/users/auth/login")
    }
}
