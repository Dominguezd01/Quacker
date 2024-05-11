<script>
    import { onMount } from "svelte"
    import { getImage } from "../../getImage"
    import { getCookie } from "../../getCookie"
    import { env } from "$env/dynamic/public"
    export let user
    let followed
    const API = env.PUBLIC_API
    onMount(() => {
        followed = user.followed
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
                userNameFollowed: user.user_name,
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
                userNameFollowed: user.user_name,
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
</script>

<div class="flex flex-row items-center w-[100%] mainDiv">
    <img
        src={getImage(user.profile_picture)}
        alt="Users profile"
        class="w-24 imgProfile"
    />
    <div class="flex flex-col w-[100%] p-1 gap-6 divConBio">
        <div class="flex flex-row w-[100%] imgButtonFollow">
            <div class="flex flex-row divNameButton">
                <a href="/users/{user.user_name}">
                    <img
                        src={getImage(user.profile_picture)}
                        alt="Users profile"
                        class="hidden imgProfileResponsive"
                    />
                </a>
                <div class="flex flex-col gap-2 w-[100%]">
                    <a
                        class="flex flex-col gap-2 w-[100%]"
                        href="/users/{user.user_name}"
                    >
                        <p class="font-bold text-2xl">
                            {user.display_name}
                        </p>
                        <p class="text-lg">@{user.user_name}</p>
                    </a>
                </div>

                {#if !user.isUser}
                    <div>
                        {#if followed}
                            <div
                                class="flex justify-end w-[100%] h-[100%] btnFollowing"
                            >
                                <button
                                    on:click={sendUnFollow}
                                    class="bg-black pr-1 pl-1 text-center text-lg rounded-sm font-bold border-solid border-2 border-white w-[200px] h-[100%]"
                                >
                                    Following!
                                </button>
                            </div>
                        {:else}
                            <div
                                class="flex justify-end w-[100%] h-[100%] btnFollowed"
                            >
                                <button
                                    on:click={sendFollow}
                                    class="bg-quacker pr-1 pl-1 text-center text-lg rounded-sm font-bold border-solid border-2 border-white w-[200px] h-[100%]"
                                >
                                    Follow!
                                </button>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
        <div class="divBio">
            {#if user.bio !== null}
                <p class="text-2xl text-wrap userBio">{user.bio}</p>
            {/if}
        </div>
    </div>
</div>

<style>
    @media (min-width: 300px) and (max-width: 820px) {
        .divNameButton {
            flex-direction: column;
            justify-content: start;
            align-items: start;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 60vw;
            align-items: center;
            justify-content: center;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 2px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 100px;
            text-align: center;
        }
        .userBio {
            font-size: medium;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            width: 100%;
            margin-left: 110px;
            text-align: start;
        }
        .divConBio {
            width: 100%;
            justify-content: center;
            align-items: center;
        }
    }

    @media (min-width: 820px) and (max-width: 1300px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-align: start;
            margin-left: 60px;
            font-size: 20px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }
    @media (min-width: 1300px) and (max-width: 1900px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
        }
        .imgProfileResponsive {
            display: block;
            width: 70px;
        }
        .divBio {
            text-align: center;
        }
    }

    @media (min-width: 1300px) and (max-width: 1400px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
            margin-left: -90px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }
    @media (min-width: 1400px) and (max-width: 1500px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
            margin-left: -100px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }

    @media (min-width: 1500px) and (max-width: 1600px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
            margin-left: -200px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }
    @media (min-width: 1600px) and (max-width: 1700px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
            margin-left: -300px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }

    @media (min-width: 1700px) and (max-width: 1800px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
            margin-left: -400px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }
    @media (min-width: 1800px) and (max-width: 1900px) {
        .divNameButton {
            flex-direction: column;
        }
        .imgProfile {
            width: 0px;
        }
        .mainDiv {
            width: 80vw;
        }
        .imgButtonFollow {
            flex-direction: column;
            align-items: start;
            gap: 4px;
        }
        .btnFollowing,
        .btnFollowed {
            width: 200px;
            margin-left: 60px;
            text-align: center;
        }
        .userBio {
            text-wrap: wrap;
            font-size: 20px;
            margin-left: -450px;
        }
        .imgProfileResponsive {
            display: block;
            width: 60px;
        }
        .divBio {
            text-align: center;
        }
    }
    .imgProfile {
        display: block;
    }
    .btnFollowing,
    .btnFollowed {
        width: 200px;
        margin-left: 60px;
        text-align: center;
    }
</style>
