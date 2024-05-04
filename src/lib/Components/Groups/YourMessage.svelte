<script>
    export let msgInfo
</script>

<div class="flex flex-col items-end">
    <p>{msgInfo.userName}</p>
    <p
        class="bg-green-600 rounded-lg place-items-start flex flex-row-reverse p-1 text-lg break-all message"
    >
        {msgInfo.msg}
    </p>
    <p class="messageDate">{msgInfo.date.toLocaleString()}</p>
</div>
