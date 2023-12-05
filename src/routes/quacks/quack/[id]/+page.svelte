<script>
    import { onMount } from "svelte"
    import { checkCookie } from "../../../../lib/checkCookie.js"
    import { API } from "../../../../lib/env.js"
    import { browser } from "$app/environment"
    import Quack from "../../../../lib/Components/Quacks/Quack.svelte"
    onMount(() => {
        if (browser) {
            checkCookie()
        }
    })

    const getTweet = async () => {
        let url = new URL(location.href)
        let quack_id =
            url.pathname.split("/")[url.pathname.split("/").length - 1]

        let response = await fetch(`${API}/quacks/quack/${quack_id}`)
        response = await response.json()
        console.log(response)
        return response.quack
    }
</script>

{#await getTweet()}
    loading
{:then quack}
    <Quack quackInfo={quack}></Quack>
{/await}
