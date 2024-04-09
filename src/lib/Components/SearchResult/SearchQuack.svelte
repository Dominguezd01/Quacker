<script>
    import QuackResult from "./QuackResult.svelte"

    export let quacks
</script>

<div class="flex flex-col gap-4 w-[100%]">
    <p class="text-2xl font-extrabold">Quacks</p>
    <div class="container">
        {#each quacks as quack}
            <QuackResult quackInfo={quack}></QuackResult>
        {/each}
    </div>
</div>

<style>
    @media (min-width: 300px) and (max-width: 820px) {
        .container {
            align-items: center;
        }
    }
</style>
