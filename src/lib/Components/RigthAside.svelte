<script>
    import { env } from "$env/dynamic/public"
    import { getCookie } from "../getCookie"
    import GreenLoader from "./GreenLoader.svelte"
    import SearchResult from "./SearchResult/SearchResult.svelte"
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"
    const API = env.PUBLIC_API

    let searchTerm

    const handleSearch = async () => {
        localStorage.setItem("searchTerm", searchTerm)
        goto(`/search`)
        new GreenLoader({
            target: document.querySelector("#quacksDiv"),
            hydrate: true,
        })
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                searchTerm: searchTerm,
            }),
        }
        let response = await fetch(`${API}/search`, options)

        response = await response.json()

        if (response.status === 200) {
            new SearchResult({
                target: document.querySelector("#quacksDiv"),
                hydrate: true,
                props: {
                    searchResultsInfo: response.searchResult,
                },
            })
        }
    }
</script>

<div class="main">
    <form
        on:submit|preventDefault={handleSearch}
        class="flex flex-col justify-center items-center gap-2 p-2"
    >
        <input
            type="text"
            class="w-[450px] h-[70px] border-2 border-quacker bg-black text-center"
            placeholder="Search"
            bind:value={searchTerm}
        />
        <input type="submit" value="Search" class="bg-quacker p-2 rounded-md" />
    </form>
</div>

<style>
    @media (min-width: 300px) and (max-width: 1900px) {
        .main {
            display: none;
        }
    }
</style>
