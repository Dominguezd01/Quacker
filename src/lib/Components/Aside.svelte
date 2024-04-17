<script>
    import homeIcon from "$lib/assets/homeIcon.svg"
    import searchIcon from "$lib/assets/search.svg"
    import profileIcon from "$lib/assets/profileIcon.svg"
    import { onMount } from "svelte"
    import { getCookie } from "../getCookie"
    import { getImage } from "../getImage"
    let profilePic
    onMount(() => {
        profilePic = localStorage.getItem("userImage")
    })
</script>

<main
    id="main"
    class="grid place-items-center justify-center items-start gap-[256px] p-5 fixed z-0 box-border basis-0 shrink-0 min-h-0 min-w-0 w-[20%]"
>
    <nav class="flex items-center flex-col gap-6">
        <a href="/quacks/main" class="flex gap-1 items-center">
            <img
                src={homeIcon}
                alt="Home icon"
                width="50px"
                class="ml-[-65px] mr-2"
            />
            <p class="font-extrabold text-[18px]">Home</p>
        </a>

        <a href="/notifications" class="flex gap-1 items-center">
            <img
                src={searchIcon}
                alt="Search icon"
                width="50px"
                class="ml-[-65px] mr-2"
            />
            <p class="font-extrabold text-[18px]">Search</p>
        </a>
    </nav>

    <a href="/users/{getCookie('userName')}" class="flex gap-3 items-center">
        <img src={getImage(profilePic)} alt="User icon" width="60px" class="" />
        <div class="flex flex-col">
            <p class="font-extrabold text-2xl mr-[-15px]">
                {getCookie("userDisplayName")}
            </p>
            <p class=" text-xl mr-[-15px]">
                @{getCookie("userDisplayName")}
            </p>
        </div>
    </a>
</main>

<style>
    @media (min-width: 100px) and (max-width: 1900px) {
        #main {
            display: none;
        }
    }

    #main {
        margin: 0px auto;
    }
</style>
