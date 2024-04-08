<script>
    export let searchResultsInfo
    import SearchUsers from "./SearchUsers.svelte"
    import SearchQuack from "./SearchQuack.svelte"
</script>

<div flex flex-col-reverse>
    {#if searchResultsInfo.noResults}
        <div>
            <p>We couldnt find nothing ;C</p>
        </div>
    {:else}
        {#if searchResultsInfo.users.length !== 0}
            <SearchUsers users={searchResultsInfo.users}></SearchUsers>
        {/if}
        {#if searchResultsInfo.quacks.length !== 0}
            <SearchQuack quacks={searchResultsInfo.quacks}></SearchQuack>
        {/if}
    {/if}
</div>
