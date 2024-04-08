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

<main class="p-2">
    <div class="w-max h-max aside items-center grid gap-8 mt-2">
        <div class="flex place-items-center justify-center gap-5">
            <img src={duckGreen} alt="Ducker logo" class="w-[50px]" />
            <p>Ducker</p>
        </div>
        <Aside />
    </div>

    <div class="p-4 w-[100%] flex flex-col gap-5">
        <form
            on:submit|preventDefault={handleSearch}
            class="w-[100%] flex justify-start gap-2"
        >
            <input
                type="text"
                bind:value={searchTermForm}
                class="w-[60%] bg-black border-2 border-white border-solid p-2 rounded-sm text-lg"
            />
            <input
                type="submit"
                value="Search!"
                class="bg-green-500 p-2 rounded-md"
            />
        </form>
        <div id="searchResults">
            {#await onLoad()}
                <GreenLoader></GreenLoader>
            {:then response}
                <SearchResult searchResultsInfo={response}></SearchResult>
            {/await}
        </div>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main";
        grid-template-columns: 2fr 10fr;
        width: 100%;
        height: 100%;
    }

    .aside {
        grid-area: "aside";
        width: 100%;
    }
    main {
        grid-area: "main";
        width: 100%;
    }
</style>
