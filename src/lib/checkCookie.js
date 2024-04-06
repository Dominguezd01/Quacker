import { getCookie } from "./getCookie.js"
import { goto } from "$app/navigation"
export function checkCookie() {
    let token = getCookie("token")
    if (token == "") {
        localStorage.clear()
        goto("/users/auth/login")
    }
}
