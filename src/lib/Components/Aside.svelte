<script>
    import homeIcon from "$lib/assets/homeIcon.svg"
    import notificationIcon from "$lib/assets/notificationIcon.svg"
    import profileIcon from "$lib/assets/profileIcon.svg"
    import { getCookie } from "../getCookie"
</script>

<div class="grid place-items-center">
    <nav class="flex items-center flex-col gap-2">
        <a href="/quacks/main" class="flex gap-1 items-center">
            <img
                src={homeIcon}
                alt="Home icon"
                width="50px"
                class="ml-[-65px] mr-2"
            />
            <p class="font-extrabold text-[20px]">Home</p>
        </a>
        <hr class="w-[75%] opacity-50" />
        <a href="/notifications" class="flex gap-1 items-center">
            <img src={notificationIcon} alt="Notification icon" width="60px" />
            <p class="font-extrabold text-[20px]">Notifications</p>
        </a>

        <hr class="w-[75%] opacity-50" />
    </nav>

    <a href="/profile" class="flex gap-3 items-center mt-20">
        <img
            src={profileIcon}
            alt="Notification icon"
            width="40px"
            class="ml-[-60px]"
        />
        <p class="font-extrabold text-[20px] mr-[-15px]">
            {getCookie("userName")}
        </p>
    </a>
</div>
