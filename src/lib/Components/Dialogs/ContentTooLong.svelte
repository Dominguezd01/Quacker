<script>
    import { get_current_component } from "svelte/internal"
    let mainDiv
</script>

<div
    bind:this={mainDiv}
    role="alert"
    class="rounded-xl border border-black-100 bg-black p-4 w-[40%] m-auto"
>
    <div class="flex items-start gap-4">
        <span class="text-green-600">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </span>

        <div class="flex-1">
            <strong class="block font-medium"> Content too long </strong>
        </div>

        <button
            class=" transition hover:text-gray-600"
            on:click={mainDiv.remove()}
        >
            <span class="sr-only">Dismiss popup</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>
</div>
