<script>
    import defaultProfilePicture from "$lib/assets/defaultProfilePicture.jpg"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import comment from "$lib/assets/comment.svg"
    /**
            {
            id: 1,
            content: "Amazing quack with some funny joke about your mother",
            author: "@Dominguezd01",
            displayAuthor: "Dominguezd01",
            photoAuthor: "defaultProfilePicture.png",
            likeCount: 33,
            requacksCount: 1433,
        },
        */
    export let quackInfo
</script>

<div class="grid items-center gap-4 border-solid border-2 p-4 rounded-sm">
    <!--
        Image and names container
    -->
    <div class="grid items-center gap-4">
        <div class="flex gap-7">
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
    <!--
        Button container
    -->
    <div class="flex flex-row ml-24 gap-28">
        <!--
            Like Button
        -->
        {#if quackInfo.like}
            <div class="flex gap-2">
                <button>
                    <img src={likeGreen} alt="Like button" class="w-5" />
                </button>
                <p class="text-green-500">{quackInfo.likeCount}</p>
            </div>
        {:else}
            <div class="flex gap-2">
                <button>
                    <img src={likePlain} alt="Like button" class="w-5" />
                </button>
                <p>{quackInfo.likeCount}</p>
            </div>
        {/if}
        <!--
            Requack Button
        -->
        {#if quackInfo.like}
            <div class="flex gap-2">
                <button>
                    <img src={requackPlain} alt="Like button" class="w-5" />
                </button>
                <p>{quackInfo.requacksCount}</p>
            </div>
        {:else}
            <div class="flex gap-2">
                <button>
                    <img src={requackGreen} alt="Like button" class="w-5" />
                </button>
                <p class="text-green-500">{quackInfo.requacksCount}</p>
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
