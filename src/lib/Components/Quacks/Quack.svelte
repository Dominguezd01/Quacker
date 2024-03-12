<script>
    import { API } from "../../env.js"
    import { getCookie } from "../../getCookie.js"
    import defaultProfilePicture from "$lib/assets/defaultProfilePicture.jpg"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import comment from "$lib/assets/comment.svg"
    import { onMount } from "svelte"
    let imgLike, greenLikeCounter
    export let quackInfo
    onMount(() => {
        console.log(greenLikeCounter)
    })
    const handleLike = async () => {
        if (quackInfo.user_quack_like.length > 0) {
            imgLike.src = likePlain
            quackInfo.like = false
            quackInfo._count.user_quack_like -= 1

            await disLikeQuack()
            delete quackInfo.user_quack_like[0]
            return
        }

        imgLike.src = likeGreen
        quackInfo.like = true
        quackInfo._count.user_quack_like += 1
        await likeQuack()
        quackInfo.user_quack_like[0] = true
    }

    const likeQuack = async () => {
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

        console.log(response)

        if (response.status != 200) {
            quackInfo.like = false
            imgLike.src = likePlain
            quackInfo._count.user_quack_like -= 1
        }
    }

    const disLikeQuack = async () => {
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

        console.log(response)
        if (response.status != 200) {
            quackInfo.like = true
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
                        src={defaultProfilePicture}
                        alt="User"
                        class="w-16 rounded-[20%]"
                    />
                    <div class="grid items-center">
                        <p class="text-sm/[0px] mb-[-22px]">
                            {quackInfo.user_quack[0].users.display_name}
                        </p>
                        <p class="text-xs/[0px]">
                            {quackInfo.user_quack[0].users.user_name}
                        </p>
                    </div>
                </div>
            </div>
            <!--
        Quack content
    -->
            <div class="ml-24">
                {quackInfo.content}
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
            {#if quackInfo.user_quack_like.length > 0}
                <div class="flex gap-2" on:click={handleLike}>
                    <button>
                        <img
                            bind:this={imgLike}
                            src={likeGreen}
                            alt="Like button"
                            class="w-5"
                        />
                    </button>
                    <p class="text-green-500">
                        {quackInfo._count.user_quack_like}
                    </p>
                </div>
            {:else}
                <div class="flex gap-2" on:click={handleLike}>
                    <button>
                        <img
                            bind:this={imgLike}
                            src={likePlain}
                            alt="Like button"
                            class="w-5"
                        />
                    </button>
                    <p>{quackInfo._count.user_quack_like}</p>
                </div>
            {/if}
            <!--
            Requack Button
        -->
            {#if quackInfo.repost}
                <div class="flex gap-2">
                    <button>
                        <img src={requackGreen} alt="Like button" class="w-5" />
                    </button>
                    <p class="text-green-500">{quackInfo._count.requacks}</p>
                </div>
            {:else}
                <div class="flex gap-2">
                    <button>
                        <img src={requackPlain} alt="Like button" class="w-5" />
                    </button>
                    <p>{quackInfo._count.requacks}</p>
                </div>
            {/if}

            <div class="flex gap-2">
                <button>
                    <img src={comment} class="w-5" alt="" />
                </button>
                <p>
                    {quackInfo._count
                        .comments_comments_quack_id_commentedToquacks}
                </p>
            </div>
        </div>
    </div>
</article>
