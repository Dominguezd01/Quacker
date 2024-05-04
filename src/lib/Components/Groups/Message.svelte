<script>
    export let msgInfo
</script>

<div class="flex flex-col items-start message">
    <p>{msgInfo.userName}</p>
    <p
        class="bg-slate-700 rounded-lg place-items-end flex flex-row-reverse p-1 text-lg break-all"
    >
        {msgInfo.msg}
    </p>
    <p class="messageDate">{msgInfo.date.toLocaleString()}</p>
</div>
