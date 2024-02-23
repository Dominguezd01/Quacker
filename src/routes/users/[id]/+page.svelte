<script>
    import { page } from "$app/stores"
    import Profile from "../../../lib/Components/Users/Profile.svelte"

    let profileId =
        $page.url.href.split("/")[$page.url.href.split("/").length - 1]
</script>

<h1>HOLA</h1>

<Profile userID={profileId}></Profile>
