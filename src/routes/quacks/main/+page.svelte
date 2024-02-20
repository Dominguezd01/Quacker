<script>
    import Aside from "../../../lib/Components/Aside.svelte"
    import MainPage from "../../../lib/Components/Quacks/MainPage.svelte"
</script>

<main class="w-max h-max">
    <div class="w-max h-max aside items-center grid">
        <Aside />
    </div>
    <div class="w-max h-max p-1 main">
        <MainPage></MainPage>
    </div>
    <div class="border-cyan-400 border-solid border-2 w-max h-max aside2">
        <nav>ASIDE</nav>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main aside2";
        grid-template-columns: 4fr 10fr 4fr;
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
