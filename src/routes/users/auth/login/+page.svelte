<script>
  import Dialog from "../../../../lib/Components/Dialog.svelte"
  import { getCookie } from "../../../../lib/getCookie.js"
  let form, identifierValue, passwordValue, divDialog
  import { API } from "../../../../lib/env.js"
  const handleSubmit = async () => {
    let body = {
      identifier: identifierValue,
      password: passwordValue,
    }
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    let response = await fetch(`${API}/users/auth/login`, options)
    response = await response.json()

    if (response.status == 400) {
      new Dialog({
        target: divDialog,
        props: {
          title: "Error",
          content: response.msg,
        },
      })
    } else if (response.status == 401) {
      new Dialog({
        target: divDialog,
        props: {
          title: "Error",
          content: response.msg,
        },
      })
    } else if (response.status == 200) {
      new Dialog({
        target: divDialog,
        props: {
          title: "Sucess",
          content: response.msg,
        },
      })
      document.cookie = `token=${response.token}`

      console.log(getCookie("token"))
      localStorage.setItem("token", response.token)
      localStorage.setItem("userId", response.userId)
    }
    console.log(response)
  }
</script>

<div bind:this={divDialog}></div>
<div class="grid items-center justify-center m-14">
  <form
    on:submit|preventDefault={handleSubmit}
    class="flex flex-col items-center justify-center"
  >
    <div class="grid items-center grid-cols-2 gap-4 text-center m-4">
      <div class="grid items-center">
        <label for="email">Username or Email</label>
        <input
          type="text"
          id="userName"
          bind:value={identifierValue}
          class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
        />
      </div>
      <div class="grid items-center">
        <label for="email">Password</label>
        <input
          type="password"
          id="password"
          bind:value={passwordValue}
          class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
        />
      </div>
    </div>
    <div>
      <input
        type="submit"
        value="SEND!!"
        class="bg-green-600 text-center w-36 h-12 rounded-lg hover:bg-green-400 transition 0.35s"
      />
    </div>
  </form>
</div>
