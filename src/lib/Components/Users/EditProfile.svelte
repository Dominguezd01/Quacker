<script>
    import { env } from "$env/dynamic/public"
    import { getCookie } from "../../getCookie"
    import { setCookie } from "../../setCookie"
    import GreenLoader from "../GreenLoader.svelte"
    import { goto } from "$app/navigation"
    import image1 from "../../assets/Avatars/1.svg"
    import image2 from "../../assets/Avatars/2.svg"
    import image3 from "../../assets/Avatars/3.svg"
    import image4 from "../../assets/Avatars/4.svg"
    import image5 from "../../assets/Avatars/5.svg"
    import image6 from "../../assets/Avatars/6.svg"
    import {
        userNameAlreadyTaken,
        userNameTooLong,
        bioTooLong,
        displayNameTooLong,
        profileImageNotFound,
    } from "../../constants"
    const API = env.PUBLIC_API
    let userName,
        displayName,
        bio,
        prevoiusTarget,
        profileImage,
        userNameError,
        displayNameError,
        bioError,
        imageError

    const handleSelectImage = (e) => {
        if (prevoiusTarget !== undefined) {
            document
                .getElementById(prevoiusTarget)
                .classList.remove("selectedItem")
        }
        let target = e.target
        target.classList.add("selectedItem")
        profileImage = e.target.id
        prevoiusTarget = target.id
    }

    const getUserProfile = async () => {
        let options = {
            method: "GET",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
        }
        let response = await fetch(
            `${API}/users/profileEdit/editInfo/getProfileEdit`,
            options,
        )

        response = await response.json()

        if (response.status !== 200) {
            goto("/quacks/main")
        }

        prevoiusTarget = response.userInfo.profile_picture
        profileImage = response.userInfo.profile_picture
        return response
    }

    /**
     *
     */

    const handleSubmit = async () => {
        let options = {
            method: "PATCH",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName.value,
                displayName: displayName.value,
                profileImage: profileImage,
                bio: bio.value,
            }),
        }

        let response = await fetch(
            `${API}/users/profileEdit/editInfo/edit/editProfile`,
            options,
        )

        response = await response.json()

        if (response.status == 400) {
            checkErrors(response.errors)
        }
        if (response.status !== 200) {
            goto("/quacks/main")
        }

        if (response.status === 200) {
            setCookie("token", response.token, 15)
            setCookie("userName", response.userName, 15)
            setCookie("userDisplayName", response.displayName, 15)
            localStorage.setItem("userImage", response.profilePic)
            goto(`/users/${getCookie("userName")}`)
        }
    }

    const checkErrors = (errors) => {
        if (errors.find((i) => i.description == userNameAlreadyTaken) != null) {
            userNameError = userNameAlreadyTaken
        }
        if (errors.find((i) => i.description == userNameTooLong) != null) {
            userNameError = userNameTooLong
        }

        if (errors.find((i) => i.description == displayNameTooLong) != null) {
            displayNameError = displayNameTooLong
        }

        if (errors.find((i) => i.description == bioTooLong) != null) {
            bioError = bioTooLong
        }

        if (errors.find((i) => i.description == profileImageNotFound) != null) {
            imageError = profileImageNotFound
        }
    }
</script>

<main class="grid items-center justify-center w-full">
    {#await getUserProfile()}
        <GreenLoader></GreenLoader>
    {:then response}
        <main class="flex flex-col">
            <form
                on:submit|preventDefault={handleSubmit}
                class="flex flex-col items-center justify-center gap-2"
            >
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col items-center">
                        <label for="userName">User Name</label>
                        <input
                            id="userName"
                            type="text"
                            class="w-[100%] h-[25px] border-2 border-green-500 rounded-md p-2"
                            value={response.userInfo.user_name}
                            bind:this={userName}
                        />
                        <label for="userName" class="text-red-500">
                            {#if userNameError !== undefined}
                                {userNameError}
                            {/if}
                        </label>
                    </div>

                    <div class="flex flex-col items-center">
                        <label for="displayName">Display Name</label>
                        <input
                            id="displayName"
                            type="text"
                            class="w-[100%] h-[25px] border-2 border-green-500 rounded-md p-2"
                            value={response.userInfo.display_name}
                            bind:this={displayName}
                        />
                        <label for="displayName" class="text-red-500">
                            {#if displayNameError !== undefined}
                                {displayNameError}
                            {/if}
                        </label>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <label for="bio">Bio</label>
                    <textarea
                        id="bio"
                        class="md: w-[200%] h-[80px] resize-none border-2 border-green-500 rounded-md p-1"
                        value={response.userInfo.bio === null
                            ? ""
                            : response.userInfo.bio}
                        bind:this={bio}
                    />
                    <label for="bio" class="text-red-500">
                        {#if bioError !== undefined}
                            {bioError}
                        {/if}
                    </label>
                </div>

                <div class="flex items-start gap-6 imgContainer">
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={image1}
                        class="w-20 myTransition {response.userInfo
                            .profile_picture === 'image1'
                            ? 'selectedItem'
                            : ''}"
                        alt=""
                        id="image1"
                        on:click={handleSelectImage}
                    />
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={image2}
                        class="w-20 myTransition {response.userInfo
                            .profile_picture === 'image2'
                            ? 'selectedItem'
                            : ''}"
                        alt=""
                        id="image2"
                        on:click={handleSelectImage}
                    />
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={image3}
                        class="w-20 myTransition {response.userInfo
                            .profile_picture === 'image3'
                            ? 'selectedItem'
                            : ''}"
                        alt=""
                        id="image3"
                        on:click={handleSelectImage}
                    />
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={image4}
                        class="w-20 myTransition {response.userInfo
                            .profile_picture === 'image4'
                            ? 'selectedItem'
                            : ''}"
                        alt=""
                        id="image4"
                        on:click={handleSelectImage}
                    />
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={image5}
                        class="w-20 myTransition {response.userInfo
                            .profile_picture === 'image5'
                            ? 'selectedItem'
                            : ''}"
                        alt=""
                        id="image5"
                        on:click={handleSelectImage}
                    />
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={image6}
                        class="w-20 myTransition {response.userInfo
                            .profile_picture === 'image6'
                            ? 'selectedItem'
                            : ''}"
                        alt=""
                        id="image6"
                        on:click={handleSelectImage}
                    />
                </div>
                <label for="" class="text-red-500">
                    {#if imageError !== undefined}
                        {imageError}
                    {/if}</label
                >
                <div>
                    <input
                        type="submit"
                        value="SEND!!"
                        class="bg-green-600 text-center w-36 h-12 rounded-lg hover:bg-green-400 transition 0.35s"
                    />
                </div>
            </form>
        </main>
    {/await}
</main>

<style>
    .selectedItem {
        border: solid 2px #22c55e;
        scale: 1.1;
        border-radius: 10px;
        transform: rotate(2deg);
    }

    @media (min-width: 300px) and (max-width: 1900px) {
        .imgContainer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
