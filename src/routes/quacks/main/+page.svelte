<script>
    import Aside from "../../../lib/Components/Aside.svelte"
    import MainPage from "../../../lib/Components/Quacks/MainPage.svelte"
    import duckGreen from "$lib/assets/duckGreen.svg"
    import RigthAside from "../../../lib/Components/RigthAside.svelte"
</script>

<main class="w-max h-max">
    <div class="w-max h-max aside items-center grid gap-8 mt-2">
        <div class="flex place-items-center justify-center gap-5">
            <img src={duckGreen} alt="Ducker logo" class="w-[50px]" />
            <p>Ducker</p>
        </div>
        <Aside />
    </div>
    <div class="w-max h-max main mt-1">
        <MainPage></MainPage>
    </div>
    <div class="h-max aside2">
        <RigthAside></RigthAside>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main aside2";
        grid-template-columns: 5fr 10fr;
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
