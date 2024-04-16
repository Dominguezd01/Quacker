<script>
    export let userInfo
    import { getCookie } from "../../getCookie.js"
    import { onMount } from "svelte"
    import { env } from "$env/dynamic/public"
    import { getImage } from "../../getImage.js"
    import Quack from "../Quacks/Quack.svelte"
    import editIcon from "../../assets/edit.svg"
    import GreenLoader from "../GreenLoader.svelte"
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

    const getQuacksUser = async () => {
        console.log(getCookie("token").trim())
        let response = await fetch(`${API}/quacks/getUserQuacks`, {
            method: "POST",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                checkProfileName: userInfo.user.user_name,
            }),
        })

        response = await response.json()

        if (response.status == 401) location.href = "/users/auth/login"
        if (response.status !== 200) location.href = "/quacks/main"

        return response.quacks
    }
</script>

<main class="flex flex-col gap-7 p-2">
    <div class="flex flex-col">
        <h1 class="text-2xl font-extrabold">{userInfo.user.display_name}</h1>
        <p class="text-xl font-bold">
            {userInfo.user._count.user_quack} quacks
        </p>
    </div>
    <hr />

    <div class="flex flex-col w-[100%] gap-3">
        <div class="flex flex-col w-[90%] gap-10">
            <!--ESTE DIV JODIDO IMBECIL-->
            <div
                class="flex flex-row justify-self-start items-center gap-96 buttonNameContainer"
            >
                <div class="flex flex-row items-start">
                    <img
                        src={getImage(userInfo.user.image)}
                        alt="User profile"
                        class="w-[128px] imgProfile"
                    />
                    <div class="flex flex-col">
                        <h1 class="text-5xl font-extrabold">
                            {userInfo.user.display_name}
                        </h1>
                        <h3 class="text-2xl font-extrabold">
                            @{userInfo.user.user_name}
                        </h3>
                    </div>
                </div>

                <div bind:this={divButtons} class="">
                    {#if userInfo.isUser}
                        <a
                            href="/edit"
                            class="border-2 border-solid border-green-500 p-2 rounded-md text-xl font-bold bg-green-400 editButton"
                        >
                            Edit your profile
                        </a>
                        <a
                            href="/edit"
                            class="hidden border-2 border-solid border-green-500 p-2 rounded-md text-xl font-bold bg-green-400 editButtonResponsive"
                        >
                            <img
                                src={editIcon}
                                alt="ButtonIcon"
                                class="w-[30px]"
                            />
                        </a>
                    {:else if !followed}
                        <button
                            class="bg-green-500 p-2 text-center grid place-items-center rounded-md text-xl font-bold"
                            on:click={sendFollow}
                        >
                            FOLLOW
                        </button>
                    {:else}
                        <button
                            class="bg-slate-600 p-2 text-center grid place-items-center rounded-md text-xl font-bold"
                            on:click={sendUnFollow}
                        >
                            UNFOLLOW
                        </button>
                    {/if}
                </div>
            </div>
            <div class="w-full flex items-center">
                <p class=" ml-32 text-2xl text-wrap bio">
                    {#if userInfo.user.bio != null}
                        {userInfo.user.bio}
                    {/if}
                </p>
            </div>

            <div class="w-full flex items-center">
                <p class=" ml-32 text-2xl">
                    <b
                        >{userInfo.user._count
                            .user_follows_user_follows_user_id_followedTousers}</b
                    > followers
                </p>
                <p class=" ml-32 text-2xl">
                    <b
                        >{userInfo.user._count
                            .user_follows_user_follows_user_idTousers}</b
                    > followed
                </p>
            </div>
        </div>
        <hr />
        <h2 class="text-3xl font-bold">Quacks</h2>
        <div>
            {#await getQuacksUser()}
                <GreenLoader></GreenLoader>
            {:then quacks}
                {#if quacks.length === 0}
                    <p>This user havent quacked nothing yet</p>
                {:else}
                    {#each quacks as quack}
                        <Quack quackInfo={quack}></Quack>
                    {/each}
                {/if}
            {/await}
        </div>
        <!--
    {#each userInfo.user_quack.quacks as quack}
        <Quack quackInfo={quack}></Quack>
    {/each}
    */
    -->
    </div>
</main>

<style>
    @media (min-width: 100px) and (max-width: 1900px) {
        .imgResponsive {
            display: block;
        }
        .bio {
            margin-left: 30px;
        }
        .imgProfile {
            display: none;
        }
        .buttonNameContainer {
            gap: 20px;
        }
        .editButtonResponsive {
            display: block;
        }
        .editButton {
            display: none;
        }
    }
    @media (min-width: 1900px) and (max-width: 2000px) {
        .buttonNameContainer {
            gap: 210px;
        }
    }

    @media (min-width: 2000px) and (max-width: 2040px) {
        .buttonNameContainer {
            gap: 210px;
        }
    }
    .imgProfile {
        display: block;
    }
</style>
