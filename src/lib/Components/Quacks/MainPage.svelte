<script>
    import GreenLoader from "../../Components/GreenLoader.svelte"
    import Quack from "./Quack.svelte"
    import { API } from "../../env.js"
    import { getCookie } from "../../getCookie"
    import QuackCreate from "./QuackCreate.svelte"
    let quacks = [
        {
            id: 1,
            content: "Amazing quack with some funny joke about your mother",
            author: "@Dominguezd01",
            displayAuthor: "Dominguezd01",
            photoAuthor: "./static/static/defaultProfilePicture.svg",
            likeCount: 33,
            requacksCount: 1433,
        },
        {
            id: 2,
            content: "Amazing quack with some funny joke about Fernando Alonso",
            author: "@Dominguezd02",
            displayAuthor: "Dominguezd02",
            photoAuthor: "defaultProfilePicture.svg",
            likeCount: 33,
            requacksCount: 1433,
        },
        {
            id: 3,
            content: "Amazing quack with some funny joke about your mother",
            author: "@Dominguezd01",
            displayAuthor: "Dominguezd01",
            photoAuthor: "defaultProfilePicture.svg",
            likeCount: 33,
            requacksCount: 1433,
        },
        {
            id: 3,
            content: "Amazing quack with some funny joke about your mother",
            author: "@Dominguezd01",
            displayAuthor: "Dominguezd01",
            photoAuthor: "defaultProfilePicture.svg",
            likeCount: 33,
            requacksCount: 1433,
        },
        {
            id: 2,
            content: "Amazing quack with some funny joke about your mother",
            author: "@Dominguezd01",
            displayAuthor: "Dominguezd01",
            photoAuthor: "defaultProfilePicture.png",
            likeCount: 33,
            requacksCount: 1433,
        },
    ]

    const getMainQuacks = async () => {
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
            },
        }
        let response = await fetch(`${API}/quacks/main`, options)
        response = await response.json()
        console.log(response.quacks)
        if (response.status == 403) location.href = "/users/auth/login"
        return response.quacks
    }
</script>

<div class="grid items-center gap-2 overflow-x-scroll">
    <QuackCreate></QuackCreate>
    {#await getMainQuacks()}
        <div class="grid items-center justify-center mt-6">
            <GreenLoader></GreenLoader>
        </div>
    {:then quacks}
        {#each quacks as quack}
            <Quack quackInfo={quack}></Quack>
        {/each}
    {/await}
</div>
