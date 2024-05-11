<script>
    import { env } from "$env/dynamic/public"
    import { getImage } from "../../getImage.js"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import comment from "$lib/assets/comment.svg"
    import { getCookie } from "../../getCookie.js"
    export let commentInfo
    let imgLike, greenLikeCounter, imgRequack
    let likeCount = commentInfo._count.comment_like
    let isLike = commentInfo.comment_like
    let isRepost = commentInfo.comment_requack
    let repostCount = commentInfo._count.comment_requack
    const API = env.PUBLIC_API
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
                commentId: commentInfo.comment_id,
            }),
        }

        let response = await fetch(`${API}/comments/comment/like`, options)
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
                commentId: commentInfo.comment_id,
            }),
        }

        let response = await fetch(`${API}/comments/comment/dislike`, options)
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
                commentId: commentInfo.comment_id,
            }),
        }

        let response = await fetch(`${API}/comments/comment/requack`, options)
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
                commentId: commentInfo.comment_id,
            }),
        }

        let response = await fetch(
            `${API}/comments/comment/deleteRequack`,
            options,
        )
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

<article>
    <div class="grid items-center gap-4 border-solid border-2 p-4 rounded-md">
        <!--
        Image and names container
    -->
        <div>
            <div class="grid items-center gap-4">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex gap-7" role="button" tabindex="10px">
                    <img
                        src={getImage(
                            commentInfo.user_comments[0].users.profile_picture,
                        )}
                        alt="User"
                        class="w-16 border-solid border-2 bg-white rounded-[20%] userImg"
                    />
                    <div class="grid items-center">
                        <p class="text-sm/[0px] mb-[-22px]">
                            {commentInfo.user_comments[0].users.display_name}
                        </p>
                        <p class="text-xs/[0px]">
                            @{commentInfo.user_comments[0].users.user_name}
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
            <div />
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
                                class="w-5"
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
                        <p class="text-quacker">{repostCount}</p>
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
            </div>
        </div>
    </div>
</article>

<style>
    @media (min-width: 300px) and (max-width: 1900px) {
        .buttonContainer {
            gap: 80px;
        }
        .userImg {
            width: 60px;
        }
    }
</style>
