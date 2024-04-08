<script>
    import homeIcon from "$lib/assets/homeIcon.svg"
    import notificationIcon from "$lib/assets/messages.svg"
    import profileIcon from "$lib/assets/profileIcon.svg"
    import { onMount } from "svelte"
    import { getCookie } from "../getCookie"
    import { getImage } from "../getImage"
    let profilePic
    onMount(() => {
        profilePic = localStorage.getItem("userImage")
    })
</script>

<div
    id="main"
    class="flex justify-center flex-col place-items-center h-[80vh] gap-28"
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
            <img src={notificationIcon} alt="Notification icon" width="50px" />
            <p class="font-extrabold text-[18px]">Notifications</p>
        </a>
    </nav>

    <a href="/profile" class="flex gap-3 items-center">
        <img
            src={getImage(profilePic)}
            alt="User icon"
            width="60px"
            class="ml-[-60px]"
        />
        <div class="flex flex-col">
            <p class="font-extrabold text-2xl mr-[-15px]">
                {getCookie("userDisplayName")}
            </p>
            <p class=" text-xl mr-[-15px]">
                @{getCookie("userDisplayName")}
            </p>
        </div>
    </a>
</div>

<style>
    @media (min-width: 100px) and (max-width: 1900px) {
        #main {
            display: none;
        }
    }
</style>
