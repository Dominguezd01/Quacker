<script>
  import { onMount } from "svelte"
  import Swal from "sweetalert2"
  export let content, title
  let dialog

  Swal.fire({
    title: title,
    text: content,
    showConfirmButton: true,
    confirmButtonColor: "#16a34a",
  })
</script>

<style>
  .green {
    background-color: green;
  }
</style>
