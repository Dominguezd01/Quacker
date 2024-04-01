<script>
    import homeIcon from "$lib/assets/homeIcon.svg"
    import notificationIcon from "$lib/assets/notificationIcon.svg"
    import profileIcon from "$lib/assets/profileIcon.svg"
    import { onMount } from "svelte"
    import { getCookie } from "../getCookie"
    import { getImage } from "../getImage"
    let profilePic
    onMount(() => {
        profilePic = localStorage.getItem("userImage")
    })
</script>

<div class="grid place-items-center h-[100vh]">
    <nav class="flex items-center flex-col gap-2">
        <a href="/quacks/main" class="flex gap-1 items-center">
            <img
                src={homeIcon}
                alt="Home icon"
                width="50px"
                class="ml-[-65px] mr-2"
            />
            <p class="font-extrabold text-[18px]">Home</p>
        </a>
        <hr class="w-[75%] opacity-50" />
        <a href="/notifications" class="flex gap-1 items-center">
            <img src={notificationIcon} alt="Notification icon" width="60px" />
            <p class="font-extrabold text-[18px]">Notifications</p>
        </a>

        <hr class="w-[75%] opacity-50" />
    </nav>

    <a href="/profile" class="flex gap-3 items-center mt-20">
        <img
            src={getImage(profilePic)}
            alt="User icon"
            width="40px"
            class="ml-[-60px]"
        />
        <p class="font-extrabold text-[18px] mr-[-15px]">
            {getCookie("userName")}
        </p>
    </a>
</div>
