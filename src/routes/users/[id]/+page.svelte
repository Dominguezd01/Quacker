<script>
    import { page } from "$app/stores"
    import { onMount } from "svelte"
    import Profile from "../../../lib/Components/Users/Profile.svelte"
    import GreenLoader from "../../../lib/Components/GreenLoader.svelte"
    import { getCookie } from "../../../lib/getCookie"
    import { checkCookie } from "../../../lib/checkCookie"
    import { browser } from "$app/environment"
    import { env } from "$env/dynamic/public"
    const API = env.PUBLIC_API
    onMount(() => {
        if (browser) {
            checkCookie()
        }
    })

    let profileName =
        $page.url.href.split("/")[$page.url.href.split("/").length - 1]

    const getUserInfo = async () => {
        let response = await fetch(`${API}/users/profile/${profileName}`, {
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
        })

        response = await response.json()

        if (response.status == 401) location.href = "/users/auth/login"
        
        return response.userInfo
    }
</script>

{#await getUserInfo()}
    <GreenLoader></GreenLoader>
{:then userInfo}
    <Profile {userInfo}></Profile>
{/await}
