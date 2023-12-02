<script>
    import { onMount } from "svelte"
    import { checkCookie } from "../../../../lib/checkCookie.js"
    import { browser } from "$app/environment"
    onMount(() => {
        if (browser) {
            checkCookie()
        }
    })
</script>
