<script>
    import GreenLoader from "$lib/Components/GreenLoader.svelte"
    import Aside from "$lib/Components/Aside.svelte"
    import RightAside from "../../lib/Components/RigthAside.svelte"
    import Rooms from "$lib/Components/Groups/Rooms.svelte"
    import { getCookie } from "$lib/getCookie"
    import { checkCookie } from "$lib/checkCookie"
    import { env } from "$env/dynamic/public"
    import BottomBar from "$lib/Components/BottomBar.svelte"
    import { onMount, onDestroy } from "svelte"
    import GroupChat from "../../lib/Components/Groups/GroupChat.svelte"
    const API = env.PUBLIC_API

    let divMessages

    onMount(() => {
        checkCookie()
    })

    const getEmoji = (room) => {
        const emoji = {
            news: "📰",
            sports: "⚾",
            games: "🎮",
        }

        return emoji[room]
    }
    const loadRooms = async () => {
        let options = {
            method: "GET",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
        }

        let response = await fetch(`${API}/rooms`, options)

        response = await response.json()

        if (response.status === 401 || response.status == 403) {
            let cookies = document.cookie.split(";")

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i]
                let eqPos = cookie.indexOf("=")
                let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
                document.cookie =
                    name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
            }
            localStorage.clear()
            location.href = "/users/auth/login"
        }

        return response.rooms
    }
</script>

<main class=" h-[100vh] w-full main">
    <div class="aside">
        <Aside></Aside>
    </div>
    <div class="flex flex-col justify-center items-center gap-2 container">
        <h1 class="text-2xl font-extrabold mt-[-80px]">
            CHOOSE A ROOM TO JOIN
        </h1>
        {#await loadRooms()}
            <GreenLoader></GreenLoader>
        {:then rooms}
            <div
                class="flex flex-row items-center justify-center place-items-center roomsButtons"
            >
                {#each rooms as room}
                    <a
                        href="/groups/{room}"
                        class="capitalize border-2 border-green-500 p-2 rounded-md text-3xl text-center"
                        ><p>{getEmoji(room)}</p>
                        <p>{room}</p>
                    </a>
                {/each}
            </div>
        {/await}
    </div>
    <div class="aside2">
        <RightAside></RightAside>
    </div>
    <BottomBar></BottomBar>
</main>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main aside2";
        grid-template-columns: 5fr 10fr 5fr;
        width: 100%;
        height: 100%;
    }

    .aside {
        grid-area: "aside";
        width: 100%;
    }
    .main {
        grid-area: "main";
        width: 100%;
    }
    .aside2 {
        grid-area: "aside2";
        width: 100%;
    }
    @media (min-width: 100px) and (max-width: 1900px) {
        .aside2,
        .aside {
            display: none;
        }

        main {
            display: flex;
        }
        .roomsButtons {
            width: 100%;
            display: flex;
            flex-direction: row;
        }
    }

    @media (min-width: 1900px) and (max-width: 6000px) {
        .roomsButtons {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: 100%;
            gap: 8px;
        }

        .roomsButtons > a {
            width: 100%;
        }
    }
</style>
