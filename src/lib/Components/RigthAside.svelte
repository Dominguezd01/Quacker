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

        if (response.status === 401 || response.status == 403) {
            let cookies = document.cookie.split(";")

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i]
                let eqPos = cookie.indexOf("=")
                let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
                document.cookie =
                    name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
            }
            localStorage.clear()
            location.href = "/users/auth/login"
        }
    }
</script>

<div class="main ml-2">
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
