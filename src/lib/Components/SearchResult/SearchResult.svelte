<script>
    export let searchResultsInfo
    import SearchUsers from "./SearchUsers.svelte"
    import SearchQuack from "./SearchQuack.svelte"
</script>

<div class="flex flex-col w-[150%]">
    {#if searchResultsInfo.noResults}
        <div class="">
            <p class="text-xl font-bold">We could not find anything</p>
        </div>
    {:else}
        {#if searchResultsInfo.users !== undefined && searchResultsInfo.users.length !== 0}
            <SearchUsers users={searchResultsInfo.users}></SearchUsers>
        {/if}
        {#if searchResultsInfo.quacks !== undefined && searchResultsInfo.quacks.length !== 0}
            <SearchQuack quacks={searchResultsInfo.quacks}></SearchQuack>
        {/if}
    {/if}
</div>
