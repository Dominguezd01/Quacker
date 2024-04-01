<script>
    import Dialog from "../../../../lib/Components/Dialogs/ErrorDialog.svelte"
    import { API } from "../../../../lib/env.js"
    import image1 from "../../../../lib/assets/Avatars/1.svg"
    import image2 from "../../../../lib/assets/Avatars/2.svg"
    import image3 from "../../../../lib/assets/Avatars/3.svg"
    import image4 from "../../../../lib/assets/Avatars/4.svg"
    import image5 from "../../../../lib/assets/Avatars/5.svg"
    import image6 from "../../../../lib/assets/Avatars/6.svg"
    let form,
        emailValue,
        userNameValue,
        passwordValue,
        displayNameValue,
        divDialog,
        profileImage,
        prevoiusTarget

    const handleSelectImage = (e) => {
        console.log(e)
        if (prevoiusTarget !== undefined) {
            prevoiusTarget.classList.remove("selectedItem")
        }
        let target = e.target
        target.classList.add("selectedItem")
        profileImage = e.target.id
        prevoiusTarget = target
    }

    const handleSubmit = async () => {
        if (profileImage === undefined) {
            profileImage = "image1"
        }
        let body = {
            emailUser: emailValue,
            password: passwordValue,
            display_name: displayNameValue,
            user_name_user: userNameValue,
            profilePicture: profileImage,
        }
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
        let response = await fetch(`${API}/users/auth/register`, options)
        response = await response.json()

        if (response.status == 400) {
            new Dialog({
                target: divDialog,
                props: {
                    title: "Error",
                    content: response.msg,
                },
            })
        } else if (response.status == 401) {
            new Dialog({
                target: divDialog,
                props: {
                    title: "Error",
                    content: response.msg,
                },
            })
        }
        console.log(body)
    }
</script>

<div bind:this={divDialog}></div>
<div class="grid items-center justify-center m-14 gap-9">
    <form
        on:submit|preventDefault={handleSubmit}
        class="flex flex-col items-center gap-9 justify-center"
    >
        <div class="grid items-center grid-cols-2 gap-4 text-center m-4">
            <div class="grid items-center">
                <label for="email">Email</label>
                <input
                    type="text"
                    id="email"
                    bind:value={emailValue}
                    class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
                />
            </div>
            <div class="grid items-center">
                <label for="email">Username</label>
                <input
                    type="text"
                    id="userName"
                    bind:value={userNameValue}
                    class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
                />
            </div>
            <div class="grid items-center">
                <label for="email">Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={passwordValue}
                    class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
                />
            </div>
            <div class="grid items-center">
                <label for="displayName">Display Name</label>
                <input
                    type="text"
                    id="displayName"
                    bind:value={displayNameValue}
                    class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
                />
            </div>
        </div>

        <div class="flex items-start gap-6">
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={image1}
                class="w-20 myTransition"
                alt=""
                id="image1"
                on:click={handleSelectImage}
            />
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={image2}
                class="w-20 myTransition"
                alt=""
                id="image2"
                on:click={handleSelectImage}
            />
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={image3}
                class="w-20 myTransition"
                alt=""
                id="image3"
                on:click={handleSelectImage}
            />
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={image4}
                class="w-20 myTransition"
                alt=""
                id="image4"
                on:click={handleSelectImage}
            />
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={image5}
                class="w-20 myTransition"
                alt=""
                id="image5"
                on:click={handleSelectImage}
            />
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={image6}
                class="w-20 myTransition"
                alt=""
                id="image6"
                on:click={handleSelectImage}
            />
        </div>

        <div>
            <input
                type="submit"
                value="SEND!!"
                class="bg-green-600 text-center w-36 h-12 rounded-lg hover:bg-green-400 transition 0.35s"
            />
        </div>
    </form>
</div>
