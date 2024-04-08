<script>
    import QuackResult from "./QuackResult.svelte"

    export let quacks
</script>

<div class="flex flex-col gap-4">
    <p class="text-2xl font-extrabold">Quacks</p>
    {#each quacks as quack}
        <QuackResult quackInfo={quack}></QuackResult>
    {/each}
</div>
