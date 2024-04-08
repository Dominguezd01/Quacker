<script>
    export let mainDiv
    import { getCookie } from "../../getCookie"
    import { env } from "$env/dynamic/public"
    import Quack from "./Quack.svelte"
    import { browser } from "$app/environment"
    import Aside from "../Aside.svelte"
    import MainPage from "./MainPage.svelte"
    const API = env.PUBLIC_API
    let quackContent
    let divQuacks
    if (browser) divQuacks = document.getElementById("#quacksDiv")
    const handleSubmit = async () => {
        let contentQuack = quackContent.value.trim()

        if (contentQuack.trim() == "" || contentQuack.length > 500) {
            alert("TOOO LONG")
            return
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
        //send parentPost as null to indicate is a quack by itself
    }
</script>

<div
    class="grid items-center text-center border-2 border-solid border-green-500 p-2 gap-3 rounded-md"
>
    <div class="text-3xl font-bold advise">What is happening?</div>
    <form class="grid gap-5" on:submit|preventDefault={handleSubmit}>
        <textarea
            maxlength="500"
            class="w-[100%] h-[160px] resize-none text-center text-base rounded-md bg-[#1a1a1a] border-solid border-green-500 border-2 p-1"
            placeholder="Tell us your thoughts"
            bind:this={quackContent}
        >
        </textarea>
        <div class="flex flex-row-reverse">
            <input
                type="submit"
                value="QUACK!!!"
                class="bg-green-500 text-white rounded-md p-4 submitBtn"
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
