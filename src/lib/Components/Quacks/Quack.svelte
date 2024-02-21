<script>
    import defaultProfilePicture from "$lib/assets/defaultProfilePicture.jpg"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import comment from "$lib/assets/comment.svg"
    let imgLike
    export let quackInfo

    const handleLike = () => {
        if (quackInfo.like) {
            imgLike.src = likePlain
            quackInfo.like = false
            return
        }

        imgLike.src = likeGreen
        quackInfo.like = true
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article>
    <div class="grid items-center gap-4 border-solid border-2 p-4 rounded-md">
        <!--
        Image and names container
    -->
        <a href="/quacks/quack/{quackInfo.id}">
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
                            {quackInfo.displayAuthor}
                        </p>
                        <p class="text-xs/[0px]">{quackInfo.author}</p>
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
            {#if quackInfo.like}
                <div class="flex gap-2" on:click={handleLike}>
                    <button>
                        <img
                            bind:this={imgLike}
                            src={likeGreen}
                            alt="Like button"
                            class="w-5"
                        />
                    </button>
                    <p class="text-green-500">{quackInfo.likeCount}</p>
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
                    <p>{quackInfo.likeCount}</p>
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
                    <p class="text-green-500">{quackInfo.requacksCount}</p>
                </div>
            {:else}
                <div class="flex gap-2">
                    <button>
                        <img src={requackPlain} alt="Like button" class="w-5" />
                    </button>
                    <p>{quackInfo.requacksCount}</p>
                </div>
            {/if}

            <div class="flex gap-2">
                <button>
                    <img src={comment} class="w-5" alt="" />
                </button>
                <p>{quackInfo.commentCount}</p>
            </div>
        </div>
    </div>
</article>
