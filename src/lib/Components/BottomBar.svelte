<script>
    import homeIcon from "$lib/assets/homeIcon.svg"
    import searchIcon from "$lib/assets/search.svg"
    import notificationIcon from "$lib/assets/messages.svg"
    import profileIcon from "$lib/assets/profileIcon.svg"
    import logoutIcon from "$lib/assets/logout.svg"
    import { getCookie } from "../getCookie"
    import { goto } from "$app/navigation"
</script>

<div class="navbar">
    <a href="/quacks/main" class="w-11"
        ><img src={homeIcon} alt="Home icon" /></a
    >
    <a href="/search" class="w-11"><img src={searchIcon} alt="" /></a>
    <a href="/users/{getCookie('userName')}" class="w-11"
        ><img src={profileIcon} alt="" /></a
    >
    <a href="/groups" class="w-11"><img src={notificationIcon} alt="" /></a>
    <button
        class="w-11"
        on:click={() => {
            let cookies = document.cookie.split(";")

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i]
                let eqPos = cookie.indexOf("=")
                let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
                document.cookie =
                    name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
            }
            localStorage.clear()
            goto("/users/auth/login")
        }}
    >
        <img src={logoutIcon} alt="Log out button" />
    </button>
</div>

<style>
    /* Place the navbar at the bottom of the page, and make it stick */
    .navbar {
        background-color: black;
        border-radius: 15px;
        border: solid 1px #22c55e;
        overflow: hidden;
        position: fixed;
        bottom: 1%;
        width: 60%;
        gap: 1px;
        display: flex;
        justify-content: center;
        transform: translateX(35%);
    }

    /* Style the links inside the navigation bar */
    .navbar a,
    .navbar button {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 10px 12px;
        text-decoration: none;
        font-size: 15px;
    }

    @media (min-width: 1900px) {
        .navbar {
            display: none;
        }
    }
</style>
