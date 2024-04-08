<script>
    import GreenLoader from "../../Components/GreenLoader.svelte"
    import Quack from "./Quack.svelte"
    const API = env.PUBLIC_API
    import { getCookie } from "../../getCookie.js"
    import QuackCreate from "./QuackCreate.svelte"
    import { onMount } from "svelte"

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
        console.log(response.quacks)
        if (response.status == 403) location.href = "/users/auth/login"
        return response.quacks
    }
</script>

<div class="grid items-center gap-2 w-[100%]">
    <QuackCreate></QuackCreate>
    {#await getMainQuacks()}
        <div class="grid items-center justify-center mt-6">
            <GreenLoader></GreenLoader>
        </div>
    {:then quacks}
        {#each quacks as quack}
            <Quack quackInfo={quack}></Quack>
        {/each}
    {/await}
</div>
