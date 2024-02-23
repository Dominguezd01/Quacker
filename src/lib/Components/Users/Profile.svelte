<script>
    //In this component the id is the user profile
    export let userID
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
                userFollowedId: userID,
            }),
        }
        let response = await fetch(`${API}/usersFollows/follow`, options)

        if (response.status != 200)
            return console.log(`ERROR ${response.status}`)

        console.log("SEGUIDO")
    }
</script>

<button class="bg-green-500 p-20 w-[900px]" on:click={sendFollow}>
    FOLLOW
</button>
