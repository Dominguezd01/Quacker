<script>
    //In this component the id is the user profile

    export let userInfo

    console.log(userInfo)
    import { API } from "../../env.js"
    import { getCookie } from "../../getCookie.js"
    const sendFollow = async () => {
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getCookie("userId"),
                userFollowedId: userInfo.user.user_id,
            }),
        }
        let response = await fetch(`${API}/usersFollows/follow`, options)
        response = await response.json()
        if (response.status != 200)
            return console.log(`ERROR ${response.status}`)

        console.log("SEGUIDO")
    }
</script>

<h1>{userInfo.user.display_name}</h1>
<button
    class="bg-green-500 p-20 w-[60px] h-[30px] text-center grid place-items-center"
    on:click={sendFollow}
>
    FOLLOW
</button>
