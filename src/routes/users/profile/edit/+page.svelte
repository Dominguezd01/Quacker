<script>
    import Aside from "../../../../lib/Components/Aside.svelte"
    import BottomBar from "../../../../lib/Components/BottomBar.svelte"
    import RigthAside from "../../../../lib/Components/RigthAside.svelte"
    import EditProfile from "../../../../lib/Components/Users/EditProfile.svelte"
    import { locationCookie } from "../../../../lib/locationCookie"
    let main

    import { onMount } from "svelte"

    onMount(() => {
        locationCookie()
    })
</script>

<main class="w-max h-max" bind:this={main}>
    <div class="w-max h-max aside">
        <Aside />
    </div>
    <div class="w-max h-[95vh] main mt-1">
        <EditProfile></EditProfile>
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
