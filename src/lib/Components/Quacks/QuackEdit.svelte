<script>
    export let quackInfo
    import { goto } from "$app/navigation"
    import { getCookie } from "../../getCookie.js"
    import { getImage } from "../../getImage.js"
    import { env } from "$env/dynamic/public"
    const API = env.PUBLIC_API
    let textArea
    let btnSubmit
    const handleWriting = () => {
        textArea.value.length >= 135
            ? (btnSubmit.hidden = true)
            : (btnSubmit.hidden = false)
    }

    const handleSubmit = async () => {
        if (textArea.value.length > 135) return
        let bodyContent = {
            quackId: quackInfo.quack_id,
            content: textArea.value,
        }
        let response = await fetch(`${API}/quacks/quack/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("token"),
            },
            body: JSON.stringify(bodyContent),
        })

        response = await response.json()

        if (response.status !== 200) {
            alert(response.msg)
        } else {
            goto("/quacks/main")
        }
        //let response =
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article class="w-[100%]">
    <div class="grid items-center gap-4 border-solid border-2 p-4 rounded-md">
        <!--
        Image and names container
    -->
        <div class="grid items-center justify-center grid-rows-1 grid-cols-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="flex gap-7 w-full" role="button" tabindex="10px">
                <img
                    src={getImage(
                        quackInfo.user_quack[0].users.profile_picture,
                    )}
                    alt="User"
                    class="w-16 border-solid bg-white rounded-[20%] userImg"
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
            <textarea
                on:keydown={handleWriting}
                bind:this={textArea}
                class="content w-full p-1 resize-none rounded-md bg-[#1a1a1a] border-solid border-quacker border-2 h-20"
                >{quackInfo.content}</textarea
            >
        </div>
        <div class="flex justify-end">
            <button
                bind:this={btnSubmit}
                on:click={handleSubmit}
                class="bg-quacker text-white rounded-md p-4 submitBtn"
            >
                EDIT
            </button>
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
            gap: 80px;
        }
        .userImg {
            width: 60px;
        }
    }

    .content {
        line-break: strict;
        word-break: normal;
    }
</style>
