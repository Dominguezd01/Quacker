<script>
    import { onMount } from "svelte"
    import { checkCookie } from "../../../../lib/checkCookie.js"
    import { API } from "../../../../lib/env.js"
    import { browser } from "$app/environment"
    import Quack from "../../../../lib/Components/Quacks/Quack.svelte"
    import GreenLoader from "../../../../lib/Components/GreenLoader.svelte"
    import { getCookie } from "../../../../lib/getCookie.js"
    import Aside from "../../../../lib/Components/Aside.svelte"
    import CreateComment from "../../../../lib/Components/Comments/CreateComment.svelte"
    onMount(() => {
        if (browser) {
            checkCookie()
        }
    })

    const getQuack = async () => {
        let url = new URL(location.href)
        let quack_id =
            url.pathname.split("/")[url.pathname.split("/").length - 1]
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId").trim(),
            }),
        }
        let response = await fetch(
            `${API}/quacks/quack/info/${quack_id}`,
            options,
        )
        response = await response.json()
        console.log(response)
        return response
    }
</script>

<main>
    <Aside></Aside>
    {#await getQuack()}
        <GreenLoader></GreenLoader>
    {:then quack}
        <div class="grid items-center gap-0">
            <Quack quackInfo={quack.quack}></Quack>
            <CreateComment></CreateComment>
        </div>
    {/await}
    <div class="border-cyan-400 border-solid border-2 w-max h-max aside2">
        <nav>ASIDE</nav>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main aside2";
        grid-template-columns: 4fr 10fr 2fr;
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
</style>
