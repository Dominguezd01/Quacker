<script>
    import { onDestroy, onMount } from "svelte"
    import GroupChat from "./GroupChat.svelte"

    export let roomName, divMessages, socket
    let previousChat = null

    onMount(() => {
        socket.removeAllListeners()
    })

    const handleClick = () => {
        previousChat = new GroupChat({
            hydrate: true,
            target: divMessages,
            props: {
                roomName: roomName,
                socket: socket,
            },
        })
    }
</script>

<button
    on:click={handleClick}
    class="border-2 p-4 rounded-md text-center grid place-items-center border-green-500 hover:text-green-500 transition hover:border-white"
>
    <div class="grid place-items-center text-center">
        <h1
            class="grid place-items-center text-2xl font-bold capitalize text-center"
        >
            {getEmoji(roomName)}{roomName}
        </h1>
    </div>
</button>
