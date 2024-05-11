<script>
    export let quackInfo
    import { getCookie } from "../../getCookie.js"
    import { getImage } from "../../getImage.js"
    import likePlain from "$lib/assets/like.svg"
    import likeGreen from "$lib/assets/likeGreen.svg"
    import deleteIcon from "$lib/assets/delete.svg"
    import editIcon from "$lib/assets/editQuack.svg"
    import requackPlain from "$lib/assets/requack.svg"
    import requackGreen from "$lib/assets/requackGreen.svg"
    import { goto } from "$app/navigation"
    import comment from "$lib/assets/comment.svg"
    import { env } from "$env/dynamic/public"
    import Swal from "sweetalert2"
    const API = env.PUBLIC_API
    let imgLike, greenLikeCounter, imgRequack, quackDiv
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
    const handleDelete = async () => {
        let options = {
            method: "PATCH",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quackId: quackInfo.quack_id,
            }),
        }

        Swal.fire({
            icon: "warning",
            title: "Caution!!",
            text: "You cant undo this action",
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: "Delete it!",
            confirmButtonColor: "#f20707",
            denyButtonColor: "#22c55e",
            denyButtonText: "Nope!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let response = await fetch(
                    `${API}/quacks/quack/delete`,
                    options,
                )
                response = await response.json()
                if (response.status !== 200) {
                    return Swal.fire({
                        title: "CANNOT DELETE THE QUACK",
                        icon: "error",
                        showCloseButton: true,
                    })
                }
                if (response.status === 401 || response.status == 403) {
                    let cookies = document.cookie.split(";")

                    for (let i = 0; i < cookies.length; i++) {
                        let cookie = cookies[i]
                        let eqPos = cookie.indexOf("=")
                        let name =
                            eqPos > -1 ? cookie.substring(0, eqPos) : cookie
                        document.cookie =
                            name +
                            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
                    }
                    localStorage.clear()
                    location.href = "/users/auth/login"
                }
                if (location.href == `/quacks/quack/${quackInfo.quack_id}}`) {
                    goto("/quacks/main")
                }
                quackDiv.remove()
            }
        })
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

    const getContent = (content) => {
        if (content.split(" ").length !== 1) return content
        if (content.length < 100) return content
        let contentArray = []
        for (let i = 0; i < content.length; i++) {
            contentArray.push(content[i])
        }

        return contentArray.join(" ")
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article class="w-[100%]" id={quackInfo.quack_id} bind:this={quackDiv}>
    <div class="grid items-center gap-4 border-solid border-2 p-4 rounded-md">
        <!--
        Image and names container
    -->
        <div class="grid items-center justify-center grid-rows-1 grid-cols-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="flex gap-7 w-full">
                <a href="/users/{quackInfo.user_quack[0].users.user_name}">
                    <img
                        src={getImage(
                            quackInfo.user_quack[0].users.profile_picture,
                        )}
                        alt="User"
                        class="w-16 border-solid border-2 rounded-[20%] userImg"
                    />
                </a>
                <div class="grid items-center">
                    <p class="text-sm/[0px] mb-[-22px]">
                        {quackInfo.user_quack[0].users.display_name}
                    </p>
                    <p class="text-xs/[0px] content">
                        @{quackInfo.user_quack[0].users.user_name}
                    </p>
                </div>
            </div>

            <div class="flex flex-row-reverse gap-6 w-full justify-items-end">
                {#if quackInfo.isFromUser}
                    <img
                        class="w-10 buttonsDeleteEdit"
                        src={deleteIcon}
                        on:click={handleDelete}
                        alt="Delete icon"
                    />
                    <a
                        href="/quacks/quack/edit/{quackInfo.quack_id}"
                        class="w-10 buttonsDeleteEdit"
                    >
                        <img src={editIcon} alt="Delete icon" />
                    </a>
                {/if}
            </div>
        </div>
        <!--
        Quack content
    -->
        <a href="/quacks/quack/{quackInfo.quack_id}">
            <div class="ml-24">
                <p class="content">{quackInfo.content}</p>
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

    @media (min-width: 300px) and (max-width: 1900px) {
        .buttonContainer {
            gap: 40px;
        }
        .userImg {
            width: 60px;
        }
    }
    @media (min-width: 300px) and (max-width: 500px) {
        .buttonsDeleteEdit {
            width: 30px;
        }
    }
    .content {
        line-break: strict;
        word-break: normal;
    }
</style>
