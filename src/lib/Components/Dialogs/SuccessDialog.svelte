<!--
    This component is just a way to not use Sweetalert all the time in the code 
-->
<script>
    import { onDestroy } from "svelte"
    import Swal from "sweetalert2"
    import { goto } from "$app/navigation"
    export let content, title
    let dialog
    onDestroy(() => {
        goto("/users/auth/login")
    })
    Swal.fire({
        icon: "success",
        title: title,
        text: content,
        showConfirmButton: true,
        confirmButtonColor: "#16a34a",
    }).then(() => {
        goto("/users/auth/login")
    })
</script>
