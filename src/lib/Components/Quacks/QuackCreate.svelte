<script>
    export let mainDiv
    import { getCookie } from "../../getCookie"
    import { env } from "$env/dynamic/public"
    import Quack from "./Quack.svelte"
    import { browser } from "$app/environment"
    import Aside from "../Aside.svelte"
    import MainPage from "./MainPage.svelte"
    import ContentTooLong from "../Dialogs/ContentTooLong.svelte"
    import { onMount } from "svelte"
    import Swal from "sweetalert2"
    const API = env.PUBLIC_API
    let quackContent, mainDivQuackCreate
    let divQuacks
    let submitButton
    if (browser) divQuacks = document.getElementById("#quacksDiv")

    const handleSubmit = async () => {
        let contentQuack = quackContent.value.trim()
        console.log(contentQuack.trim() === "")
        if (contentQuack.trim() == "" || contentQuack == undefined) {
            return
        }
        if (contentQuack.length > 135) {
            Swal.fire({
                icon: "error",
                text: "Content too long, max is 135",
                title: "Error",
            })
        }
        let bodyContent = {
            content: contentQuack,
            userId: getCookie("userId"),
            isReply: false,
            isQuote: false,
            parentPost: null,
        }
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("token").trim(),
            },
            body: JSON.stringify(bodyContent),
        }

        let response = await fetch(`${API}/quacks/quack/create`, options)
        response = await response.json()

        if (response.status === 200) {
            new Quack({
                target: mainDiv,
                anchor: mainDiv.firstChild,
                props: {
                    quackInfo: response.quack,
                },
                hydrate: false,
            })
        }

        if (response.status === 413) {
            new ContentTooLong({
                target: mainDivQuackCreate,
                hydrate: false,
            })
        }
    }
</script>

<div
    class="grid items-center text-center border-2 border-solid border-quacker p-2 gap-3 rounded-md"
    bind:this={mainDivQuackCreate}
>
    <div class="text-3xl font-bold advise">What is happening?</div>
    <form class="grid gap-5" on:submit|preventDefault={handleSubmit}>
        <textarea
            maxlength="135"
            class="w-[100%] h-[160px] resize-none rounded-md bg-[#1a1a1a] border-solid border-quacker border-2"
            placeholder="Tell us your thoughts"
            bind:this={quackContent}
            on:keydown={() => {
                if (quackContent.value.length > 135) {
                    submitButton.hidden = true
                    return
                }
                submitButton.hidden = false
            }}
        >
        </textarea>
        <div class="flex flex-row-reverse">
            <input
                bind:this={submitButton}
                type="submit"
                value="QUACK!!!"
                class="bg-quacker text-white rounded-md p-4 submitBtn"
            />
        </div>
    </form>
</div>

<style>
    @media (min-width: 100px) and (max-width: 1900px) {
        textarea,
        .submitBtn {
            height: 80px;
        }
        .advise {
            font-size: 25px;
        }
    }
</style>
