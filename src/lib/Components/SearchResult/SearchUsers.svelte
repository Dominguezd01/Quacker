<script>
    import { onMount } from "svelte"
    import { getImage } from "../../getImage"
    import UserResult from "./UserResult.svelte"

    export let users
</script>

<div class="flex flex-col gap-4 w-[100%]">
    <p class="text-2xl font-extrabold">Users</p>
    {#each users as user}
        <UserResult {user}></UserResult>
    {/each}
</div>

<style>
</style>
