<script>
    const API = env.PUBLIC_API
    import { getCookie } from "../../getCookie"

    export let quackId
    let textArea, content
    const handleSubmit = async () => {
        let content = textArea.value.trim()

        if (content === "" || content.length > 500) {
            console.log("TOO LONG")
            return
        }

        let bodyContent = {
            content: content,
            userId: getCookie("userId"),
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

        console.log(response)
    }
</script>

<div>
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
            class="bg-green-500 p-4 border rounded-md border-none"
        />
    </form>
</div>

<style>
    textarea {
        field-sizing: content;
    }
</style>
