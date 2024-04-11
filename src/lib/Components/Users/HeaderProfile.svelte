<script>
    export let userName, quackCount
</script>

<header class="header">
    <h1>{userName}</h1>
    <p><b>{quackCount}</b> quacks</p>
</header>

<style>
    .header {
        overflow: hidden;
        background-color: #333;
        position: sticky;
        position: -webkit-sticky;
        top: 0;
    }
</style>
