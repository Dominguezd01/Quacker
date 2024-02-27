<script>
    import { page } from "$app/stores"
    import { onMount } from "svelte"
    import Profile from "../../../lib/Components/Users/Profile.svelte"
    import { API } from "../../../lib/env"
    import GreenLoader from "../../../lib/Components/GreenLoader.svelte"
    import { getCookie } from "../../../lib/getCookie"

    let profileId =
        $page.url.href.split("/")[$page.url.href.split("/").length - 1]

    const getUserInfo = async () => {
        let response = await fetch(
            `${API}/users/profile/${getCookie("userId")}/${profileId}`,
            {
                headers: {
                    authorization: getCookie("token").trim(),
                    "Content-Type": "application/json",
                },
            },
        )

        response = await response.json()

        if (response.status == 401) location.href = "/users/auth/login"
        console.log(response)

        return response.userInfo
    }
</script>

{#await getUserInfo()}
    <GreenLoader></GreenLoader>
{:then userInfo}
    <Profile {userInfo}></Profile>
{/await}
