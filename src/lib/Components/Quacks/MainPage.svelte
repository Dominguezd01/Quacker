<script>
    import GreenLoader from "../../Components/GreenLoader.svelte"
    import Quack from "./Quack.svelte"
    import { getCookie } from "../../getCookie.js"
    import QuackCreate from "./QuackCreate.svelte"
    import { onMount } from "svelte"
    import { env } from "$env/dynamic/public"
    const API = env.PUBLIC_API
    let quackContainer
    onMount(() => {
        if (getCookie("token") == "") {
            location.href = "/users/auth/login"
        }
    })
    const getMainQuacks = async () => {
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId"),
            }),
        }
        let response = await fetch(`${API}/quacks/main`, options)
        response = await response.json()
        if (response.status == 403) location.href = "/users/auth/login"
        return response.quacks
    }
</script>

<div class="grid items-center gap-2 w-[100%]">
    {#await getMainQuacks()}
        <div class="grid items-center justify-center mt-6">
            <GreenLoader></GreenLoader>
        </div>
    {:then quacks}
        <div class="flex flex-col-reverse quacks">
            {#if quacks.length === 0}
                <div>
                    <h1 class="text-center">
                        Follow someone to see their quacks!!
                    </h1>
                    <div bind:this={quackContainer}></div>
                </div>
            {:else}
                <div bind:this={quackContainer} id="quacksDiv" class="w-[100%]">
                    {#each quacks as quack}
                        <Quack quackInfo={quack}></Quack>
                    {/each}
                </div>
            {/if}
            <QuackCreate mainDiv={quackContainer}></QuackCreate>
        </div>
    {/await}
</div>

<style>
    @media (min-width: 375px) and (max-width: 1900px) {
        .quacks {
            width: 100%;
        }
    }
</style>
