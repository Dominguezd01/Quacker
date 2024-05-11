<script>
    import GroupChat from "$lib/Components/Groups/GroupChat.svelte"
    import { page } from "$app/stores"
    let roomName =
        $page.url.href.split("/")[$page.url.href.split("/").length - 1]
    console.log(roomName)
    import { io } from "socket.io-client"
    import YourMessage from "$lib/Components/Groups/YourMessage.svelte"
    import { onDestroy, onMount } from "svelte"
    import { getCookie } from "$lib/getCookie"
    import Message from "$lib/Components/Groups/Message.svelte"
    import { env } from "$env/dynamic/public"
    import GreenLoader from "../../../lib/Components/GreenLoader.svelte"
    import RightAside from "$lib/Components/RigthAside.svelte"
    import Aside from "$lib/Components/Aside.svelte"
    import BottomBar from "../../../lib/Components/BottomBar.svelte"
    import ChatBar from "../../../lib/Components/ChatBar.svelte"
    import { checkCookie } from "../../../lib/checkCookie"
    const API = env.PUBLIC_API
    const PUBLIC_WS = env.PUBLIC_WS
    let msg, messageContainer, btnSend
    let socket = io(PUBLIC_WS)

    onMount(() => {
        checkCookie()
        roomName =
            $page.url.href.split("/")[$page.url.href.split("/").length - 1]
        socket.emit("join-room", roomName)
    })

    onDestroy(() => {
        socket.close()
    })
    const getEmoji = (room) => {
        const emoji = {
            news: "📰",
            sports: "⚾",
            games: "🎮",
        }

        return emoji[room]
    }
    const loadRooms = async () => {
        let options = {
            method: "GET",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
        }

        let response = await fetch(`${API}/rooms`, options)

        response = await response.json()

        if (response.status === 401 || response.status == 403) {
            let cookies = document.cookie.split(";")

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i]
                let eqPos = cookie.indexOf("=")
                let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
                document.cookie =
                    name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
            }
            localStorage.clear()
            location.href = "/users/auth/login"
        }

        return response.rooms
    }
    const sendMessage = () => {
        if (msg === "" || msg.trim() === "" || msg == undefined) return
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

        document.querySelector("input").value = ""
        msg = ""
    }
    const checkKey = (e) => {
        console.log(e)
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

        messageContainer
            .querySelectorAll(".message")
            [
                messageContainer.querySelectorAll(".message").length - 1
            ].scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            })
    })
</script>

<main>
    <div>
        <Aside></Aside>
    </div>
    <div
        class="flex flex-col justify-center items-center gap-2 mt-2 min-h-[350px] w-full"
    >
        <div class="flex flex-col gap-2 container w-full h-ful">
            {#await loadRooms()}
                <GreenLoader></GreenLoader>
            {:then rooms}
                <div
                    class="roomsContainer grid row-auto place-items-center roomsChatContainer"
                >
                    <div
                        class="flex flex-row items-center justify-center gap-2 roomsButtons"
                    >
                        {#each rooms as room}
                            <a
                                href="/groups/{room}"
                                class="capitalize border-2 border-green-500 p-2 rounded-md text-lg text-center"
                                ><p>{getEmoji(room)}</p>
                                <p>{room}</p></a
                            >
                        {/each}
                    </div>
                </div>
            {/await}
        </div>
        <div
            class=" h-full w-full flex flex-col items-start {roomName} gap-10 globalDiv"
        >
            <h1 class="w-full capitalize font-extrabold text-2xl">
                {roomName}
            </h1>
            <div
                class="messageContainer flex flex-col gap-2 w-[100%] min-h-[290px] overflow-y-scroll overflow-x-hidden p-2 border-2"
                bind:this={messageContainer}
            ></div>

            <div class="flex flex-col gap-2 w-full p-2 items-end">
                <input
                    type="text"
                    bind:value={msg}
                    class="bg-slate-800 p-2 w-full"
                    on:keydown={(e) => {
                        if (e.key === "Enter") sendMessage()
                    }}
                    id="btnSend"
                    required
                />
                <button
                    on:click={sendMessage}
                    bind:this={btnSend}
                    class="bg-green-500 p-2 w-[35%]">ENVIAR</button
                >
            </div>
        </div>
    </div>
    <div>
        <RightAside></RightAside>
    </div>
</main>
<BottomBar></BottomBar>

<style>
    main {
        display: grid;
        grid-template-areas: "aside main aside2";
        grid-template-columns: 5fr 10fr 5fr;
        width: 100%;
        height: 100%;
    }
    .messageContainer,
    .globalDiv {
        min-height: 60vh;
        max-height: 80vh;
    }
    @media (min-width: 100px) and (max-width: 1900px) {
        main {
            display: flex;
        }
        .messageContainer,
        .globalDiv {
            min-height: 37vh;
            max-height: 70vh;
        }
    }
</style>
