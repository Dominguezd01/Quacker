<script>
    export let roomName
    import { io } from "socket.io-client"
    import YourMessage from "./YourMessage.svelte"
    import { onDestroy, onMount } from "svelte"
    import { getCookie } from "$lib/getCookie"
    import Message from "./Message.svelte"
    import { env } from "$env/dynamic/public"
    const API = env.PUBLIC_API
    let msg, messageContainer, btnSend
    let socket = io(API)

    onMount(() => {
        socket.removeAllListeners()
        socket.emit("join-room", roomName)
    })

    onDestroy(() => {
        console.log("destroy")
        socket.close()
    })

    const sendMessage = () => {
        btnSend.disabled = true
        let data = {
            msg: msg,
            userName: getCookie("userName"),
            date: new Date(),
        }
        socket.emit("message", JSON.stringify(data), roomName)

        new YourMessage({
            target: document.querySelector(".messageContainer"),
            props: {
                msgInfo: data,
            },
            hydrate: false,
        })

        btnSend.disabled = false
    }

    socket.on("message", (msg) => {
        msg = JSON.parse(msg)
        if (msg.userName !== getCookie("userName")) {
            new Message({
                target: document.querySelector(".messageContainer"),
                props: {
                    msgInfo: msg,
                },
                hydrate: false,
            })
        }
    })
</script>

<main class="border-2 h-full w-full flex flex-col p-2 {roomName}">
    <h1 class="w-full capitalize font-extrabold text-2xl">
        {roomName}
    </h1>
    <div
        class="messageContainer flex flex-col gap-2 w-[100%] h-[50vh] overflow-y-scroll overflow-x-hidden p-2"
        bind:this={messageContainer}
    ></div>

    <div class="flex flex-row gap-2 w-full border-2 p-2">
        <input
            type="text"
            bind:value={msg}
            class="bg-slate-800 p-2 w-full"
            required
        />
        <button
            on:click={sendMessage}
            bind:this={btnSend}
            class="bg-green-500 p-2">ENVIAR</button
        >
    </div>
</main>
