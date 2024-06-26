<script>
    export let userInfo
    import { getCookie } from "../../getCookie.js"
    import { onMount } from "svelte"
    import { env } from "$env/dynamic/public"
    import { getImage } from "../../getImage.js"
    import Quack from "../Quacks/Quack.svelte"
    import editIcon from "../../assets/edit.svg"
    import GreenLoader from "../GreenLoader.svelte"
    import followIcon from "$lib/assets/follow.svg"
    import unfollowIcon from "$lib/assets/unfollow.svg"
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

    const getQuacksUser = async () => {
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
        if (response.status === 500) location.href = "/users/auth/login"
        if (response.status === 401) location.href = "/users/auth/login"
        if (response.status !== 200) location.href = "/quacks/main"

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
            <div
                class="flex flex-row justify-self-start items-center gap-96 buttonNameContainer"
            >
                <div class="flex flex-row items-start">
                    <img
                        src={getImage(userInfo.user.profile_picture)}
                        alt="User profile"
                        class="w-[128px] imgProfile"
                    />
                    <div class="flex flex-col">
                        <h1 class="text-5xl font-extrabold displayName">
                            {userInfo.user.display_name}
                        </h1>
                        <h3 class="text-2xl font-extrabold userName">
                            @{userInfo.user.user_name}
                        </h3>
                    </div>
                </div>

                <div bind:this={divButtons} class="">
                    {#if userInfo.isUser}
                        <a
                            href="/users/profile/edit"
                            class="border-2 border-solid border-green-500 p-2 rounded-md text-xl font-bold bg-green-400 editButton"
                        >
                            Edit your profile
                        </a>
                        <a
                            href="/users/profile/edit"
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
                            class="bg-green-500 p-2 text-center grid place-items-center rounded-md text-xl font-bold originalButton"
                            on:click={sendFollow}
                        >
                            FOLLOW
                        </button>
                        <button
                            class="bg-green-500 p-2 text-center place-items-center rounded-md text-xl font-bold hidden responsiveButton"
                            on:click={sendFollow}
                        >
                            <img src={followIcon} alt="Follow" />
                        </button>
                    {:else}
                        <button
                            class="bg-slate-600 p-2 text-center grid place-items-center rounded-md text-xl font-bold originalButton"
                            on:click={sendUnFollow}
                        >
                            UNFOLLOW
                        </button>
                        <button
                            class="bg-slate-600 p-2 text-center place-items-center rounded-md text-xl font-bold hidden responsiveButton"
                            on:click={sendFollow}
                        >
                            <img src={unfollowIcon} alt="Follow" />
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
                <p class="text-2xl">
                    <b
                        >{userInfo.user._count
                            .user_follows_user_follows_user_id_followedTousers}</b
                    > followers
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
                    <p>This user have quacked nothing yet</p>
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
            flex-direction: column;
            gap: 0px;
            justify-items: flex-end;
            overflow: auto;
            text-overflow: "...";
        }
        .editButtonResponsive {
            display: block;
        }
        .editButton {
            display: none;
        }
        .displayName {
            font-size: 25px;
            font-weight: bold;
        }
        .responsiveButton {
            display: none;
        }

        .responsiveButton {
            width: 60px;
        }

        .userName {
            font-size: 20px;
            font-weight: bold;
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
