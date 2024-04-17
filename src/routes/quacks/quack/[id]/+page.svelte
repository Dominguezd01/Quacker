<script>
    import { onMount } from "svelte"
    import { checkCookie } from "../../../../lib/checkCookie.js"
    import { browser } from "$app/environment"
    import Quack from "../../../../lib/Components/Quacks/Quack.svelte"
    import GreenLoader from "../../../../lib/Components/GreenLoader.svelte"
    import { getCookie } from "../../../../lib/getCookie.js"
    import Aside from "../../../../lib/Components/Aside.svelte"
    import RigthAside from "../../../../lib/Components/RigthAside.svelte"
    import CreateComment from "../../../../lib/Components/Comments/CreateComment.svelte"
    import { env } from "$env/dynamic/public"
    import Comment from "../../../../lib/Components/Comments/Comment.svelte"
    import BottomBar from "../../../../lib/Components/BottomBar.svelte"
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
        return response.comments
    }
</script>

<main>
    <div>
        <Aside></Aside>
    </div>
    <div class="flex flex-col gap-2 h-[100vh] w-[100%]">
        {#await getQuack()}
            <GreenLoader></GreenLoader>
        {:then quack}
            <Quack quackInfo={quack.quack}></Quack>
            <CreateComment quackId={quack.quack.quack_id}></CreateComment>
        {/await}
        {#await getComments()}
            <GreenLoader></GreenLoader>
        {:then comments}
            <div class="flex flex-col" id="commentsContainer">
                {#each comments as comment}
                    <Comment commentInfo={comment}></Comment>
                {/each}
            </div>
        {/await}
    </div>
    <div>
        <RigthAside></RigthAside>
    </div>
</main>
<BottomBar></BottomBar>

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
        }
    }
</style>
