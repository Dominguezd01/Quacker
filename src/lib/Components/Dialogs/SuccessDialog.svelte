<!--
    This component is just a way to not use Sweetalert all the time in the code 
-->
<script>
    import { onMount } from "svelte"
    import Swal from "sweetalert2"
    export let content, title
    let dialog

    Swal.fire({
        icon: "success",
        title: title,
        text: content,
        showConfirmButton: true,
        confirmButtonColor: "#16a34a",
    })
</script>
