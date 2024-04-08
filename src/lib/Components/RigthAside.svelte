<script>
    const API = env.PUBLIC_API
    import { getCookie } from "../getCookie"

    let searchTerm
    const handleSearch = async () => {
        console.log(searchTerm)
        let options = {
            method: "POST",
            headers: {
                authorization: getCookie("token").trim(),
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                searchTerm: searchTerm,
            }),
        }
        let response = await fetch(`${API}/search`, options)

        response = await response.json()

        console.log(response)
    }
</script>

<div>
    <form
        on:submit|preventDefault={handleSearch}
        class="flex flex-col justify-center items-center gap-2 p-2"
    >
        <input
            type="text"
            class="w-[450px] h-[70px] border-2 border-green-500 bg-black text-center"
            placeholder="Search"
            bind:value={searchTerm}
        />
        <input
            type="submit"
            value="Search"
            class="bg-green-500 p-2 rounded-md"
        />
    </form>
</div>
