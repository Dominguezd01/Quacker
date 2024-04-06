<script>
    import { getImage } from "../../getImage.js"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import comment from "$lib/assets/comment.svg"
    export let commentInfo
    let imgLike,
        imgRequack,
        isLike,
        isRepost,
        likeCount,
        repostCount,
        handleLike,
        handleRequack
    console.log(commentInfo)
</script>

<article>
    <div class="grid items-center gap-4 border-solid border-2 p-4 rounded-md">
        <!--
        Image and names container
    -->
        <a href="/quacks/quack/{commentInfo.comment_id}">
            <div class="grid items-center gap-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex gap-7" role="button" tabindex="10px">
                    <img
                        src={getImage(
                            commentInfo.user_comments[0].users.profile_picture,
                        )}
                        alt="User"
                        class="w-16 border-solid border-2 bg-white rounded-[20%]"
                    />
                    <div class="grid items-center">
                        <p class="text-sm/[0px] mb-[-22px]">
                            {commentInfo.user_comments[0].users.display_name}
                        </p>
                        <p class="text-xs/[0px]">
                            {commentInfo.user_comments[0].users.user_name}
                        </p>
                    </div>
                </div>
            </div>
            <!--
        Quack content
    -->
            <div class="ml-24">
                {commentInfo.content}
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
                            class="w-5"
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
                            class="w-5"
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
                            class="w-5"
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
                            class="w-5"
                            bind:this={imgRequack}
                        />
                    </button>
                    <p>{repostCount}</p>
                </div>
            {/if}

            <div class="flex gap-2">
                <button>
                    <img src={comment} class="w-5" alt="" />
                </button>
                <p>
                    {commentInfo._count.quack_comments}
                </p>
            </div>
        </div>
    </div>
</article>
