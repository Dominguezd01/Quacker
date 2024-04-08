<script>
    import { getCookie } from "../../getCookie"
    const API = env.PUBLIC_API
    let quackContent
    const handleSubmit = async () => {
        console.log(quackContent.value.trim())
        let contentQuack = quackContent.value.trim()

        if (contentQuack.trim() == "" || contentQuack.length > 500) {
            console.log("TOOO LONG")
            return
        }
        console.log(getCookie("userId"))
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

        console.log(response)
        //send parentPost as null to indicate is a quack by itself
    }
</script>

<div
    class="grid items-center text-center border-2 border-solid border-green-500 p-2 gap-3 rounded-md"
>
    <div class="text-3xl font-bold">What is happening?</div>
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
                class="bg-green-500 text-white rounded-md p-4"
            />
        </div>
    </form>
</div>
