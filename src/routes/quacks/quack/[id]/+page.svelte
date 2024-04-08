<script>
    import { onMount } from "svelte"
    import { checkCookie } from "../../../../lib/checkCookie.js"
    import { browser } from "$app/environment"
    import Quack from "../../../../lib/Components/Quacks/Quack.svelte"
    import GreenLoader from "../../../../lib/Components/GreenLoader.svelte"
    import { getCookie } from "../../../../lib/getCookie.js"
    import Aside from "../../../../lib/Components/Aside.svelte"
    import CreateComment from "../../../../lib/Components/Comments/CreateComment.svelte"
    import { env } from "$env/dynamic/public"
    import Comment from "../../../../lib/Components/Comments/Comment.svelte"
    const API = env.PUBLIC_API
    onMount(async () => {
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

    const getComments = async () => {
        let url = new URL(location.href)
        let quack_id =
            url.pathname.split("/")[url.pathname.split("/").length - 1]
        let options = {
            method: "GET",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
        }
        let response = await fetch(
            `${API}/comments/comment/getComments/${quack_id}`,
            options,
        )
        response = await response.json()
        console.log(response)
        return response.comments
    }
</script>

<main>
    <Aside></Aside>
    <div class="flex justify-items-start flex-col gap-2 h-[100vh]">
        {#await getQuack()}
            <GreenLoader></GreenLoader>
        {:then quack}
            <Quack quackInfo={quack.quack}></Quack>
            <CreateComment quackId={quack.quack.quack_id}></CreateComment>
        {/await}
        {#await getComments()}
            <GreenLoader></GreenLoader>
        {:then comments}
            <div class="flex flex-col">
                {#each comments as comment}
                    <Comment commentInfo={comment}></Comment>
                {/each}
            </div>
        {/await}
    </div>
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
