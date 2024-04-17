<script>
    import { env } from "$env/dynamic/public"
    import { onMount } from "svelte"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"
    import { getCookie } from "$lib/getCookie"
    import { checkCookie } from "$lib/checkCookie"
    import Quack from "../../../../../lib/Components/Quacks/Quack.svelte"
    import GreenLoader from "../../../../../lib/Components/GreenLoader.svelte"
    import QuackEdit from "../../../../../lib/Components/Quacks/QuackEdit.svelte"
    import Aside from "../../../../../lib/Components/Aside.svelte"
    import RigthAside from "../../../../../lib/Components/RigthAside.svelte"
    import BottomBar from "../../../../../lib/Components/BottomBar.svelte"
    const API = env.PUBLIC_API
    const quackId = $page.params.Id

    const loadQuack = async () => {
        let response = await fetch(`${API}/quacks/quack/info/${quackId}`, {
            method: "POST",

            headers: {
                authorization: getCookie("token"),
            },
        })
        response = await response.json()

        if (!response.quack.isFromUser) {
            return goto("/quacks/main")
        }

        return response
    }

    onMount(() => {
        checkCookie()
    })
</script>

<main>
    {#await loadQuack()}
        <GreenLoader></GreenLoader>
    {:then quack}
        <div class="asides">
            <Aside></Aside>
        </div>
        <QuackEdit quackInfo={quack.quack}></QuackEdit>

        <div class="asides">
            <RigthAside></RigthAside>
        </div>
    {/await}
</main>
<BottomBar></BottomBar>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main aside2";
        grid-template-columns: 5fr 10fr 5fr;
        width: 100%;
        height: 100%;
    }

    @media (min-width: 100px) and (max-width: 1900px) {
        .asides {
            display: none;
        }

        main {
            display: flex;
        }
    }
</style>
