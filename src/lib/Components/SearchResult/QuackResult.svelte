<script>
    export let quackInfo
    import { getCookie } from "../../getCookie.js"
    import { getImage } from "../../getImage.js"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import comment from "$lib/assets/comment.svg"
    import { env } from "$env/dynamic/public"
    const API = env.PUBLIC_API
    let imgLike, greenLikeCounter, imgRequack
    let likeCount = quackInfo._count.user_quack_like
    let isLike = quackInfo.user_quack_like.length > 0
    let isRepost = quackInfo.requacks.length > 0
    let repostCount = quackInfo._count.requacks
    const handleLike = async () => {
        if (isLike) {
            await disLikeQuack()
            return
        }
        await likeQuack()
    }

    const handleRequack = async () => {
        if (isRepost) {
            await disRequack()
            return
        }
        await requack()
    }

    const likeQuack = async () => {
        isLike = true
        likeCount++

        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId"),
                quackId: quackInfo.quack_id,
            }),
        }

        let response = await fetch(`${API}/quacks/quack/like`, options)
        response = await response.json()

        if (response.status !== 200) {
            imgLike.src = likePlain
            isLike = false
            likeCount -= 1
        }

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
    }

    const disLikeQuack = async () => {
        isLike = false
        likeCount -= 1
        let options = {
            method: "DELETE",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId"),
                quackId: quackInfo.quack_id,
            }),
        }

        let response = await fetch(`${API}/quacks/quack/dislike`, options)
        response = await response.json()

        if (response.status !== 200) {
            isLike = true
            likeCount--
        }

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
    }

    const requack = async () => {
        isRepost = true
        repostCount += 1

        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId"),
                quackId: quackInfo.quack_id,
            }),
        }

        let response = await fetch(`${API}/quacks/quack/requack`, options)
        response = await response.json()

        if (response.status !== 200) {
            // imgRequack.src = requackPlain
            isRepost = false
            repostCount -= 1
        }

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
    }

    const disRequack = async () => {
        isRepost = false
        repostCount -= 1

        let options = {
            method: "DELETE",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId"),
                quackId: quackInfo.quack_id,
            }),
        }

        let response = await fetch(`${API}/quacks/quack/deleteRequack`, options)
        response = await response.json()

        if (response.status !== 200) {
            //re.src = likePlain
            isRepost = true
            repostCount -= 1
        }

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
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article class="quack">
    <div
        class="grid items-center gap-4 border-solid border-2 p-4 rounded-md mainDiv w-[100%]"
    >
        <!--
        Image and names container
    -->
        <a
            href="/quacks/quack/{quackInfo.quack_id}"
            class="flex flex-col gap-4"
        >
            <div class="grid items-center gap-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex gap-7 items-center" role="button">
                    <a
                        href={`/users/${quackInfo.user_quack[0].users.user_name}`}
                    >
                        <img
                            src={getImage(
                                quackInfo.user_quack[0].users.profile_picture,
                            )}
                            alt="User"
                            class="w-16 border-solid border-2 bg-white rounded-[20%] imgProfile"
                        />
                    </a>
                    <div class="grid items-center">
                        <p class="text-3xl font-bold mb-[-10px] displayName">
                            {quackInfo.user_quack[0].users.display_name}
                        </p>
                        <p class="text-2xl userName">
                            @{quackInfo.user_quack[0].users.user_name}
                        </p>
                    </div>
                </div>
            </div>
            <!--
        Quack content
    -->
            <div class="ml-24 text-3xl content">
                <p class="text-3xl contentP">{quackInfo.content}</p>
            </div>
        </a>
        <!--
        Button container
    -->
        <div class="flex flex-row ml-24 gap-28 buttonContainer">
            <!--
            Like Button
        -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if isLike}
                <div class="flex gap-2" on:click={handleLike}>
                    <button>
                        <img
                            bind:this={imgLike}
                            src={likeGreen}
                            alt="Like button"
                            class="w-5 buttons"
                        />
                    </button>
                    <p class="text-quacker">
                        {likeCount}
                    </p>
                </div>
            {:else}
                <div class="flex gap-2" on:click={handleLike}>
                    <button>
                        <img
                            bind:this={imgLike}
                            src={likePlain}
                            alt="Like button"
                            class="w-5 buttons"
                        />
                    </button>
                    <p>{likeCount}</p>
                </div>
            {/if}
            <!--
            Requack Button
        -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if isRepost}
                <div class="flex gap-2" on:click={handleRequack}>
                    <button>
                        <img
                            bind:this={imgRequack}
                            src={requackGreen}
                            alt="Like button"
                            class="w-5 buttons"
                        />
                    </button>
                    <p class="text-quacker">{repostCount}</p>
                </div>
            {:else}
                <div class="flex gap-2" on:click={handleRequack}>
                    <button>
                        <img
                            src={requackPlain}
                            alt="Like button"
                            class="w-5 buttons"
                            bind:this={imgRequack}
                        />
                    </button>
                    <p>{repostCount}</p>
                </div>
            {/if}

            <div class="flex gap-2">
                <button>
                    <img src={comment} class="w-5 buttons" alt="" />
                </button>
                <p>
                    {quackInfo._count.quack_comments}
                </p>
            </div>
        </div>
    </div>
</article>

<style>
    article {
        overflow: hidden;
        animation-duration: 1s;
        width: 100%;
    }

    @keyframes show {
        from {
            width: 20%;
            height: 1%;
        }

        to {
            width: 100%;
            height: 100%;
        }
    }

    @keyframes ping {
        0% {
            transform: scale(1.1);
        }

        75%,
        100% {
            transform: scale(1);
        }
    }
    .animate-ping {
        animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @media (min-width: 375px) and (max-width: 820px) {
        article {
            width: 90vw;
        }
        .imgProfile {
            width: 45px;
        }
        .displayName {
            font-size: medium;
        }
        .userName {
            font-size: small;
        }
        .content {
            margin-left: 0px;
        }
        .contentP {
            font-size: small;
            line-height: 16px;
            text-wrap: wrap;
        }
        .buttonContainer {
            margin-left: 0px;
            gap: 100px;
        }
        .buttons {
        }
    }
    @media (min-width: 1900px) {
        .quack {
            width: 60vw;
        }
    }
</style>
