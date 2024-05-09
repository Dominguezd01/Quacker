<script>
    export let msgInfo
    let date = new Date(msgInfo.date)

    let minutes = date.getMinutes()

    if (minutes <= 9) {
        minutes = "0" + minutes.toString()
    }
    let seconds = date.getSeconds()

    if (seconds <= 9) {
        seconds = "0" + seconds.toString()
    }
</script>

<div class="flex flex-col items-start message">
    <p>{msgInfo.userName}</p>
    <p
        class="bg-slate-700 rounded-lg place-items-end flex flex-row-reverse p-1 text-lg break-all"
    >
        {msgInfo.msg}
    </p>
    <p class="messageDate">
        {date.toLocaleDateString()}, {date.getHours()}:{minutes}:{seconds}
    </p>
</div>
