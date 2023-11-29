<script>
  let form, emailValue, userNameValue, passwordValue, displayNameValue
  import { API } from "../../../../lib/env.js"
  const handleSubmit = async () => {
    let body = {
      email: emailValue,
      password: passwordValue,
      display_name: displayNameValue,
      user_name: userNameValue,
    }
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    let response = await fetch(`${API}/users/auth/register`, options)
    response = await response.json()
    if (response.status == 400) console.log(response.status)
    console.log(body)
  }
</script>

<div class="grid items-center justify-center m-14">
  <form
    on:submit|preventDefault={handleSubmit}
    class="flex flex-col items-center justify-center"
  >
    <div class="grid items-center grid-cols-2 gap-4 text-center m-4">
      <div class="grid items-center">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          bind:value={emailValue}
          class="w-72 text-center rounded-lg h-10 hover:border-solid hover:border-2 border-green-500 transition 0.25s"
        />
      </div>
      <div class="grid items-center">
        <label for="email">Username</label>
        <input
          type="text"
          id="userName"
          bind:value={userNameValue}
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
      <div class="grid items-center">
        <label for="displayName">Display Name</label>
        <input
          type="text"
          id="displayName"
          bind:value={displayNameValue}
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
