<script>
    import { getCookie } from "../../getCookie"
    import Comment from "./Comment.svelte"
    import { env } from "$env/dynamic/public"
    const API = env.PUBLIC_API

    export let quackId
    let textArea, content
    const handleSubmit = async () => {
        let content = textArea.value.trim()

        if (content === "" || content.length > 500) {
            alert("TOO LONG")
            return
        }

        let bodyContent = {
            content: content,
            quackId: quackId,
        }
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("token").trim(),
            },
            body: JSON.stringify(bodyContent),
        }

        let response = await fetch(`${API}/comments/comment/create`, options)
        response = await response.json()

        if (response.status === 201) {
            new Comment({
                target: document.querySelector("#commentsContainer"),
                anchor: document.querySelector("#commentsContainer").firstChild,
                props: {
                    commentInfo: response.comment,
                },
                hydrate: false,
            })
        }
    }
</script>

<div class="mainDiv">
    <form
        on:submit|preventDefault={handleSubmit}
        class="grid w-[100%] items-center gap-2"
    >
        <textarea
            class="w-[100%] bg-slate-950 border-2 border-white rounded-md h-20 resize-none p-2"
            placeholder="Comment your thoughts"
            bind:this={textArea}
        />
        <input
            type="submit"
            value="COMMENT!!"
            class="bg-quacker p-4 border rounded-md border-none"
        />
    </form>
</div>

<style>
</style>
