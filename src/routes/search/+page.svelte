<script>
    import GreenLoader from "../../lib/Components/GreenLoader.svelte"
    import SearchResult from "../../lib/Components/SearchResult/SearchResult.svelte"
    import duckGreen from "$lib/assets/duckGreen.svg"
    import { onMount } from "svelte"
    import { getCookie } from "../../lib/getCookie"
    import { checkCookie } from "../../lib/checkCookie"
    import { page } from "$app/stores"
    import { env } from "$env/dynamic/public"
    import Aside from "../../lib/Components/Aside.svelte"
    const API = env.PUBLIC_API
    let searchTerm, searchTermForm
    onMount(() => {
        checkCookie()
        searchTermForm = localStorage.getItem("searchTerm")
    })
    const handleSearch = async (flag = false) => {
        if (searchTermForm === "" || searchTermForm === undefined) {
            let response
            response.searchResult.noResults = true
            return response.searchResult
        }
        localStorage.setItem("searchTerm", searchTermForm)
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                searchTerm: localStorage.getItem("searchTerm"),
            }),
        }
        let response = await fetch(`${API}/search`, options)

        response = await response.json()

        if (response.status === 200) {
            new SearchResult({
                target: document.querySelector("#searchResults"),
                hydrate: true,
                props: {
                    searchResultsInfo: response.searchResult,
                },
            })
        }
    }

    const onLoad = async () => {
        if (!localStorage.getItem("searchTerm")) {
            let response = {}
            response.noResults = true
            return response
        }
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                searchTerm: localStorage.getItem("searchTerm"),
            }),
        }
        let response = await fetch(`${API}/search`, options)

        response = await response.json()

        if (response.status === 200) {
            return response.searchResult
        }
    }
</script>

<main class="flex flex-row items-start justify-start">
    <div class="h-max aside items-center grid gap-8 mt-2">
        <Aside />
    </div>

    <div class="p-4 w-[100%] flex flex-col gap-5">
        <form
            on:submit|preventDefault={handleSearch}
            class="w-[100%] flex justify-start gap-2 form"
        >
            <input
                type="text"
                bind:value={searchTermForm}
                class="w-[60%] bg-black border-2 border-white border-solid p-2 rounded-sm text-lg"
            />
            <input
                type="submit"
                value="Search!"
                class="bg-quacker p-2 rounded-md"
            />
        </form>
        <div id="searchResults" class="w-[50%]">
            {#await onLoad()}
                <GreenLoader></GreenLoader>
            {:then response}
                <SearchResult searchResultsInfo={response}></SearchResult>
            {/await}
        </div>
    </div>
</main>

<style>
    @media (min-width: 300px) and (max-width: 420px) {
        main {
            display: grid;
            gap: 0em;
            margin-left: -10px;
        }
    }
    @media (min-width: 420px) and (max-width: 620px) {
        main {
            display: grid;
            gap: 10px;
            margin-left: 10px;
        }
    }
    @media (min-width: 300px) and (max-width: 820px) {
        .form {
            width: 100%;
        }
    }
    @media (min-width: 1900px) and (max-width: 820px) {
    }
    main {
        display: grid;
        grid-template-areas: "aside main";
        grid-template-columns: 1fr 5fr;
        gap: 1em;
    }

    .aside {
        grid-area: "aside";
    }
    main {
        grid-area: "main";
    }
</style>
