<script>
    import Aside from "../../../lib/Components/Aside.svelte"
    import MainPage from "../../../lib/Components/Quacks/MainPage.svelte"
    import duckGreen from "$lib/assets/duckGreen.svg"
    import RigthAside from "../../../lib/Components/RigthAside.svelte"
    import { onMount } from "svelte"
    import { checkCookie } from "../../../lib/checkCookie"
    import { browser } from "$app/environment"
    import BottomBar from "../../../lib/Components/BottomBar.svelte"

    let main
    onMount(() => {
        if (browser) {
            checkCookie()
        }
    })
</script>

<main class="w-max h-max" bind:this={main}>
    <div class="w-max h-max aside">
        <Aside />
    </div>
    <div class="w-max h-max main mt-1">
        <MainPage></MainPage>
    </div>
    <div class="h-max aside2">
        <RigthAside></RigthAside>
    </div>
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
    }
</style>
