<script>
    export let userInfo
    import { API } from "../../env.js"
    import { getCookie } from "../../getCookie.js"
    import { onMount } from "svelte"
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

        if (response !== 200) followed = false
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

        if (response !== 200) followed = true
    }
</script>

<h1>{userInfo.user.display_name}</h1>
<div bind:this={divButtons}>
    {#if !followed}
        <button
            class="bg-green-500 p-20 w-[60px] h-[30px] text-center grid place-items-center"
            on:click={sendFollow}
        >
            FOLLOW
        </button>
    {:else}
        <button
            class="bg-green-500 p-20 w-[60px] h-[30px] text-center grid place-items-center"
            on:click={sendUnFollow}
        >
            UNFOLLOW
        </button>
    {/if}
</div>
