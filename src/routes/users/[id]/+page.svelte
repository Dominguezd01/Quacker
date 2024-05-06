<script>
    import { page } from "$app/stores"
    import { onMount } from "svelte"
    import Profile from "../../../lib/Components/Users/Profile.svelte"
    import GreenLoader from "../../../lib/Components/GreenLoader.svelte"
    import { getCookie } from "../../../lib/getCookie"
    import { checkCookie } from "../../../lib/checkCookie"
    import { browser } from "$app/environment"
    import Aside from "../../../lib/Components/Aside.svelte"
    import RigthAside from "../../../lib/Components/RigthAside.svelte"
    import BottomBar from "../../../lib/Components/BottomBar.svelte"
    import { env } from "$env/dynamic/public"
    import { locationCookie } from "../../../../lib/locationCookie"
    const API = env.PUBLIC_API
    onMount(() => {
        if (browser) {
            locationCookie()
            checkCookie()
        }
    })

    let profileName =
        $page.url.href.split("/")[$page.url.href.split("/").length - 1]

    const getUserInfo = async () => {
        let response = await fetch(`${API}/users/profile/${profileName}`, {
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
        })

        response = await response.json()
        if (response.status === 500) location.href = "/users/auth/login"
        if (response.status == 401) location.href = "/users/auth/login"

        return response.userInfo
    }
</script>

<main>
    <div class="w-full asideContainer">
        <Aside></Aside>
    </div>
    {#await getUserInfo()}
        <GreenLoader></GreenLoader>
    {:then userInfo}
        <div class="border-2">
            <Profile {userInfo}></Profile>
        </div>
    {/await}
    <div class="block asideContainer">
        <RigthAside></RigthAside>
    </div>
    <BottomBar></BottomBar>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 3fr 9fr 3fr;
        width: 100%;
        height: 100%;
    }

    @media (min-width: 300px) and (max-width: 1900px) {
        main {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .asideContainer {
            display: none;
        }
    }
</style>
