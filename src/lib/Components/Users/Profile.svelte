<script>
    export let userInfo
    import { getCookie } from "../../getCookie.js"
    import { onMount } from "svelte"
    import { env } from "$env/dynamic/public"
    import { getImage } from "../../getImage.js"
    const API = env.PUBLIC_API
    let followed, divButtons
    onMount(() => {
        followed = userInfo.followed
    })
    const sendFollow = async () => {
        followed = true

        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userNameFollowed: userInfo.user.user_name,
            }),
        }
        let response = await fetch(`${API}/usersFollows/follow`, options)
        response = await response.json()

        if (response.status !== 200) followed = false
    }

    const sendUnFollow = async () => {
        followed = false
        let options = {
            method: "DELETE",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userNameFollowed: userInfo.user.user_name,
            }),
        }
        let response = await fetch(`${API}/usersFollows/unfollow`, options)
        response = await response.json()

        if (response.status !== 200) followed = true
    }
</script>

<main class="flex flex-col gap-2">
    <div class="flex flex-col">
        <h1 class="text-2xl font-extrabold">{userInfo.user.display_name}</h1>
        <p class="text-xl font-bold">
            {userInfo.user.user_quack.length} quacks
        </p>
    </div>

    <div class="flex flex-row w-[100%]">
        <div class="flex flex-row items-center justify-end w-[90%]">
            <div class="flex flex-row items-center">
                <div>
                    <img
                        src={getImage(userInfo.user.image)}
                        alt="User profile"
                        class="w-[128px]"
                    />
                </div>
                <div class="flex flex-col">
                    <h1 class="text-5xl font-extrabold">
                        {userInfo.user.display_name}
                    </h1>
                    <h3 class="text-2xl font-extrabold">
                        @{userInfo.user.user_name}
                    </h3>
                </div>
            </div>

            <div bind:this={divButtons}>
                {#if userInfo.isUser}
                    <a
                        href="/edit"
                        class="border-2 border-solid border-green-500 p-1"
                    >
                        Edit your profile
                    </a>
                {:else if !followed}
                    <button
                        class="bg-green-500 p-20 w-[60px] h-[30px] text-center grid place-items-center"
                        on:click={sendFollow}
                    >
                        FOLLOW
                    </button>
                {:else}
                    <button
                        class="bg-slate-600 p-20 w-[60px] h-[30px] text-center grid place-items-center"
                        on:click={sendUnFollow}
                    >
                        UNFOLLOW
                    </button>
                {/if}
            </div>
        </div>
    </div>
</main>
