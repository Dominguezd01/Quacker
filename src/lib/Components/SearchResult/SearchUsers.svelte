<script>
    import { onMount } from "svelte"
    import { getImage } from "../../getImage"

    export let users
</script>

<div class="flex flex-col gap-4">
    <p class="text-2xl font-extrabold">Users</p>
    {#each users as user}
        <div class="flex flex-row items-center w-[100%]">
            <img
                src={getImage(user.profile_picture)}
                alt="Users profile"
                class="w-24"
            />
            <div class="flex flex-col w-[100%] justify-items-stretch p-1 gap-6">
                <div class="flex flex-row w-[100%]">
                    <div class="flex flex-col gap-2 w-[100%]">
                        <p class="font-bold text-2xl">{user.display_name}</p>
                        <p class="text-lg">@{user.user_name}</p>
                    </div>
                    {#if user.followed}
                        <div class="flex justify-end w-[100%] h-[100%]">
                            <button
                                class="bg-black pr-1 pl-1 text-center text-lg rounded-sm font-bold border-solid border-2 border-white w-[50%] h-[100%]"
                            >
                                Following!
                            </button>
                        </div>
                    {:else}
                        <div class="flex justify-end w-[100%] h-[100%]">
                            <button
                                class="bg-green-500 pr-1 pl-1 text-center text-lg rounded-sm font-bold border-solid border-2 border-white w-[50%] h-[100%]"
                            >
                                Following!
                            </button>
                        </div>
                    {/if}
                </div>

                <div>
                    {#if user.bio !== null}
                        <p class="text-2xl text-wrap">{user.bio}</p>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
    <hr class="w-[100%] mb-1.5" />
</div>
