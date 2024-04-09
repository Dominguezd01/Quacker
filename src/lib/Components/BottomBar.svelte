<script>
    import homeIcon from "$lib/assets/homeIcon.svg"
    import searchIcon from "$lib/assets/search.svg"
    import notificationIcon from "$lib/assets/messages.svg"
    import profileIcon from "$lib/assets/profileIcon.svg"
    import { getCookie } from "../getCookie"
</script>

<div class="navbar">
    <a href="/quacks/main" class="w-16"
        ><img src={homeIcon} alt="Home icon" /></a
    >
    <a href="/search" class="w-16"><img src={searchIcon} alt="" /></a>
    <a href="/users/{getCookie('userName')}" class="w-16"
        ><img src={profileIcon} alt="" /></a
    >
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
        width: 50%;
        gap: 6px;
        display: flex;
        justify-content: center;
        transform: translateX(50%);
    }

    /* Style the links inside the navigation bar */
    .navbar a {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    @media (min-width: 1900px) {
        .navbar {
            display: none;
        }
    }
</style>
