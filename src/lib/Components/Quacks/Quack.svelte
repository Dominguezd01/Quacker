<script>
    export let quackInfo
    import { getCookie } from "../../getCookie.js"
    import { getImage } from "../../getImage.js"
    import defaultProfilePicture from "$lib/assets/defaultProfilePicture.jpg"
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
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article>
    <div class="grid items-center gap-4 border-solid border-2 p-4 rounded-md">
        <!--
        Image and names container
    -->
        <a href="/quacks/quack/{quackInfo.quack_id}">
            <div class="grid items-center gap-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex gap-7" role="button" tabindex="10px">
                    <img
                        src={getImage(
                            quackInfo.user_quack[0].users.profile_picture,
                        )}
                        alt="User"
                        class="w-16 border-solid border-2 bg-white rounded-[20%]"
                    />
                    <div class="grid items-center">
                        <p class="text-sm/[0px] mb-[-22px]">
                            {quackInfo.user_quack[0].users.display_name}
                        </p>
                        <p class="text-xs/[0px] content">
                            {quackInfo.user_quack[0].users.user_name}
                        </p>
                    </div>
                </div>
            </div>
            <!--
        Quack content
    -->
            <div class="ml-24">
                <p>{quackInfo.content}</p>
            </div>
        </a>
        <!--
        Button container
    -->
        <div class="flex flex-row ml-24 gap-28">
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
                    <p class="text-green-500">
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
                    <p class="text-green-500">{repostCount}</p>
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
        animation: ping;
        animation-duration: 1s;
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

    @media (min-width: 100px) and (max-width: 1900px) {
        .buttons {
            width: 90px;
        }
        .content {
            font-size: 1em;
        }
    }

    @media (min-width: 100px) and (max-width: 300px) {
        .buttons {
            width: 90px;
            height: 30px;
        }
    }
    @media (min-width: 375) and (max-width: 400px) {
        .buttons {
            width: 40px;
        }
    }

    @media (min-width: 300px) and (max-width: 1900px) {
        .buttons {
            width: 40px;
        }
    }
</style>
