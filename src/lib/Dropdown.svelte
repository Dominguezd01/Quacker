<script>
    export let quackId
    import context from "../lib/assets/context.svg"
    import DeleteQuackDialog from "./Components/Dialogs/DeleteQuackDialog.svelte"
    import { getCookie } from "./getCookie"
    import { env } from "$env/dynamic/public"
    import Swal from "sweetalert2"
    const API = env.PUBLIC_API
    let btnDrop
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show")
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches(".dropbtn")) {
            var dropdowns = document.getElementsByClassName("dropdown-content")
            var i
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i]
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show")
                }
            }
        }
    }

    const handleDelete = async () => {
        let options = {
            method: "PATCH",
            headers: {
                authorization: getCookie("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quackId: quackId,
            }),
        }

        let response = await fetch(`${API}/quacks/quack/delete`, options)
        response = await response.json()

        if (response.status !== 200) {
            return Swal.fire({
                title: "CANNOT DELETE THE QUACK",

                icon: "error",
                showCloseButton: true,
            })
        }
        document.getElementById(quackId).remove()
    }
</script>

<div class="dropdown">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
        on:click={myFunction}
        class="dropbtn cursor-pointer"
        src={context}
        width="20px"
    />
    <div id="myDropdown" class="dropdown-content cursor-pointer">
        <a href="/quacks/quack/edit/{quackId}" class="cursor-pointer">Edit</a>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            on:click={handleDelete}
            class="cursor-pointer"
            role="button"
            tabindex="0"
            >Delete
        </a>
    </div>
</div>

<style>
    .dropdown {
        display: flex;
        justify-content: end;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #000000;

        min-width: 160px;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        margin-top: 22px;
    }

    .dropdown-content a {
        color: white;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }
    .dropdown a {
        transition: all 0.15s;
    }
    .dropdown a:hover {
        background-color: rgb(64, 64, 64);
    }

    .show {
        display: block;
    }
</style>
